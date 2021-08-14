/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  RestrictedTokenLike,
  RestrictedTokenLikeInterface,
} from "../RestrictedTokenLike";

const _abi = [
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "hasMember",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

export class RestrictedTokenLike__factory {
  static readonly abi = _abi;
  static createInterface(): RestrictedTokenLikeInterface {
    return new utils.Interface(_abi) as RestrictedTokenLikeInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): RestrictedTokenLike {
    return new Contract(address, _abi, signerOrProvider) as RestrictedTokenLike;
  }
}
