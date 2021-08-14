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

interface CollectorLikeInterface extends ethers.utils.Interface {
  functions: {
    "collect(uint256,address)": FunctionFragment;
    "file(bytes32,uint256,address,uint256)": FunctionFragment;
    "relyCollector(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "collect",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "file",
    values: [BytesLike, BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "relyCollector",
    values: [string]
  ): string;

  decodeFunctionResult(functionFragment: "collect", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "file", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "relyCollector",
    data: BytesLike
  ): Result;

  events: {};
}

export class CollectorLike extends BaseContract {
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

  interface: CollectorLikeInterface;

  functions: {
    "collect(uint256,address)"(
      loan: BigNumberish,
      buyer: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "collect(uint256)"(
      loan: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    file(
      what: BytesLike,
      loan: BigNumberish,
      buyer: string,
      price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    relyCollector(
      user: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  "collect(uint256,address)"(
    loan: BigNumberish,
    buyer: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "collect(uint256)"(
    loan: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  file(
    what: BytesLike,
    loan: BigNumberish,
    buyer: string,
    price: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  relyCollector(
    user: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    "collect(uint256,address)"(
      loan: BigNumberish,
      buyer: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "collect(uint256)"(
      loan: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    file(
      what: BytesLike,
      loan: BigNumberish,
      buyer: string,
      price: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    relyCollector(user: string, overrides?: CallOverrides): Promise<void>;
  };

  filters: {};

  estimateGas: {
    "collect(uint256,address)"(
      loan: BigNumberish,
      buyer: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "collect(uint256)"(
      loan: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    file(
      what: BytesLike,
      loan: BigNumberish,
      buyer: string,
      price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    relyCollector(
      user: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    "collect(uint256,address)"(
      loan: BigNumberish,
      buyer: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "collect(uint256)"(
      loan: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    file(
      what: BytesLike,
      loan: BigNumberish,
      buyer: string,
      price: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    relyCollector(
      user: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
