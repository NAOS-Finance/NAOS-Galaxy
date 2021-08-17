/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { NAVFeedLike, NAVFeedLikeInterface } from "../NAVFeedLike";

const _abi = [
  {
    constant: true,
    inputs: [],
    name: "approximatedNAV",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "calcUpdateNAV",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "currentNAV",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

export class NAVFeedLike__factory {
  static readonly abi = _abi;
  static createInterface(): NAVFeedLikeInterface {
    return new utils.Interface(_abi) as NAVFeedLikeInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NAVFeedLike {
    return new Contract(address, _abi, signerOrProvider) as NAVFeedLike;
  }
}