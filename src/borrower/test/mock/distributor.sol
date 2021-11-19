pragma solidity 0.5.15;

import "../../../test/mock/mock.sol";

contract DistributorMock is Mock {
    function balance() public {
        calls["balance"]++;
    }
}
