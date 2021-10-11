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

interface AssessorMockInterface extends ethers.utils.Interface {
  functions: {
    "accrueTrancheInterest(address)": FunctionFragment;
    "borrowUpdate(uint256)": FunctionFragment;
    "calcAndUpdateTokenPrice(address)": FunctionFragment;
    "calcAssetValue(address)": FunctionFragment;
    "calcJuniorTokenPrice(uint256,uint256)": FunctionFragment;
    "calcMaxSeniorAssetValue()": FunctionFragment;
    "calcMinJuniorAssetValue()": FunctionFragment;
    "calcSeniorTokenPrice(uint256,uint256)": FunctionFragment;
    "calcTokenPrice(address)": FunctionFragment;
    "calcUpdateNAV()": FunctionFragment;
    "calls(bytes32)": FunctionFragment;
    "changeSeniorAsset(uint256,uint256,uint256)": FunctionFragment;
    "maxReserve()": FunctionFragment;
    "redeemApprove(address,uint256)": FunctionFragment;
    "repaymentUpdate(uint256)": FunctionFragment;
    "seniorBalance()": FunctionFragment;
    "seniorDebt()": FunctionFragment;
    "seniorRatioBounds()": FunctionFragment;
    "setFail(bytes32,bool)": FunctionFragment;
    "setReturn(bytes32,bool)": FunctionFragment;
    "setTokenPrice(address,uint256)": FunctionFragment;
    "supplyApprove(address,uint256)": FunctionFragment;
    "tokenPrice(address)": FunctionFragment;
    "values_address(bytes32)": FunctionFragment;
    "values_address_return(bytes32)": FunctionFragment;
    "values_bool_return(bytes32)": FunctionFragment;
    "values_bytes32(bytes32)": FunctionFragment;
    "values_return(bytes32)": FunctionFragment;
    "values_uint(bytes32)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "accrueTrancheInterest",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "borrowUpdate",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "calcAndUpdateTokenPrice",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "calcAssetValue",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "calcJuniorTokenPrice",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "calcMaxSeniorAssetValue",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "calcMinJuniorAssetValue",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "calcSeniorTokenPrice",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "calcTokenPrice",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "calcUpdateNAV",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "calls", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "changeSeniorAsset",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "maxReserve",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "redeemApprove",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "repaymentUpdate",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "seniorBalance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "seniorDebt",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "seniorRatioBounds",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setFail",
    values: [BytesLike, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "setReturn",
    values: [BytesLike, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "setTokenPrice",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "supplyApprove",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "tokenPrice", values: [string]): string;
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

  decodeFunctionResult(
    functionFragment: "accrueTrancheInterest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "borrowUpdate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calcAndUpdateTokenPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calcAssetValue",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calcJuniorTokenPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calcMaxSeniorAssetValue",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calcMinJuniorAssetValue",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calcSeniorTokenPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calcTokenPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calcUpdateNAV",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "calls", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "changeSeniorAsset",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "maxReserve", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "redeemApprove",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "repaymentUpdate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "seniorBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "seniorDebt", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "seniorRatioBounds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setFail", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setReturn", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setTokenPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supplyApprove",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "tokenPrice", data: BytesLike): Result;
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

  events: {};
}

export class AssessorMock extends BaseContract {
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

  interface: AssessorMockInterface;

  functions: {
    accrueTrancheInterest(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    borrowUpdate(
      currencyAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    calcAndUpdateTokenPrice(
      tranche: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    calcAssetValue(
      tranche: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    calcJuniorTokenPrice(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    calcMaxSeniorAssetValue(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    calcMinJuniorAssetValue(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    calcSeniorTokenPrice(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    calcTokenPrice(
      tranche: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    calcUpdateNAV(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    calls(arg0: BytesLike, overrides?: CallOverrides): Promise<[BigNumber]>;

    changeSeniorAsset(
      seniorRatio_: BigNumberish,
      seniorSupply: BigNumberish,
      seniorRedeem: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    maxReserve(overrides?: CallOverrides): Promise<[BigNumber]>;

    redeemApprove(
      tranche: string,
      currencyAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    repaymentUpdate(
      currencyAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    seniorBalance(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    seniorDebt(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    seniorRatioBounds(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        minSeniorRatio_: BigNumber;
        maxSeniorRatio_: BigNumber;
      }
    >;

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

    setTokenPrice(
      tranche: string,
      tokenPrice_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supplyApprove(
      tranche: string,
      currencyAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    tokenPrice(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

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
  };

  accrueTrancheInterest(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  borrowUpdate(
    currencyAmount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  calcAndUpdateTokenPrice(
    tranche: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  calcAssetValue(
    tranche: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  calcJuniorTokenPrice(
    arg0: BigNumberish,
    arg1: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  calcMaxSeniorAssetValue(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  calcMinJuniorAssetValue(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  calcSeniorTokenPrice(
    arg0: BigNumberish,
    arg1: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  calcTokenPrice(
    tranche: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  calcUpdateNAV(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  calls(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

  changeSeniorAsset(
    seniorRatio_: BigNumberish,
    seniorSupply: BigNumberish,
    seniorRedeem: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  maxReserve(overrides?: CallOverrides): Promise<BigNumber>;

  redeemApprove(
    tranche: string,
    currencyAmount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  repaymentUpdate(
    currencyAmount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  seniorBalance(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  seniorDebt(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  seniorRatioBounds(
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & {
      minSeniorRatio_: BigNumber;
      maxSeniorRatio_: BigNumber;
    }
  >;

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

  setTokenPrice(
    tranche: string,
    tokenPrice_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supplyApprove(
    tranche: string,
    currencyAmount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  tokenPrice(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

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

  callStatic: {
    accrueTrancheInterest(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    borrowUpdate(
      currencyAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    calcAndUpdateTokenPrice(
      tranche: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calcAssetValue(
      tranche: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calcJuniorTokenPrice(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calcMaxSeniorAssetValue(overrides?: CallOverrides): Promise<BigNumber>;

    calcMinJuniorAssetValue(overrides?: CallOverrides): Promise<BigNumber>;

    calcSeniorTokenPrice(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calcTokenPrice(
      tranche: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calcUpdateNAV(overrides?: CallOverrides): Promise<BigNumber>;

    calls(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    changeSeniorAsset(
      seniorRatio_: BigNumberish,
      seniorSupply: BigNumberish,
      seniorRedeem: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    maxReserve(overrides?: CallOverrides): Promise<BigNumber>;

    redeemApprove(
      tranche: string,
      currencyAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    repaymentUpdate(
      currencyAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    seniorBalance(overrides?: CallOverrides): Promise<BigNumber>;

    seniorDebt(overrides?: CallOverrides): Promise<BigNumber>;

    seniorRatioBounds(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        minSeniorRatio_: BigNumber;
        maxSeniorRatio_: BigNumber;
      }
    >;

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

    setTokenPrice(
      tranche: string,
      tokenPrice_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    supplyApprove(
      tranche: string,
      currencyAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    tokenPrice(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

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
  };

  filters: {};

  estimateGas: {
    accrueTrancheInterest(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    borrowUpdate(
      currencyAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    calcAndUpdateTokenPrice(
      tranche: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    calcAssetValue(
      tranche: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    calcJuniorTokenPrice(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    calcMaxSeniorAssetValue(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    calcMinJuniorAssetValue(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    calcSeniorTokenPrice(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    calcTokenPrice(
      tranche: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calcUpdateNAV(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    calls(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    changeSeniorAsset(
      seniorRatio_: BigNumberish,
      seniorSupply: BigNumberish,
      seniorRedeem: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    maxReserve(overrides?: CallOverrides): Promise<BigNumber>;

    redeemApprove(
      tranche: string,
      currencyAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    repaymentUpdate(
      currencyAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    seniorBalance(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    seniorDebt(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    seniorRatioBounds(overrides?: CallOverrides): Promise<BigNumber>;

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

    setTokenPrice(
      tranche: string,
      tokenPrice_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supplyApprove(
      tranche: string,
      currencyAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    tokenPrice(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

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
  };

  populateTransaction: {
    accrueTrancheInterest(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    borrowUpdate(
      currencyAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    calcAndUpdateTokenPrice(
      tranche: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    calcAssetValue(
      tranche: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    calcJuniorTokenPrice(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    calcMaxSeniorAssetValue(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    calcMinJuniorAssetValue(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    calcSeniorTokenPrice(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    calcTokenPrice(
      tranche: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    calcUpdateNAV(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    calls(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    changeSeniorAsset(
      seniorRatio_: BigNumberish,
      seniorSupply: BigNumberish,
      seniorRedeem: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    maxReserve(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    redeemApprove(
      tranche: string,
      currencyAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    repaymentUpdate(
      currencyAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    seniorBalance(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    seniorDebt(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    seniorRatioBounds(overrides?: CallOverrides): Promise<PopulatedTransaction>;

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

    setTokenPrice(
      tranche: string,
      tokenPrice_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supplyApprove(
      tranche: string,
      currencyAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    tokenPrice(
      arg0: string,
      overrides?: CallOverrides
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
  };
}
