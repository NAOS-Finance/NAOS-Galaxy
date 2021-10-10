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

import "../../../lib/ds-test/src/test.sol";
import "./setup.sol";

import "./users/admin.sol";
import "./users/investor.sol";
import "./users/borrower.sol";
import "./users/keeper.sol";
import "../../../lib/galaxy-math/src/math.sol";

contract BaseSystemTest is TestSetup, Math, DSTest {
    // users
    Borrower borrower;
    address borrower_;

    AdminUser public admin;
    address admin_;

    Borrower randomUser;
    address randomUser_;

    Keeper keeper;
    address keeper_;

    Investor seniorInvestor;
    address seniorInvestor_;
    Investor juniorInvestor;
    address juniorInvestor_;
    NFTFeedLike nftFeed_;

    Hevm public hevm;

    function baseSetup() public {
        deployContracts();
    }

    function createTestUsers() public {
        borrower = new Borrower(address(shelf), address(reserve), currency_, address(pile));
        borrower_ = address(borrower);
        randomUser = new Borrower(address(shelf), address(reserve), currency_, address(pile));
        randomUser_ = address(randomUser);
        keeper = new Keeper(address(collector), currency_);
        keeper_ = address(keeper);
        admin = new AdminUser(
            address(shelf),
            address(pile),
            address(nftFeed),
            address(title),
            address(reserve),
            address(collector),
            address(juniorMemberlist),
            address(seniorMemberlist)
        );
        admin_ = address(admin);
        root.relyBorrowerAdmin(admin_);
        root.relyLenderAdmin(admin_);
        createInvestorUser();
    }

    function createInvestorUser() public {
        seniorInvestor = new Investor(address(seniorOperator), address(seniorTranche), currency_, address(seniorToken));
        seniorInvestor_ = address(seniorInvestor);
        juniorInvestor = new Investor(address(juniorOperator), address(juniorTranche), currency_, address(juniorToken));
        juniorInvestor_ = address(juniorInvestor);
    }

    function lockNFT(uint256 loanId, address usr) public {
        Borrower(usr).approveNFT(collateralNFT, address(shelf));
        Borrower(usr).lock(loanId);
    }

    function transferNFT(
        address sender,
        address recipient,
        uint256 tokenId
    ) public {
        Borrower(sender).approveNFT(collateralNFT, address(this));
        collateralNFT.transferFrom(sender, recipient, tokenId);
    }

    function issueNFT(address usr) public returns (uint256 tokenId, bytes32 lookupId) {
        tokenId = collateralNFT.issue(usr);
        lookupId = keccak256(abi.encodePacked(collateralNFT_, tokenId));
        return (tokenId, lookupId);
    }

    function computeCeiling(uint256 riskGroup, uint256 nftPrice) public view returns (uint256) {
        uint256 ceilingRatio = nftFeed.ceilingRatio(riskGroup);
        return rmul(ceilingRatio, nftPrice);
    }

    function getRateByRisk(uint256 riskGroup) public view returns (uint256) {
        (, , uint256 ratePerSecond, , ) = pile.rates(riskGroup);
        return ratePerSecond;
    }

    function issueNFTAndCreateLoan(address usr) public returns (uint256, uint256) {
        // issue nft for borrower
        (uint256 tokenId, ) = issueNFT(usr);
        // issue loan for borrower
        uint256 loanId = Borrower(usr).issue(collateralNFT_, tokenId);
        return (tokenId, loanId);
    }

    function priceNFTandSetRisk(
        uint256 tokenId,
        uint256 nftPrice,
        uint256 riskGroup
    ) public {
        uint256 maturityDate = 600 days;
        priceNFTandSetRisk(tokenId, nftPrice, riskGroup, maturityDate);
    }

    function priceNFTandSetRisk(
        uint256 tokenId,
        uint256 nftPrice,
        uint256 riskGroup,
        uint256 maturityDate
    ) public {
        bytes32 lookupId = keccak256(abi.encodePacked(collateralNFT_, tokenId));
        admin.priceNFTAndSetRiskGroup(lookupId, nftPrice, riskGroup, maturityDate);
    }

    function priceNFT(uint256 tokenId, uint256 nftPrice) public {
        bytes32 lookupId = keccak256(abi.encodePacked(collateralNFT_, tokenId));
        admin.priceNFT(lookupId, nftPrice);
    }

    function createLoanAndBorrow(
        address usr,
        uint256 nftPrice,
        uint256 riskGroup
    ) public returns (uint256, uint256) {
        (uint256 loanId, uint256 tokenId) = issueNFTAndCreateLoan(usr);

        priceNFTandSetRisk(tokenId, nftPrice, riskGroup);
        // lock nft
        lockNFT(loanId, usr);

        // compute ceiling based on nftPrice & riskgroup
        uint256 ceiling = computeCeiling(riskGroup, nftPrice);
        //borrow
        Borrower(usr).borrow(loanId, ceiling);
        return (loanId, tokenId);
    }

    function createLoanAndWithdraw(
        address usr,
        uint256 nftPrice,
        uint256 riskGroup
    ) public returns (uint256, uint256) {
        (uint256 loanId, uint256 tokenId) = createLoanAndBorrow(usr, nftPrice, riskGroup);
        uint256 ceiling = computeCeiling(riskGroup, nftPrice);
        Borrower(usr).withdraw(loanId, ceiling, borrower_);
        return (loanId, tokenId);
    }

    function repayLoan(
        address usr,
        uint256 loanId,
        uint256 currencyAmount
    ) public {
        // transfer extra funds, so that usr can pay for interest
        topUp(usr);
        // borrower allows shelf full control over borrower tokens
        Borrower(usr).doApproveCurrency(address(shelf), uint256(-1));
        // repay loan
        borrower.repay(loanId, currencyAmount);
    }

    // helpers lenders
    function invest(uint256 currencyAmount) public {
        uint256 validUntil = safeAdd(now, 8 days);
        admin.makeJuniorTokenMember(juniorInvestor_, validUntil);
        admin.makeSeniorTokenMember(seniorInvestor_, validUntil);

        uint256 amountSenior = rmul(currencyAmount, 82 * 10**25);
        uint256 amountJunior = rmul(currencyAmount, 18 * 10**25);

        currency.mint(seniorInvestor_, amountSenior);
        currency.mint(juniorInvestor_, amountJunior);

        seniorInvestor.supplyOrder(amountSenior);
        juniorInvestor.supplyOrder(amountJunior);
    }

    // helpers keeper

    function seize(uint256 loanId) public {
        collector.seize(loanId);
    }

    function addKeeperAndCollect(
        uint256 loanId,
        address usr,
        uint256 recoveryPrice
    ) public {
        seize(loanId);
        admin.addKeeper(loanId, usr, recoveryPrice);
        topUp(usr);
        Borrower(usr).doApproveCurrency(address(shelf), uint256(-1));
        admin.collect(loanId, usr);
    }

    function setupCurrencyOnLender(uint256 amount) public {
        invest(amount);
    }

    function supplyFunds(uint256 amount, address addr) public {
        currency.mint(address(addr), amount);
    }

    function topUp(address usr) public {
        currency.mint(address(usr), 1000 ether);
    }

    function setupOngoingLoan(
        uint256 nftPrice,
        uint256 borrowAmount,
        bool lenderFundingRequired,
        uint256 maturityDate
    ) public returns (uint256 loan, uint256 tokenId) {
        // default risk group for system tests
        uint256 riskGroup = 3;

        tokenId = collateralNFT.issue(borrower_);
        loan = setupLoan(tokenId, collateralNFT_, nftPrice, riskGroup, maturityDate);
        borrow(loan, tokenId, borrowAmount, lenderFundingRequired);
        return (loan, tokenId);
    }

    function setupOngoingLoan()
        public
        returns (
            uint256 loan,
            uint256 tokenId,
            uint256 ceiling
        )
    {
        (uint256 nftPrice, uint256 riskGroup) = defaultCollateral();
        // create borrower collateral collateralNFT
        tokenId = collateralNFT.issue(borrower_);
        loan = setupLoan(tokenId, collateralNFT_, nftPrice, riskGroup);
        uint256 ceiling_ = nftFeed_.ceiling(loan);
        borrow(loan, tokenId, ceiling_);
        return (loan, tokenId, ceiling_);
    }

    function setupLoan(
        uint256 tokenId,
        address collateralNFT_,
        uint256 nftPrice,
        uint256 riskGroup
    ) public returns (uint256) {
        uint256 maturityDate = now + 600 days;
        return setupLoan(tokenId, collateralNFT_, nftPrice, riskGroup, maturityDate);
    }

    function setupLoan(
        uint256 tokenId,
        address collateralNFT_,
        uint256 nftPrice,
        uint256 riskGroup,
        uint256 maturityDate
    ) public returns (uint256) {
        // borrower issue loans
        uint256 loan = borrower.issue(collateralNFT_, tokenId);
        // price collateral and add to riskgroup
        priceNFTandSetRisk(tokenId, nftPrice, riskGroup, maturityDate);
        return loan;
    }

    function fundLender(uint256 amount) public {
        invest(amount);
        hevm.warp(now + 1 days);
        coordinator.closeEpoch();
    }

    function borrow(
        uint256 loan,
        uint256 tokenId,
        uint256 borrowAmount
    ) public {
        borrow(loan, tokenId, borrowAmount, true);
    }

    function borrow(
        uint256 loan,
        uint256 tokenId,
        uint256 borrowAmount,
        bool fundLenderRequired
    ) public {
        borrower.approveNFT(collateralNFT, address(shelf));
        if (fundLenderRequired) {
            fundLender(borrowAmount);
        }
        borrower.borrowAction(loan, borrowAmount);
        checkAfterBorrow(tokenId, borrowAmount);
    }

    function defaultCollateral() public pure returns (uint256 nftPrice_, uint256 riskGroup_) {
        nftPrice_ = 100 ether;
        riskGroup_ = 2;
        return (nftPrice_, riskGroup_);
    }

    // note: this method will be refactored with the new lender side contracts, as the distributor should not hold any currency
    function currdistributorBal() public view returns (uint256) {
        return currency.balanceOf(address(reserve));
    }

    // Checks
    function checkAfterBorrow(uint256 tokenId, uint256 tBalance) public {
        assertEq(currency.balanceOf(borrower_), tBalance);
        assertEq(collateralNFT.ownerOf(tokenId), address(shelf));
    }

    function checkAfterRepay(
        uint256 loan,
        uint256 tokenId,
        uint256 tTotal,
        uint256 tLender
    ) public {
        assertEq(collateralNFT.ownerOf(tokenId), borrower_);
        assertEq(pile.debt(loan), 0);
        assertEq(currency.balanceOf(borrower_), safeSub(tTotal, tLender));
        assertEq(currency.balanceOf(address(pile)), 0);
    }

    function borrowRepay(uint256 nftPrice, uint256 riskGroup) public {
        // create borrower collateral collateralNFT
        uint256 tokenId = collateralNFT.issue(borrower_);
        uint256 loan = setupLoan(tokenId, collateralNFT_, nftPrice, riskGroup);
        uint256 ceiling = nftFeed_.ceiling(loan);

        assertEq(nftFeed_.ceiling(loan), ceiling);
        borrow(loan, tokenId, ceiling);
        assertEq(nftFeed_.ceiling(loan), 0);

        hevm.warp(now + 10 days);

        // borrower needs some currency to pay rate
        setupRepayReq();
        uint256 distributorShould = pile.debt(loan) + currdistributorBal();
        // close without defined amount
        borrower.doClose(loan);
        uint256 totalT = uint256(currency.totalSupply());
        checkAfterRepay(loan, tokenId, totalT, distributorShould);
    }

    uint256 TWO_DECIMAL_PRECISION = 10**16;
    uint256 FIXED27_TWO_DECIMAL_PRECISION = 10**25;

    function assertEq(
        uint256 a,
        uint256 b,
        uint256 precision
    ) public {
        assertEq(a / precision, b / precision);
    }

    function fixed18To27(uint256 valPower18) public pure returns (uint256) {
        // convert 10^18 to 10^27
        return valPower18 * 10**9;
    }

    function setupRepayReq() public returns (uint256) {
        // borrower needs some currency to pay rate
        uint256 extra = 100000000000 ether;
        currency.mint(borrower_, extra);

        // allow pile full control over borrower tokens
        borrower.doApproveCurrency(address(shelf), uint256(-1));
        return extra;
    }
}
