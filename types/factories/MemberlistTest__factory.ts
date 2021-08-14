/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  MemberlistTest,
  MemberlistTestInterface,
} from "../MemberlistTest";

const _abi = [
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
    constant: false,
    inputs: [],
    name: "setUp",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "testAddMember",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "testAddMembers",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "testFailAddMemberPeriodTooShort",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "testFailHasMemberNotAdded",
    outputs: [],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "testFailIsMemberNotAdded",
    outputs: [],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "testIsMember",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "testUpdateMember",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405261001a42620a8c006001600160e01b0361003116565b60019081556000805460ff19169091179055610081565b8082018281101561007b576040805162461bcd60e51b815260206004820152600f60248201526e1cd859994b5859190b59985a5b1959608a1b604482015290519081900360640190fd5b92915050565b611622806100906000396000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c8063aad4ac7211610097578063d05c78da11610066578063d05c78da146101f9578063e6cb90131461021c578063fa7626d41461023f578063fdbf2dbd1461024757610100565b8063aad4ac72146101aa578063b11676c5146101b2578063b5931f7c146101ba578063ba414fa6146101dd57610100565b806377b4101e116100d357806377b4101e1461016f578063a293d1e814610177578063a66795fc1461019a578063aa70a726146101a257610100565b80630a9254e4146101055780630e2286d31461010f5780631817738314610144578063674570221461014c575b600080fd5b61010d61024f565b005b6101326004803603604081101561012557600080fd5b508035906020013561039d565b60408051918252519081900360200190f35b61010d610418565b6101326004803603604081101561016257600080fd5b5080359060200135610482565b61010d61049b565b6101326004803603604081101561018d57600080fd5b5080359060200135610678565b61010d6106c8565b61010d61074a565b61010d6108c8565b61010d610990565b610132600480360360408110156101d057600080fd5b5080359060200135610abb565b6101e5610ac6565b604080519115158252519081900360200190f35b6101326004803603604081101561020f57600080fd5b5080359060200135610ad4565b6101326004803603604081101561023257600080fd5b5080359060200135610b32565b6101e5610b7c565b61010d610b85565b60405161025b90610d10565b604051809103906000f080158015610277573d6000803e3d6000fd5b50600280546001600160a01b03199081166001600160a01b039384161791829055600580543090831617905560068054929093169116179055604080516003808252608082019092529060208201606080388339505081516102e0926007925060200190610d1d565b50600160076000815481106102f157fe5b9060005260206000200160006101000a8154816001600160a01b0302191690836001600160a01b031602179055506002600760018154811061032f57fe5b9060005260206000200160006101000a8154816001600160a01b0302191690836001600160a01b031602179055506003600760028154811061036d57fe5b9060005260206000200160006101000a8154816001600160a01b0302191690836001600160a01b03160217905550565b60008082116103e6576040805162461bcd60e51b815260206004820152601060248201526f6469766973696f6e206279207a65726f60801b604482015290519081900360640190fd5b81610409610400856b033b2e3c9fd0803ce8000000610ad4565b60028504610b32565b8161041057fe5b049392505050565b600254600554604080516373ea29cf60e11b81526001600160a01b0392831660048201529051919092169163e7d4539e916024808301926000929190829003018186803b15801561046857600080fd5b505afa15801561047c573d6000803e3d6000fd5b50505050565b60006b033b2e3c9fd0803ce80000006104098484610ad4565b60025460015460408051631eb6a94160e21b8152602481018390526004810191825260078054604483018190526001600160a01b0390951694637adaa504949193919282916064909101908590801561051d57602002820191906000526020600020905b81546001600160a01b031681526001909101906020018083116104ff575b50509350505050600060405180830381600087803b15801561053e57600080fd5b505af1158015610552573d6000803e3d6000fd5b50506002546040805163022b92c360e21b81526001600482015290516105d994506001600160a01b0390921692506308ae4b0c916024808301926020929190829003018186803b1580156105a557600080fd5b505afa1580156105b9573d6000803e3d6000fd5b505050506040513d60208110156105cf57600080fd5b5051600154610c09565b600280546040805163022b92c360e21b8152600481019390935251610629926001600160a01b03909216916308ae4b0c916024808301926020929190829003018186803b1580156105a557600080fd5b6002546040805163022b92c360e21b8152600360048201529051610676926001600160a01b0316916308ae4b0c916024808301926020929190829003018186803b1580156105a557600080fd5b565b808203828111156106c2576040805162461bcd60e51b815260206004820152600f60248201526e1cd859994b5cdd588b59985a5b1959608a1b604482015290519081900360640190fd5b92915050565b600254600554604080516312d4283560e01b81526001600160a01b039283166004820152905191909216916312d42835916024808301926020929190829003018186803b15801561071857600080fd5b505afa15801561072c573d6000803e3d6000fd5b505050506040513d602081101561074257600080fd5b505161067657fe5b6002546005546001546040805163066c26f960e31b81526001600160a01b039384166004820152602481019290925251919092169163336137c891604480830192600092919082900301818387803b1580156107a557600080fd5b505af11580156107b9573d6000803e3d6000fd5b5050505060006107cc42620bdd80610b32565b6002546005546040805163066c26f960e31b81526001600160a01b03928316600482015260248101859052905193945091169163336137c89160448082019260009290919082900301818387803b15801561082657600080fd5b505af115801561083a573d6000803e3d6000fd5b50506002546005546040805163022b92c360e21b81526001600160a01b03928316600482015290516108c595509190921692506308ae4b0c91602480820192602092909190829003018186803b15801561089357600080fd5b505afa1580156108a7573d6000803e3d6000fd5b505050506040513d60208110156108bd57600080fd5b505182610c09565b50565b6002546005546001546040805163066c26f960e31b81526001600160a01b039384166004820152602481019290925251919092169163336137c891604480830192600092919082900301818387803b15801561092357600080fd5b505af1158015610937573d6000803e3d6000fd5b50506002546005546040805163022b92c360e21b81526001600160a01b039283166004820152905161067695509190921692506308ae4b0c91602480820192602092909190829003018186803b1580156105a557600080fd5b6002546005546001546040805163066c26f960e31b81526001600160a01b039384166004820152602481019290925251919092169163336137c891604480830192600092919082900301818387803b1580156109eb57600080fd5b505af11580156109ff573d6000803e3d6000fd5b5050600254600554604080516373ea29cf60e11b81526001600160a01b039283166004820152905191909216935063e7d4539e92506024808301926000929190829003018186803b158015610a5357600080fd5b505afa158015610a67573d6000803e3d6000fd5b5050600254600554604080516312d4283560e01b81526001600160a01b03928316600482015290519190921693506312d4283592506024808301926020929190829003018186803b15801561071857600080fd5b600081838161041057fe5b600054610100900460ff1681565b6000811580610aef57505080820282828281610aec57fe5b04145b6106c2576040805162461bcd60e51b815260206004820152600f60248201526e1cd859994b5b5d5b0b59985a5b1959608a1b604482015290519081900360640190fd5b808201828110156106c2576040805162461bcd60e51b815260206004820152600f60248201526e1cd859994b5859190b59985a5b1959608a1b604482015290519081900360640190fd5b60005460ff1681565b6000610b944262093a80610b32565b6002546005546040805163066c26f960e31b81526001600160a01b03928316600482015260248101859052905193945091169163336137c89160448082019260009290919082900301818387803b158015610bee57600080fd5b505af1158015610c02573d6000803e3d6000fd5b5050505050565b808214610cfb57604080517f4572726f723a2057726f6e67206075696e74272076616c756500000000000000815290517fe81699b85113eea1c73e10588b2b035e55893369632173afd43feb192fac64e39181900360200190a160408051690808115e1c1958dd195960b21b81526020810183905281517ff10e10fc613faff13ec2fbf0480c452e8ba6ea153d935c216544c8e9c6aa5bd7929181900390910190a16040805169080808081058dd1d585b60b21b81526020810184905281517ff10e10fc613faff13ec2fbf0480c452e8ba6ea153d935c216544c8e9c6aa5bd7929181900390910190a1610cfb610cff565b5050565b6000805461ff001916610100179055565b61084480610daa83390190565b828054828255906000526020600020908101928215610d72579160200282015b82811115610d7257825182546001600160a01b0319166001600160a01b03909116178255602090920191600190910190610d3d565b50610d7e929150610d82565b5090565b610da691905b80821115610d7e5780546001600160a01b0319168155600101610d88565b9056fe608060405234801561001057600080fd5b5033600090815260208190526040902060019055610811806100336000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c80639c52a7f11161008c578063bf353dbb11610066578063bf353dbb1461030c578063d05c78da14610332578063e6cb901314610355578063e7d4539e14610378576100ea565b80639c52a7f1146102a0578063a293d1e8146102c6578063b5931f7c146102e9576100ea565b8063336137c8116100c8578063336137c81461018457806365fae35e146101b257806367457022146101d85780637adaa504146101fb576100ea565b806308ae4b0c146100ef5780630e2286d31461012757806312d428351461014a575b600080fd5b6101156004803603602081101561010557600080fd5b50356001600160a01b031661039e565b60408051918252519081900360200190f35b6101156004803603604081101561013d57600080fd5b50803590602001356103b0565b6101706004803603602081101561016057600080fd5b50356001600160a01b031661042b565b604080519115158252519081900360200190f35b6101b06004803603604081101561019a57600080fd5b506001600160a01b03813516906020013561045b565b005b6101b0600480360360208110156101c857600080fd5b50356001600160a01b03166104ab565b610115600480360360408110156101ee57600080fd5b508035906020013561054c565b6101b06004803603604081101561021157600080fd5b81019060208101813564010000000081111561022c57600080fd5b82018360208201111561023e57600080fd5b8035906020019184602083028401116401000000008311171561026057600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295505091359250610565915050565b6101b0600480360360208110156102b657600080fd5b50356001600160a01b03166105b7565b610115600480360360408110156102dc57600080fd5b5080359060200135610657565b610115600480360360408110156102ff57600080fd5b50803590602001356106a7565b6101156004803603602081101561032257600080fd5b50356001600160a01b03166106b2565b6101156004803603604081101561034857600080fd5b50803590602001356106c4565b6101156004803603604081101561036b57600080fd5b5080359060200135610722565b6101b06004803603602081101561038e57600080fd5b50356001600160a01b031661076c565b60016020526000908152604090205481565b60008082116103f9576040805162461bcd60e51b815260206004820152601060248201526f6469766973696f6e206279207a65726f60801b604482015290519081900360640190fd5b8161041c610413856b033b2e3c9fd0803ce80000006106c4565b60028504610722565b8161042357fe5b049392505050565b6001600160a01b038116600090815260016020526040812054421161045257506001610456565b5060005b919050565b3360009081526020819052604090205460011461047757600080fd5b806104854262093a80610722565b1061048f57600080fd5b6001600160a01b03909116600090815260016020526040902055565b336000908152602081905260409020546001146104c757600080fd5b6001600160a01b03811660009081526020818152604080832060019055805134808252928101828152369282018390526004359460243594938593879333936001600160e01b0319813516938893919290919060608201848480828437600083820152604051601f909101601f1916909201829003965090945050505050a450505050565b60006b033b2e3c9fd0803ce800000061041c84846106c4565b3360009081526020819052604090205460011461058157600080fd5b60005b82518110156105b2576105aa83828151811061059c57fe5b60200260200101518361045b565b600101610584565b505050565b336000908152602081905260409020546001146105d357600080fd5b6001600160a01b038116600090815260208181526040808320839055805134808252928101828152369282018390526004359460243594938593879333936001600160e01b0319813516938893919290919060608201848480828437600083820152604051601f909101601f1916909201829003965090945050505050a450505050565b808203828111156106a1576040805162461bcd60e51b815260206004820152600f60248201526e1cd859994b5cdd588b59985a5b1959608a1b604482015290519081900360640190fd5b92915050565b600081838161042357fe5b60006020819052908152604090205481565b60008115806106df575050808202828282816106dc57fe5b04145b6106a1576040805162461bcd60e51b815260206004820152600f60248201526e1cd859994b5b5d5b0b59985a5b1959608a1b604482015290519081900360640190fd5b808201828110156106a1576040805162461bcd60e51b815260206004820152600f60248201526e1cd859994b5859190b59985a5b1959608a1b604482015290519081900360640190fd5b6001600160a01b0381166000908152600160205260409020544211156107d9576040805162461bcd60e51b815260206004820152601960248201527f6e6f742d616c6c6f7765642d746f2d686f6c642d746f6b656e00000000000000604482015290519081900360640190fd5b5056fea265627a7a72315820437d5332c1d876e44c6c56077e9fe5006fac08b4327d024793fa47883931bd3c64736f6c634300050f0032a265627a7a72315820af6277709f4682bde21aa3c789bf49c5636e42d52eee3bced6c55442a422451364736f6c634300050f0032";

export class MemberlistTest__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<MemberlistTest> {
    return super.deploy(overrides || {}) as Promise<MemberlistTest>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): MemberlistTest {
    return super.attach(address) as MemberlistTest;
  }
  connect(signer: Signer): MemberlistTest__factory {
    return super.connect(signer) as MemberlistTest__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MemberlistTestInterface {
    return new utils.Interface(_abi) as MemberlistTestInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MemberlistTest {
    return new Contract(address, _abi, signerOrProvider) as MemberlistTest;
  }
}
