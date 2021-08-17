/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Title, TitleInterface } from "../Title";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "tkn",
        type: "uint256",
      },
    ],
    name: "close",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "count",
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
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
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
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
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
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "usr",
        type: "address",
      },
    ],
    name: "issue",
    outputs: [
      {
        internalType: "uint256",
        name: "",
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
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
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
    name: "rely",
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
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
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
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
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
        name: "to",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
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
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "uri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
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
  "0x60806040523480156200001157600080fd5b50604051620019d8380380620019d8833981810160405260408110156200003757600080fd5b81019080805160405193929190846401000000008211156200005857600080fd5b9083019060208201858111156200006e57600080fd5b82516401000000008111828201881017156200008957600080fd5b82525081516020918201929091019080838360005b83811015620000b85781810151838201526020016200009e565b50505050905090810190601f168015620000e65780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200010a57600080fd5b9083019060208201858111156200012057600080fd5b82516401000000008111828201881017156200013b57600080fd5b82525081516020918201929091019080838360005b838110156200016a57818101518382015260200162000150565b50505050905090810190601f168015620001985780820380516001836020036101000a031916815260200191505b5060405250839150829050620001be6301ffc9a760e01b6001600160e01b036200024316565b620001d96380ac58cd60e01b6001600160e01b036200024316565b8151620001ee906006906020850190620002cb565b50805162000204906007906020840190620002cb565b5062000220635b5e139f60e01b6001600160e01b036200024316565b505033600090815260208190526040902060019081905560095550620003709050565b6001600160e01b03198082161415620002a3576040805162461bcd60e51b815260206004820152601c60248201527f4552433136353a20696e76616c696420696e7465726661636520696400000000604482015290519081900360640190fd5b6001600160e01b0319166000908152600160208190526040909120805460ff19169091179055565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200030e57805160ff19168380011785556200033e565b828001600101855582156200033e579182015b828111156200033e57825182559160200191906001019062000321565b506200034c92915062000350565b5090565b6200036d91905b808211156200034c576000815560010162000357565b90565b61165880620003806000396000f3fe608060405234801561001057600080fd5b506004361061012c5760003560e01c806370a08231116100ad578063b88d4fde11610071578063b88d4fde146103de578063bf353dbb146104a4578063c87b56dd146104ca578063e985e9c5146104e7578063eac989f8146105155761012c565b806370a082311461033657806371e928af1461035c57806395d89b41146103825780639c52a7f11461038a578063a22cb465146103b05761012c565b80630aebeb4e116100f45780630aebeb4e1461026a57806323b872dd1461028757806342842e0e146102bd5780636352211e146102f357806365fae35e146103105761012c565b806301ffc9a71461013157806306661abd1461016c57806306fdde0314610186578063081812fc14610203578063095ea7b31461023c575b600080fd5b6101586004803603602081101561014757600080fd5b50356001600160e01b03191661051d565b604080519115158252519081900360200190f35b61017461053c565b60408051918252519081900360200190f35b61018e610542565b6040805160208082528351818301528351919283929083019185019080838360005b838110156101c85781810151838201526020016101b0565b50505050905090810190601f1680156101f55780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102206004803603602081101561021957600080fd5b50356105d9565b604080516001600160a01b039092168252519081900360200190f35b6102686004803603604081101561025257600080fd5b506001600160a01b03813516906020013561063b565b005b6102686004803603602081101561028057600080fd5b503561074c565b6102686004803603606081101561029d57600080fd5b506001600160a01b03813581169160208101359091169060400135610774565b610268600480360360608110156102d357600080fd5b506001600160a01b038135811691602081013590911690604001356107c9565b6102206004803603602081101561030957600080fd5b50356107e4565b6102686004803603602081101561032657600080fd5b50356001600160a01b031661083e565b6101746004803603602081101561034c57600080fd5b50356001600160a01b03166108df565b6101746004803603602081101561037257600080fd5b50356001600160a01b0316610947565b61018e61096c565b610268600480360360208110156103a057600080fd5b50356001600160a01b03166109cd565b610268600480360360408110156103c657600080fd5b506001600160a01b0381351690602001351515610a6d565b610268600480360360808110156103f457600080fd5b6001600160a01b0382358116926020810135909116916040820135919081019060808101606082013564010000000081111561042f57600080fd5b82018360208201111561044157600080fd5b8035906020019184600183028401116401000000008311171561046357600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610b39945050505050565b610174600480360360208110156104ba57600080fd5b50356001600160a01b0316610b91565b61018e600480360360208110156104e057600080fd5b5035610ba3565b610158600480360360408110156104fd57600080fd5b506001600160a01b0381358116916020013516610c88565b61018e610cb6565b6001600160e01b03191660009081526001602052604090205460ff1690565b60095481565b60068054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156105ce5780601f106105a3576101008083540402835291602001916105ce565b820191906000526020600020905b8154815290600101906020018083116105b157829003601f168201915b505050505090505b90565b60006105e482610d44565b61061f5760405162461bcd60e51b815260040180806020018281038252602c815260200180611529602c913960400191505060405180910390fd5b506000908152600360205260409020546001600160a01b031690565b6000610646826107e4565b9050806001600160a01b0316836001600160a01b031614156106995760405162461bcd60e51b81526004018080602001828103825260218152602001806115ad6021913960400191505060405180910390fd5b336001600160a01b03821614806106b557506106b58133610c88565b6106f05760405162461bcd60e51b815260040180806020018281038252603881526020018061149e6038913960400191505060405180910390fd5b60008281526003602052604080822080546001600160a01b0319166001600160a01b0387811691821790925591518593918516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a4505050565b3360009081526020819052604090205460011461076857600080fd5b61077181610d61565b50565b61077e3382610d73565b6107b95760405162461bcd60e51b81526004018080602001828103825260318152602001806115ce6031913960400191505060405180910390fd5b6107c4838383610e17565b505050565b6107c483838360405180602001604052806000815250610b39565b6000818152600260205260408120546001600160a01b0316806108385760405162461bcd60e51b81526004018080602001828103825260298152602001806115006029913960400191505060405180910390fd5b92915050565b3360009081526020819052604090205460011461085a57600080fd5b6001600160a01b03811660009081526020818152604080832060019055805134808252928101828152369282018390526004359460243594938593879333936001600160e01b0319813516938893919290919060608201848480828437600083820152604051601f909101601f1916909201829003965090945050505050a450505050565b60006001600160a01b0382166109265760405162461bcd60e51b815260040180806020018281038252602a8152602001806114d6602a913960400191505060405180910390fd5b6001600160a01b038216600090815260046020526040902061083890610f5b565b3360009081526020819052604081205460011461096357600080fd5b61083882610f5f565b60078054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156105ce5780601f106105a3576101008083540402835291602001916105ce565b336000908152602081905260409020546001146109e957600080fd5b6001600160a01b038116600090815260208181526040808320839055805134808252928101828152369282018390526004359460243594938593879333936001600160e01b0319813516938893919290919060608201848480828437600083820152604051601f909101601f1916909201829003965090945050505050a450505050565b6001600160a01b038216331415610acb576040805162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c657200000000000000604482015290519081900360640190fd5b3360008181526005602090815260408083206001600160a01b03871680855290835292819020805460ff1916861515908117909155815190815290519293927f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31929181900390910190a35050565b610b44848484610774565b610b5084848484610f7d565b610b8b5760405162461bcd60e51b815260040180806020018281038252603281526020018061141c6032913960400191505060405180910390fd5b50505050565b60006020819052908152604090205481565b6060610bae82610d44565b610be95760405162461bcd60e51b815260040180806020018281038252602f81526020018061157e602f913960400191505060405180910390fd5b60008281526008602090815260409182902080548351601f600260001961010060018616150201909316929092049182018490048402810184019094528084529091830182828015610c7c5780601f10610c5157610100808354040283529160200191610c7c565b820191906000526020600020905b815481529060010190602001808311610c5f57829003601f168201915b50505050509050919050565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b600a805460408051602060026001851615610100026000190190941693909304601f81018490048402820184019092528181529291830182828015610d3c5780601f10610d1157610100808354040283529160200191610d3c565b820191906000526020600020905b815481529060010190602001808311610d1f57829003601f168201915b505050505081565b6000908152600260205260409020546001600160a01b0316151590565b610771610d6d826107e4565b826110b0565b6000610d7e82610d44565b610db95760405162461bcd60e51b815260040180806020018281038252602c815260200180611472602c913960400191505060405180910390fd5b6000610dc4836107e4565b9050806001600160a01b0316846001600160a01b03161480610dff5750836001600160a01b0316610df4846105d9565b6001600160a01b0316145b80610e0f5750610e0f8185610c88565b949350505050565b826001600160a01b0316610e2a826107e4565b6001600160a01b031614610e6f5760405162461bcd60e51b81526004018080602001828103825260298152602001806115556029913960400191505060405180910390fd5b6001600160a01b038216610eb45760405162461bcd60e51b815260040180806020018281038252602481526020018061144e6024913960400191505060405180910390fd5b610ebd816110fc565b6001600160a01b0383166000908152600460205260409020610ede90611137565b6001600160a01b0382166000908152600460205260409020610eff9061114e565b60008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b5490565b6000610f6d82600954611157565b5050600980546001810190915590565b6000610f91846001600160a01b0316611288565b610f9d57506001610e0f565b604051630a85bd0160e11b815233600482018181526001600160a01b03888116602485015260448401879052608060648501908152865160848601528651600095928a169463150b7a029490938c938b938b939260a4019060208501908083838e5b83811015611017578181015183820152602001610fff565b50505050905090810190601f1680156110445780820380516001836020036101000a031916815260200191505b5095505050505050602060405180830381600087803b15801561106657600080fd5b505af115801561107a573d6000803e3d6000fd5b505050506040513d602081101561109057600080fd5b50516001600160e01b031916630a85bd0160e11b14915050949350505050565b6110ba828261128e565b60008181526008602052604090205460026000196101006001841615020190911604156110f85760008181526008602052604081206110f8916113c2565b5050565b6000818152600360205260409020546001600160a01b03161561077157600090815260036020526040902080546001600160a01b0319169055565b805461114a90600163ffffffff61136516565b9055565b80546001019055565b6001600160a01b0382166111b2576040805162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f2061646472657373604482015290519081900360640190fd5b6111bb81610d44565b1561120d576040805162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000604482015290519081900360640190fd5b600081815260026020908152604080832080546001600160a01b0319166001600160a01b03871690811790915583526004909152902061124c9061114e565b60405181906001600160a01b038416906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b3b151590565b816001600160a01b03166112a1826107e4565b6001600160a01b0316146112e65760405162461bcd60e51b81526004018080602001828103825260258152602001806115ff6025913960400191505060405180910390fd5b6112ef816110fc565b6001600160a01b038216600090815260046020526040902061131090611137565b60008181526002602052604080822080546001600160a01b0319169055518291906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b6000828211156113bc576040805162461bcd60e51b815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b50900390565b50805460018160011615610100020316600290046000825580601f106113e85750610771565b6000918252602091829020610771926105d692601f01048101905b808211156114175760008155600101611403565b509056fe4552433732313a207472616e7366657220746f206e6f6e20455243373231526563656976657220696d706c656d656e7465724552433732313a207472616e7366657220746f20746865207a65726f20616464726573734552433732313a206f70657261746f7220717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a20617070726f76652063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f76656420666f7220616c6c4552433732313a2062616c616e636520717565727920666f7220746865207a65726f20616464726573734552433732313a206f776e657220717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a20617070726f76656420717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a207472616e73666572206f6620746f6b656e2074686174206973206e6f74206f776e4552433732314d657461646174613a2055524920717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a20617070726f76616c20746f2063757272656e74206f776e65724552433732313a207472616e736665722063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f7665644552433732313a206275726e206f6620746f6b656e2074686174206973206e6f74206f776ea265627a7a72315820504ae964f05eaa57f17580009a066f2d4b580c396c0402387b6daf6a9132ea7764736f6c634300050f0032";

export class Title__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    name: string,
    symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Title> {
    return super.deploy(name, symbol, overrides || {}) as Promise<Title>;
  }
  getDeployTransaction(
    name: string,
    symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name, symbol, overrides || {});
  }
  attach(address: string): Title {
    return super.attach(address) as Title;
  }
  connect(signer: Signer): Title__factory {
    return super.connect(signer) as Title__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TitleInterface {
    return new utils.Interface(_abi) as TitleInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Title {
    return new Contract(address, _abi, signerOrProvider) as Title;
  }
}