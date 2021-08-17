/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { CollectorLike, CollectorLikeInterface } from "../CollectorLike";

const _abi = [
  {
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "loan",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "buyer",
        type: "address",
      },
    ],
    name: "collect",
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
    name: "collect",
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
        internalType: "uint256",
        name: "loan",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "file",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "relyCollector",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class CollectorLike__factory {
  static readonly abi = _abi;
  static createInterface(): CollectorLikeInterface {
    return new utils.Interface(_abi) as CollectorLikeInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CollectorLike {
    return new Contract(address, _abi, signerOrProvider) as CollectorLike;
  }
}