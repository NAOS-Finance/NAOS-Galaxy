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

contract Mock {
    // counting calls
    mapping(bytes32 => uint256) public calls;

    // returns
    mapping(bytes32 => uint256) public values_return;
    mapping(bytes32 => address) public values_address_return;
    mapping(bytes32 => bool) public values_bool_return;

    // passed parameter
    mapping(bytes32 => uint256) public values_uint;
    mapping(bytes32 => address) public values_address;
    mapping(bytes32 => bytes32) public values_bytes32;

    mapping(bytes32 => bool) method_fail;

    // function values(bytes32 name) public returns (uint) {return values_uint[name];}
    // function values(bytes32 name) public returns (address) {return values_address[name];}

    function call(bytes32 name) internal returns (uint256) {
        calls[name]++;
        return values_return[name];
    }

    function setReturn(bytes32 name, uint256 returnValue) public {
        values_return[name] = returnValue;
    }

    function setReturn(bytes32 name, bool returnValue) public {
        values_bool_return[name] = returnValue;
    }

    function setReturn(
        bytes32 name,
        bool flag,
        uint256 value
    ) public {
        setReturn(name, flag);
        setReturn(name, value);
    }

    function setReturn(
        bytes32 name,
        address addr,
        uint256 value
    ) public {
        setReturn(name, addr);
        setReturn(name, value);
    }

    function setReturn(bytes32 name, address returnValue) public {
        values_address_return[name] = returnValue;
    }

    function setFail(bytes32 name, bool flag) public {
        method_fail[name] = flag;
    }
}
