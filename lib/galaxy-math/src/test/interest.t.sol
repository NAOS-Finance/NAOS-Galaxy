// Copyright (C) 2018 Centrifuge
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

import "../../../ds-test/src/test.sol";

import "../interest.sol";

contract Hevm {
    function warp(uint256) public;
}

contract InterestTest is Interest, DSTest {
    Hevm hevm;

    function setUp() public {
        hevm = Hevm(0x7109709ECfa91a80626fF3989D68f67F5b1DD12D);
        hevm.warp(1234567);
    }

    function testUpdateChiSec() public {
        /*
        Compound period in pile is in seconds
        compound seconds = (1+r/n)^nt

        rate = (1+(r/n))*10^27 (27 digits precise)

        Example:
        given a 1.05 interest per day (seconds per day 3600 * 24)

        r = 0.05
        i = (1+r/(3600*24))^(3600*24) would result in i = 1.051271065957324097526787272

        rate = (1+(0.05/(3600*24)))*10^27
        rate = 1000000593415115246806684338
        */
        uint256 rate = 1000000593415115246806684338; // 5 % per day compound in seconds
        uint256 cache = block.timestamp;
        uint256 chi = chargeInterest(ONE, rate, block.timestamp);
        // one day later
        hevm.warp(block.timestamp + 1 days);
        uint256 chi_ = chargeInterest(chi, rate, cache);
        assertEq(chi_, 1052608164847005065391965708);
    }

    function testUpdateChiDay() public {
        /*
        Compound period in pile is in seconds
        compound seconds = (1+r/n)^nt

        rate = (1+(r/n))*10^27 (27 digits precise)

        Example: compound in seconds should result in 1.05 interest per day

        given i = 1.05
        solve equation for r
        i = (1+r/n)^nt
        r = n * (i^(1/n)-1

        use calculated r for rate equation
        rate = (1+((n * (i^(1/n)-1)/n))*10^27

        simplified
        rate = i^(1/n) * 10^27

        rate = 1.05^(1/(3600*24)) * 10^27 // round 27 digit
        rate = 1000000564701133626865910626

        */
        uint256 rate = 1000000564701133626865910626; // 5 % day
        uint256 cache = block.timestamp;
        uint256 chi = chargeInterest(ONE, rate, block.timestamp);
        assertEq(chi, ONE);
        // one day later
        hevm.warp(block.timestamp + 2 days);
        // new chi should = 1,05**2
        uint256 chi_ = chargeInterest(chi, rate, cache);
        assertEq(chi_, 1102500000000000000000033678);
    }

    function testCompounding() public {
        uint256 rate = 1000000564701133626865910626; // 5 % day
        uint256 cache = block.timestamp;
        uint256 pie = toPie(ONE, 100 ether);
        (uint256 chi, uint256 delta) = compounding(ONE, rate, block.timestamp, pie);
        assertEq(delta, 0);

        // one day later
        hevm.warp(block.timestamp + 1 days);
        (uint256 updatedChi, uint256 delta_) = compounding(chi, rate, cache, pie);
        uint256 newAmount = toAmount(pie, updatedChi);
        uint256 oldAmount = toAmount(pie, chi);
        assertEq(delta_, 5000000000000000000);
        assertEq(newAmount - oldAmount, delta_);
    }

    function testCompoundingDeltaAmount() public {
        uint256 amount = 10 ether;
        uint256 chi = 1000000564701133626865910626; // 5% day
        uint256 pie = toPie(chi, amount);

        // random chi increase
        uint256 last = now;
        hevm.warp(now + 3 days + 123 seconds);
        (uint256 latestChi, uint256 deltaAmount) = compounding(chi, chi, last, pie);

        assertEq(toAmount(latestChi, pie) - toAmount(chi, pie), deltaAmount);
    }

    function testChargeInterest() public {
        uint256 amount = 100 ether;
        uint256 lastUpdated = now;

        uint256 ratePerSecond = 1000000564701133626865910626; // 5 % day
        hevm.warp(now + 1 days);
        uint256 updatedAmount = chargeInterest(amount, ratePerSecond, lastUpdated);
        assertEq(updatedAmount, 105 ether);
    }
}
