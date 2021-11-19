// Copyright (C) 2018 Rain <rainbreak@riseup.net>
//
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

contract Math {
    uint256 constant ONE = 10**27;

    function safeAdd(uint256 x, uint256 y) public pure returns (uint256 z) {
        require((z = x + y) >= x, "safe-add-failed");
    }

    function safeSub(uint256 x, uint256 y) public pure returns (uint256 z) {
        require((z = x - y) <= x, "safe-sub-failed");
    }

    function safeMul(uint256 x, uint256 y) public pure returns (uint256 z) {
        require(y == 0 || (z = x * y) / y == x, "safe-mul-failed");
    }

    function safeDiv(uint256 x, uint256 y) public pure returns (uint256 z) {
        z = x / y;
    }

    function rmul(uint256 x, uint256 y) public pure returns (uint256 z) {
        z = safeMul(x, y) / ONE;
    }

    function rdiv(uint256 x, uint256 y) public pure returns (uint256 z) {
        require(y > 0, "division by zero");
        z = safeAdd(safeMul(x, ONE), y / 2) / y;
    }

    function rdivup(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require(y > 0, "division by zero");
        // always rounds up
        z = safeAdd(safeMul(x, ONE), safeSub(y, 1)) / y;
    }
}
