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

contract Hevm {
    function warp(uint256) public;
}

contract TitleLike {
    function issue(address) public returns (uint256);

    function close(uint256) public;

    function ownerOf(uint256) public returns (address);
}

contract TokenLike {
    function totalSupply() public returns (uint256);

    function balanceOf(address) public returns (uint256);

    function transferFrom(
        address,
        address,
        uint256
    ) public;

    function approve(address, uint256) public;

    function mint(address, uint256) public;

    function burn(address, uint256) public;
}

contract NFTFeedLike {
    function update(bytes32 nftID, uint256 value) public;

    function update(
        bytes32 nftID,
        uint256 value,
        uint256 risk
    ) public;

    function ceiling(uint256 loan) public view returns (uint256);

    function values(uint256) public view returns (uint256);

    function ceilingRatio(uint256) public view returns (uint256);

    function thresholdRatio(uint256) public view returns (uint256);

    function threshold(uint256) public view returns (uint256);

    // function file(bytes32 what, uint loan, uint currencyAmount) public;
    function borrow(uint256 loan, uint256 currencyAmount) public;

    function repay(uint256 loan, uint256 currencyAmount) public;

    function file(
        bytes32 what,
        bytes32 nftID_,
        uint256 maturityDate_
    ) public;
}

contract PileLike {
    function debt(uint256 loan) public returns (uint256);

    function file(
        bytes32 what,
        uint256 rate,
        uint256 speed
    ) public;

    function setRate(uint256 loan, uint256 rate) public;
}

contract TDistributorLike {
    function balance() public;

    function file(bytes32 what, bool flag) public;
}

contract ShelfLike {
    function lock(uint256 loan) public;

    function unlock(uint256 loan) public;

    function issue(address registry, uint256 token) public returns (uint256 loan);

    function close(uint256 loan) public;

    function borrow(uint256 loan, uint256 wad) public;

    function withdraw(
        uint256 loan,
        uint256 wad,
        address usr
    ) public;

    function repay(uint256 loan, uint256 wad) public;

    function shelf(uint256 loan)
        public
        returns (
            address registry,
            uint256 tokenId,
            uint256 price,
            uint256 principal,
            uint256 initial
        );

    function file(
        bytes32 what,
        uint256 loan,
        address registry,
        uint256 nft
    ) public;
}

contract ERC20Like {
    function transferFrom(
        address,
        address,
        uint256
    ) public;

    function mint(address, uint256) public;

    function approve(address usr, uint256 wad) public returns (bool);

    function totalSupply() public returns (uint256);

    function balanceOf(address usr) public returns (uint256);
}

contract TrancheLike {
    function balance() public returns (uint256);

    function tokenSupply() public returns (uint256);
}

contract CollectorLike {
    function collect(uint256 loan) public;

    function collect(uint256 loan, address buyer) public;

    function file(
        bytes32 what,
        uint256 loan,
        address buyer,
        uint256 price
    ) public;

    function relyCollector(address user) public;
}

contract ThresholdLike {
    function set(uint256, uint256) public;
}

contract MemberlistLike {
    function updateMember(address usr, uint256 validUntil) public;

    function removeMember(address usr, uint256 validUntil) public;
}
