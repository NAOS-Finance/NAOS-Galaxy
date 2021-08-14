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

interface ReserveInterface extends ethers.utils.Interface {
  functions: {
    "assessor()": FunctionFragment;
    "balance()": FunctionFragment;
    "balance_()": FunctionFragment;
    "currency()": FunctionFragment;
    "currencyAvailable()": FunctionFragment;
    "deny(address)": FunctionFragment;
    "depend(bytes32,address)": FunctionFragment;
    "deposit(uint256)": FunctionFragment;
    "file(bytes32,uint256)": FunctionFragment;
    "payout(uint256)": FunctionFragment;
    "payoutTo(address,uint256)": FunctionFragment;
    "rdiv(uint256,uint256)": FunctionFragment;
    "rely(address)": FunctionFragment;
    "rmul(uint256,uint256)": FunctionFragment;
    "safeAdd(uint256,uint256)": FunctionFragment;
    "safeDiv(uint256,uint256)": FunctionFragment;
    "safeMul(uint256,uint256)": FunctionFragment;
    "safeSub(uint256,uint256)": FunctionFragment;
    "shelf()": FunctionFragment;
    "totalBalance()": FunctionFragment;
    "wards(address)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "assessor", values?: undefined): string;
  encodeFunctionData(functionFragment: "balance", values?: undefined): string;
  encodeFunctionData(functionFragment: "balance_", values?: undefined): string;
  encodeFunctionData(functionFragment: "currency", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "currencyAvailable",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "deny", values: [string]): string;
  encodeFunctionData(
    functionFragment: "depend",
    values: [BytesLike, string]
  ): string;
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
  encodeFunctionData(
    functionFragment: "payoutTo",
    values: [string, BigNumberish]
  ): string;
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
  encodeFunctionData(functionFragment: "shelf", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "totalBalance",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "wards", values: [string]): string;

  decodeFunctionResult(functionFragment: "assessor", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balance_", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "currency", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "currencyAvailable",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "deny", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "depend", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "file", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "payout", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "payoutTo", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "rdiv", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "rely", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "rmul", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "safeAdd", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "safeDiv", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "safeMul", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "safeSub", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "shelf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "wards", data: BytesLike): Result;

  events: {
    "LogNote(bytes4,address,bytes32,bytes32,uint256,bytes)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "LogNote"): EventFragment;
}

export class Reserve extends BaseContract {
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

  interface: ReserveInterface;

  functions: {
    assessor(overrides?: CallOverrides): Promise<[string]>;

    balance(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    balance_(overrides?: CallOverrides): Promise<[BigNumber]>;

    currency(overrides?: CallOverrides): Promise<[string]>;

    currencyAvailable(overrides?: CallOverrides): Promise<[BigNumber]>;

    deny(
      usr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    depend(
      contractName: BytesLike,
      addr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    deposit(
      currencyAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    file(
      what: BytesLike,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    payout(
      currencyAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    payoutTo(
      to: string,
      currencyAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

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

    shelf(overrides?: CallOverrides): Promise<[string]>;

    totalBalance(overrides?: CallOverrides): Promise<[BigNumber]>;

    wards(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  assessor(overrides?: CallOverrides): Promise<string>;

  balance(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  balance_(overrides?: CallOverrides): Promise<BigNumber>;

  currency(overrides?: CallOverrides): Promise<string>;

  currencyAvailable(overrides?: CallOverrides): Promise<BigNumber>;

  deny(
    usr: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  depend(
    contractName: BytesLike,
    addr: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  deposit(
    currencyAmount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  file(
    what: BytesLike,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  payout(
    currencyAmount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  payoutTo(
    to: string,
    currencyAmount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

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

  shelf(overrides?: CallOverrides): Promise<string>;

  totalBalance(overrides?: CallOverrides): Promise<BigNumber>;

  wards(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    assessor(overrides?: CallOverrides): Promise<string>;

    balance(overrides?: CallOverrides): Promise<void>;

    balance_(overrides?: CallOverrides): Promise<BigNumber>;

    currency(overrides?: CallOverrides): Promise<string>;

    currencyAvailable(overrides?: CallOverrides): Promise<BigNumber>;

    deny(usr: string, overrides?: CallOverrides): Promise<void>;

    depend(
      contractName: BytesLike,
      addr: string,
      overrides?: CallOverrides
    ): Promise<void>;

    deposit(
      currencyAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    file(
      what: BytesLike,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    payout(
      currencyAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    payoutTo(
      to: string,
      currencyAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

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

    shelf(overrides?: CallOverrides): Promise<string>;

    totalBalance(overrides?: CallOverrides): Promise<BigNumber>;

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
    assessor(overrides?: CallOverrides): Promise<BigNumber>;

    balance(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    balance_(overrides?: CallOverrides): Promise<BigNumber>;

    currency(overrides?: CallOverrides): Promise<BigNumber>;

    currencyAvailable(overrides?: CallOverrides): Promise<BigNumber>;

    deny(
      usr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    depend(
      contractName: BytesLike,
      addr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    deposit(
      currencyAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    file(
      what: BytesLike,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    payout(
      currencyAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    payoutTo(
      to: string,
      currencyAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

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

    shelf(overrides?: CallOverrides): Promise<BigNumber>;

    totalBalance(overrides?: CallOverrides): Promise<BigNumber>;

    wards(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    assessor(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    balance(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    balance_(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    currency(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    currencyAvailable(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    deny(
      usr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    depend(
      contractName: BytesLike,
      addr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    deposit(
      currencyAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    file(
      what: BytesLike,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    payout(
      currencyAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    payoutTo(
      to: string,
      currencyAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
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

    shelf(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalBalance(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    wards(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
