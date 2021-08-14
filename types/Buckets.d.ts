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
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface BucketsInterface extends ethers.utils.Interface {
  functions: {
    "NullDate()": FunctionFragment;
    "buckets(uint256)": FunctionFragment;
    "firstBucket()": FunctionFragment;
    "lastBucket()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "NullDate", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "buckets",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "firstBucket",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "lastBucket",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "NullDate", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "buckets", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "firstBucket",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "lastBucket", data: BytesLike): Result;

  events: {};
}

export class Buckets extends BaseContract {
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

  interface: BucketsInterface;

  functions: {
    NullDate(overrides?: CallOverrides): Promise<[BigNumber]>;

    buckets(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { value: BigNumber; next: BigNumber }>;

    firstBucket(overrides?: CallOverrides): Promise<[BigNumber]>;

    lastBucket(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  NullDate(overrides?: CallOverrides): Promise<BigNumber>;

  buckets(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber] & { value: BigNumber; next: BigNumber }>;

  firstBucket(overrides?: CallOverrides): Promise<BigNumber>;

  lastBucket(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    NullDate(overrides?: CallOverrides): Promise<BigNumber>;

    buckets(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber] & { value: BigNumber; next: BigNumber }>;

    firstBucket(overrides?: CallOverrides): Promise<BigNumber>;

    lastBucket(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    NullDate(overrides?: CallOverrides): Promise<BigNumber>;

    buckets(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    firstBucket(overrides?: CallOverrides): Promise<BigNumber>;

    lastBucket(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    NullDate(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    buckets(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    firstBucket(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    lastBucket(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
