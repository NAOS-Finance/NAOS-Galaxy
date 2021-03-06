pragma solidity 0.5.15;

import "../../lib/galaxy-math/src/math.sol";
import "../../lib/galaxy-auth/src/auth.sol";

contract ERC20Like {
    function balanceOf(address) public view returns (uint256);

    function transferFrom(
        address,
        address,
        uint256
    ) public returns (bool);

    function transfer(address, uint256) public returns (bool);

    function mint(address, uint256) public;

    function burn(address, uint256) public;

    function totalSupply() public view returns (uint256);
}

contract ShelfLike {
    function balanceRequest() public returns (bool requestWant, uint256 amount);
}

contract AssessorLike {
    function repaymentUpdate(uint256 amount) public;

    function borrowUpdate(uint256 amount) public;
}

// The reserve keeps track of the currency and the bookkeeping
// of the total balance
contract Reserve is Math, Auth {
    ERC20Like public currency;
    ShelfLike public shelf;
    AssessorLike public assessor;

    // currency available for borrowing new loans
    // currency available for borrowing new loans
    uint256 public currencyAvailable;

    address self;

    // total currency in the reserve
    uint256 public balance_;

    constructor(address currency_) public {
        wards[msg.sender] = 1;
        currency = ERC20Like(currency_);
        self = address(this);
    }

    function file(bytes32 what, uint256 amount) external auth {
        if (what == "currencyAvailable") {
            currencyAvailable = amount;
        } else revert();
    }

    function depend(bytes32 contractName, address addr) external auth {
        if (contractName == "shelf") {
            shelf = ShelfLike(addr);
        } else if (contractName == "currency") {
            currency = ERC20Like(addr);
        } else if (contractName == "assessor") {
            assessor = AssessorLike(addr);
        } else revert();
    }

    function totalBalance() public view returns (uint256) {
        return balance_;
    }

    // deposits currency in the the reserve
    function deposit(uint256 currencyAmount) external auth {
        _deposit(msg.sender, currencyAmount);
    }

    function _deposit(address usr, uint256 currencyAmount) internal {
        balance_ = safeAdd(balance_, currencyAmount);
        require(currency.transferFrom(usr, self, currencyAmount), "reserve-deposit-failed");
    }

    // remove currency from the reserve
    function payout(uint256 currencyAmount) external auth {
        _payout(msg.sender, currencyAmount);
    }

    // remove currency from the reserve and send to user
    function payoutTo(address to, uint256 currencyAmount) external auth {
        _payout(to, currencyAmount);
    }

    function _payout(address usr, uint256 currencyAmount) internal {
        balance_ = safeSub(balance_, currencyAmount);
        require(currency.transfer(usr, currencyAmount), "reserve-payout-failed");
    }

    // balance handles currency requests from the borrower side
    // currency is moved between shelf and reserve if needed
    function balance() external {
        (bool requestWant, uint256 currencyAmount) = shelf.balanceRequest();
        if (requestWant) {
            require(currencyAvailable >= currencyAmount, "not-enough-currency-reserve");

            currencyAvailable = safeSub(currencyAvailable, currencyAmount);
            _payout(address(shelf), currencyAmount);
            assessor.borrowUpdate(currencyAmount);
            return;
        }
        _deposit(address(shelf), currencyAmount);
        assessor.repaymentUpdate(currencyAmount);
    }
}
