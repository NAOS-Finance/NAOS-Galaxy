// Copyright (C) 2020 Centrifuge

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

pragma solidity 0.5.15;

import "../../../lib/ds-note/src/note.sol";
import "../../../lib/galaxy-auth/src/auth.sol";
import "../../../lib/galaxy-math/src/math.sol";

contract ShelfLike {
    function shelf(uint256 loan) public view returns (address registry, uint256 tokenId);

    function nftlookup(bytes32 nftID) public returns (uint256 loan);
}

contract PileLike {
    function setRate(uint256 loan, uint256 rate) public;

    function debt(uint256 loan) public returns (uint256);

    function pie(uint256 loan) public returns (uint256);

    function changeRate(uint256 loan, uint256 newRate) public;

    function loanRates(uint256 loan) public returns (uint256);

    function file(
        bytes32,
        uint256,
        uint256
    ) public;

    function rates(uint256 rate)
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint48,
            uint256
        );

    function total() public view returns (uint256);

    function rateDebt(uint256 rate) public view returns (uint256);
}

// The NFTFeed stores values and risk group of nfts that are used as collateral in galaxy. A risk group contains: thresholdRatio, ceilingRatio & interstRate.
// The risk groups for a galaxy deployment are defined on contract creation and can not be changed afterwards.
// Loan parameters like interstRate, max borrow amount and liquidation threshold are determined based on the value and risk group of the underlying collateral nft.
contract BaseNFTFeed is DSNote, Auth, Math {
    // nftID => nftValues
    mapping(bytes32 => uint256) public nftValues;
    // nftID => risk
    mapping(bytes32 => uint256) public risk;

    // risk => thresholdRatio
    // thresholdRatio is used to determine the liquidation threshold of the loan. thresholdRatio * nftValue = liquidation threshold
    // When loan debt reaches the liquidation threshold, it can be seized and collected by a whitelisted keeper.
    mapping(uint256 => uint256) public thresholdRatio;

    // risk => ceilingRatio
    // ceilingRatio is used to determine the ax borrow amount (ceiling) of a loan. ceilingRatio * nftValue = max borrow amount
    // When loan debt reaches the liquidation threshold, it can be seized and collected by a whitelisted keeper.
    mapping(uint256 => uint256) public ceilingRatio;

    // loan => borrowed
    // stores the already borrowed amounts for each loan
    // required to track the borrowed currency amount without accrued interest
    mapping(uint256 => uint256) public borrowed;

    PileLike pile;
    ShelfLike shelf;

    constructor() public {
        wards[msg.sender] = 1;
    }

    // part of Feed interface
    function file(bytes32 name, uint256 value) external auth {}

    /// sets the dependency to another contract
    function depend(bytes32 contractName, address addr) external auth {
        if (contractName == "pile") {
            pile = PileLike(addr);
        } else if (contractName == "shelf") {
            shelf = ShelfLike(addr);
        } else revert();
    }

    // returns a unique id based on the nft registry and tokenId
    // the nftID is used to set the risk group and value for nfts
    function nftID(address registry, uint256 tokenId) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(registry, tokenId));
    }

    // returns the nftID for the underlying collateral nft
    function nftID(uint256 loan) public view returns (bytes32) {
        (address registry, uint256 tokenId) = shelf.shelf(loan);
        return nftID(registry, tokenId);
    }

    function file(
        bytes32 name,
        uint256 risk_,
        uint256 thresholdRatio_,
        uint256 ceilingRatio_,
        uint256 rate_
    ) public auth {
        if (name == "riskGroupNFT") {
            require(ceilingRatio[risk_] == 0, "risk-group-in-usage");
            require(thresholdRatio_ > ceilingRatio_, "thresholdRatio_ must be greater than ceilingRatio_");
            thresholdRatio[risk_] = thresholdRatio_;
            ceilingRatio[risk_] = ceilingRatio_;
            // set interestRate for risk group
            pile.file("rate", risk_, rate_);
        } else {
            revert("unkown name");
        }
    }

    ///  -- Oracle Updates --

    // The nft value is to be updated by authenticated oracles
    function update(bytes32 nftID_, uint256 value) external auth {
        // switch of collateral risk group results in new: ceiling, threshold for existing loan
        nftValues[nftID_] = value;
    }

    // The nft value & risk group is to be updated by authenticated oracles
    function update(
        bytes32 nftID_,
        uint256 value,
        uint256 risk_
    ) external auth {
        // the risk group has to exist
        require(thresholdRatio[risk_] != 0, "threshold for risk group not defined");

        // switch of collateral risk group results in new: ceiling, threshold and interest rate for existing loan
        // change to new rate interestRate immediately in pile if loan debt exists
        uint256 loan = shelf.nftlookup(nftID_);
        if (pile.pie(loan) != 0) {
            pile.changeRate(loan, risk_);
        }
        risk[nftID_] = risk_;
        nftValues[nftID_] = value;
    }

    // function checks if the borrow amount does not exceed the max allowed borrow amount (=ceiling)
    function borrow(uint256 loan, uint256 amount) external auth returns (uint256) {
        // increase borrowed amount -> note: max allowed borrow amount does not include accrued interest
        borrowed[loan] = safeAdd(borrowed[loan], amount);

        require(currentCeiling(loan) >= borrowed[loan], "borrow-amount-too-high");
        return amount;
    }

    // part of Feed interface
    function repay(uint256, uint256 amount) external auth returns (uint256) {
        // note: borrowed amount is not decreased as the feed implements the principal and not credit line method
        return amount;
    }

    // borrowEvent is called by the shelf in the borrow method
    function borrowEvent(uint256 loan) external auth {
        uint256 risk_ = risk[nftID(loan)];

        // when issued every loan has per default interest rate of risk group 0.
        // correct interest rate has to be set on first borrow event
        if (pile.loanRates(loan) != risk_) {
            // set loan interest rate to the one of the correct risk group
            pile.setRate(loan, risk_);
        }
    }

    // part of Feed interface
    function unlockEvent(uint256 loan) external auth {}

    ///  -- Getter methods --
    // returns the ceiling of a loan
    // the ceiling defines the maximum amount which can be borrowed
    function ceiling(uint256 loan) public view returns (uint256) {
        if (borrowed[loan] > currentCeiling(loan)) {
            return 0;
        }
        return safeSub(currentCeiling(loan), borrowed[loan]);
    }

    function currentCeiling(uint256 loan) public view returns (uint256) {
        bytes32 nftID_ = nftID(loan);
        return rmul(nftValues[nftID_], ceilingRatio[risk[nftID_]]);
    }

    // returns the threshold of a loan
    // if the loan debt is above the loan threshold the NFT can be seized
    function threshold(uint256 loan) public view returns (uint256) {
        bytes32 nftID_ = nftID(loan);
        return rmul(nftValues[nftID_], thresholdRatio[risk[nftID_]]);
    }

    /// implements feed interface and returns poolValue as the total debt of all loans
    function totalValue() public view returns (uint256) {
        return pile.total();
    }
}
