/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ThresholdLike, ThresholdLikeInterface } from "../ThresholdLike";

const _abi = [
  {
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "set",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class ThresholdLike__factory {
  static readonly abi = _abi;
  static createInterface(): ThresholdLikeInterface {
    return new utils.Interface(_abi) as ThresholdLikeInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ThresholdLike {
    return new Contract(address, _abi, signerOrProvider) as ThresholdLike;
  }
}
