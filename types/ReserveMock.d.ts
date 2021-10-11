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
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface ReserveMockInterface extends ethers.utils.Interface {
  functions: {
    "balance()": FunctionFragment;
    "calls(bytes32)": FunctionFragment;
    "currency()": FunctionFragment;
    "deny(address)": FunctionFragment;
    "deposit(uint256)": FunctionFragment;
    "file(bytes32,uint256)": FunctionFragment;
    "payout(uint256)": FunctionFragment;
    "rely(address)": FunctionFragment;
    "setFail(bytes32,bool)": FunctionFragment;
    "setReturn(bytes32,bool)": FunctionFragment;
    "totalBalance()": FunctionFragment;
    "values_address(bytes32)": FunctionFragment;
    "values_address_return(bytes32)": FunctionFragment;
    "values_bool_return(bytes32)": FunctionFragment;
    "values_bytes32(bytes32)": FunctionFragment;
    "values_return(bytes32)": FunctionFragment;
    "values_uint(bytes32)": FunctionFragment;
    "wards(address)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "balance", values?: undefined): string;
  encodeFunctionData(functionFragment: "calls", values: [BytesLike]): string;
  encodeFunctionData(functionFragment: "currency", values?: undefined): string;
  encodeFunctionData(functionFragment: "deny", values: [string]): string;
  encodeFunctionData(
    functionFragment: "deposit",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "file",
    values: [BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "payout",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "rely", values: [string]): string;
  encodeFunctionData(
    functionFragment: "setFail",
    values: [BytesLike, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "setReturn",
    values: [BytesLike, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "totalBalance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "values_address",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "values_address_return",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "values_bool_return",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "values_bytes32",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "values_return",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "values_uint",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "wards", values: [string]): string;

  decodeFunctionResult(functionFragment: "balance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "calls", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "currency", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deny", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "file", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "payout", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "rely", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setFail", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setReturn", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "values_address",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "values_address_return",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "values_bool_return",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "values_bytes32",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "values_return",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "values_uint",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "wards", data: BytesLike): Result;

  events: {
    "LogNote(bytes4,address,bytes32,bytes32,uint256,bytes)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "LogNote"): EventFragment;
}

export type LogNoteEvent = TypedEvent<
  [string, string, string, string, BigNumber, string] & {
    sig: string;
    guy: string;
    foo: string;
    bar: string;
    wad: BigNumber;
    fax: string;
  }
>;

export class ReserveMock extends BaseContract {
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

  interface: ReserveMockInterface;

  functions: {
    balance(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    calls(arg0: BytesLike, overrides?: CallOverrides): Promise<[BigNumber]>;

    currency(overrides?: CallOverrides): Promise<[string]>;

    deny(
      usr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    deposit(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    file(
      arg0: BytesLike,
      currencyAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    payout(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    rely(
      usr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setFail(
      name: BytesLike,
      flag: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "setReturn(bytes32,bool)"(
      name: BytesLike,
      returnValue: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "setReturn(bytes32,bool,uint256)"(
      name: BytesLike,
      flag: boolean,
      value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "setReturn(bytes32,address)"(
      name: BytesLike,
      returnValue: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "setReturn(bytes32,uint256)"(
      name: BytesLike,
      returnValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "setReturn(bytes32,address,uint256)"(
      name: BytesLike,
      addr: string,
      value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    totalBalance(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    values_address(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;

    values_address_return(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;

    values_bool_return(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    values_bytes32(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;

    values_return(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    values_uint(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    wards(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  balance(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  calls(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

  currency(overrides?: CallOverrides): Promise<string>;

  deny(
    usr: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  deposit(
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  file(
    arg0: BytesLike,
    currencyAmount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  payout(
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  rely(
    usr: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setFail(
    name: BytesLike,
    flag: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "setReturn(bytes32,bool)"(
    name: BytesLike,
    returnValue: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "setReturn(bytes32,bool,uint256)"(
    name: BytesLike,
    flag: boolean,
    value: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "setReturn(bytes32,address)"(
    name: BytesLike,
    returnValue: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "setReturn(bytes32,uint256)"(
    name: BytesLike,
    returnValue: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "setReturn(bytes32,address,uint256)"(
    name: BytesLike,
    addr: string,
    value: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  totalBalance(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  values_address(arg0: BytesLike, overrides?: CallOverrides): Promise<string>;

  values_address_return(
    arg0: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  values_bool_return(
    arg0: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  values_bytes32(arg0: BytesLike, overrides?: CallOverrides): Promise<string>;

  values_return(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

  values_uint(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

  wards(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    balance(overrides?: CallOverrides): Promise<BigNumber>;

    calls(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    currency(overrides?: CallOverrides): Promise<string>;

    deny(usr: string, overrides?: CallOverrides): Promise<void>;

    deposit(amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    file(
      arg0: BytesLike,
      currencyAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    payout(amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    rely(usr: string, overrides?: CallOverrides): Promise<void>;

    setFail(
      name: BytesLike,
      flag: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    "setReturn(bytes32,bool)"(
      name: BytesLike,
      returnValue: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    "setReturn(bytes32,bool,uint256)"(
      name: BytesLike,
      flag: boolean,
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "setReturn(bytes32,address)"(
      name: BytesLike,
      returnValue: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "setReturn(bytes32,uint256)"(
      name: BytesLike,
      returnValue: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "setReturn(bytes32,address,uint256)"(
      name: BytesLike,
      addr: string,
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    totalBalance(overrides?: CallOverrides): Promise<BigNumber>;

    values_address(arg0: BytesLike, overrides?: CallOverrides): Promise<string>;

    values_address_return(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    values_bool_return(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    values_bytes32(arg0: BytesLike, overrides?: CallOverrides): Promise<string>;

    values_return(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    values_uint(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    wards(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    "LogNote(bytes4,address,bytes32,bytes32,uint256,bytes)"(
      sig?: BytesLike | null,
      guy?: string | null,
      foo?: BytesLike | null,
      bar?: BytesLike | null,
      wad?: null,
      fax?: null
    ): TypedEventFilter<
      [string, string, string, string, BigNumber, string],
      {
        sig: string;
        guy: string;
        foo: string;
        bar: string;
        wad: BigNumber;
        fax: string;
      }
    >;

    LogNote(
      sig?: BytesLike | null,
      guy?: string | null,
      foo?: BytesLike | null,
      bar?: BytesLike | null,
      wad?: null,
      fax?: null
    ): TypedEventFilter<
      [string, string, string, string, BigNumber, string],
      {
        sig: string;
        guy: string;
        foo: string;
        bar: string;
        wad: BigNumber;
        fax: string;
      }
    >;
  };

  estimateGas: {
    balance(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    calls(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    currency(overrides?: CallOverrides): Promise<BigNumber>;

    deny(
      usr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    deposit(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    file(
      arg0: BytesLike,
      currencyAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    payout(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    rely(
      usr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setFail(
      name: BytesLike,
      flag: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "setReturn(bytes32,bool)"(
      name: BytesLike,
      returnValue: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "setReturn(bytes32,bool,uint256)"(
      name: BytesLike,
      flag: boolean,
      value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "setReturn(bytes32,address)"(
      name: BytesLike,
      returnValue: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "setReturn(bytes32,uint256)"(
      name: BytesLike,
      returnValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "setReturn(bytes32,address,uint256)"(
      name: BytesLike,
      addr: string,
      value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    totalBalance(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    values_address(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    values_address_return(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    values_bool_return(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    values_bytes32(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    values_return(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    values_uint(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    wards(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    balance(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    calls(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    currency(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    deny(
      usr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    deposit(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    file(
      arg0: BytesLike,
      currencyAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    payout(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    rely(
      usr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setFail(
      name: BytesLike,
      flag: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "setReturn(bytes32,bool)"(
      name: BytesLike,
      returnValue: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "setReturn(bytes32,bool,uint256)"(
      name: BytesLike,
      flag: boolean,
      value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "setReturn(bytes32,address)"(
      name: BytesLike,
      returnValue: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "setReturn(bytes32,uint256)"(
      name: BytesLike,
      returnValue: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "setReturn(bytes32,address,uint256)"(
      name: BytesLike,
      addr: string,
      value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    totalBalance(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    values_address(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    values_address_return(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    values_bool_return(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    values_bytes32(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    values_return(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    values_uint(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    wards(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
