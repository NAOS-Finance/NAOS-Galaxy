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

interface NFTFeedTestInterface extends ethers.utils.Interface {
  functions: {
    "IS_TEST()": FunctionFragment;
    "assertLoanValuesSetCorrectly(bytes32,uint256,uint256,uint256,bool)": FunctionFragment;
    "failed()": FunctionFragment;
    "init()": FunctionFragment;
    "nftFeed()": FunctionFragment;
    "rdiv(uint256,uint256)": FunctionFragment;
    "rmul(uint256,uint256)": FunctionFragment;
    "safeAdd(uint256,uint256)": FunctionFragment;
    "safeDiv(uint256,uint256)": FunctionFragment;
    "safeMul(uint256,uint256)": FunctionFragment;
    "safeSub(uint256,uint256)": FunctionFragment;
    "setUp()": FunctionFragment;
    "testBasicNFT()": FunctionFragment;
    "testBorrowEvent()": FunctionFragment;
    "testCeiling()": FunctionFragment;
    "testFailBorrowTooHigh()": FunctionFragment;
    "testFailUpdateRiskGroupDoesNotExist()": FunctionFragment;
    "testUpdateNFTCeilingExceedsBorrowedAmount()": FunctionFragment;
    "testUpdateNFTValueLoanHasNoDebt()": FunctionFragment;
    "testUpdateRiskGroupAndValueLoanHasDebt()": FunctionFragment;
    "testUpdateRiskGroupLoanHasNoDebt()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "IS_TEST", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "assertLoanValuesSetCorrectly",
    values: [BytesLike, BigNumberish, BigNumberish, BigNumberish, boolean]
  ): string;
  encodeFunctionData(functionFragment: "failed", values?: undefined): string;
  encodeFunctionData(functionFragment: "init", values?: undefined): string;
  encodeFunctionData(functionFragment: "nftFeed", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "rdiv",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "rmul",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "safeAdd",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "safeDiv",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "safeMul",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "safeSub",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "setUp", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "testBasicNFT",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "testBorrowEvent",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "testCeiling",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "testFailBorrowTooHigh",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "testFailUpdateRiskGroupDoesNotExist",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "testUpdateNFTCeilingExceedsBorrowedAmount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "testUpdateNFTValueLoanHasNoDebt",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "testUpdateRiskGroupAndValueLoanHasDebt",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "testUpdateRiskGroupLoanHasNoDebt",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "IS_TEST", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "assertLoanValuesSetCorrectly",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "failed", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "init", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nftFeed", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "rdiv", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "rmul", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "safeAdd", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "safeDiv", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "safeMul", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "safeSub", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setUp", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "testBasicNFT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "testBorrowEvent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "testCeiling",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "testFailBorrowTooHigh",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "testFailUpdateRiskGroupDoesNotExist",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "testUpdateNFTCeilingExceedsBorrowedAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "testUpdateNFTValueLoanHasNoDebt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "testUpdateRiskGroupAndValueLoanHasDebt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "testUpdateRiskGroupLoanHasNoDebt",
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

export class NFTFeedTest extends BaseContract {
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

  interface: NFTFeedTestInterface;

  functions: {
    IS_TEST(overrides?: CallOverrides): Promise<[boolean]>;

    assertLoanValuesSetCorrectly(
      nftID: BytesLike,
      nftValue: BigNumberish,
      loan: BigNumberish,
      riskGroup: BigNumberish,
      loanHasDebt: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    failed(overrides?: CallOverrides): Promise<[boolean]>;

    init(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    nftFeed(overrides?: CallOverrides): Promise<[string]>;

    rdiv(
      x: BigNumberish,
      y: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { z: BigNumber }>;

    rmul(
      x: BigNumberish,
      y: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { z: BigNumber }>;

    safeAdd(
      x: BigNumberish,
      y: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { z: BigNumber }>;

    safeDiv(
      x: BigNumberish,
      y: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { z: BigNumber }>;

    safeMul(
      x: BigNumberish,
      y: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { z: BigNumber }>;

    safeSub(
      x: BigNumberish,
      y: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { z: BigNumber }>;

    setUp(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    testBasicNFT(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    testBorrowEvent(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    testCeiling(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    testFailBorrowTooHigh(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    testFailUpdateRiskGroupDoesNotExist(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    testUpdateNFTCeilingExceedsBorrowedAmount(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    testUpdateNFTValueLoanHasNoDebt(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    testUpdateRiskGroupAndValueLoanHasDebt(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    testUpdateRiskGroupLoanHasNoDebt(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  IS_TEST(overrides?: CallOverrides): Promise<boolean>;

  assertLoanValuesSetCorrectly(
    nftID: BytesLike,
    nftValue: BigNumberish,
    loan: BigNumberish,
    riskGroup: BigNumberish,
    loanHasDebt: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  failed(overrides?: CallOverrides): Promise<boolean>;

  init(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  nftFeed(overrides?: CallOverrides): Promise<string>;

  rdiv(
    x: BigNumberish,
    y: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  rmul(
    x: BigNumberish,
    y: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  safeAdd(
    x: BigNumberish,
    y: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  safeDiv(
    x: BigNumberish,
    y: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  safeMul(
    x: BigNumberish,
    y: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  safeSub(
    x: BigNumberish,
    y: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  setUp(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  testBasicNFT(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  testBorrowEvent(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  testCeiling(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  testFailBorrowTooHigh(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  testFailUpdateRiskGroupDoesNotExist(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  testUpdateNFTCeilingExceedsBorrowedAmount(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  testUpdateNFTValueLoanHasNoDebt(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  testUpdateRiskGroupAndValueLoanHasDebt(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  testUpdateRiskGroupLoanHasNoDebt(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    IS_TEST(overrides?: CallOverrides): Promise<boolean>;

    assertLoanValuesSetCorrectly(
      nftID: BytesLike,
      nftValue: BigNumberish,
      loan: BigNumberish,
      riskGroup: BigNumberish,
      loanHasDebt: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    failed(overrides?: CallOverrides): Promise<boolean>;

    init(overrides?: CallOverrides): Promise<void>;

    nftFeed(overrides?: CallOverrides): Promise<string>;

    rdiv(
      x: BigNumberish,
      y: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    rmul(
      x: BigNumberish,
      y: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    safeAdd(
      x: BigNumberish,
      y: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    safeDiv(
      x: BigNumberish,
      y: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    safeMul(
      x: BigNumberish,
      y: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    safeSub(
      x: BigNumberish,
      y: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setUp(overrides?: CallOverrides): Promise<void>;

    testBasicNFT(overrides?: CallOverrides): Promise<void>;

    testBorrowEvent(overrides?: CallOverrides): Promise<void>;

    testCeiling(overrides?: CallOverrides): Promise<void>;

    testFailBorrowTooHigh(overrides?: CallOverrides): Promise<void>;

    testFailUpdateRiskGroupDoesNotExist(
      overrides?: CallOverrides
    ): Promise<void>;

    testUpdateNFTCeilingExceedsBorrowedAmount(
      overrides?: CallOverrides
    ): Promise<void>;

    testUpdateNFTValueLoanHasNoDebt(overrides?: CallOverrides): Promise<void>;

    testUpdateRiskGroupAndValueLoanHasDebt(
      overrides?: CallOverrides
    ): Promise<void>;

    testUpdateRiskGroupLoanHasNoDebt(overrides?: CallOverrides): Promise<void>;
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

    assertLoanValuesSetCorrectly(
      nftID: BytesLike,
      nftValue: BigNumberish,
      loan: BigNumberish,
      riskGroup: BigNumberish,
      loanHasDebt: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    failed(overrides?: CallOverrides): Promise<BigNumber>;

    init(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    nftFeed(overrides?: CallOverrides): Promise<BigNumber>;

    rdiv(
      x: BigNumberish,
      y: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    rmul(
      x: BigNumberish,
      y: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    safeAdd(
      x: BigNumberish,
      y: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    safeDiv(
      x: BigNumberish,
      y: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    safeMul(
      x: BigNumberish,
      y: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    safeSub(
      x: BigNumberish,
      y: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setUp(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    testBasicNFT(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    testBorrowEvent(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    testCeiling(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    testFailBorrowTooHigh(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    testFailUpdateRiskGroupDoesNotExist(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    testUpdateNFTCeilingExceedsBorrowedAmount(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    testUpdateNFTValueLoanHasNoDebt(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    testUpdateRiskGroupAndValueLoanHasDebt(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    testUpdateRiskGroupLoanHasNoDebt(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    IS_TEST(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    assertLoanValuesSetCorrectly(
      nftID: BytesLike,
      nftValue: BigNumberish,
      loan: BigNumberish,
      riskGroup: BigNumberish,
      loanHasDebt: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    failed(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    init(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    nftFeed(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    rdiv(
      x: BigNumberish,
      y: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    rmul(
      x: BigNumberish,
      y: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    safeAdd(
      x: BigNumberish,
      y: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    safeDiv(
      x: BigNumberish,
      y: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    safeMul(
      x: BigNumberish,
      y: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    safeSub(
      x: BigNumberish,
      y: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setUp(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    testBasicNFT(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    testBorrowEvent(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    testCeiling(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    testFailBorrowTooHigh(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    testFailUpdateRiskGroupDoesNotExist(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    testUpdateNFTCeilingExceedsBorrowedAmount(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    testUpdateNFTValueLoanHasNoDebt(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    testUpdateRiskGroupAndValueLoanHasDebt(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    testUpdateRiskGroupLoanHasNoDebt(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
