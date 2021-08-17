/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  SubscriberLike,
  SubscriberLikeInterface,
} from "../SubscriberLike";

const _abi = [
  {
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "loan",
        type: "uint256",
      },
    ],
    name: "borrowEvent",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "loan",
        type: "uint256",
      },
    ],
    name: "unlockEvent",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class SubscriberLike__factory {
  static readonly abi = _abi;
  static createInterface(): SubscriberLikeInterface {
    return new utils.Interface(_abi) as SubscriberLikeInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SubscriberLike {
    return new Contract(address, _abi, signerOrProvider) as SubscriberLike;
  }
}