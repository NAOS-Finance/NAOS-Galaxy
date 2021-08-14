/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  LenderDeployerLike,
  LenderDeployerLikeInterface,
} from "../LenderDeployerLike";

const _abi = [
  {
    constant: false,
    inputs: [],
    name: "assessor",
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
    name: "reserve",
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

export class LenderDeployerLike__factory {
  static readonly abi = _abi;
  static createInterface(): LenderDeployerLikeInterface {
    return new utils.Interface(_abi) as LenderDeployerLikeInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LenderDeployerLike {
    return new Contract(address, _abi, signerOrProvider) as LenderDeployerLike;
  }
}
