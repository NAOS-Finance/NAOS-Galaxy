/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { User, UserInterface } from "../User";

const _abi = [
  {
    constant: false,
    inputs: [
      {
        internalType: "contract Tranche",
        name: "tranche",
        type: "address",
      },
      {
        internalType: "address",
        name: "erc20",
        type: "address",
      },
      {
        internalType: "address",
        name: "usr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "authTransfer",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610113806100206000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063dd641e0614602d575b600080fd5b606660048036036080811015604157600080fd5b506001600160a01b038135811691602081013582169160408201351690606001356068565b005b604080516373cd078360e01b81526001600160a01b0385811660048301528481166024830152604482018490529151918616916373cd07839160648082019260009290919082900301818387803b15801560c157600080fd5b505af115801560d4573d6000803e3d6000fd5b505050505050505056fea265627a7a7231582055f38b8702255fc976a275e3d268ab616067376b9d131dac57e4ae751df649fc64736f6c634300050f0032";

export class User__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<User> {
    return super.deploy(overrides || {}) as Promise<User>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): User {
    return super.attach(address) as User;
  }
  connect(signer: Signer): User__factory {
    return super.connect(signer) as User__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UserInterface {
    return new utils.Interface(_abi) as UserInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): User {
    return new Contract(address, _abi, signerOrProvider) as User;
  }
}
