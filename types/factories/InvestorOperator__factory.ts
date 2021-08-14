/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  InvestorOperator,
  InvestorOperatorInterface,
} from "../InvestorOperator";

const _abi = [
  {
    constant: false,
    inputs: [],
    name: "disburse",
    outputs: [
      {
        internalType: "uint256",
        name: "payoutCurrencyAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "payoutTokenAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "remainingSupplyCurrency",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "remainingRedeemToken",
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
        internalType: "uint256",
        name: "redeemAmount",
        type: "uint256",
      },
    ],
    name: "redeemOrder",
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
        name: "currencyAmount",
        type: "uint256",
      },
    ],
    name: "supplyOrder",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class InvestorOperator__factory {
  static readonly abi = _abi;
  static createInterface(): InvestorOperatorInterface {
    return new utils.Interface(_abi) as InvestorOperatorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): InvestorOperator {
    return new Contract(address, _abi, signerOrProvider) as InvestorOperator;
  }
}
