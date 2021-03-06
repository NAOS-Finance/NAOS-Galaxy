// Copyright (C) 2017, 2018, 2019 dbrock, rain, mrchico

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
import "../../../lib/galaxy-erc20/src/erc20.sol";

contract SimpleToken is Auth, Math, ERC20 {
    constructor(string memory symbol_, string memory name_) public ERC20(symbol, name) {}

    // --- Token ---
    function mint(address usr, uint256 wad) public {
        balanceOf[usr] = safeAdd(balanceOf[usr], wad);
        totalSupply = safeAdd(totalSupply, wad);
        emit Transfer(address(0), usr, wad);
    }
}
