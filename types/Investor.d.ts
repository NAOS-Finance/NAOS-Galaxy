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

interface InvestorInterface extends ethers.utils.Interface {
  functions: {
    "IS_TEST()": FunctionFragment;
    "disburse()": FunctionFragment;
    "failed()": FunctionFragment;
    "redeemOrder(uint256)": FunctionFragment;
    "supplyOrder(uint256)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "IS_TEST", values?: undefined): string;
  encodeFunctionData(functionFragment: "disburse", values?: undefined): string;
  encodeFunctionData(functionFragment: "failed", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "redeemOrder",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "supplyOrder",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "IS_TEST", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "disburse", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "failed", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "redeemOrder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supplyOrder",
    data: BytesLike
  ): Result;

  events: {
    "eventListener(address,bool)": EventFragment;
    "log_bytes32(bytes32)": EventFragment;
    "log_named_address(bytes32,address)": EventFragment;
    "log_named_bytes32(bytes32,bytes32)": EventFragment;
    "log_named_decimal_int(bytes32,int256,uint256)": EventFragment;
    "log_named_decimal_uint(bytes32,uint256,uint256)": EventFragment;
    "log_named_int(bytes32,int256)": EventFragment;
    "log_named_string(bytes32,string)": EventFragment;
    "log_named_uint(bytes32,uint256)": EventFragment;
    "logs(bytes)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "eventListener"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "log_bytes32"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "log_named_address"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "log_named_bytes32"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "log_named_decimal_int"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "log_named_decimal_uint"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "log_named_int"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "log_named_string"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "log_named_uint"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "logs"): EventFragment;
}

export type eventListenerEvent = TypedEvent<
  [string, boolean] & { target: string; exact: boolean }
>;

export type log_bytes32Event = TypedEvent<[string] & { arg0: string }>;

export type log_named_addressEvent = TypedEvent<
  [string, string] & { key: string; val: string }
>;

export type log_named_bytes32Event = TypedEvent<
  [string, string] & { key: string; val: string }
>;

export type log_named_decimal_intEvent = TypedEvent<
  [string, BigNumber, BigNumber] & {
    key: string;
    val: BigNumber;
    decimals: BigNumber;
  }
>;

export type log_named_decimal_uintEvent = TypedEvent<
  [string, BigNumber, BigNumber] & {
    key: string;
    val: BigNumber;
    decimals: BigNumber;
  }
>;

export type log_named_intEvent = TypedEvent<
  [string, BigNumber] & { key: string; val: BigNumber }
>;

export type log_named_stringEvent = TypedEvent<
  [string, string] & { key: string; val: string }
>;

export type log_named_uintEvent = TypedEvent<
  [string, BigNumber] & { key: string; val: BigNumber }
>;

export type logsEvent = TypedEvent<[string] & { arg0: string }>;

export class Investor extends BaseContract {
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

  interface: InvestorInterface;

  functions: {
    IS_TEST(overrides?: CallOverrides): Promise<[boolean]>;

    disburse(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    failed(overrides?: CallOverrides): Promise<[boolean]>;

    redeemOrder(
      tokenAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supplyOrder(
      currencyAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  IS_TEST(overrides?: CallOverrides): Promise<boolean>;

  disburse(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  failed(overrides?: CallOverrides): Promise<boolean>;

  redeemOrder(
    tokenAmount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supplyOrder(
    currencyAmount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    IS_TEST(overrides?: CallOverrides): Promise<boolean>;

    disburse(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        payoutCurrencyAmount: BigNumber;
        payoutTokenAmount: BigNumber;
        remainingSupplyCurrency: BigNumber;
        remainingRedeemToken: BigNumber;
      }
    >;

    failed(overrides?: CallOverrides): Promise<boolean>;

    redeemOrder(
      tokenAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    supplyOrder(
      currencyAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "eventListener(address,bool)"(
      target?: null,
      exact?: null
    ): TypedEventFilter<[string, boolean], { target: string; exact: boolean }>;

    eventListener(
      target?: null,
      exact?: null
    ): TypedEventFilter<[string, boolean], { target: string; exact: boolean }>;

    "log_bytes32(bytes32)"(
      undefined?: null
    ): TypedEventFilter<[string], { arg0: string }>;

    log_bytes32(undefined?: null): TypedEventFilter<[string], { arg0: string }>;

    "log_named_address(bytes32,address)"(
      key?: null,
      val?: null
    ): TypedEventFilter<[string, string], { key: string; val: string }>;

    log_named_address(
      key?: null,
      val?: null
    ): TypedEventFilter<[string, string], { key: string; val: string }>;

    "log_named_bytes32(bytes32,bytes32)"(
      key?: null,
      val?: null
    ): TypedEventFilter<[string, string], { key: string; val: string }>;

    log_named_bytes32(
      key?: null,
      val?: null
    ): TypedEventFilter<[string, string], { key: string; val: string }>;

    "log_named_decimal_int(bytes32,int256,uint256)"(
      key?: null,
      val?: null,
      decimals?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { key: string; val: BigNumber; decimals: BigNumber }
    >;

    log_named_decimal_int(
      key?: null,
      val?: null,
      decimals?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { key: string; val: BigNumber; decimals: BigNumber }
    >;

    "log_named_decimal_uint(bytes32,uint256,uint256)"(
      key?: null,
      val?: null,
      decimals?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { key: string; val: BigNumber; decimals: BigNumber }
    >;

    log_named_decimal_uint(
      key?: null,
      val?: null,
      decimals?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { key: string; val: BigNumber; decimals: BigNumber }
    >;

    "log_named_int(bytes32,int256)"(
      key?: null,
      val?: null
    ): TypedEventFilter<[string, BigNumber], { key: string; val: BigNumber }>;

    log_named_int(
      key?: null,
      val?: null
    ): TypedEventFilter<[string, BigNumber], { key: string; val: BigNumber }>;

    "log_named_string(bytes32,string)"(
      key?: null,
      val?: null
    ): TypedEventFilter<[string, string], { key: string; val: string }>;

    log_named_string(
      key?: null,
      val?: null
    ): TypedEventFilter<[string, string], { key: string; val: string }>;

    "log_named_uint(bytes32,uint256)"(
      key?: null,
      val?: null
    ): TypedEventFilter<[string, BigNumber], { key: string; val: BigNumber }>;

    log_named_uint(
      key?: null,
      val?: null
    ): TypedEventFilter<[string, BigNumber], { key: string; val: BigNumber }>;

    "logs(bytes)"(
      undefined?: null
    ): TypedEventFilter<[string], { arg0: string }>;

    logs(undefined?: null): TypedEventFilter<[string], { arg0: string }>;
  };

  estimateGas: {
    IS_TEST(overrides?: CallOverrides): Promise<BigNumber>;

    disburse(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    failed(overrides?: CallOverrides): Promise<BigNumber>;

    redeemOrder(
      tokenAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supplyOrder(
      currencyAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    IS_TEST(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    disburse(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    failed(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    redeemOrder(
      tokenAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supplyOrder(
      currencyAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
