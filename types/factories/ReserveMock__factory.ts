/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ReserveMock, ReserveMockInterface } from "../ReserveMock";

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
    constant: false,
    inputs: [],
    name: "balance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "calls",
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
        internalType: "contract CurrencyLike",
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
        internalType: "uint256",
        name: "amount",
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
        name: "",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "currencyAmount",
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
        name: "amount",
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
    constant: false,
    inputs: [
      {
        internalType: "bytes32",
        name: "name",
        type: "bytes32",
      },
      {
        internalType: "bool",
        name: "flag",
        type: "bool",
      },
    ],
    name: "setFail",
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
        name: "name",
        type: "bytes32",
      },
      {
        internalType: "bool",
        name: "returnValue",
        type: "bool",
      },
    ],
    name: "setReturn",
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
        name: "name",
        type: "bytes32",
      },
      {
        internalType: "bool",
        name: "flag",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "setReturn",
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
        name: "name",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "returnValue",
        type: "address",
      },
    ],
    name: "setReturn",
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
        name: "name",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "returnValue",
        type: "uint256",
      },
    ],
    name: "setReturn",
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
        name: "name",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "setReturn",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
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
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "values_address",
    outputs: [
      {
        internalType: "address",
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
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "values_address_return",
    outputs: [
      {
        internalType: "address",
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
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "values_bool_return",
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
    constant: true,
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "values_bytes32",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
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
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "values_return",
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
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "values_uint",
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
  "0x608060405234801561001057600080fd5b506040516109583803806109588339818101604052602081101561003357600080fd5b505133600090815260086020526040902060019055600980546001600160a01b039092166001600160a01b03199092169190911790556108e0806100786000396000f3fe608060405234801561001057600080fd5b50600436106101425760003560e01c8063a98d6f4f116100b8578063bf353dbb1161007c578063bf353dbb14610360578063bf3e9d7c14610386578063cff10265146103b7578063e1152343146103d4578063e5a6b10f146103f1578063eb9d76eb146103f957610142565b8063a98d6f4f146102fb578063ac055e4014610318578063ad7a672f1461033b578063b69ef8a81461033b578063b6b55f251461034357610142565b80635e2dcc1e1161010a5780635e2dcc1e1461022457806365fae35e1461025057806368a9d29a146102765780636edfc001146102935780639c52a7f1146102b8578063a4ed6087146102de57610142565b806321e8e12a146101475780632554f2721461016e57806329ae8114146101995780632c7730fe146101bc5780633655626e146101eb575b600080fd5b61016c6004803603604081101561015d57600080fd5b5080359060200135151561042b565b005b61016c6004803603606081101561018457600080fd5b5080359060208101351515906040013561044b565b61016c600480360360408110156101af57600080fd5b5080359060200135610464565b6101d9600480360360208110156101d257600080fd5b50356104c3565b60408051918252519081900360200190f35b6102086004803603602081101561020157600080fd5b50356104d5565b604080516001600160a01b039092168252519081900360200190f35b61016c6004803603604081101561023a57600080fd5b50803590602001356001600160a01b03166104f0565b61016c6004803603602081101561026657600080fd5b50356001600160a01b031661051e565b6102086004803603602081101561028c57600080fd5b50356105c1565b61016c600480360360408110156102a957600080fd5b508035906020013515156105dc565b61016c600480360360208110156102ce57600080fd5b50356001600160a01b03166105fc565b6101d9600480360360208110156102f457600080fd5b503561069e565b6101d96004803603602081101561031157600080fd5b50356106b0565b61016c6004803603604081101561032e57600080fd5b50803590602001356106c2565b6101d96106d4565b61016c6004803603602081101561035957600080fd5b50356106ee565b6101d96004803603602081101561037657600080fd5b50356001600160a01b03166107a0565b6103a36004803603602081101561039c57600080fd5b50356107b2565b604080519115158252519081900360200190f35b6101d9600480360360208110156103cd57600080fd5b50356107c7565b61016c600480360360208110156103ea57600080fd5b50356107d9565b610208610870565b61016c6004803603606081101561040f57600080fd5b508035906001600160a01b03602082013516906040013561087f565b600091825260036020526040909120805460ff1916911515919091179055565b610455838361042b565b61045f83826106c2565b505050565b3360009081526008602052604090205460011461048057600080fd5b7163757272656e63795f617661696c61626c6560701b60005260046020527f230163dbb962d513302f97ead732316b62bb6575ab9f3e4e54bae3732852b3f85550565b60046020526000908152604090205481565b6005602052600090815260409020546001600160a01b031681565b60009182526002602052604090912080546001600160a01b0319166001600160a01b03909216919091179055565b3360009081526008602052604090205460011461053a57600080fd5b6001600160a01b038116600090815260086020908152604080832060019055805134808252928101828152369282018390526004359460243594938593879333936001600160e01b0319813516938893919290919060608201848480828437600083820152604051601f909101601f1916909201829003965090945050505050a450505050565b6002602052600090815260409020546001600160a01b031681565b600091825260076020526040909120805460ff1916911515919091179055565b3360009081526008602052604090205460011461061857600080fd5b6001600160a01b0381166000908152600860209081526040808320839055805134808252928101828152369282018390526004359460243594938593879333936001600160e01b0319813516938893919290919060608201848480828437600083820152604051601f909101601f1916909201829003965090945050505050a450505050565b60016020526000908152604090205481565b60066020526000908152604090205481565b60009182526001602052604090912055565b60006106e96662616c616e636560c81b610889565b905090565b6d19195c1bdcda5d17d85b5bdd5b9d60921b6000908152600460208190527f3b10f4d9d90306ebffbf8eb3eea9ab612e6a43c189ac5ef30c69913192c6f264839055600954604080516323b872dd60e01b8152339381019390935230602484015260448301859052516001600160a01b03909116926323b872dd926064808201939182900301818387803b15801561078557600080fd5b505af1158015610799573d6000803e3d6000fd5b5050505050565b60086020526000908152604090205481565b60036020526000908152604090205460ff1681565b60006020819052908152604090205481565b6d19195c1bdcda5d17d85b5bdd5b9d60921b6000908152600460208190527f3b10f4d9d90306ebffbf8eb3eea9ab612e6a43c189ac5ef30c69913192c6f264839055600954604080516323b872dd60e01b8152309381019390935233602484015260448301859052516001600160a01b03909116926323b872dd926064808201939182900301818387803b15801561078557600080fd5b6009546001600160a01b031681565b61045583836104f0565b600090815260208181526040808320805460019081019091559091529020549056fea265627a7a7231582098f29a6e92cdf8dafeb5038e388dc8db092072492f511913e9355e230e5cd14b64736f6c634300050f0032";

export class ReserveMock__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    currency_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ReserveMock> {
    return super.deploy(currency_, overrides || {}) as Promise<ReserveMock>;
  }
  getDeployTransaction(
    currency_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(currency_, overrides || {});
  }
  attach(address: string): ReserveMock {
    return super.attach(address) as ReserveMock;
  }
  connect(signer: Signer): ReserveMock__factory {
    return super.connect(signer) as ReserveMock__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ReserveMockInterface {
    return new utils.Interface(_abi) as ReserveMockInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ReserveMock {
    return new Contract(address, _abi, signerOrProvider) as ReserveMock;
  }
}
