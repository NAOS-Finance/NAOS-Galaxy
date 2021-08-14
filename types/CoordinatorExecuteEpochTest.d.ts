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

interface CoordinatorExecuteEpochTestInterface extends ethers.utils.Interface {
  functions: {
    "IS_TEST()": FunctionFragment;
    "calcNewSeniorRatio(tuple,tuple)": FunctionFragment;
    "calcNextEpochIn()": FunctionFragment;
    "checkTrancheUpdates(tuple,tuple)": FunctionFragment;
    "failed()": FunctionFragment;
    "prepareExecute(tuple,tuple)": FunctionFragment;
    "rdiv(uint256,uint256)": FunctionFragment;
    "rmul(uint256,uint256)": FunctionFragment;
    "safeAdd(uint256,uint256)": FunctionFragment;
    "safeDiv(uint256,uint256)": FunctionFragment;
    "safeMul(uint256,uint256)": FunctionFragment;
    "safeSub(uint256,uint256)": FunctionFragment;
    "setUp()": FunctionFragment;
    "testCalcSeniorRatio()": FunctionFragment;
    "testCalcSeniorState()": FunctionFragment;
    "testExecuteEpoch()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "IS_TEST", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "calcNewSeniorRatio",
    values: [
      {
        maxReserve: BigNumberish;
        reserve: BigNumberish;
        maxSeniorRatio: BigNumberish;
        minSeniorRatio: BigNumberish;
        seniorDebt: BigNumberish;
        seniorBalance: BigNumberish;
        NAV: BigNumberish;
        seniorRedeemOrder: BigNumberish;
        seniorSupplyOrder: BigNumberish;
        juniorSupplyOrder: BigNumberish;
        juniorRedeemOrder: BigNumberish;
      },
      {
        seniorSupply: BigNumberish;
        juniorSupply: BigNumberish;
        seniorRedeem: BigNumberish;
        juniorRedeem: BigNumberish;
      }
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "calcNextEpochIn",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "checkTrancheUpdates",
    values: [
      {
        maxReserve: BigNumberish;
        reserve: BigNumberish;
        maxSeniorRatio: BigNumberish;
        minSeniorRatio: BigNumberish;
        seniorDebt: BigNumberish;
        seniorBalance: BigNumberish;
        NAV: BigNumberish;
        seniorRedeemOrder: BigNumberish;
        seniorSupplyOrder: BigNumberish;
        juniorSupplyOrder: BigNumberish;
        juniorRedeemOrder: BigNumberish;
      },
      {
        seniorSupply: BigNumberish;
        juniorSupply: BigNumberish;
        seniorRedeem: BigNumberish;
        juniorRedeem: BigNumberish;
      }
    ]
  ): string;
  encodeFunctionData(functionFragment: "failed", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "prepareExecute",
    values: [
      {
        maxReserve: BigNumberish;
        reserve: BigNumberish;
        maxSeniorRatio: BigNumberish;
        minSeniorRatio: BigNumberish;
        seniorDebt: BigNumberish;
        seniorBalance: BigNumberish;
        NAV: BigNumberish;
        seniorRedeemOrder: BigNumberish;
        seniorSupplyOrder: BigNumberish;
        juniorSupplyOrder: BigNumberish;
        juniorRedeemOrder: BigNumberish;
      },
      {
        seniorSupply: BigNumberish;
        juniorSupply: BigNumberish;
        seniorRedeem: BigNumberish;
        juniorRedeem: BigNumberish;
      }
    ]
  ): string;
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
    functionFragment: "testCalcSeniorRatio",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "testCalcSeniorState",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "testExecuteEpoch",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "IS_TEST", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "calcNewSeniorRatio",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calcNextEpochIn",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "checkTrancheUpdates",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "failed", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "prepareExecute",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "rdiv", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "rmul", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "safeAdd", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "safeDiv", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "safeMul", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "safeSub", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setUp", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "testCalcSeniorRatio",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "testCalcSeniorState",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "testExecuteEpoch",
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

export class CoordinatorExecuteEpochTest extends BaseContract {
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

  interface: CoordinatorExecuteEpochTestInterface;

  functions: {
    IS_TEST(overrides?: CallOverrides): Promise<[boolean]>;

    calcNewSeniorRatio(
      model: {
        maxReserve: BigNumberish;
        reserve: BigNumberish;
        maxSeniorRatio: BigNumberish;
        minSeniorRatio: BigNumberish;
        seniorDebt: BigNumberish;
        seniorBalance: BigNumberish;
        NAV: BigNumberish;
        seniorRedeemOrder: BigNumberish;
        seniorSupplyOrder: BigNumberish;
        juniorSupplyOrder: BigNumberish;
        juniorRedeemOrder: BigNumberish;
      },
      input: {
        seniorSupply: BigNumberish;
        juniorSupply: BigNumberish;
        seniorRedeem: BigNumberish;
        juniorRedeem: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    calcNextEpochIn(overrides?: CallOverrides): Promise<[BigNumber]>;

    checkTrancheUpdates(
      model_: {
        maxReserve: BigNumberish;
        reserve: BigNumberish;
        maxSeniorRatio: BigNumberish;
        minSeniorRatio: BigNumberish;
        seniorDebt: BigNumberish;
        seniorBalance: BigNumberish;
        NAV: BigNumberish;
        seniorRedeemOrder: BigNumberish;
        seniorSupplyOrder: BigNumberish;
        juniorSupplyOrder: BigNumberish;
        juniorRedeemOrder: BigNumberish;
      },
      input: {
        seniorSupply: BigNumberish;
        juniorSupply: BigNumberish;
        seniorRedeem: BigNumberish;
        juniorRedeem: BigNumberish;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    failed(overrides?: CallOverrides): Promise<[boolean]>;

    prepareExecute(
      model_: {
        maxReserve: BigNumberish;
        reserve: BigNumberish;
        maxSeniorRatio: BigNumberish;
        minSeniorRatio: BigNumberish;
        seniorDebt: BigNumberish;
        seniorBalance: BigNumberish;
        NAV: BigNumberish;
        seniorRedeemOrder: BigNumberish;
        seniorSupplyOrder: BigNumberish;
        juniorSupplyOrder: BigNumberish;
        juniorRedeemOrder: BigNumberish;
      },
      input: {
        seniorSupply: BigNumberish;
        juniorSupply: BigNumberish;
        seniorRedeem: BigNumberish;
        juniorRedeem: BigNumberish;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

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

    testCalcSeniorRatio(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    testCalcSeniorState(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    testExecuteEpoch(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  IS_TEST(overrides?: CallOverrides): Promise<boolean>;

  calcNewSeniorRatio(
    model: {
      maxReserve: BigNumberish;
      reserve: BigNumberish;
      maxSeniorRatio: BigNumberish;
      minSeniorRatio: BigNumberish;
      seniorDebt: BigNumberish;
      seniorBalance: BigNumberish;
      NAV: BigNumberish;
      seniorRedeemOrder: BigNumberish;
      seniorSupplyOrder: BigNumberish;
      juniorSupplyOrder: BigNumberish;
      juniorRedeemOrder: BigNumberish;
    },
    input: {
      seniorSupply: BigNumberish;
      juniorSupply: BigNumberish;
      seniorRedeem: BigNumberish;
      juniorRedeem: BigNumberish;
    },
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  calcNextEpochIn(overrides?: CallOverrides): Promise<BigNumber>;

  checkTrancheUpdates(
    model_: {
      maxReserve: BigNumberish;
      reserve: BigNumberish;
      maxSeniorRatio: BigNumberish;
      minSeniorRatio: BigNumberish;
      seniorDebt: BigNumberish;
      seniorBalance: BigNumberish;
      NAV: BigNumberish;
      seniorRedeemOrder: BigNumberish;
      seniorSupplyOrder: BigNumberish;
      juniorSupplyOrder: BigNumberish;
      juniorRedeemOrder: BigNumberish;
    },
    input: {
      seniorSupply: BigNumberish;
      juniorSupply: BigNumberish;
      seniorRedeem: BigNumberish;
      juniorRedeem: BigNumberish;
    },
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  failed(overrides?: CallOverrides): Promise<boolean>;

  prepareExecute(
    model_: {
      maxReserve: BigNumberish;
      reserve: BigNumberish;
      maxSeniorRatio: BigNumberish;
      minSeniorRatio: BigNumberish;
      seniorDebt: BigNumberish;
      seniorBalance: BigNumberish;
      NAV: BigNumberish;
      seniorRedeemOrder: BigNumberish;
      seniorSupplyOrder: BigNumberish;
      juniorSupplyOrder: BigNumberish;
      juniorRedeemOrder: BigNumberish;
    },
    input: {
      seniorSupply: BigNumberish;
      juniorSupply: BigNumberish;
      seniorRedeem: BigNumberish;
      juniorRedeem: BigNumberish;
    },
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

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

  testCalcSeniorRatio(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  testCalcSeniorState(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  testExecuteEpoch(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    IS_TEST(overrides?: CallOverrides): Promise<boolean>;

    calcNewSeniorRatio(
      model: {
        maxReserve: BigNumberish;
        reserve: BigNumberish;
        maxSeniorRatio: BigNumberish;
        minSeniorRatio: BigNumberish;
        seniorDebt: BigNumberish;
        seniorBalance: BigNumberish;
        NAV: BigNumberish;
        seniorRedeemOrder: BigNumberish;
        seniorSupplyOrder: BigNumberish;
        juniorSupplyOrder: BigNumberish;
        juniorRedeemOrder: BigNumberish;
      },
      input: {
        seniorSupply: BigNumberish;
        juniorSupply: BigNumberish;
        seniorRedeem: BigNumberish;
        juniorRedeem: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calcNextEpochIn(overrides?: CallOverrides): Promise<BigNumber>;

    checkTrancheUpdates(
      model_: {
        maxReserve: BigNumberish;
        reserve: BigNumberish;
        maxSeniorRatio: BigNumberish;
        minSeniorRatio: BigNumberish;
        seniorDebt: BigNumberish;
        seniorBalance: BigNumberish;
        NAV: BigNumberish;
        seniorRedeemOrder: BigNumberish;
        seniorSupplyOrder: BigNumberish;
        juniorSupplyOrder: BigNumberish;
        juniorRedeemOrder: BigNumberish;
      },
      input: {
        seniorSupply: BigNumberish;
        juniorSupply: BigNumberish;
        seniorRedeem: BigNumberish;
        juniorRedeem: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<void>;

    failed(overrides?: CallOverrides): Promise<boolean>;

    prepareExecute(
      model_: {
        maxReserve: BigNumberish;
        reserve: BigNumberish;
        maxSeniorRatio: BigNumberish;
        minSeniorRatio: BigNumberish;
        seniorDebt: BigNumberish;
        seniorBalance: BigNumberish;
        NAV: BigNumberish;
        seniorRedeemOrder: BigNumberish;
        seniorSupplyOrder: BigNumberish;
        juniorSupplyOrder: BigNumberish;
        juniorRedeemOrder: BigNumberish;
      },
      input: {
        seniorSupply: BigNumberish;
        juniorSupply: BigNumberish;
        seniorRedeem: BigNumberish;
        juniorRedeem: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<void>;

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

    testCalcSeniorRatio(overrides?: CallOverrides): Promise<void>;

    testCalcSeniorState(overrides?: CallOverrides): Promise<void>;

    testExecuteEpoch(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    eventListener(
      target?: null,
      exact?: null
    ): TypedEventFilter<[string, boolean], { target: string; exact: boolean }>;

    log_bytes32(undefined?: null): TypedEventFilter<[string], { arg0: string }>;

    log_named_address(
      key?: null,
      val?: null
    ): TypedEventFilter<[string, string], { key: string; val: string }>;

    log_named_bytes32(
      key?: null,
      val?: null
    ): TypedEventFilter<[string, string], { key: string; val: string }>;

    log_named_decimal_int(
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

    log_named_int(
      key?: null,
      val?: null
    ): TypedEventFilter<[string, BigNumber], { key: string; val: BigNumber }>;

    log_named_string(
      key?: null,
      val?: null
    ): TypedEventFilter<[string, string], { key: string; val: string }>;

    log_named_uint(
      key?: null,
      val?: null
    ): TypedEventFilter<[string, BigNumber], { key: string; val: BigNumber }>;

    logs(undefined?: null): TypedEventFilter<[string], { arg0: string }>;
  };

  estimateGas: {
    IS_TEST(overrides?: CallOverrides): Promise<BigNumber>;

    calcNewSeniorRatio(
      model: {
        maxReserve: BigNumberish;
        reserve: BigNumberish;
        maxSeniorRatio: BigNumberish;
        minSeniorRatio: BigNumberish;
        seniorDebt: BigNumberish;
        seniorBalance: BigNumberish;
        NAV: BigNumberish;
        seniorRedeemOrder: BigNumberish;
        seniorSupplyOrder: BigNumberish;
        juniorSupplyOrder: BigNumberish;
        juniorRedeemOrder: BigNumberish;
      },
      input: {
        seniorSupply: BigNumberish;
        juniorSupply: BigNumberish;
        seniorRedeem: BigNumberish;
        juniorRedeem: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calcNextEpochIn(overrides?: CallOverrides): Promise<BigNumber>;

    checkTrancheUpdates(
      model_: {
        maxReserve: BigNumberish;
        reserve: BigNumberish;
        maxSeniorRatio: BigNumberish;
        minSeniorRatio: BigNumberish;
        seniorDebt: BigNumberish;
        seniorBalance: BigNumberish;
        NAV: BigNumberish;
        seniorRedeemOrder: BigNumberish;
        seniorSupplyOrder: BigNumberish;
        juniorSupplyOrder: BigNumberish;
        juniorRedeemOrder: BigNumberish;
      },
      input: {
        seniorSupply: BigNumberish;
        juniorSupply: BigNumberish;
        seniorRedeem: BigNumberish;
        juniorRedeem: BigNumberish;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    failed(overrides?: CallOverrides): Promise<BigNumber>;

    prepareExecute(
      model_: {
        maxReserve: BigNumberish;
        reserve: BigNumberish;
        maxSeniorRatio: BigNumberish;
        minSeniorRatio: BigNumberish;
        seniorDebt: BigNumberish;
        seniorBalance: BigNumberish;
        NAV: BigNumberish;
        seniorRedeemOrder: BigNumberish;
        seniorSupplyOrder: BigNumberish;
        juniorSupplyOrder: BigNumberish;
        juniorRedeemOrder: BigNumberish;
      },
      input: {
        seniorSupply: BigNumberish;
        juniorSupply: BigNumberish;
        seniorRedeem: BigNumberish;
        juniorRedeem: BigNumberish;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

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

    testCalcSeniorRatio(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    testCalcSeniorState(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    testExecuteEpoch(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    IS_TEST(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    calcNewSeniorRatio(
      model: {
        maxReserve: BigNumberish;
        reserve: BigNumberish;
        maxSeniorRatio: BigNumberish;
        minSeniorRatio: BigNumberish;
        seniorDebt: BigNumberish;
        seniorBalance: BigNumberish;
        NAV: BigNumberish;
        seniorRedeemOrder: BigNumberish;
        seniorSupplyOrder: BigNumberish;
        juniorSupplyOrder: BigNumberish;
        juniorRedeemOrder: BigNumberish;
      },
      input: {
        seniorSupply: BigNumberish;
        juniorSupply: BigNumberish;
        seniorRedeem: BigNumberish;
        juniorRedeem: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    calcNextEpochIn(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    checkTrancheUpdates(
      model_: {
        maxReserve: BigNumberish;
        reserve: BigNumberish;
        maxSeniorRatio: BigNumberish;
        minSeniorRatio: BigNumberish;
        seniorDebt: BigNumberish;
        seniorBalance: BigNumberish;
        NAV: BigNumberish;
        seniorRedeemOrder: BigNumberish;
        seniorSupplyOrder: BigNumberish;
        juniorSupplyOrder: BigNumberish;
        juniorRedeemOrder: BigNumberish;
      },
      input: {
        seniorSupply: BigNumberish;
        juniorSupply: BigNumberish;
        seniorRedeem: BigNumberish;
        juniorRedeem: BigNumberish;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    failed(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    prepareExecute(
      model_: {
        maxReserve: BigNumberish;
        reserve: BigNumberish;
        maxSeniorRatio: BigNumberish;
        minSeniorRatio: BigNumberish;
        seniorDebt: BigNumberish;
        seniorBalance: BigNumberish;
        NAV: BigNumberish;
        seniorRedeemOrder: BigNumberish;
        seniorSupplyOrder: BigNumberish;
        juniorSupplyOrder: BigNumberish;
        juniorRedeemOrder: BigNumberish;
      },
      input: {
        seniorSupply: BigNumberish;
        juniorSupply: BigNumberish;
        seniorRedeem: BigNumberish;
        juniorRedeem: BigNumberish;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

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

    testCalcSeniorRatio(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    testCalcSeniorState(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    testExecuteEpoch(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
