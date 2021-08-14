/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Operator, OperatorInterface } from "../Operator";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "tranche_",
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
        name: "endEpoch",
        type: "uint256",
      },
    ],
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
        name: "amount",
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
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "redeemOrderWithPermit",
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
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "supplyOrder",
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
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "expiry",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "supplyOrderWithDaiPermit",
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
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "supplyOrderWithPermit",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "contract RestrictedTokenLike",
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
    name: "tranche",
    outputs: [
      {
        internalType: "contract TrancheLike",
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
  "0x608060405234801561001057600080fd5b50604051610e4f380380610e4f8339818101604052602081101561003357600080fd5b505133600090815260208190526040902060019081905580546001600160a01b039092166001600160a01b0319909216919091179055610dd7806100786000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c80639c52a7f11161008c578063bf353dbb11610066578063bf353dbb14610256578063f1e4c8661461028e578063fc0c546a146102ab578063ff2050ec146102b3576100cf565b80639c52a7f1146101e5578063abc6fd0b1461020b578063bd77ac2c14610239576100cf565b806322b2e1b5146100d45780634a58ca0e1461011457806354f3e0831461013157806365fae35e1461016f5780636ebc0af1146101955780639adc339d146101b9575b600080fd5b610112600480360360c08110156100ea57600080fd5b5080359060208101359060408101359060ff6060820135169060808101359060a001356102f1565b005b6101126004803603602081101561012a57600080fd5b5035610415565b610112600480360360c081101561014757600080fd5b5080359060208101359060408101359060ff6060820135169060808101359060a0013561062f565b6101126004803603602081101561018557600080fd5b50356001600160a01b0316610722565b61019d6107c3565b604080516001600160a01b039092168252519081900360200190f35b610112600480360360408110156101cf57600080fd5b50803590602001356001600160a01b03166107d2565b610112600480360360208110156101fb57600080fd5b50356001600160a01b0316610850565b6102136108f0565b604080519485526020850193909352838301919091526060830152519081900360800190f35b6102136004803603602081101561024f57600080fd5b5035610a49565b61027c6004803603602081101561026c57600080fd5b50356001600160a01b0316610baa565b60408051918252519081900360200190f35b610112600480360360208110156102a457600080fd5b5035610bbc565b61019d610cd6565b610112600480360360c08110156102c957600080fd5b5080359060208101359060408101359060ff6060820135169060808101359060a00135610ce5565b600160009054906101000a90046001600160a01b03166001600160a01b031663e5a6b10f6040518163ffffffff1660e01b815260040160206040518083038186803b15801561033f57600080fd5b505afa158015610353573d6000803e3d6000fd5b505050506040513d602081101561036957600080fd5b505160018054604080516323f2ebc360e21b81523360048201526001600160a01b039283166024820152604481018a905260648101899052608481019390935260ff871660a484015260c4830186905260e4830185905251921691638fcbaf0c916101048082019260009290919082900301818387803b1580156103ec57600080fd5b505af1158015610400573d6000803e3d6000fd5b5050505061040d86610bbc565b505050505050565b600254604080516312d4283560e01b8152336004828101919091529151913592602480359334936001600160a01b03909316926312d428359281810192602092909190829003018186803b15801561046c57600080fd5b505afa158015610480573d6000803e3d6000fd5b505050506040513d602081101561049657600080fd5b505115156001146104dc576040805162461bcd60e51b815260206004820152601e6024820152600080516020610d83833981519152604482015290519081900360640190fd5b600254604080516312d4283560e01b815233600482015290516001600160a01b03909216916312d4283591602480820192602092909190829003018186803b15801561052757600080fd5b505afa15801561053b573d6000803e3d6000fd5b505050506040513d602081101561055157600080fd5b50506001546040805163176e94bb60e11b81523360048201526024810187905290516001600160a01b0390921691632edd29769160448082019260009290919082900301818387803b1580156105a657600080fd5b505af11580156105ba573d6000803e3d6000fd5b505050508183336001600160a01b03166000356001600160e01b0319166001600160e01b0319168460003660405180848152602001806020018281038252848482818152602001925080828437600083820152604051601f909101601f1916909201829003965090945050505050a450505050565b600160009054906101000a90046001600160a01b03166001600160a01b031663e5a6b10f6040518163ffffffff1660e01b815260040160206040518083038186803b15801561067d57600080fd5b505afa158015610691573d6000803e3d6000fd5b505050506040513d60208110156106a757600080fd5b50516001546040805163d505accf60e01b81523360048201526001600160a01b039283166024820152604481018990526064810188905260ff8716608482015260a4810186905260c481018590529051919092169163d505accf9160e480830192600092919082900301818387803b1580156103ec57600080fd5b3360009081526020819052604090205460011461073e57600080fd5b6001600160a01b03811660009081526020818152604080832060019055805134808252928101828152369282018390526004359460243594938593879333936001600160e01b0319813516938893919290919060608201848480828437600083820152604051601f909101601f1916909201829003965090945050505050a450505050565b6001546001600160a01b031681565b336000908152602081905260409020546001146107ee57600080fd5b81667472616e63686560c81b141561082057600180546001600160a01b0319166001600160a01b03831617905561084c565b81643a37b5b2b760d91b14156100cf57600280546001600160a01b0319166001600160a01b0383161790555b5050565b3360009081526020819052604090205460011461086c57600080fd5b6001600160a01b038116600090815260208181526040808320839055805134808252928101828152369282018390526004359460243594938593879333936001600160e01b0319813516938893919290919060608201848480828437600083820152604051601f909101601f1916909201829003965090945050505050a450505050565b600254604080516312d4283560e01b815233600482015290516000928392839283926001600160a01b0316916312d42835916024808301926020929190829003018186803b15801561094157600080fd5b505afa158015610955573d6000803e3d6000fd5b505050506040513d602081101561096b57600080fd5b505115156001146109b1576040805162461bcd60e51b815260206004820152601e6024820152600080516020610d83833981519152604482015290519081900360640190fd5b600154604080516301c8ce8960e41b815233600482015290516001600160a01b0390921691631c8ce890916024808201926080929091908290030181600087803b1580156109fe57600080fd5b505af1158015610a12573d6000803e3d6000fd5b505050506040513d6080811015610a2857600080fd5b50805160208201516040830151606090930151919790965091945092509050565b600254604080516312d4283560e01b815233600482015290516000928392839283926001600160a01b0316916312d42835916024808301926020929190829003018186803b158015610a9a57600080fd5b505afa158015610aae573d6000803e3d6000fd5b505050506040513d6020811015610ac457600080fd5b50511515600114610b0a576040805162461bcd60e51b815260206004820152601e6024820152600080516020610d83833981519152604482015290519081900360640190fd5b60015460408051633f9deab760e11b81523360048201526024810188905290516001600160a01b0390921691637f3bd56e916044808201926080929091908290030181600087803b158015610b5e57600080fd5b505af1158015610b72573d6000803e3d6000fd5b505050506040513d6080811015610b8857600080fd5b5080516020820151604083015160609093015191989097509195509350915050565b60006020819052908152604090205481565b600254604080516312d4283560e01b8152336004828101919091529151913592602480359334936001600160a01b03909316926312d428359281810192602092909190829003018186803b158015610c1357600080fd5b505afa158015610c27573d6000803e3d6000fd5b505050506040513d6020811015610c3d57600080fd5b50511515600114610c83576040805162461bcd60e51b815260206004820152601e6024820152600080516020610d83833981519152604482015290519081900360640190fd5b60015460408051633a14cdad60e11b81523360048201526024810187905290516001600160a01b03909216916374299b5a9160448082019260009290919082900301818387803b1580156105a657600080fd5b6002546001600160a01b031681565b6002546001546040805163d505accf60e01b81523360048201526001600160a01b039283166024820152604481018990526064810188905260ff8716608482015260a4810186905260c481018590529051919092169163d505accf9160e480830192600092919082900301818387803b158015610d6157600080fd5b505af1158015610d75573d6000803e3d6000fd5b5050505061040d8661041556fe757365722d6e6f742d616c6c6f7765642d746f2d686f6c642d746f6b656e0000a265627a7a723158208c1d9ca27e223f7ef020177a4cf4223577270673363d47744f4484be73e038d964736f6c634300050f0032";

export class Operator__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    tranche_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Operator> {
    return super.deploy(tranche_, overrides || {}) as Promise<Operator>;
  }
  getDeployTransaction(
    tranche_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(tranche_, overrides || {});
  }
  attach(address: string): Operator {
    return super.attach(address) as Operator;
  }
  connect(signer: Signer): Operator__factory {
    return super.connect(signer) as Operator__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): OperatorInterface {
    return new utils.Interface(_abi) as OperatorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Operator {
    return new Contract(address, _abi, signerOrProvider) as Operator;
  }
}
