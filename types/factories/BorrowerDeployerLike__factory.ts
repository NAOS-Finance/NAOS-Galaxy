/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  BorrowerDeployerLike,
  BorrowerDeployerLikeInterface,
} from "../BorrowerDeployerLike";

const _abi = [
  {
    constant: false,
    inputs: [],
    name: "collector",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "feed",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "shelf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "title",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class BorrowerDeployerLike__factory {
  static readonly abi = _abi;
  static createInterface(): BorrowerDeployerLikeInterface {
    return new utils.Interface(_abi) as BorrowerDeployerLikeInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BorrowerDeployerLike {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as BorrowerDeployerLike;
  }
}