/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Keeper, KeeperInterface } from "../Keeper";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "collector_",
        type: "address",
      },
      {
        internalType: "address",
        name: "currency_",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "usr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "currencyPrice",
        type: "uint256",
      },
    ],
    name: "approveCurrency",
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
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516102263803806102268339818101604052604081101561003357600080fd5b508051602090910151600180546001600160a01b039384166001600160a01b031991821617909155600080549390921692169190911790556101ac8061007a6000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c806346b43bce1461003b578063ce3f865f14610069575b600080fd5b6100676004803603604081101561005157600080fd5b506001600160a01b038135169060200135610086565b005b6100676004803603602081101561007f57600080fd5b503561010f565b600080546040805163095ea7b360e01b81526001600160a01b038681166004830152602482018690529151919092169263095ea7b392604480820193602093909283900390910190829087803b1580156100df57600080fd5b505af11580156100f3573d6000803e3d6000fd5b505050506040513d602081101561010957600080fd5b50505050565b6001546040805163ce3f865f60e01b81526004810184905290516001600160a01b039092169163ce3f865f9160248082019260009290919082900301818387803b15801561015c57600080fd5b505af1158015610170573d6000803e3d6000fd5b505050505056fea265627a7a7231582029a90c118afd4a9aa9f15e11b0e19d3cab6c9c6f02c2418e1ad47d5c58eb756864736f6c634300050f0032";

export class Keeper__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    collector_: string,
    currency_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Keeper> {
    return super.deploy(
      collector_,
      currency_,
      overrides || {}
    ) as Promise<Keeper>;
  }
  getDeployTransaction(
    collector_: string,
    currency_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(collector_, currency_, overrides || {});
  }
  attach(address: string): Keeper {
    return super.attach(address) as Keeper;
  }
  connect(signer: Signer): Keeper__factory {
    return super.connect(signer) as Keeper__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): KeeperInterface {
    return new utils.Interface(_abi) as KeeperInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Keeper {
    return new Contract(address, _abi, signerOrProvider) as Keeper;
  }
}
