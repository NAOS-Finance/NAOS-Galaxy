/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  TDistributorLike,
  TDistributorLikeInterface,
} from "../TDistributorLike";

const _abi = [
  {
    constant: false,
    inputs: [],
    name: "balance",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "bytes32",
        name: "what",
        type: "bytes32",
      },
      {
        internalType: "bool",
        name: "flag",
        type: "bool",
      },
    ],
    name: "file",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class TDistributorLike__factory {
  static readonly abi = _abi;
  static createInterface(): TDistributorLikeInterface {
    return new utils.Interface(_abi) as TDistributorLikeInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TDistributorLike {
    return new Contract(address, _abi, signerOrProvider) as TDistributorLike;
  }
}