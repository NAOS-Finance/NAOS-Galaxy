/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Investor, InvestorInterface } from "../Investor";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "operator_",
        type: "address",
      },
      {
        internalType: "address",
        name: "tranche_",
        type: "address",
      },
      {
        internalType: "address",
        name: "currency_",
        type: "address",
      },
      {
        internalType: "address",
        name: "token_",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "exact",
        type: "bool",
      },
    ],
    name: "eventListener",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "log_bytes32",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "key",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "val",
        type: "address",
      },
    ],
    name: "log_named_address",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "key",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "val",
        type: "bytes32",
      },
    ],
    name: "log_named_bytes32",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "key",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "val",
        type: "int256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "decimals",
        type: "uint256",
      },
    ],
    name: "log_named_decimal_int",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "key",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "val",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "decimals",
        type: "uint256",
      },
    ],
    name: "log_named_decimal_uint",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "key",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "val",
        type: "int256",
      },
    ],
    name: "log_named_int",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "key",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "string",
        name: "val",
        type: "string",
      },
    ],
    name: "log_named_string",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "key",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "val",
        type: "uint256",
      },
    ],
    name: "log_named_uint",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "logs",
    type: "event",
  },
  {
    constant: true,
    inputs: [],
    name: "IS_TEST",
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
    constant: true,
    inputs: [],
    name: "failed",
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
  {
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "tokenAmount",
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

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161045a38038061045a8339818101604052608081101561003357600080fd5b5080516020820151604083015160609093015160008054600160ff19909116811762010000600160b01b031916620100006001600160a01b039788160217825580546001600160a01b03199081169387169390931790556002805483169486169490941790935560038054909116939091169290921790915561039e9081906100bc90396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80634a58ca0e1461005c578063abc6fd0b1461007b578063ba414fa6146100a9578063f1e4c866146100c5578063fa7626d4146100e2575b600080fd5b6100796004803603602081101561007257600080fd5b50356100ea565b005b6100836101d7565b604080519485526020850193909352838301919091526060830152519081900360800190f35b6100b1610278565b604080519115158252519081900360200190f35b610079600480360360208110156100db57600080fd5b5035610286565b6100b1610360565b6001546003546040805163095ea7b360e01b81526001600160a01b039283166004820152602481018590529051919092169163095ea7b39160448083019260209291908290030181600087803b15801561014357600080fd5b505af1158015610157573d6000803e3d6000fd5b505050506040513d602081101561016d57600080fd5b50506002546040805163252c650760e11b81526004810184905290516001600160a01b0390921691634a58ca0e9160248082019260009290919082900301818387803b1580156101bc57600080fd5b505af11580156101d0573d6000803e3d6000fd5b5050505050565b600080600080600260009054906101000a90046001600160a01b03166001600160a01b031663abc6fd0b6040518163ffffffff1660e01b8152600401608060405180830381600087803b15801561022d57600080fd5b505af1158015610241573d6000803e3d6000fd5b505050506040513d608081101561025757600080fd5b50805160208201516040830151606090930151919790965091945092509050565b600054610100900460ff1681565b600080546003546040805163095ea7b360e01b81526001600160a01b039283166004820152602481018690529051620100009093049091169263095ea7b3926044808401936020939083900390910190829087803b1580156102e757600080fd5b505af11580156102fb573d6000803e3d6000fd5b505050506040513d602081101561031157600080fd5b5050600254604080516378f2643360e11b81526004810184905290516001600160a01b039092169163f1e4c8669160248082019260009290919082900301818387803b1580156101bc57600080fd5b60005460ff168156fea265627a7a7231582064064d56625236b6e5f16cf8eb1ff9ce65fe3b405692000838142ae6d95515d964736f6c634300050f0032";

export class Investor__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    operator_: string,
    tranche_: string,
    currency_: string,
    token_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Investor> {
    return super.deploy(
      operator_,
      tranche_,
      currency_,
      token_,
      overrides || {}
    ) as Promise<Investor>;
  }
  getDeployTransaction(
    operator_: string,
    tranche_: string,
    currency_: string,
    token_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      operator_,
      tranche_,
      currency_,
      token_,
      overrides || {}
    );
  }
  attach(address: string): Investor {
    return super.attach(address) as Investor;
  }
  connect(signer: Signer): Investor__factory {
    return super.connect(signer) as Investor__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): InvestorInterface {
    return new utils.Interface(_abi) as InvestorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Investor {
    return new Contract(address, _abi, signerOrProvider) as Investor;
  }
}
