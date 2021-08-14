/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface RestrictedTokenInterface extends ethers.utils.Interface {
  functions: {
    "DOMAIN_SEPARATOR()": FunctionFragment;
    "PERMIT_TYPEHASH()": FunctionFragment;
    "allowance(address,address)": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "burn(address,uint256)": FunctionFragment;
    "decimals()": FunctionFragment;
    "deny(address)": FunctionFragment;
    "depend(bytes32,address)": FunctionFragment;
    "hasMember(address)": FunctionFragment;
    "memberlist()": FunctionFragment;
    "mint(address,uint256)": FunctionFragment;
    "move(address,address,uint256)": FunctionFragment;
    "name()": FunctionFragment;
    "nonces(address)": FunctionFragment;
    "permit(address,address,uint256,uint256,uint8,bytes32,bytes32)": FunctionFragment;
    "pull(address,uint256)": FunctionFragment;
    "push(address,uint256)": FunctionFragment;
    "rely(address)": FunctionFragment;
    "symbol()": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
    "version()": FunctionFragment;
    "wards(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "DOMAIN_SEPARATOR",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "PERMIT_TYPEHASH",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "allowance",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(
    functionFragment: "burn",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
  encodeFunctionData(functionFragment: "deny", values: [string]): string;
  encodeFunctionData(
    functionFragment: "depend",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(functionFragment: "hasMember", values: [string]): string;
  encodeFunctionData(
    functionFragment: "memberlist",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "mint",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "move",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(functionFragment: "nonces", values: [string]): string;
  encodeFunctionData(
    functionFragment: "permit",
    values: [
      string,
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BytesLike,
      BytesLike
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "pull",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "push",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "rely", values: [string]): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "version", values?: undefined): string;
  encodeFunctionData(functionFragment: "wards", values: [string]): string;

  decodeFunctionResult(
    functionFragment: "DOMAIN_SEPARATOR",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "PERMIT_TYPEHASH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "burn", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deny", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "depend", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasMember", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "memberlist", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "move", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nonces", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "permit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pull", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "push", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "rely", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "version", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "wards", data: BytesLike): Result;

  events: {
    "Approval(address,address,uint256)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}

export class RestrictedToken extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: RestrictedTokenInterface;

  functions: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<[string]>;

    PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<[string]>;

    allowance(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    approve(
      usr: string,
      wad: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    balanceOf(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    burn(
      usr: string,
      wad: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    decimals(overrides?: CallOverrides): Promise<[number]>;

    deny(
      usr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    depend(
      contractName: BytesLike,
      addr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    hasMember(usr: string, overrides?: CallOverrides): Promise<[boolean]>;

    memberlist(overrides?: CallOverrides): Promise<[string]>;

    mint(
      usr: string,
      wad: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    move(
      src: string,
      dst: string,
      wad: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    name(overrides?: CallOverrides): Promise<[string]>;

    nonces(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    permit(
      owner: string,
      spender: string,
      value: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    pull(
      usr: string,
      wad: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    push(
      usr: string,
      wad: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    rely(
      usr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    symbol(overrides?: CallOverrides): Promise<[string]>;

    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    transfer(
      dst: string,
      wad: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferFrom(
      from: string,
      to: string,
      wad: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    version(overrides?: CallOverrides): Promise<[string]>;

    wards(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<string>;

  PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<string>;

  allowance(
    arg0: string,
    arg1: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  approve(
    usr: string,
    wad: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  balanceOf(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  burn(
    usr: string,
    wad: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  decimals(overrides?: CallOverrides): Promise<number>;

  deny(
    usr: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  depend(
    contractName: BytesLike,
    addr: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  hasMember(usr: string, overrides?: CallOverrides): Promise<boolean>;

  memberlist(overrides?: CallOverrides): Promise<string>;

  mint(
    usr: string,
    wad: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  move(
    src: string,
    dst: string,
    wad: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  name(overrides?: CallOverrides): Promise<string>;

  nonces(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  permit(
    owner: string,
    spender: string,
    value: BigNumberish,
    deadline: BigNumberish,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  pull(
    usr: string,
    wad: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  push(
    usr: string,
    wad: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  rely(
    usr: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  symbol(overrides?: CallOverrides): Promise<string>;

  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  transfer(
    dst: string,
    wad: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferFrom(
    from: string,
    to: string,
    wad: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  version(overrides?: CallOverrides): Promise<string>;

  wards(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<string>;

    PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<string>;

    allowance(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approve(
      usr: string,
      wad: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    balanceOf(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    burn(
      usr: string,
      wad: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    decimals(overrides?: CallOverrides): Promise<number>;

    deny(usr: string, overrides?: CallOverrides): Promise<void>;

    depend(
      contractName: BytesLike,
      addr: string,
      overrides?: CallOverrides
    ): Promise<void>;

    hasMember(usr: string, overrides?: CallOverrides): Promise<boolean>;

    memberlist(overrides?: CallOverrides): Promise<string>;

    mint(
      usr: string,
      wad: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    move(
      src: string,
      dst: string,
      wad: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    name(overrides?: CallOverrides): Promise<string>;

    nonces(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    permit(
      owner: string,
      spender: string,
      value: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    pull(
      usr: string,
      wad: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    push(
      usr: string,
      wad: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    rely(usr: string, overrides?: CallOverrides): Promise<void>;

    symbol(overrides?: CallOverrides): Promise<string>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      dst: string,
      wad: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferFrom(
      from: string,
      to: string,
      wad: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    version(overrides?: CallOverrides): Promise<string>;

    wards(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    Approval(
      src?: string | null,
      usr?: string | null,
      wad?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { src: string; usr: string; wad: BigNumber }
    >;

    Transfer(
      src?: string | null,
      dst?: string | null,
      wad?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { src: string; dst: string; wad: BigNumber }
    >;
  };

  estimateGas: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<BigNumber>;

    PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<BigNumber>;

    allowance(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approve(
      usr: string,
      wad: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    balanceOf(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    burn(
      usr: string,
      wad: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    decimals(overrides?: CallOverrides): Promise<BigNumber>;

    deny(
      usr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    depend(
      contractName: BytesLike,
      addr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    hasMember(usr: string, overrides?: CallOverrides): Promise<BigNumber>;

    memberlist(overrides?: CallOverrides): Promise<BigNumber>;

    mint(
      usr: string,
      wad: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    move(
      src: string,
      dst: string,
      wad: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    nonces(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    permit(
      owner: string,
      spender: string,
      value: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    pull(
      usr: string,
      wad: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    push(
      usr: string,
      wad: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    rely(
      usr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    symbol(overrides?: CallOverrides): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      dst: string,
      wad: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferFrom(
      from: string,
      to: string,
      wad: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    version(overrides?: CallOverrides): Promise<BigNumber>;

    wards(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    allowance(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approve(
      usr: string,
      wad: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    balanceOf(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    burn(
      usr: string,
      wad: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    deny(
      usr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    depend(
      contractName: BytesLike,
      addr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    hasMember(
      usr: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    memberlist(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    mint(
      usr: string,
      wad: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    move(
      src: string,
      dst: string,
      wad: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nonces(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    permit(
      owner: string,
      spender: string,
      value: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    pull(
      usr: string,
      wad: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    push(
      usr: string,
      wad: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    rely(
      usr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transfer(
      dst: string,
      wad: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferFrom(
      from: string,
      to: string,
      wad: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    version(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    wards(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
