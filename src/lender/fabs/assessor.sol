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

import {Assessor} from "./../assessor.sol";

interface AssessorFabLike {
    function newAssessor() external returns (address);
}

contract AssessorFab {
    function newAssessor() public returns (address) {
        Assessor assessor = new Assessor();
        assessor.rely(msg.sender);
        assessor.deny(address(this));
        return address(assessor);
    }
}
