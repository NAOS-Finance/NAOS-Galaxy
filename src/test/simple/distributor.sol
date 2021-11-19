pragma solidity 0.5.15;
import "../../../lib/galaxy-auth/src/auth.sol";

contract DistTokenLike {
    function transferFrom(
        address,
        address,
        uint256
    ) public;

    function mint(address, uint256) public;
}

contract DShelfLike {
    function balanceRequest() public returns (bool, uint256);
}

contract Distributor is Auth {
    // --- Data ---
    DShelfLike public shelf;
    // simple tranche manager = 1 tranche/1 operator for now
    DistTokenLike public token;

    constructor(address token_) public {
        wards[msg.sender] = 1;
        token = DistTokenLike(token_);
    }

    /// sets the dependency to another contract
    function depend(bytes32 contractName, address addr) public {
        if (contractName == "shelf") shelf = DShelfLike(addr);
        else revert();
    }

    // --- Calls ---
    function balance() public {
        (bool want, uint256 wad) = shelf.balanceRequest();

        if (wad == 0) {
            return;
        }

        if (want) {
            give(address(shelf), wad);
        } else {
            take(address(shelf), wad);
        }
    }

    function give(address usr, uint256 wad) public {
        //token.mint(usr, wad);
        token.transferFrom(address(this), usr, wad);
    }

    function take(address usr, uint256 wad) public {
        token.transferFrom(usr, address(this), wad);
    }
}
