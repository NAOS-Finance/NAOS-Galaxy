/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { CurrencyLike, CurrencyLikeInterface } from "../CurrencyLike";

const _abi = [
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "usr",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class CurrencyLike__factory {
  static readonly abi = _abi;
  static createInterface(): CurrencyLikeInterface {
    return new utils.Interface(_abi) as CurrencyLikeInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CurrencyLike {
    return new Contract(address, _abi, signerOrProvider) as CurrencyLike;
  }
}
