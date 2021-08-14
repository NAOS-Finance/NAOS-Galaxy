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

interface PileInterface extends ethers.utils.Interface {
  functions: {
    "accrue(uint256)": FunctionFragment;
    "changeRate(uint256,uint256)": FunctionFragment;
    "chargeInterest(uint256,uint256,uint256)": FunctionFragment;
    "compounding(uint256,uint256,uint256,uint256)": FunctionFragment;
    "debt(uint256)": FunctionFragment;
    "decDebt(uint256,uint256)": FunctionFragment;
    "deny(address)": FunctionFragment;
    "drip(uint256)": FunctionFragment;
    "file(bytes32,uint256,uint256)": FunctionFragment;
    "incDebt(uint256,uint256)": FunctionFragment;
    "loanRates(uint256)": FunctionFragment;
    "pie(uint256)": FunctionFragment;
    "rateDebt(uint256)": FunctionFragment;
    "rates(uint256)": FunctionFragment;
    "rdiv(uint256,uint256)": FunctionFragment;
    "rely(address)": FunctionFragment;
    "rmul(uint256,uint256)": FunctionFragment;
    "rpow(uint256,uint256,uint256)": FunctionFragment;
    "safeAdd(uint256,uint256)": FunctionFragment;
    "safeDiv(uint256,uint256)": FunctionFragment;
    "safeMul(uint256,uint256)": FunctionFragment;
    "safeSub(uint256,uint256)": FunctionFragment;
    "setRate(uint256,uint256)": FunctionFragment;
    "toAmount(uint256,uint256)": FunctionFragment;
    "toPie(uint256,uint256)": FunctionFragment;
    "total()": FunctionFragment;
    "wards(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "accrue",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "changeRate",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "chargeInterest",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "compounding",
    values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "debt", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "decDebt",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "deny", values: [string]): string;
  encodeFunctionData(functionFragment: "drip", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "file",
    values: [BytesLike, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "incDebt",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "loanRates",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "pie", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "rateDebt",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "rates", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "rdiv",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "rely", values: [string]): string;
  encodeFunctionData(
    functionFragment: "rmul",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "rpow",
    values: [BigNumberish, BigNumberish, BigNumberish]
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
  encodeFunctionData(
    functionFragment: "setRate",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "toAmount",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "toPie",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "total", values?: undefined): string;
  encodeFunctionData(functionFragment: "wards", values: [string]): string;

  decodeFunctionResult(functionFragment: "accrue", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "changeRate", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "chargeInterest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "compounding",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "debt", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "decDebt", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deny", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "drip", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "file", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "incDebt", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "loanRates", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pie", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "rateDebt", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "rates", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "rdiv", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "rely", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "rmul", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "rpow", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "safeAdd", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "safeDiv", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "safeMul", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "safeSub", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setRate", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "toAmount", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "toPie", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "total", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "wards", data: BytesLike): Result;

  events: {
    "LogNote(bytes4,address,bytes32,bytes32,uint256,bytes)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "LogNote"): EventFragment;
}

export class Pile extends BaseContract {
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

  interface: PileInterface;

  functions: {
    accrue(
      loan: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    changeRate(
      loan: BigNumberish,
      newRate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    chargeInterest(
      interestBearingAmount: BigNumberish,
      ratePerSecond: BigNumberish,
      lastUpdated: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    compounding(
      chi: BigNumberish,
      ratePerSecond: BigNumberish,
      lastUpdated: BigNumberish,
      pie: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber]>;

    debt(loan: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;

    decDebt(
      loan: BigNumberish,
      currencyAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    deny(
      usr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    drip(
      rate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    file(
      what: BytesLike,
      rate: BigNumberish,
      value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    incDebt(
      loan: BigNumberish,
      currencyAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    loanRates(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    pie(arg0: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;

    rateDebt(
      rate: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    rates(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, number, BigNumber] & {
        pie: BigNumber;
        chi: BigNumber;
        ratePerSecond: BigNumber;
        lastUpdated: number;
        fixedRate: BigNumber;
      }
    >;

    rdiv(
      x: BigNumberish,
      y: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { z: BigNumber }>;

    rely(
      usr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    rmul(
      x: BigNumberish,
      y: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { z: BigNumber }>;

    rpow(
      x: BigNumberish,
      n: BigNumberish,
      base: BigNumberish,
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

    setRate(
      loan: BigNumberish,
      rate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    toAmount(
      chi: BigNumberish,
      pie: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    toPie(
      chi: BigNumberish,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    total(overrides?: CallOverrides): Promise<[BigNumber]>;

    wards(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  accrue(
    loan: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  changeRate(
    loan: BigNumberish,
    newRate: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  chargeInterest(
    interestBearingAmount: BigNumberish,
    ratePerSecond: BigNumberish,
    lastUpdated: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  compounding(
    chi: BigNumberish,
    ratePerSecond: BigNumberish,
    lastUpdated: BigNumberish,
    pie: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber]>;

  debt(loan: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  decDebt(
    loan: BigNumberish,
    currencyAmount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  deny(
    usr: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  drip(
    rate: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  file(
    what: BytesLike,
    rate: BigNumberish,
    value: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  incDebt(
    loan: BigNumberish,
    currencyAmount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  loanRates(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  pie(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  rateDebt(rate: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  rates(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, number, BigNumber] & {
      pie: BigNumber;
      chi: BigNumber;
      ratePerSecond: BigNumber;
      lastUpdated: number;
      fixedRate: BigNumber;
    }
  >;

  rdiv(
    x: BigNumberish,
    y: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  rely(
    usr: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  rmul(
    x: BigNumberish,
    y: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  rpow(
    x: BigNumberish,
    n: BigNumberish,
    base: BigNumberish,
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

  setRate(
    loan: BigNumberish,
    rate: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  toAmount(
    chi: BigNumberish,
    pie: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  toPie(
    chi: BigNumberish,
    amount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  total(overrides?: CallOverrides): Promise<BigNumber>;

  wards(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    accrue(loan: BigNumberish, overrides?: CallOverrides): Promise<void>;

    changeRate(
      loan: BigNumberish,
      newRate: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    chargeInterest(
      interestBearingAmount: BigNumberish,
      ratePerSecond: BigNumberish,
      lastUpdated: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    compounding(
      chi: BigNumberish,
      ratePerSecond: BigNumberish,
      lastUpdated: BigNumberish,
      pie: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber]>;

    debt(loan: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    decDebt(
      loan: BigNumberish,
      currencyAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    deny(usr: string, overrides?: CallOverrides): Promise<void>;

    drip(rate: BigNumberish, overrides?: CallOverrides): Promise<void>;

    file(
      what: BytesLike,
      rate: BigNumberish,
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    incDebt(
      loan: BigNumberish,
      currencyAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    loanRates(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    pie(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    rateDebt(rate: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    rates(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, number, BigNumber] & {
        pie: BigNumber;
        chi: BigNumber;
        ratePerSecond: BigNumber;
        lastUpdated: number;
        fixedRate: BigNumber;
      }
    >;

    rdiv(
      x: BigNumberish,
      y: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    rely(usr: string, overrides?: CallOverrides): Promise<void>;

    rmul(
      x: BigNumberish,
      y: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    rpow(
      x: BigNumberish,
      n: BigNumberish,
      base: BigNumberish,
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

    setRate(
      loan: BigNumberish,
      rate: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    toAmount(
      chi: BigNumberish,
      pie: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    toPie(
      chi: BigNumberish,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    total(overrides?: CallOverrides): Promise<BigNumber>;

    wards(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
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
    accrue(
      loan: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    changeRate(
      loan: BigNumberish,
      newRate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    chargeInterest(
      interestBearingAmount: BigNumberish,
      ratePerSecond: BigNumberish,
      lastUpdated: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    compounding(
      chi: BigNumberish,
      ratePerSecond: BigNumberish,
      lastUpdated: BigNumberish,
      pie: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    debt(loan: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    decDebt(
      loan: BigNumberish,
      currencyAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    deny(
      usr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    drip(
      rate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    file(
      what: BytesLike,
      rate: BigNumberish,
      value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    incDebt(
      loan: BigNumberish,
      currencyAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    loanRates(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    pie(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    rateDebt(rate: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    rates(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    rdiv(
      x: BigNumberish,
      y: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    rely(
      usr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    rmul(
      x: BigNumberish,
      y: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    rpow(
      x: BigNumberish,
      n: BigNumberish,
      base: BigNumberish,
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

    setRate(
      loan: BigNumberish,
      rate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    toAmount(
      chi: BigNumberish,
      pie: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    toPie(
      chi: BigNumberish,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    total(overrides?: CallOverrides): Promise<BigNumber>;

    wards(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    accrue(
      loan: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    changeRate(
      loan: BigNumberish,
      newRate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    chargeInterest(
      interestBearingAmount: BigNumberish,
      ratePerSecond: BigNumberish,
      lastUpdated: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    compounding(
      chi: BigNumberish,
      ratePerSecond: BigNumberish,
      lastUpdated: BigNumberish,
      pie: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    debt(
      loan: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    decDebt(
      loan: BigNumberish,
      currencyAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    deny(
      usr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    drip(
      rate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    file(
      what: BytesLike,
      rate: BigNumberish,
      value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    incDebt(
      loan: BigNumberish,
      currencyAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    loanRates(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    pie(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    rateDebt(
      rate: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    rates(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    rdiv(
      x: BigNumberish,
      y: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    rely(
      usr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    rmul(
      x: BigNumberish,
      y: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    rpow(
      x: BigNumberish,
      n: BigNumberish,
      base: BigNumberish,
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

    setRate(
      loan: BigNumberish,
      rate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    toAmount(
      chi: BigNumberish,
      pie: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    toPie(
      chi: BigNumberish,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    total(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    wards(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
