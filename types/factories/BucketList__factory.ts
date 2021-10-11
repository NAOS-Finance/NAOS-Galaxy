/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { BucketList, BucketListInterface } from "../BucketList";

const _abi = [
  {
    constant: true,
    inputs: [],
    name: "NullDate",
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
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "add",
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
        name: "",
        type: "uint256",
      },
    ],
    name: "buckets",
    outputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "next",
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
    name: "calcSum",
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
    name: "firstBucket",
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
    name: "lastBucket",
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
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "remove",
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
    inputs: [
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "uniqueDayTimestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x60806040526106a8806100136000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c80639b51fb0d1161008c578063b5931f7c11610066578063b5931f7c14610217578063beb9385c1461023a578063d05c78da14610242578063e6cb901314610265576100ea565b80639b51fb0d146101b65780639f33e68f146101ec578063a293d1e8146101f4576100ea565b80634cc82215116100c85780634cc82215146101495780636745702214610168578063771602f71461018b5780637b51ee50146101ae576100ea565b80630e2286d3146100ef5780632958263a1461012457806333e9151c1461012c575b600080fd5b6101126004803603604081101561010557600080fd5b5080359060200135610288565b60408051918252519081900360200190f35b610112610303565b6101126004803603602081101561014257600080fd5b5035610309565b6101666004803603602081101561015f57600080fd5b5035610315565b005b6101126004803603604081101561017e57600080fd5b5080359060200135610329565b610166600480360360408110156101a157600080fd5b5080359060200135610342565b610112610358565b6101d3600480360360208110156101cc57600080fd5b503561035d565b6040805192835260208301919091528051918290030190f35b610112610376565b6101126004803603604081101561020a57600080fd5b50803590602001356103d1565b6101126004803603604081101561022d57600080fd5b5080359060200135610421565b61011261042c565b6101126004803603604081101561025857600080fd5b5080359060200135610432565b6101126004803603604081101561027b57600080fd5b5080359060200135610490565b60008082116102d1576040805162461bcd60e51b815260206004820152601060248201526f6469766973696f6e206279207a65726f60801b604482015290519081900360640190fd5b816102f46102eb856b033b2e3c9fd0803ce8000000610432565b60028504610490565b816102fb57fe5b049392505050565b60025481565b62015180908190040290565b61032661032182610309565b6104da565b50565b60006b033b2e3c9fd0803ce80000006102f48484610432565b61035461034e83610309565b82610506565b5050565b600181565b6000602081905290815260409020805460019091015482565b600154600090818161038d576000925050506103ce565b600182146103ca576000828152602081905260409020546103af908290610490565b6000928352602083905260409092206001015491905061038d565b9150505b90565b8082038281111561041b576040805162461bcd60e51b815260206004820152600f60248201526e1cd859994b5cdd588b59985a5b1959608a1b604482015290519081900360640190fd5b92915050565b60008183816102fb57fe5b60015481565b600081158061044d5750508082028282828161044a57fe5b04145b61041b576040805162461bcd60e51b815260206004820152600f60248201526e1cd859994b5b5d5b0b59985a5b1959608a1b604482015290519081900360640190fd5b8082018281101561041b576040805162461bcd60e51b815260206004820152600f60248201526e1cd859994b5859190b59985a5b1959608a1b604482015290519081900360640190fd5b6000818152602081905260408120556104f2816105d6565b600090815260208190526040812060010155565b600082815260208190526040902081905560015461053f5760018281556000838152602081905260409020810181905554600255610354565b60015482101561056657600180546000848152602081905260409020820155829055610354565b815b600081815260208190526040902060010154610589576201517f1901610568565b600081815260208190526040902060019081015414156105a95760028390555b60008181526020819052604080822060019081018054878552928420909101919091559190528290555050565b60025460015414156105f15760006002819055600155610326565b600154811461065b576201517f1981015b6000818152602081905260409020600101548214610625576201517f1901610602565b60008281526020819052604080822060019081015484845291909220909101556002548214156106555760028190555b50610326565b6000908152602081905260409020600190810154905556fea265627a7a72315820ff3b4d6fe5b4a38853659c5a4cda1f55524dfa668c2d4a13af0e544025531f7a64736f6c634300050f0032";

export class BucketList__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<BucketList> {
    return super.deploy(overrides || {}) as Promise<BucketList>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): BucketList {
    return super.attach(address) as BucketList;
  }
  connect(signer: Signer): BucketList__factory {
    return super.connect(signer) as BucketList__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BucketListInterface {
    return new utils.Interface(_abi) as BucketListInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BucketList {
    return new Contract(address, _abi, signerOrProvider) as BucketList;
  }
}
