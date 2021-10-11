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

interface ShelfTestInterface extends ethers.utils.Interface {
  functions: {
    "IS_TEST()": FunctionFragment;
    "failed()": FunctionFragment;
    "setUp()": FunctionFragment;
    "testBorrow()": FunctionFragment;
    "testEventSubscribe()": FunctionFragment;
    "testFailBorrowCeilingReached()": FunctionFragment;
    "testFailBorrowNFTNotLocked()": FunctionFragment;
    "testFailDepositNotNFTOwner()": FunctionFragment;
    "testFailLockNoWhiteList()": FunctionFragment;
    "testFailMultiple_Issue()": FunctionFragment;
    "testFailRepayNFTNoWithdraw()": FunctionFragment;
    "testFailRepayNFTNotLocked()": FunctionFragment;
    "testFailUnlock()": FunctionFragment;
    "testFailWithdrawNFTNotLocked()": FunctionFragment;
    "testFailWithdrawNoBalance()": FunctionFragment;
    "testIssue()": FunctionFragment;
    "testLock()": FunctionFragment;
    "testMultiple_Issue()": FunctionFragment;
    "testRecover()": FunctionFragment;
    "testRepay()": FunctionFragment;
    "testSetupPrecondition()": FunctionFragment;
    "testUnlock()": FunctionFragment;
    "testWithdraw()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "IS_TEST", values?: undefined): string;
  encodeFunctionData(functionFragment: "failed", values?: undefined): string;
  encodeFunctionData(functionFragment: "setUp", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "testBorrow",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "testEventSubscribe",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "testFailBorrowCeilingReached",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "testFailBorrowNFTNotLocked",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "testFailDepositNotNFTOwner",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "testFailLockNoWhiteList",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "testFailMultiple_Issue",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "testFailRepayNFTNoWithdraw",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "testFailRepayNFTNotLocked",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "testFailUnlock",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "testFailWithdrawNFTNotLocked",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "testFailWithdrawNoBalance",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "testIssue", values?: undefined): string;
  encodeFunctionData(functionFragment: "testLock", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "testMultiple_Issue",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "testRecover",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "testRepay", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "testSetupPrecondition",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "testUnlock",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "testWithdraw",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "IS_TEST", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "failed", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setUp", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "testBorrow", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "testEventSubscribe",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "testFailBorrowCeilingReached",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "testFailBorrowNFTNotLocked",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "testFailDepositNotNFTOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "testFailLockNoWhiteList",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "testFailMultiple_Issue",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "testFailRepayNFTNoWithdraw",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "testFailRepayNFTNotLocked",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "testFailUnlock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "testFailWithdrawNFTNotLocked",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "testFailWithdrawNoBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "testIssue", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "testLock", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "testMultiple_Issue",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "testRecover",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "testRepay", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "testSetupPrecondition",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "testUnlock", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "testWithdraw",
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

export class ShelfTest extends BaseContract {
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

  interface: ShelfTestInterface;

  functions: {
    IS_TEST(overrides?: CallOverrides): Promise<[boolean]>;

    failed(overrides?: CallOverrides): Promise<[boolean]>;

    setUp(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    testBorrow(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    testEventSubscribe(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    testFailBorrowCeilingReached(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    testFailBorrowNFTNotLocked(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    testFailDepositNotNFTOwner(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    testFailLockNoWhiteList(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    testFailMultiple_Issue(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    testFailRepayNFTNoWithdraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    testFailRepayNFTNotLocked(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    testFailUnlock(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    testFailWithdrawNFTNotLocked(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    testFailWithdrawNoBalance(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    testIssue(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    testLock(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    testMultiple_Issue(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    testRecover(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    testRepay(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    testSetupPrecondition(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    testUnlock(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    testWithdraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  IS_TEST(overrides?: CallOverrides): Promise<boolean>;

  failed(overrides?: CallOverrides): Promise<boolean>;

  setUp(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  testBorrow(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  testEventSubscribe(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  testFailBorrowCeilingReached(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  testFailBorrowNFTNotLocked(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  testFailDepositNotNFTOwner(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  testFailLockNoWhiteList(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  testFailMultiple_Issue(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  testFailRepayNFTNoWithdraw(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  testFailRepayNFTNotLocked(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  testFailUnlock(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  testFailWithdrawNFTNotLocked(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  testFailWithdrawNoBalance(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  testIssue(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  testLock(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  testMultiple_Issue(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  testRecover(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  testRepay(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  testSetupPrecondition(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  testUnlock(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  testWithdraw(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    IS_TEST(overrides?: CallOverrides): Promise<boolean>;

    failed(overrides?: CallOverrides): Promise<boolean>;

    setUp(overrides?: CallOverrides): Promise<void>;

    testBorrow(overrides?: CallOverrides): Promise<void>;

    testEventSubscribe(overrides?: CallOverrides): Promise<void>;

    testFailBorrowCeilingReached(overrides?: CallOverrides): Promise<void>;

    testFailBorrowNFTNotLocked(overrides?: CallOverrides): Promise<void>;

    testFailDepositNotNFTOwner(overrides?: CallOverrides): Promise<void>;

    testFailLockNoWhiteList(overrides?: CallOverrides): Promise<void>;

    testFailMultiple_Issue(overrides?: CallOverrides): Promise<void>;

    testFailRepayNFTNoWithdraw(overrides?: CallOverrides): Promise<void>;

    testFailRepayNFTNotLocked(overrides?: CallOverrides): Promise<void>;

    testFailUnlock(overrides?: CallOverrides): Promise<void>;

    testFailWithdrawNFTNotLocked(overrides?: CallOverrides): Promise<void>;

    testFailWithdrawNoBalance(overrides?: CallOverrides): Promise<void>;

    testIssue(overrides?: CallOverrides): Promise<void>;

    testLock(overrides?: CallOverrides): Promise<void>;

    testMultiple_Issue(overrides?: CallOverrides): Promise<void>;

    testRecover(overrides?: CallOverrides): Promise<void>;

    testRepay(overrides?: CallOverrides): Promise<void>;

    testSetupPrecondition(overrides?: CallOverrides): Promise<void>;

    testUnlock(overrides?: CallOverrides): Promise<void>;

    testWithdraw(overrides?: CallOverrides): Promise<void>;
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

    failed(overrides?: CallOverrides): Promise<BigNumber>;

    setUp(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    testBorrow(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    testEventSubscribe(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    testFailBorrowCeilingReached(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    testFailBorrowNFTNotLocked(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    testFailDepositNotNFTOwner(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    testFailLockNoWhiteList(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    testFailMultiple_Issue(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    testFailRepayNFTNoWithdraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    testFailRepayNFTNotLocked(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    testFailUnlock(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    testFailWithdrawNFTNotLocked(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    testFailWithdrawNoBalance(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    testIssue(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    testLock(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    testMultiple_Issue(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    testRecover(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    testRepay(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    testSetupPrecondition(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    testUnlock(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    testWithdraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    IS_TEST(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    failed(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setUp(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    testBorrow(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    testEventSubscribe(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    testFailBorrowCeilingReached(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    testFailBorrowNFTNotLocked(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    testFailDepositNotNFTOwner(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    testFailLockNoWhiteList(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    testFailMultiple_Issue(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    testFailRepayNFTNoWithdraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    testFailRepayNFTNotLocked(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    testFailUnlock(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    testFailWithdrawNFTNotLocked(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    testFailWithdrawNoBalance(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    testIssue(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    testLock(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    testMultiple_Issue(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    testRecover(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    testRepay(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    testSetupPrecondition(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    testUnlock(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    testWithdraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
