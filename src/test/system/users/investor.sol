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

import "../interfaces.sol";
import "../../../../lib/ds-test/src/test.sol";

interface InvestorOperator {
    function supplyOrder(uint256 currencyAmount) external;

    function redeemOrder(uint256 redeemAmount) external;

    function disburse()
        external
        returns (
            uint256 payoutCurrencyAmount,
            uint256 payoutTokenAmount,
            uint256 remainingSupplyCurrency,
            uint256 remainingRedeemToken
        );
}

contract Investor is DSTest {
    ERC20Like currency;
    ERC20Like token;

    InvestorOperator operator;
    address tranche;

    constructor(
        address operator_,
        address tranche_,
        address currency_,
        address token_
    ) public {
        currency = ERC20Like(currency_);
        token = ERC20Like(token_);
        operator = InvestorOperator(operator_);
        tranche = tranche_;
    }

    function supplyOrder(uint256 currencyAmount) public {
        currency.approve(tranche, currencyAmount);
        operator.supplyOrder(currencyAmount);
    }

    function disburse()
        public
        returns (
            uint256 payoutCurrencyAmount,
            uint256 payoutTokenAmount,
            uint256 remainingSupplyCurrency,
            uint256 remainingRedeemToken
        )
    {
        return operator.disburse();
    }

    function redeemOrder(uint256 tokenAmount) public {
        token.approve(tranche, tokenAmount);
        operator.redeemOrder(tokenAmount);
    }
}
