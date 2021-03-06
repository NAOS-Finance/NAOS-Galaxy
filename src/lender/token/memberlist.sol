// Copyright (C) 2020 Centrifuge
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

import "../../../lib/galaxy-math/src/math.sol";
import "../../../lib/galaxy-auth/src/auth.sol";

contract Memberlist is Math, Auth {
    uint256 constant minimumDelay = 7 days;

    // -- Members--
    mapping(address => uint256) public members;

    function updateMember(address usr, uint256 validUntil) public auth {
        require((safeAdd(block.timestamp, minimumDelay)) < validUntil);
        members[usr] = validUntil;
    }

    function updateMembers(address[] memory users, uint256 validUntil) public auth {
        for (uint256 i = 0; i < users.length; i++) {
            updateMember(users[i], validUntil);
        }
    }

    constructor() public {
        wards[msg.sender] = 1;
    }

    function member(address usr) public view {
        require((members[usr] >= block.timestamp), "not-allowed-to-hold-token");
    }

    function hasMember(address usr) public view returns (bool) {
        if (members[usr] >= block.timestamp) {
            return true;
        }
        return false;
    }
}
