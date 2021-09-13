/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Reserve, ReserveInterface } from "../Reserve";

const _abi = [
  {
    inputs: [
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
    anonymous: true,
    inputs: [
      {
        indexed: true,
        internalType: "bytes4",
        name: "sig",
        type: "bytes4",
      },
      {
        indexed: true,
        internalType: "address",
        name: "guy",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "foo",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "bar",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "fax",
        type: "bytes",
      },
    ],
    name: "LogNote",
    type: "event",
  },
  {
    constant: true,
    inputs: [],
    name: "assessor",
    outputs: [
      {
        internalType: "contract AssessorLike",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "balance",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "balance_",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "currency",
    outputs: [
      {
        internalType: "contract ERC20Like",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "currencyAvailable",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
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
        internalType: "address",
        name: "usr",
        type: "address",
      },
    ],
    name: "deny",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "bytes32",
        name: "contractName",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "depend",
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
    name: "deposit",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "bytes32",
        name: "what",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "file",
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
    name: "payout",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "currencyAmount",
        type: "uint256",
      },
    ],
    name: "payoutTo",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "x",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y",
        type: "uint256",
      },
    ],
    name: "rdiv",
    outputs: [
      {
        internalType: "uint256",
        name: "z",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "pure",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "usr",
        type: "address",
      },
    ],
    name: "rely",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "x",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y",
        type: "uint256",
      },
    ],
    name: "rmul",
    outputs: [
      {
        internalType: "uint256",
        name: "z",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "pure",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "x",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y",
        type: "uint256",
      },
    ],
    name: "safeAdd",
    outputs: [
      {
        internalType: "uint256",
        name: "z",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "pure",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "x",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y",
        type: "uint256",
      },
    ],
    name: "safeDiv",
    outputs: [
      {
        internalType: "uint256",
        name: "z",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "pure",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "x",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y",
        type: "uint256",
      },
    ],
    name: "safeMul",
    outputs: [
      {
        internalType: "uint256",
        name: "z",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "pure",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "x",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y",
        type: "uint256",
      },
    ],
    name: "safeSub",
    outputs: [
      {
        internalType: "uint256",
        name: "z",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "pure",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "shelf",
    outputs: [
      {
        internalType: "contract ShelfLike",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "wards",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50604051610c95380380610c958339818101604052602081101561003357600080fd5b505133600090815260208190526040902060019081905580546001600160a01b039092166001600160a01b03199283161790556005805490911630179055610c15806100806000396000f3fe608060405234801561001057600080fd5b50600436106101375760003560e01c8063ad7a672f116100b8578063d05c78da1161007c578063d05c78da14610322578063d8927c1a14610345578063e11523431461034d578063e12c9eb31461036a578063e5a6b10f14610372578063e6cb90131461037a57610137565b8063ad7a672f146102ac578063b5931f7c146102b4578063b69ef8a8146102d7578063b6b55f25146102df578063bf353dbb146102fc57610137565b806365fae35e116100ff57806365fae35e146101ee57806367457022146102145780639adc339d146102375780639c52a7f114610263578063a293d1e81461028957610137565b80630e2286d31461013c57806314530cb7146101715780631821d6961461019f57806329ae8114146101c3578063479b9c6c146101e6575b600080fd5b61015f6004803603604081101561015257600080fd5b508035906020013561039d565b60408051918252519081900360200190f35b61019d6004803603604081101561018757600080fd5b506001600160a01b038135169060200135610418565b005b6101a7610442565b604080516001600160a01b039092168252519081900360200190f35b61019d600480360360408110156101d957600080fd5b5080359060200135610451565b6101a7610493565b61019d6004803603602081101561020457600080fd5b50356001600160a01b03166104a2565b61015f6004803603604081101561022a57600080fd5b5080359060200135610543565b61019d6004803603604081101561024d57600080fd5b50803590602001356001600160a01b031661055c565b61019d6004803603602081101561027957600080fd5b50356001600160a01b031661060e565b61015f6004803603604081101561029f57600080fd5b50803590602001356106ae565b61015f6106fe565b61015f600480360360408110156102ca57600080fd5b5080359060200135610704565b61019d61070f565b61019d600480360360208110156102f557600080fd5b50356108fb565b61015f6004803603602081101561031257600080fd5b50356001600160a01b0316610924565b61015f6004803603604081101561033857600080fd5b5080359060200135610936565b61015f610994565b61019d6004803603602081101561036357600080fd5b503561099a565b61015f6109c0565b6101a76109c6565b61015f6004803603604081101561039057600080fd5b50803590602001356109d5565b60008082116103e6576040805162461bcd60e51b815260206004820152601060248201526f6469766973696f6e206279207a65726f60801b604482015290519081900360640190fd5b81610409610400856b033b2e3c9fd0803ce8000000610936565b600285046109d5565b8161041057fe5b049392505050565b3360009081526020819052604090205460011461043457600080fd5b61043e8282610a1f565b5050565b6003546001600160a01b031681565b3360009081526020819052604090205460011461046d57600080fd5b817063757272656e6379417661696c61626c6560781b141561013757600481905561043e565b6002546001600160a01b031681565b336000908152602081905260409020546001146104be57600080fd5b6001600160a01b03811660009081526020818152604080832060019055805134808252928101828152369282018390526004359460243594938593879333936001600160e01b0319813516938893919290919060608201848480828437600083820152604051601f909101601f1916909201829003965090945050505050a450505050565b60006b033b2e3c9fd0803ce80000006104098484610936565b3360009081526020819052604090205460011461057857600080fd5b816439b432b63360d91b14156105a857600280546001600160a01b0319166001600160a01b03831617905561043e565b816763757272656e637960c01b14156105db57600180546001600160a01b0319166001600160a01b03831617905561043e565b816730b9b9b2b9b9b7b960c11b141561013757600380546001600160a01b0319166001600160a01b03831617905561043e565b3360009081526020819052604090205460011461062a57600080fd5b6001600160a01b038116600090815260208181526040808320839055805134808252928101828152369282018390526004359460243594938593879333936001600160e01b0319813516938893919290919060608201848480828437600083820152604051601f909101601f1916909201829003965090945050505050a450505050565b808203828111156106f8576040805162461bcd60e51b815260206004820152600f60248201526e1cd859994b5cdd588b59985a5b1959608a1b604482015290519081900360640190fd5b92915050565b60065490565b600081838161041057fe5b6002546040805163843f7b8960e01b8152815160009384936001600160a01b039091169263843f7b89926004808301939282900301818787803b15801561075557600080fd5b505af1158015610769573d6000803e3d6000fd5b505050506040513d604081101561077f57600080fd5b5080516020909101519092509050811561087b578060045410156107ea576040805162461bcd60e51b815260206004820152601b60248201527f6e6f742d656e6f7567682d63757272656e63792d726573657276650000000000604482015290519081900360640190fd5b6107f6600454826106ae565b60045560025461080f906001600160a01b031682610a1f565b600354604080516303c93de760e11b81526004810184905290516001600160a01b03909216916307927bce9160248082019260009290919082900301818387803b15801561085c57600080fd5b505af1158015610870573d6000803e3d6000fd5b5050505050506108f9565b600254610891906001600160a01b031682610afd565b6003546040805163a0eca55f60e01b81526004810184905290516001600160a01b039092169163a0eca55f9160248082019260009290919082900301818387803b1580156108de57600080fd5b505af11580156108f2573d6000803e3d6000fd5b5050505050505b565b3360009081526020819052604090205460011461091757600080fd5b6109213382610afd565b50565b60006020819052908152604090205481565b60008115806109515750508082028282828161094e57fe5b04145b6106f8576040805162461bcd60e51b815260206004820152600f60248201526e1cd859994b5b5d5b0b59985a5b1959608a1b604482015290519081900360640190fd5b60065481565b336000908152602081905260409020546001146109b657600080fd5b6109213382610a1f565b60045481565b6001546001600160a01b031681565b808201828110156106f8576040805162461bcd60e51b815260206004820152600f60248201526e1cd859994b5859190b59985a5b1959608a1b604482015290519081900360640190fd5b6001546040805163a9059cbb60e01b81526001600160a01b038581166004830152602482018590529151919092169163a9059cbb9160448083019260209291908290030181600087803b158015610a7557600080fd5b505af1158015610a89573d6000803e3d6000fd5b505050506040513d6020811015610a9f57600080fd5b5051610aea576040805162461bcd60e51b81526020600482015260156024820152741c995cd95c9d994b5c185e5bdd5d0b59985a5b1959605a1b604482015290519081900360640190fd5b610af6600654826106ae565b6006555050565b600154600554604080516323b872dd60e01b81526001600160a01b038681166004830152928316602482015260448101859052905191909216916323b872dd9160648083019260209291908290030181600087803b158015610b5e57600080fd5b505af1158015610b72573d6000803e3d6000fd5b505050506040513d6020811015610b8857600080fd5b5051610bd4576040805162461bcd60e51b81526020600482015260166024820152751c995cd95c9d994b59195c1bdcda5d0b59985a5b195960521b604482015290519081900360640190fd5b610af6600654826109d556fea265627a7a72315820dea0a982718d9567968769a5a99ae899579f1694f1018db09a8cf814d4eb969c64736f6c634300050f0032";

export class Reserve__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    currency_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Reserve> {
    return super.deploy(currency_, overrides || {}) as Promise<Reserve>;
  }
  getDeployTransaction(
    currency_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(currency_, overrides || {});
  }
  attach(address: string): Reserve {
    return super.attach(address) as Reserve;
  }
  connect(signer: Signer): Reserve__factory {
    return super.connect(signer) as Reserve__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ReserveInterface {
    return new utils.Interface(_abi) as ReserveInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Reserve {
    return new Contract(address, _abi, signerOrProvider) as Reserve;
  }
}
