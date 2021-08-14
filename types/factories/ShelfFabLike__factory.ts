/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ShelfFabLike, ShelfFabLikeInterface } from "../ShelfFabLike";

const _abi = [
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "newShelf",
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

export class ShelfFabLike__factory {
  static readonly abi = _abi;
  static createInterface(): ShelfFabLikeInterface {
    return new utils.Interface(_abi) as ShelfFabLikeInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ShelfFabLike {
    return new Contract(address, _abi, signerOrProvider) as ShelfFabLike;
  }
}
