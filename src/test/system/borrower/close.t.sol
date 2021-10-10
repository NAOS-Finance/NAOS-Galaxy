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

pragma solidity >=0.5.15 <0.6.0;

import "../base_system.sol";

contract CloseTest is BaseSystemTest {
    function setUp() public {
        baseSetup();
        createTestUsers();
    }

    function closeLoan(uint256 loanId, bytes32 lookupId) public {
        borrower.close(loanId);
        assertPostCondition(lookupId);
    }

    function assertPreCondition(
        uint256 loanId,
        uint256 tokenId,
        bytes32 lookupId
    ) public view {
        // assert: borrower owner of loan or owner of nft
        assert(title.ownerOf(loanId) == borrower_ || collateralNFT.ownerOf(tokenId) == borrower_);
        // assert: loan has been issued
        assert(shelf.nftlookup(lookupId) > 0);
        // assert: nft not locked anymore
        assert(!shelf.nftLocked(loanId));
        // assert: loan has no open debt
        assert(pile.debt(loanId) == 0);
    }

    function assertPostCondition(bytes32 lookupId) public {
        // assert: nft + loan removed nftlookup
        assertEq(shelf.nftlookup(lookupId), 0);

        // loan burned => owner = address(0)
        // current title implementation reverts if loan owner => address(0)
    }

    function testCloseLoanOwner() public {
        (uint256 tokenId, bytes32 lookupId) = issueNFT(borrower_);
        uint256 loanId = borrower.issue(collateralNFT_, tokenId);
        // transfer nft to random user / borrower still loanOwner
        borrower.approveNFT(collateralNFT, address(this));
        collateralNFT.transferFrom(borrower_, randomUser_, tokenId);
        assertPreCondition(loanId, tokenId, lookupId);
        closeLoan(loanId, lookupId);
    }

    function testCloseLoanNFTOwner() public {
        (uint256 tokenId, bytes32 lookupId) = issueNFT(randomUser_);
        uint256 loanId = randomUser.issue(collateralNFT_, tokenId);
        // transfer nft to borrower / make borrower nftOwner
        randomUser.approveNFT(collateralNFT, address(this));
        collateralNFT.transferFrom(randomUser_, borrower_, tokenId);
        closeLoan(loanId, lookupId);
    }

    function testFailCloseLoanNoPermissions() public {
        (uint256 tokenId, bytes32 lookupId) = issueNFT(randomUser_);
        shelf.issue(collateralNFT_, tokenId);
        // borrower not loanOwner or nftOwner
        closeLoan(123, lookupId);
    }

    function testFailCloseLoanNotExisting() public {
        (, bytes32 lookupId) = issueNFT(borrower_);
        // loan not issued
        uint256 loanId = 10;
        closeLoan(loanId, lookupId);
    }

    function testFailCloseNFTLocked() public {
        (uint256 tokenId, bytes32 lookupId) = issueNFT(borrower_);
        uint256 loanId = borrower.issue(collateralNFT_, tokenId);
        // lock nft
        borrower.lock(loanId);
        closeLoan(loanId, lookupId);
    }

    function testFailCloseLoanHasDebt() public {
        uint256 nftPrice = 200 ether; // -> ceiling 100 ether
        uint256 riskGroup = 1; // -> 12% per year

        (uint256 loanId, uint256 tokenId) = createLoanAndWithdraw(borrower_, nftPrice, riskGroup);
        bytes32 lookupId = keccak256(abi.encodePacked(collateralNFT_, tokenId));
        closeLoan(loanId, lookupId);
    }
}
