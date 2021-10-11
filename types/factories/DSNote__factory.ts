/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { DSNote, DSNoteInterface } from "../DSNote";

const _abi = [
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
];

const _bytecode =
  "0x6080604052348015600f57600080fd5b50603e80601d6000396000f3fe6080604052600080fdfea265627a7a72315820c30b622abd5e9b880fedcf8a06514d0f49690506a830140c57aa418c1441bc0764736f6c634300050f0032";

export class DSNote__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<DSNote> {
    return super.deploy(overrides || {}) as Promise<DSNote>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): DSNote {
    return super.attach(address) as DSNote;
  }
  connect(signer: Signer): DSNote__factory {
    return super.connect(signer) as DSNote__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DSNoteInterface {
    return new utils.Interface(_abi) as DSNoteInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): DSNote {
    return new Contract(address, _abi, signerOrProvider) as DSNote;
  }
}
