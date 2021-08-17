/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ReserveLike, ReserveLikeInterface } from "../ReserveLike";

const _abi = [
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "currencyAmount",
        type: "uint256",
      },
    ],
    name: "payoutTo",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalBalance",
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

export class ReserveLike__factory {
  static readonly abi = _abi;
  static createInterface(): ReserveLikeInterface {
    return new utils.Interface(_abi) as ReserveLikeInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ReserveLike {
    return new Contract(address, _abi, signerOrProvider) as ReserveLike;
  }
}