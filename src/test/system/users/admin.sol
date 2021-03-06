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

import {Title} from "../../../../lib/galaxy-title/src/title.sol";
import "../interfaces.sol";

interface AdminOperatorLike {
    function relyInvestor(address usr) external;
}

contract AdminUser {
    // --- Data ---
    ShelfLike shelf;
    PileLike pile;
    Title title;
    TDistributorLike distributor;
    CollectorLike collector;
    NFTFeedLike nftFeed;
    MemberlistLike juniorMemberlist;
    MemberlistLike seniorMemberlist;

    constructor(
        address shelf_,
        address pile_,
        address nftFeed_,
        address title_,
        address distributor_,
        address collector_,
        address juniorMemberlist_,
        address seniorMemberlist_
    ) public {
        shelf = ShelfLike(shelf_);
        pile = PileLike(pile_);
        title = Title(title_);
        distributor = TDistributorLike(distributor_);
        collector = CollectorLike(collector_);
        nftFeed = NFTFeedLike(nftFeed_);
        juniorMemberlist = MemberlistLike(juniorMemberlist_);
        seniorMemberlist = MemberlistLike(seniorMemberlist_);
    }

    function priceNFT(bytes32 lookupId, uint256 nftPrice) public {
        nftFeed.update(lookupId, nftPrice);
    }

    function priceNFTAndSetRiskGroup(
        bytes32 lookupId,
        uint256 nftPrice,
        uint256 riskGroup,
        uint256 maturityDate
    ) public {
        nftFeed.update(lookupId, nftPrice, riskGroup);
        // add default maturity date
        nftFeed.file("maturityDate", lookupId, maturityDate);
    }

    function setCollectPrice(uint256 loan, uint256 price) public {
        collector.file("loan", loan, address(0), price);
    }

    function addKeeper(
        uint256 loan,
        address usr,
        uint256 price
    ) public {
        collector.file("loan", loan, usr, price);
    }

    function whitelistKeeper(address usr) public {
        collector.relyCollector(usr);
    }

    function collect(uint256 loan, address usr) public {
        collector.collect(loan, usr);
    }

    function makeJuniorTokenMember(address usr, uint256 validitUntil) public {
        juniorMemberlist.updateMember(usr, validitUntil);
    }

    function makeSeniorTokenMember(address usr, uint256 validitUntil) public {
        seniorMemberlist.updateMember(usr, validitUntil);
    }

    function fileFixedRate(uint256 rateGroup, uint256 rate) public {
        pile.file("fixedRate", rateGroup, rate);
    }
}
