/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { DependLike, DependLikeInterface } from "../DependLike";

const _abi = [
  {
    constant: false,
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "depend",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class DependLike__factory {
  static readonly abi = _abi;
  static createInterface(): DependLikeInterface {
    return new utils.Interface(_abi) as DependLikeInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DependLike {
    return new Contract(address, _abi, signerOrProvider) as DependLike;
  }
}