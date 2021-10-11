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

interface NAVFeedLikeInterface extends ethers.utils.Interface {
  functions: {
    "approximatedNAV()": FunctionFragment;
    "calcUpdateNAV()": FunctionFragment;
    "currentNAV()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "approximatedNAV",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "calcUpdateNAV",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "currentNAV",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "approximatedNAV",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calcUpdateNAV",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "currentNAV", data: BytesLike): Result;

  events: {};
}

export class NAVFeedLike extends BaseContract {
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

  interface: NAVFeedLikeInterface;

  functions: {
    approximatedNAV(overrides?: CallOverrides): Promise<[BigNumber]>;

    calcUpdateNAV(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    currentNAV(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  approximatedNAV(overrides?: CallOverrides): Promise<BigNumber>;

  calcUpdateNAV(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  currentNAV(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    approximatedNAV(overrides?: CallOverrides): Promise<BigNumber>;

    calcUpdateNAV(overrides?: CallOverrides): Promise<BigNumber>;

    currentNAV(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    approximatedNAV(overrides?: CallOverrides): Promise<BigNumber>;

    calcUpdateNAV(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    currentNAV(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    approximatedNAV(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    calcUpdateNAV(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    currentNAV(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
