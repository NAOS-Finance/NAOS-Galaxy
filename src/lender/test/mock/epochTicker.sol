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

import "../../../../lib/galaxy-math/src/math.sol";

// This contract is only for testing purpose. Should not
// use in production environment.
contract EpochTickerMock is Math {
    uint public currentEpoch = 1;
    uint public lastEpochExecuted = 0;

    function incCurrentEpoch(uint _epoch) public returns (uint) {
        currentEpoch = safeAdd(currentEpoch, _epoch);
    }

    function incLastEpochExecuted(uint _epoch) public returns (uint) {
        lastEpochExecuted = safeAdd(lastEpochExecuted, _epoch);
    }
}