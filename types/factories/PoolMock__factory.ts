/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PoolMock, PoolMockInterface } from "../PoolMock";

const _abi = [
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
    constant: true,
    inputs: [],
    name: "totalValue",
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
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506104a2806100206000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c8063a4ed60871161008c578063bf3e9d7c11610066578063bf3e9d7c14610274578063cff10265146102a5578063d4c3eea0146102c2578063eb9d76eb146102ca576100ea565b8063a4ed608714610217578063a98d6f4f14610234578063ac055e4014610251576100ea565b80633655626e116100c85780633655626e146101705780635e2dcc1e146101a957806368a9d29a146101d55780636edfc001146101f2576100ea565b806321e8e12a146100ef5780632554f272146101165780632c7730fe14610141575b600080fd5b6101146004803603604081101561010557600080fd5b508035906020013515156102fc565b005b6101146004803603606081101561012c57600080fd5b5080359060208101351515906040013561031c565b61015e6004803603602081101561015757600080fd5b5035610335565b60408051918252519081900360200190f35b61018d6004803603602081101561018657600080fd5b5035610347565b604080516001600160a01b039092168252519081900360200190f35b610114600480360360408110156101bf57600080fd5b50803590602001356001600160a01b0316610362565b61018d600480360360208110156101eb57600080fd5b5035610390565b6101146004803603604081101561020857600080fd5b508035906020013515156103ab565b61015e6004803603602081101561022d57600080fd5b50356103cb565b61015e6004803603602081101561024a57600080fd5b50356103dd565b6101146004803603604081101561026757600080fd5b50803590602001356103ef565b6102916004803603602081101561028a57600080fd5b5035610401565b604080519115158252519081900360200190f35b61015e600480360360208110156102bb57600080fd5b5035610416565b61015e610428565b610114600480360360608110156102e057600080fd5b508035906001600160a01b036020820135169060400135610463565b600091825260036020526040909120805460ff1916911515919091179055565b61032683836102fc565b61033083826103ef565b505050565b60046020526000908152604090205481565b6005602052600090815260409020546001600160a01b031681565b60009182526002602052604090912080546001600160a01b0319166001600160a01b03909216919091179055565b6002602052600090815260409020546001600160a01b031681565b600091825260076020526040909120805460ff1916911515919091179055565b60016020526000908152604090205481565b60066020526000908152604090205481565b60009182526001602052604090912055565b60036020526000908152604090205460ff1681565b60006020819052908152604090205481565b69746f74616c56616c756560b01b60005260016020527fc3853105b1e5296ed3c7fcb021ac9808af28b67623ee75b0bb349973bb1d8d1c5490565b610326838361036256fea265627a7a7231582005dbf89415ba5c26ac7e7df343dec3ef829f2e1a5b03c7be8618b62f20ea2e1464736f6c634300050f0032";

export class PoolMock__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<PoolMock> {
    return super.deploy(overrides || {}) as Promise<PoolMock>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): PoolMock {
    return super.attach(address) as PoolMock;
  }
  connect(signer: Signer): PoolMock__factory {
    return super.connect(signer) as PoolMock__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PoolMockInterface {
    return new utils.Interface(_abi) as PoolMockInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PoolMock {
    return new Contract(address, _abi, signerOrProvider) as PoolMock;
  }
}
