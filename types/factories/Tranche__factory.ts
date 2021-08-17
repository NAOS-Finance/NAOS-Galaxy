/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Tranche, TrancheInterface } from "../Tranche";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "currency_",
        type: "address",
      },
      {
        internalType: "address",
        name: "token_",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: true,
    inputs: [
      {
        indexed: true,
        internalType: "bytes4",
        name: "sig",
        type: "bytes4",
      },
      {
        indexed: true,
        internalType: "address",
        name: "guy",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "foo",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "bar",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "fax",
        type: "bytes",
      },
    ],
    name: "LogNote",
    type: "event",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "erc20",
        type: "address",
      },
      {
        internalType: "address",
        name: "usr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "authTransfer",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "balance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "usr",
        type: "address",
      },
    ],
    name: "calcDisburse",
    outputs: [
      {
        internalType: "uint256",
        name: "payoutCurrencyAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "payoutTokenAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "remainingSupplyCurrency",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "remainingRedeemToken",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "usr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "endEpoch",
        type: "uint256",
      },
    ],
    name: "calcDisburse",
    outputs: [
      {
        internalType: "uint256",
        name: "payoutCurrencyAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "payoutTokenAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "remainingSupplyCurrency",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "remainingRedeemToken",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "closeEpoch",
    outputs: [
      {
        internalType: "uint256",
        name: "totalSupplyCurrency_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalRedeemToken_",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "currency",
    outputs: [
      {
        internalType: "contract ERC20Like",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "usr",
        type: "address",
      },
    ],
    name: "deny",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "bytes32",
        name: "contractName",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "depend",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "usr",
        type: "address",
      },
    ],
    name: "disburse",
    outputs: [
      {
        internalType: "uint256",
        name: "payoutCurrencyAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "payoutTokenAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "remainingSupplyCurrency",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "remainingRedeemToken",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "usr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "endEpoch",
        type: "uint256",
      },
    ],
    name: "disburse",
    outputs: [
      {
        internalType: "uint256",
        name: "payoutCurrencyAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "payoutTokenAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "remainingSupplyCurrency",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "remainingRedeemToken",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "epochTicker",
    outputs: [
      {
        internalType: "contract EpochTickerLike",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "epochID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "supplyFulfillment_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "redeemFulfillment_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokenPrice_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "epochSupplyOrderCurrency",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "epochRedeemOrderCurrency",
        type: "uint256",
      },
    ],
    name: "epochUpdate",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "epochs",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        internalType: "struct FixedPoint.Fixed27",
        name: "redeemFulfillment",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        internalType: "struct FixedPoint.Fixed27",
        name: "supplyFulfillment",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        internalType: "struct FixedPoint.Fixed27",
        name: "tokenPrice",
        type: "tuple",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "usr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "x",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y",
        type: "uint256",
      },
    ],
    name: "rdiv",
    outputs: [
      {
        internalType: "uint256",
        name: "z",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "pure",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "usr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "newRedeemAmount",
        type: "uint256",
      },
    ],
    name: "redeemOrder",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "usr",
        type: "address",
      },
    ],
    name: "rely",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "reserve",
    outputs: [
      {
        internalType: "contract ReserveLike",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "x",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y",
        type: "uint256",
      },
    ],
    name: "rmul",
    outputs: [
      {
        internalType: "uint256",
        name: "z",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "pure",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "x",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y",
        type: "uint256",
      },
    ],
    name: "safeAdd",
    outputs: [
      {
        internalType: "uint256",
        name: "z",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "pure",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "x",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y",
        type: "uint256",
      },
    ],
    name: "safeDiv",
    outputs: [
      {
        internalType: "uint256",
        name: "z",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "pure",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "x",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y",
        type: "uint256",
      },
    ],
    name: "safeMul",
    outputs: [
      {
        internalType: "uint256",
        name: "z",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "pure",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "x",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y",
        type: "uint256",
      },
    ],
    name: "safeSub",
    outputs: [
      {
        internalType: "uint256",
        name: "z",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "pure",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "usr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "newSupplyAmount",
        type: "uint256",
      },
    ],
    name: "supplyOrder",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "contract ERC20Like",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "tokenSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalRedeem",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "users",
    outputs: [
      {
        internalType: "uint256",
        name: "orderedInEpoch",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "supplyCurrencyAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "redeemTokenAmount",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "waitingForUpdate",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "wards",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040526009805460ff60a01b191690553480156200001e57600080fd5b5060405162002378380380620023788339810160408190526200004191620000a8565b33600090815260208190526040902060019055600680546001600160a01b039283166001600160a01b0319918216179091556005805493909216928116929092179055600980549091163017905562000113565b8051620000a281620000f9565b92915050565b60008060408385031215620000bc57600080fd5b6000620000ca858562000095565b9250506020620000dd8582860162000095565b9150509250929050565b60006001600160a01b038216620000a2565b6200010481620000e7565b81146200011057600080fd5b50565b61225580620001236000396000f3fe608060405234801561001057600080fd5b50600436106101e55760003560e01c80639adc339d1161010f578063cd3293de116100a2578063e6cb901311610071578063e6cb901314610401578063ed12a99c14610414578063f5a09bb41461041c578063fc0c546a1461042f576101e5565b8063cd3293de146103bb578063cdd5f2c8146103d0578063d05c78da146103e6578063e5a6b10f146103f9576101e5565b8063b5931f7c116100de578063b5931f7c1461036b578063b69ef8a81461037e578063bf353dbb14610386578063c6b61e4c14610399576101e5565b80639adc339d146103105780639c52a7f114610323578063a293d1e814610336578063a87430ba14610349576101e5565b806367457022116101875780637824407f116101565780637824407f146102cd5780637f3bd56e146102d55780638be03ca1146102e85780638d060dfa146102fb576101e5565b8063674570221461028157806369c7a0511461029457806373cd0783146102a757806374299b5a146102ba576101e5565b80631c8ce890116101c35780631c8ce890146102235780632edd29761461024657806340c10f191461025b57806365fae35e1461026e576101e5565b8063078c74c3146101ea5780630e2286d31461020857806318160ddd1461021b575b600080fd5b6101f2610437565b6040516101ff919061210a565b60405180910390f35b6101f2610216366004611d76565b61043d565b6101f2610499565b610236610231366004611c3f565b61049f565b6040516101ff949392919061216b565b610259610254366004611cb2565b61055a565b005b610259610269366004611cb2565b61083a565b61025961027c366004611c3f565b6108be565b6101f261028f366004611d76565b610931565b6102366102a2366004611c3f565b61094a565b6102596102b5366004611c65565b6109da565b6102596102c8366004611cb2565b610a84565b6101f2610d4e565b6102366102e3366004611cb2565b610dd0565b6102596102f6366004611d95565b610fdf565b61030361111c565b6040516101ff9190612046565b61025961031e366004611d0a565b61112c565b610259610331366004611c3f565b611213565b6101f2610344366004611d76565b611277565b61035c610357366004611c3f565b6112a0565b6040516101ff93929190612150565b6101f2610379366004611d76565b6112c0565b6101f26112cb565b6101f2610394366004611c3f565b61131b565b6103ac6103a7366004611d3a565b61132d565b6040516101ff939291906120e2565b6103c3611368565b6040516101ff9190612054565b6103d8611377565b6040516101ff929190612142565b6101f26103f4366004611d76565b6113cb565b6103c3611402565b6101f261040f366004611d76565b611411565b6103c3611434565b61023661042a366004611cb2565b611443565b6103c36116e3565b60045481565b60008082116104675760405162461bcd60e51b815260040161045e906120c2565b60405180910390fd5b8161048a610481856b033b2e3c9fd0803ce80000006113cb565b60028504611411565b8161049157fe5b049392505050565b60035481565b336000908152602081905260408120548190819081906001146104c157600080fd5b61054b85600860009054906101000a90046001600160a01b03166001600160a01b03166364c1cf336040518163ffffffff1660e01b815260040160206040518083038186803b15801561051357600080fd5b505afa158015610527573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052506102e39190810190611d58565b93509350935093509193509193565b3360009081526020819052604090205460011461057657600080fd5b6001600160a01b03821660009081526002602052604090206001015482901580156105bb57506001600160a01b03811660009081526002602081905260409091200154155b806106625750600860009054906101000a90046001600160a01b03166001600160a01b031663766718086040518163ffffffff1660e01b815260040160206040518083038186803b15801561060f57600080fd5b505afa158015610623573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052506106479190810190611d58565b6001600160a01b038216600090815260026020526040902054145b61067e5760405162461bcd60e51b815260040161045e90612072565b600860009054906101000a90046001600160a01b03166001600160a01b031663766718086040518163ffffffff1660e01b815260040160206040518083038186803b1580156106cc57600080fd5b505afa1580156106e0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052506107049190810190611d58565b6001600160a01b0384166000908152600260208190526040909120918255018054908390556004546107409061073a90836116f2565b84611411565b600455808311156108075760006107578483611277565b6006546009546040516323b872dd60e01b81529293506001600160a01b03918216926323b872dd92610792928a929116908690600401612003565b602060405180830381600087803b1580156107ac57600080fd5b505af11580156107c0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052506107e49190810190611cec565b6108005760405162461bcd60e51b815260040161045e90612062565b5050610835565b60006108138285611277565b9050801561083257600654610832906001600160a01b03168683611715565b50505b505050565b3360009081526020819052604090205460011461085657600080fd5b6006546040516340c10f1960e01b81526001600160a01b03909116906340c10f1990610888908590859060040161202b565b600060405180830381600087803b1580156108a257600080fd5b505af11580156108b6573d6000803e3d6000fd5b505050505050565b336000908152602081905260409020546001146108da57600080fd5b6001600160a01b0381166000908152602081905260408082206001905551600435916024359134918391859133916001600160e01b031982351691610923918791903690612118565b60405180910390a450505050565b60006b033b2e3c9fd0803ce800000061048a84846113cb565b60008060008061054b85600860009054906101000a90046001600160a01b03166001600160a01b03166364c1cf336040518163ffffffff1660e01b815260040160206040518083038186803b1580156109a257600080fd5b505afa1580156109b6573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525061042a9190810190611d58565b336000908152602081905260409020546001146109f657600080fd5b6009546040516323b872dd60e01b81526001600160a01b03858116926323b872dd92610a2c929091169086908690600401612003565b602060405180830381600087803b158015610a4657600080fd5b505af1158015610a5a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250610a7e9190810190611cec565b50505050565b33600090815260208190526040902054600114610aa057600080fd5b6001600160a01b0382166000908152600260205260409020600101548290158015610ae557506001600160a01b03811660009081526002602081905260409091200154155b80610b8c5750600860009054906101000a90046001600160a01b03166001600160a01b031663766718086040518163ffffffff1660e01b815260040160206040518083038186803b158015610b3957600080fd5b505afa158015610b4d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250610b719190810190611d58565b6001600160a01b038216600090815260026020526040902054145b610ba85760405162461bcd60e51b815260040161045e90612072565b600860009054906101000a90046001600160a01b03166001600160a01b031663766718086040518163ffffffff1660e01b815260040160206040518083038186803b158015610bf657600080fd5b505afa158015610c0a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250610c2e9190810190611d58565b6001600160a01b0384166000908152600260205260409020908155600101805490839055600354610c639061073a90836116f2565b60035580831115610d23576000610c7a8483611277565b6005546009546040516323b872dd60e01b81529293506001600160a01b03918216926323b872dd92610cb5928a929116908690600401612003565b602060405180830381600087803b158015610ccf57600080fd5b505af1158015610ce3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250610d079190810190611cec565b6108005760405162461bcd60e51b815260040161045e90612092565b6000610d2f8285611277565b9050801561083257600554610832906001600160a01b03168683611715565b600654604080516318160ddd60e01b815290516000926001600160a01b0316916318160ddd916004808301926020929190829003018186803b158015610d9357600080fd5b505afa158015610da7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250610dcb9190810190611d58565b905090565b33600090815260208190526040812054819081908190600114610df257600080fd5b600860009054906101000a90046001600160a01b03166001600160a01b03166364c1cf336040518163ffffffff1660e01b815260040160206040518083038186803b158015610e4057600080fd5b505afa158015610e54573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250610e789190810190611d58565b6001600160a01b0387166000908152600260205260409020541115610eaf5760405162461bcd60e51b815260040161045e906120b2565b600854604080516364c1cf3360e01b815290516000926001600160a01b0316916364c1cf33916004808301926020929190829003018186803b158015610ef457600080fd5b505afa158015610f08573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250610f2c9190810190611d58565b905080861115610f3a578095505b610f448787611443565b6001600160a01b038b1660009081526002602081905260409091206001808201859055910182905593985091965094509250610f81908790611411565b6001600160a01b0388166000908152600260205260409020558415610fb757600554610fb7906001600160a01b03168887611715565b8315610fd457600654610fd4906001600160a01b03168886611715565b505b92959194509250565b33600090815260208190526040902054600114610ffb57600080fd5b600954600160a01b900460ff16151560011461101657600080fd5b6009805460ff60a01b191690556000868152600160208190526040822090810187905585815560020184905580841561107757611053848661043d565b905061107461106e846b033b2e3c9fd0803ce80000006113cb565b866112c0565b91505b61108288828461184a565b61108d888585611949565b6110cf61109c600354866116f2565b61040f8661028f6b033b2e3c9fd0803ce8000000600160008f815260200190815260200160002060010160000154611277565b60035560045461110f906110e390846116f2565b60008a81526001602052604090205461040f90859061028f906b033b2e3c9fd0803ce800000090611277565b6004555050505050505050565b600954600160a01b900460ff1681565b3360009081526020819052604090205460011461114857600080fd5b81643a37b5b2b760d91b141561117857600680546001600160a01b0319166001600160a01b03831617905561120f565b816763757272656e637960c01b14156111ab57600580546001600160a01b0319166001600160a01b03831617905561120f565b81667265736572766560c81b14156111dd57600780546001600160a01b0319166001600160a01b03831617905561120f565b816a32b837b1b42a34b1b5b2b960a91b14156101e557600880546001600160a01b0319166001600160a01b0383161790555b5050565b3360009081526020819052604090205460011461122f57600080fd5b6001600160a01b03811660009081526020819052604080822082905551600435916024359134918391859133916001600160e01b031982351691610923918791903690612118565b8082038281111561129a5760405162461bcd60e51b815260040161045e906120d2565b92915050565b600260208190526000918252604090912080546001820154919092015483565b600081838161049157fe5b6005546009546040516370a0823160e01b81526000926001600160a01b03908116926370a08231926113039290911690600401611ff5565b60206040518083038186803b158015610d9357600080fd5b60006020819052908152604090205481565b600160208181526000928352604092839020835180830185528154815284518084018652938201548452845192830190945260020154815283565b6007546001600160a01b031681565b33600090815260208190526040812054819060011461139557600080fd5b600954600160a01b900460ff16156113ac57600080fd5b50506009805460ff60a01b1916600160a01b1790556003546004549091565b60008115806113e6575050808202828282816113e357fe5b04145b61129a5760405162461bcd60e51b815260040161045e90612082565b6005546001600160a01b031681565b8082018281101561129a5760405162461bcd60e51b815260040161045e906120a2565b6008546001600160a01b031681565b6001600160a01b0380831660009081526002602090815260408083205460085482516364c1cf3360e01b8152925194958695869586958694909316926364c1cf339260048083019392829003018186803b1580156114a057600080fd5b505afa1580156114b4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052506114d89190810190611d58565b9050600860009054906101000a90046001600160a01b03166001600160a01b031663766718086040518163ffffffff1660e01b815260040160206040518083038186803b15801561152857600080fd5b505afa15801561153c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052506115609190810190611d58565b6001600160a01b03891660009081526002602052604090205414156115ab57505050506001600160a01b03841660009081526002602081905260409091206001810154910154610fd6565b808711156115b7578096505b6001600160a01b03881660009081526002602081905260408220600181015491015490955093505b8783111580156115f75750841515806115f757508315155b156116d757841561166b5760008381526001602081905260409091200154611620908690610931565b9050801561166b5761165c8661040f611645846b033b2e3c9fd0803ce80000006113cb565b6000878152600160205260409020600201546112c0565b95506116688582611277565b94505b83156116c55760008381526001602052604090205461168b908590610931565b905080156116c5576000838152600160205260409020600201546116b690889061040f908490610931565b96506116c28482611277565b93505b6116d0836001611411565b92506115df565b50505092959194509250565b6006546001600160a01b031681565b6000818310156117045750600061129a565b61170e8383611277565b9392505050565b6009546040516370a0823160e01b81526000916001600160a01b03808716926370a0823192611748921690600401611ff5565b60206040518083038186803b15801561176057600080fd5b505afa158015611774573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052506117989190810190611d58565b9050808211156117a6578091505b6009546040516323b872dd60e01b81526001600160a01b03868116926323b872dd926117dc929091169087908790600401612003565b602060405180830381600087803b1580156117f657600080fd5b505af115801561180a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525061182e9190810190611cec565b610a7e5760405162461bcd60e51b815260040161045e90612062565b60008381526001602052604081206002015415611882576000848152600160208190526040909120015461187f908490610931565b90505b60008481526001602052604081205461189c908490610931565b9050818111156118c55760006118b28284611277565b90506118bd81611a8b565b505050610835565b60006118d18383611277565b905080156108b6576006546009546040516340c10f1960e01b81526001600160a01b03928316926340c10f199261190f92911690859060040161202b565b600060405180830381600087803b15801561192957600080fd5b505af115801561193d573d6000803e3d6000fd5b50505050505050505050565b600083815260016020819052604082200154611966908490610931565b60008581526001602052604081205491925090611984908490610931565b905080821115611a6e57600061199a8383611277565b60055460075460405163095ea7b360e01b81529293506001600160a01b039182169263095ea7b3926119d2921690859060040161202b565b600060405180830381600087803b1580156119ec57600080fd5b505af1158015611a00573d6000803e3d6000fd5b505060075460405163b6b55f2560e01b81526001600160a01b03909116925063b6b55f259150611a3490849060040161210a565b600060405180830381600087803b158015611a4e57600080fd5b505af1158015611a62573d6000803e3d6000fd5b50505050505050610835565b6000611a7a8284611277565b905080156108b6576108b681611b57565b6006546009546040516370a0823160e01b81526000926001600160a01b03908116926370a0823192611ac39290911690600401611ff5565b60206040518083038186803b158015611adb57600080fd5b505afa158015611aef573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250611b139190810190611d58565b905080821115611b21578091505b600654600954604051632770a7eb60e21b81526001600160a01b0392831692639dc29fac9261088892911690869060040161202b565b6007546040805163ad7a672f60e01b815290516000926001600160a01b03169163ad7a672f91600480830192602092919082900301818787803b158015611b9d57600080fd5b505af1158015611bb1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250611bd59190810190611d58565b905080821115611be3578091505b60075460405163e115234360e01b81526001600160a01b039091169063e11523439061088890859060040161210a565b803561129a816121e9565b805161129a81612200565b803561129a81612209565b805161129a81612209565b600060208284031215611c5157600080fd5b6000611c5d8484611c13565b949350505050565b600080600060608486031215611c7a57600080fd5b6000611c868686611c13565b9350506020611c9786828701611c13565b9250506040611ca886828701611c29565b9150509250925092565b60008060408385031215611cc557600080fd5b6000611cd18585611c13565b9250506020611ce285828601611c29565b9150509250929050565b600060208284031215611cfe57600080fd5b6000611c5d8484611c1e565b60008060408385031215611d1d57600080fd5b6000611d298585611c29565b9250506020611ce285828601611c13565b600060208284031215611d4c57600080fd5b6000611c5d8484611c29565b600060208284031215611d6a57600080fd5b6000611c5d8484611c34565b60008060408385031215611d8957600080fd5b6000611cd18585611c29565b60008060008060008060c08789031215611dae57600080fd5b6000611dba8989611c29565b9650506020611dcb89828a01611c29565b9550506040611ddc89828a01611c29565b9450506060611ded89828a01611c29565b9350506080611dfe89828a01611c29565b92505060a0611e0f89828a01611c29565b9150509295509295509295565b611e25816121a9565b82525050565b611e25816121b4565b6000611e4083856121a0565b9350611e4d8385846121d3565b611e56836121df565b9093019392505050565b611e25816121c8565b6000611e766015836121a0565b741d1bdad95b8b5d1c985b9cd9995c8b59985a5b1959605a1b815260200192915050565b6000611ea76011836121a0565b70191a5cd89d5c9cd9481c995c5d5a5c9959607a1b815260200192915050565b6000611ed4600f836121a0565b6e1cd859994b5b5d5b0b59985a5b1959608a1b815260200192915050565b6000611eff6018836121a0565b7f63757272656e63792d7472616e736665722d6661696c65640000000000000000815260200192915050565b6000611f38600f836121a0565b6e1cd859994b5859190b59985a5b1959608a1b815260200192915050565b6000611f636016836121a0565b75195c1bd8da0b5b9bdd0b595e1958dd5d19590b5e595d60521b815260200192915050565b6000611f956010836121a0565b6f6469766973696f6e206279207a65726f60801b815260200192915050565b6000611fc1600f836121a0565b6e1cd859994b5cdd588b59985a5b1959608a1b815260200192915050565b80516020830190610a7e84825b611e25816121b9565b6020810161129a8284611e1c565b606081016120118286611e1c565b61201e6020830185611e1c565b611c5d6040830184611fec565b604081016120398285611e1c565b61170e6020830184611fec565b6020810161129a8284611e2b565b6020810161129a8284611e60565b6020808252810161129a81611e69565b6020808252810161129a81611e9a565b6020808252810161129a81611ec7565b6020808252810161129a81611ef2565b6020808252810161129a81611f2b565b6020808252810161129a81611f56565b6020808252810161129a81611f88565b6020808252810161129a81611fb4565b606081016120f08286611fdf565b6120fd6020830185611fdf565b611c5d6040830184611fdf565b6020810161129a8284611fec565b604081016121268286611fec565b8181036020830152612139818486611e34565b95945050505050565b604081016120398285611fec565b6060810161215e8286611fec565b61201e6020830185611fec565b608081016121798287611fec565b6121866020830186611fec565b6121936040830185611fec565b6121396060830184611fec565b90815260200190565b600061129a826121bc565b151590565b90565b6001600160a01b031690565b600061129a826121a9565b82818337506000910152565b601f01601f191690565b6121f2816121a9565b81146121fd57600080fd5b50565b6121f2816121b4565b6121f2816121b956fea365627a7a7231582059674d93bf2967a38a07dda7c4c4de111de34253a5cca67628ab8028e4d6fe376c6578706572696d656e74616cf564736f6c634300050f0040";

export class Tranche__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    currency_: string,
    token_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Tranche> {
    return super.deploy(currency_, token_, overrides || {}) as Promise<Tranche>;
  }
  getDeployTransaction(
    currency_: string,
    token_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(currency_, token_, overrides || {});
  }
  attach(address: string): Tranche {
    return super.attach(address) as Tranche;
  }
  connect(signer: Signer): Tranche__factory {
    return super.connect(signer) as Tranche__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TrancheInterface {
    return new utils.Interface(_abi) as TrancheInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Tranche {
    return new Contract(address, _abi, signerOrProvider) as Tranche;
  }
}