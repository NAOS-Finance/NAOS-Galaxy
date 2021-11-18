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
pragma experimental ABIEncoderV2;

import "../../../lib/ds-note/src/note.sol";
import "../../../lib/galaxy-auth/src/auth.sol";
import "../../../lib/galaxy-math/src/interest.sol";
import "./nftfeed.sol";
import "./buckets.sol";
import "../../fixed_point.sol";

// The Nav Feed contract extends the functionality of the NFT Feed by the Net Asset Value (NAV) computation of a Galaxy pool.
// NAV is computed as the sum of all discounted future values (fv) of ongoing loans (debt > 0) in the pool.
// The applied discountRate is dependant on the maturity data of the underlying collateral. The discount decreases with the maturity date approaching.
// To optimize the NAV calculation the discounting of future values happens bucketwise. FVs from assets with the same maturity date are added to one bucket.
// This safes iterations & gas, as the same discountRates can be applied per bucket.
contract NAVFeed is BaseNFTFeed, Interest, Buckets, FixedPoint {
    // maturityDate is the expected date of repayment for an asset
    // nftID => maturityDate
    mapping(bytes32 => uint256) public maturityDate;

    // recoveryRatePD is a combined rate that includes the probability of default for an asset of a certain risk group and its recovery rate
    // risk => recoveryRatePD
    mapping(uint256 => Fixed27) public recoveryRatePD;

    // futureValue of an asset based on the loan debt, interest rate, maturity date and recoveryRatePD
    // nftID => futureValue
    mapping(bytes32 => uint256) public futureValue;

    WriteOff[2] public writeOffs;

    struct WriteOff {
        uint256 rateGroup;
        // denominated in (10^27)
        Fixed27 percentage;
    }

    // discount rate applied on every asset's fv depending on its maturityDate. The discount decreases with the maturityDate approaching.
    Fixed27 public discountRate;

    // approximatedNAV is calculated in case of borrows & repayments between epoch executions.
    // It decreases/increases the NAV by the repaid/borrowed amount without running the NAV calculation routine.
    // This is required for more accurate Senior & JuniorAssetValue estimations between epochs
    uint256 public approximatedNAV;

    // rate group for write-offs in pile contract
    uint256 public constant WRITE_OFF_PHASE_A = 1001;
    uint256 public constant WRITE_OFF_PHASE_B = 1002;

    constructor() public {
        wards[msg.sender] = 1;
    }

    function init() external {
        require(ceilingRatio[0] == 0, "already-initialized");

        // gas optimized initialization of writeOffs and risk groups
        // write off are hardcoded in the contract instead of init function params

        // risk groups are extended by the recoveryRatePD parameter compared with NFTFeed

        // The following score cards just examples that are mostly optimized for the system test cases

        // risk group: 0
        file(
            "riskGroup",
            0, // riskGroup:       0
            8 * 10**26, // thresholdRatio   80%
            6 * 10**26, // ceilingRatio     60%
            ONE, // interestRate     1.0
            ONE // recoveryRatePD:  1.0
        );

        // risk group: 1
        file(
            "riskGroup",
            1, // riskGroup:       1
            7 * 10**26, // thresholdRatio   70%
            5 * 10**26, // ceilingRatio     50%
            uint256(1000000003593629043335673583), // interestRate     12% per year
            90 * 10**25 // recoveryRatePD:  0.9
        );

        // risk group: 2
        file(
            "riskGroup",
            2, // riskGroup:       2
            7 * 10**26, // thresholdRatio   70%
            5 * 10**26, // ceilingRatio     50%
            uint256(1000000564701133626865910626), // interestRate     5% per day
            90 * 10**25 // recoveryRatePD:  0.9
        );

        // risk group: 3
        file(
            "riskGroup",
            3, // riskGroup:       3
            7 * 10**26, // thresholdRatio   70%
            ONE, // ceilingRatio     100%
            uint256(1000000564701133626865910626), // interestRate     5% per day
            ONE // recoveryRatePD:  1.0
        );

        // risk group: 4 (used by collector tests)
        file(
            "riskGroup",
            4, // riskGroup:       4
            5 * 10**26, // thresholdRatio   50%
            6 * 10**26, // ceilingRatio     60%
            uint256(1000000564701133626865910626), // interestRate     5% per day
            ONE // recoveryRatePD:  1.0
        );

        // risk group: 6 Galaxy
        file(
            "riskGroup",
            6, // riskGroup:       6
            105**26, // thresholdRatio   105%
            ONE, // ceilingRatio     100%
            uint256(1000000001547125870000000000), // interestRate     5% per year
            ONE // recoveryRatePD:  1.0
        );

        /// Overdue loans (= loans that were not repaid by the maturityDate) are moved to write Offs
        // 6% interest rate & 60% write off
        setWriteOff(0, WRITE_OFF_PHASE_A, uint256(1000000674400000000000000000), 6 * 10**26);
        // 6% interest rate & 80% write off
        setWriteOff(1, WRITE_OFF_PHASE_B, uint256(1000000674400000000000000000), 8 * 10**26);
    }

    function file(
        bytes32 name,
        uint256 risk_,
        uint256 thresholdRatio_,
        uint256 ceilingRatio_,
        uint256 rate_,
        uint256 recoveryRatePD_
    ) public auth {
        if (name == "riskGroup") {
            file("riskGroupNFT", risk_, thresholdRatio_, ceilingRatio_, rate_);
            recoveryRatePD[risk_] = Fixed27(recoveryRatePD_);
        } else {
            revert("unknown name");
        }
    }

    function setWriteOff(
        uint256 phase_,
        uint256 group_,
        uint256 rate_,
        uint256 writeOffPercentage_
    ) internal {
        writeOffs[phase_] = WriteOff(group_, Fixed27(writeOffPercentage_));
        pile.file("rate", group_, rate_);
    }

    function uniqueDayTimestamp(uint256 timestamp) public pure returns (uint256) {
        return (1 days) * (timestamp / (1 days));
    }

    /// maturityDate is a unix timestamp
    function file(
        bytes32 name,
        bytes32 nftID_,
        uint256 maturityDate_
    ) external auth {
        // maturity date only can be changed when there is no debt on the collateral -> futureValue == 0
        if (name == "maturityDate") {
            require((futureValue[nftID_] == 0), "can-not-change-maturityDate-outstanding-debt");
            maturityDate[nftID_] = uniqueDayTimestamp(maturityDate_);
        } else {
            revert("unknown config parameter");
        }
    }

    function file(bytes32 name, uint256 value) public auth {
        if (name == "discountRate") {
            discountRate = Fixed27(value);
        } else {
            revert("unknown config parameter");
        }
    }

    // In case of successful borrow the approximatedNAV is increased by the borrowed amount
    function borrow(uint256 loan, uint256 amount) external auth returns (uint256 navIncrease) {
        navIncrease = _borrow(loan, amount);
        approximatedNAV = safeAdd(approximatedNAV, navIncrease);
        return navIncrease;
    }

    // On borrow: the discounted future value of the asset is computed based on the loan amount and addeed to the bucket with the according maturity Date
    function _borrow(uint256 loan, uint256 amount) internal returns (uint256 navIncrease) {
        // ceiling check uses existing loan debt
        require(ceiling(loan) >= safeAdd(borrowed[loan], amount), "borrow-amount-too-high");

        bytes32 nftID_ = nftID(loan);
        uint256 maturityDate_ = maturityDate[nftID_];
        // maturity date has to be a value in the future
        require(maturityDate_ > block.timestamp, "maturity-date-is-not-in-the-future");

        // calculate amount including fixed fee if applicatable
        (, , , , uint256 fixedRate) = pile.rates(pile.loanRates(loan));
        uint256 amountIncludingFixed = safeAdd(amount, rmul(amount, fixedRate));
        // calculate future value FV
        uint256 fv = calcFutureValue(loan, amountIncludingFixed, maturityDate_, recoveryRatePD[risk[nftID_]].value);
        futureValue[nftID_] = safeAdd(futureValue[nftID_], fv);

        // add future value to the bucket of assets with the same maturity date
        if (buckets[maturityDate_].value == 0) {
            addBucket(maturityDate_, fv);
        } else {
            buckets[maturityDate_].value = safeAdd(buckets[maturityDate_].value, fv);
        }

        // increase borrowed amount for future ceiling computations
        borrowed[loan] = safeAdd(borrowed[loan], amount);

        // return increase NAV amount
        return calcDiscount(fv, uniqueDayTimestamp(block.timestamp), maturityDate_);
    }

    // calculate the future value based on the amount, maturityDate interestRate and recoveryRate
    function calcFutureValue(
        uint256 loan,
        uint256 amount,
        uint256 maturityDate_,
        uint256 recoveryRatePD_
    ) public returns (uint256) {
        // retrieve interest rate from the pile
        (, , uint256 loanInterestRate, , ) = pile.rates(pile.loanRates(loan));
        return rmul(rmul(rpow(loanInterestRate, safeSub(maturityDate_, uniqueDayTimestamp(now)), ONE), amount), recoveryRatePD_);
    }

    /// update the nft value and change the risk group
    function update(
        bytes32 nftID_,
        uint256 value,
        uint256 risk_
    ) public auth {
        nftValues[nftID_] = value;

        // no change in risk group
        if (risk_ == risk[nftID_]) {
            return;
        }

        // nfts can only be added to risk groups that are part of the score card
        require(thresholdRatio[risk_] != 0, "risk group not defined in contract");
        risk[nftID_] = risk_;

        // no currencyAmount borrowed yet
        if (futureValue[nftID_] == 0) {
            return;
        }

        uint256 loan = shelf.nftlookup(nftID_);
        uint256 maturityDate_ = maturityDate[nftID_];

        // Changing the risk group of an nft, might lead to a new interest rate for the dependant loan.
        // New interest rate leads to a future value.
        // recalculation required
        buckets[maturityDate_].value = safeSub(buckets[maturityDate_].value, futureValue[nftID_]);

        futureValue[nftID_] = calcFutureValue(loan, pile.debt(loan), maturityDate[nftID_], recoveryRatePD[risk[nftID_]].value);
        buckets[maturityDate_].value = safeAdd(buckets[maturityDate_].value, futureValue[nftID_]);
    }

    // In case of successful repayment the approximatedNAV is decreased by the repaid amount
    function repay(uint256 loan, uint256 amount) external auth returns (uint256 navDecrease) {
        navDecrease = _repay(loan, amount);
        if (navDecrease > approximatedNAV) {
            approximatedNAV = 0;
        }

        if (navDecrease < approximatedNAV) {
            approximatedNAV = safeSub(approximatedNAV, navDecrease);
            return navDecrease;
        }

        approximatedNAV = 0;
        return navDecrease;
    }

    // On repayment: adjust future value bucket according to repayment amount
    function _repay(uint256 loan, uint256 amount) internal returns (uint256 navDecrease) {
        bytes32 nftID_ = nftID(loan);
        uint256 maturityDate_ = maturityDate[nftID_];

        // no fv decrease calculation needed if maturaity date is in the past
        if (maturityDate_ < block.timestamp) {
            return amount;
        }

        // remove future value for loan from bucket
        buckets[maturityDate_].value = safeSub(buckets[maturityDate_].value, futureValue[nftID_]);

        uint256 debt = pile.debt(loan);
        debt = safeSub(debt, amount);

        uint256 fv = 0;
        uint256 preFutureValue = futureValue[nftID_];

        // in case of partial repayment, compute the fv of the remaining debt and add to the according fv bucket
        if (debt != 0) {
            fv = calcFutureValue(loan, debt, maturityDate_, recoveryRatePD[risk[nftID_]].value);
            buckets[maturityDate_].value = safeAdd(buckets[maturityDate_].value, fv);
        }

        futureValue[nftID_] = fv;

        // remove buckets if no remaining assets
        if (buckets[maturityDate_].value == 0 && firstBucket != 0) {
            removeBucket(maturityDate_);
        }

        // return decrease NAV amount
        if (block.timestamp < maturityDate_) {
            return calcDiscount(safeSub(preFutureValue, fv), uniqueDayTimestamp(block.timestamp), maturityDate_);
        }

        // if a loan is overdue the portfolio value is equal to the existing debt multiplied with a write off factor
        return amount;
    }

    function calcDiscount(
        uint256 amount,
        uint256 normalizedBlockTimestamp,
        uint256 maturityDate_
    ) public view returns (uint256 result) {
        return rdiv(amount, rpow(discountRate.value, safeSub(maturityDate_, normalizedBlockTimestamp), ONE));
    }

    /// calculates the total discount of all buckets with a timestamp > block.timestamp
    function calcTotalDiscount() public view returns (uint256) {
        uint256 normalizedBlockTimestamp = uniqueDayTimestamp(block.timestamp);
        uint256 sum = 0;

        uint256 currDate = normalizedBlockTimestamp;

        if (currDate > lastBucket) {
            return 0;
        }

        // only buckets after the block.timestamp are relevant for the discount
        // assuming its more gas efficient to iterate over time to find the first one instead of iterating the list from the beginning
        // not true if buckets are only sparsely populated over long periods of time
        while (buckets[currDate].next == 0) {
            currDate = currDate + 1 days;
        }

        while (currDate != NullDate) {
            sum = safeAdd(sum, calcDiscount(buckets[currDate].value, normalizedBlockTimestamp, currDate));
            currDate = buckets[currDate].next;
        }
        return sum;
    }

    /// returns the NAV (net asset value) of the pool
    function currentNAV() public view returns (uint256) {
        // calculates the NAV for ongoing loans with a maturityDate date in the future
        uint256 nav_ = calcTotalDiscount();
        // include ovedue assets to the current NAV calculation
        for (uint256 i = 0; i < writeOffs.length; i++) {
            // multiply writeOffGroupDebt with the writeOff rate
            nav_ = safeAdd(nav_, rmul(pile.rateDebt(writeOffs[i].rateGroup), writeOffs[i].percentage.value));
        }
        return nav_;
    }

    function calcUpdateNAV() external returns (uint256) {
        // approximated NAV is updated and at this point in time 100% correct
        approximatedNAV = currentNAV();
        return approximatedNAV;
    }

    /// workaround for transition phase between V2 & V3
    function totalValue() public view returns (uint256) {
        return currentNAV();
    }

    function dateBucket(uint256 timestamp) public view returns (uint256) {
        return buckets[timestamp].value;
    }
}
