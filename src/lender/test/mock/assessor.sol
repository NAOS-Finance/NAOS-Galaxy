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

import "../../../test/mock/mock.sol";

contract AssessorMock is Mock {
    mapping(address => uint256) public tokenPrice;

    // legacy code Galaxy v0.2
    function calcAndUpdateTokenPrice(address tranche) public returns (uint256) {
        values_address["calcAndUpdateTokenPrice_tranche"] = tranche;
        return call("tokenPrice");
    }

    function calcAssetValue(address tranche) public returns (uint256) {
        values_address["calcAssetValue_tranche"] = tranche;
        return call("assetValue");
    }

    function juniorReserve() internal returns (uint256) {
        return call("juniorReserve");
    }

    function supplyApprove(address tranche, uint256 currencyAmount) public returns (bool) {
        calls["supplyApprove"]++;
        values_address["supplyApprove_tranche"] = tranche;
        values_uint["supplyApprove_currencyAmount"] = currencyAmount;

        return values_bool_return["supplyApprove"];
    }

    function redeemApprove(address tranche, uint256 currencyAmount) public returns (bool) {
        calls["redeemApprove"]++;
        values_address["redeemApprove_tranche"] = tranche;
        values_uint["redeemApprove_currencyAmount"] = currencyAmount;

        return values_bool_return["redeemApprove"];
    }

    function accrueTrancheInterest(address) public view returns (uint256) {
        return values_return["accrueTrancheInterest"];
    }

    function calcMaxSeniorAssetValue() external returns (uint256) {
        return call("calcMaxSeniorAssetValue");
    }

    function calcMinJuniorAssetValue() external returns (uint256) {
        return call("calcMinJuniorAssetValue");
    }

    function setTokenPrice(address tranche, uint256 tokenPrice_) public {
        tokenPrice[tranche] = tokenPrice_;
    }

    function calcTokenPrice(address tranche) external view returns (uint256) {
        return tokenPrice[tranche];
    }

    // - new funcs

    function calcUpdateNAV() external returns (uint256) {
        return call("calcUpdateNAV");
    }

    function maxReserve() external view returns (uint256) {
        return values_return["maxReserve"];
    }

    function calcSeniorTokenPrice(uint256, uint256) external returns (uint256) {
        return call("calcSeniorTokenPrice");
    }

    function calcJuniorTokenPrice(uint256, uint256) external returns (uint256) {
        return call("calcJuniorTokenPrice");
    }

    function seniorRatioBounds() public view returns (uint256 minSeniorRatio_, uint256 maxSeniorRatio_) {
        uint256 minSeniorRatio = values_return["minSeniorRatio"];
        uint256 maxSeniorRatio = values_return["maxSeniorRatio"];
        return (minSeniorRatio, maxSeniorRatio);
    }

    function seniorDebt() external returns (uint256) {
        return call("seniorDebt");
    }

    function seniorBalance() external returns (uint256) {
        return call("seniorBalance");
    }

    function changeSeniorAsset(
        uint256 seniorRatio_,
        uint256 seniorSupply,
        uint256 seniorRedeem
    ) public {
        values_uint["changeSeniorAsset_seniorRatio"] = seniorRatio_;
        values_uint["changeSeniorAsset_seniorSupply"] = seniorSupply;
        values_uint["changeSeniorAsset_seniorRedeem"] = seniorRedeem;
    }

    function repaymentUpdate(uint256 currencyAmount) public {
        values_uint["repaymentUpdate_currencyAmount"] = currencyAmount;
    }

    function borrowUpdate(uint256 currencyAmount) public {
        values_uint["borrowUpdate_currencyAmount"] = currencyAmount;
    }
}
