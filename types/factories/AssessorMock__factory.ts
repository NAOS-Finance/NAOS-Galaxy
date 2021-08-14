/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { AssessorMock, AssessorMockInterface } from "../AssessorMock";

const _abi = [
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "accrueTrancheInterest",
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
        name: "currencyAmount",
        type: "uint256",
      },
    ],
    name: "borrowUpdate",
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
        name: "tranche",
        type: "address",
      },
    ],
    name: "calcAndUpdateTokenPrice",
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
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "tranche",
        type: "address",
      },
    ],
    name: "calcAssetValue",
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
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "calcJuniorTokenPrice",
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
    constant: false,
    inputs: [],
    name: "calcMaxSeniorAssetValue",
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
    constant: false,
    inputs: [],
    name: "calcMinJuniorAssetValue",
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
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "calcSeniorTokenPrice",
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
    inputs: [
      {
        internalType: "address",
        name: "tranche",
        type: "address",
      },
    ],
    name: "calcTokenPrice",
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
    inputs: [],
    name: "calcUpdateNAV",
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
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "calls",
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
        name: "seniorRatio_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "seniorSupply",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "seniorRedeem",
        type: "uint256",
      },
    ],
    name: "changeSeniorAsset",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "maxReserve",
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
        name: "tranche",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "currencyAmount",
        type: "uint256",
      },
    ],
    name: "redeemApprove",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
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
        internalType: "uint256",
        name: "currencyAmount",
        type: "uint256",
      },
    ],
    name: "repaymentUpdate",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "seniorBalance",
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
    constant: false,
    inputs: [],
    name: "seniorDebt",
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
    name: "seniorRatioBounds",
    outputs: [
      {
        internalType: "uint256",
        name: "minSeniorRatio_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxSeniorRatio_",
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
        internalType: "bytes32",
        name: "name",
        type: "bytes32",
      },
      {
        internalType: "bool",
        name: "flag",
        type: "bool",
      },
    ],
    name: "setFail",
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
        name: "name",
        type: "bytes32",
      },
      {
        internalType: "bool",
        name: "returnValue",
        type: "bool",
      },
    ],
    name: "setReturn",
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
        name: "name",
        type: "bytes32",
      },
      {
        internalType: "bool",
        name: "flag",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "setReturn",
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
        name: "name",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "returnValue",
        type: "address",
      },
    ],
    name: "setReturn",
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
        name: "name",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "returnValue",
        type: "uint256",
      },
    ],
    name: "setReturn",
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
        name: "name",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "setReturn",
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
        name: "tranche",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenPrice_",
        type: "uint256",
      },
    ],
    name: "setTokenPrice",
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
        name: "tranche",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "currencyAmount",
        type: "uint256",
      },
    ],
    name: "supplyApprove",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
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
    name: "tokenPrice",
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
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "values_address",
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
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "values_address_return",
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
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "values_bool_return",
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
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "values_bytes32",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
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
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "values_return",
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
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "values_uint",
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
  "0x608060405234801561001057600080fd5b50610da8806100206000396000f3fe608060405234801561001057600080fd5b50600436106101fb5760003560e01c8063a0eca55f1161011a578063bf3e9d7c116100ad578063eaa88b571161007c578063eaa88b571461058f578063eb9d76eb146105bb578063f35aac92146105ed578063f3b3a9fa14610613578063f727c98b1461061b576101fb565b8063bf3e9d7c1461052a578063cff1026514610547578063e1739bea14610564578063e59990f91461056c576101fb565b8063ac055e40116100e9578063ac055e40146104d6578063ac62d385146104f9578063ad0475bf14610501578063bae9949314610509576101fb565b8063a0eca55f14610477578063a4ed608714610494578063a812da81146104b1578063a98d6f4f146104b9576101fb565b8063437bf8551161019257806368a9d29a1161016157806368a9d29a146103cf5780636edfc001146103ec57806384ba3f69146104115780639fd9ac1f14610437576101fb565b8063437bf8551461032e5780634930466514610354578063514154231461037d5780635e2dcc1e146103a3576101fb565b80633655626e116101ce5780633655626e1461029e5780633c308d74146102d75780633cc893bb146102df578063431f63c914610302576101fb565b806307927bce1461020057806321e8e12a1461021f5780632554f272146102445780632c7730fe1461026f575b600080fd5b61021d6004803603602081101561021657600080fd5b5035610641565b005b61021d6004803603604081101561023557600080fd5b5080359060200135151561068e565b61021d6004803603606081101561025a57600080fd5b508035906020810135151590604001356106ae565b61028c6004803603602081101561028557600080fd5b50356106c7565b60408051918252519081900360200190f35b6102bb600480360360208110156102b457600080fd5b50356106d9565b604080516001600160a01b039092168252519081900360200190f35b61028c6106f4565b61028c600480360360408110156102f557600080fd5b5080359060200135610711565b61021d6004803603604081101561031857600080fd5b506001600160a01b03813516906020013561073a565b61028c6004803603602081101561034457600080fd5b50356001600160a01b0316610756565b61021d6004803603606081101561036a57600080fd5b50803590602081013590604001356107d7565b61028c6004803603602081101561039357600080fd5b50356001600160a01b031661086b565b61021d600480360360408110156103b957600080fd5b50803590602001356001600160a01b03166108b2565b6102bb600480360360208110156103e557600080fd5b50356108e0565b61021d6004803603604081101561040257600080fd5b508035906020013515156108fb565b61028c6004803603602081101561042757600080fd5b50356001600160a01b031661091b565b6104636004803603604081101561044d57600080fd5b506001600160a01b03813516906020013561092d565b604080519115158252519081900360200190f35b61021d6004803603602081101561048d57600080fd5b50356109f8565b61028c600480360360208110156104aa57600080fd5b5035610a45565b61028c610a57565b61028c600480360360208110156104cf57600080fd5b5035610a82565b61021d600480360360408110156104ec57600080fd5b5080359060200135610a94565b61028c610aa6565b61028c610ac1565b610511610aec565b6040805192835260208301919091528051918290030190f35b6104636004803603602081101561054057600080fd5b5035610b4e565b61028c6004803603602081101561055d57600080fd5b5035610b63565b61028c610b75565b61028c6004803603604081101561058257600080fd5b5080359060200135610b90565b610463600480360360408110156105a557600080fd5b506001600160a01b038135169060200135610bb2565b61021d600480360360608110156105d157600080fd5b508035906001600160a01b036020820135169060400135610c7d565b61028c6004803603602081101561060357600080fd5b50356001600160a01b0316610c87565b61028c610cfb565b61028c6004803603602081101561063157600080fd5b50356001600160a01b0316610d36565b7f626f72726f775570646174655f63757272656e6379416d6f756e74000000000060005260046020527f9404b093c9782e25fcc6d2ac7465d1d15f1d8b89a0e34fa8a6389cd24368866055565b600091825260036020526040909120805460ff1916911515919091179055565b6106b8838361068e565b6106c28382610a94565b505050565b60046020526000908152604090205481565b6005602052600090815260409020546001600160a01b031681565b600061070c691cd95b9a5bdc9119589d60b21b610d51565b905090565b60006107337363616c634a756e696f72546f6b656e507269636560601b610d51565b9392505050565b6001600160a01b03909116600090815260086020526040902055565b7f63616c63416e64557064617465546f6b656e50726963655f7472616e63686500600090815260056020527fab912b80dac4178eda15bed427e230b3153aadd9ada9549287d85b8acb44c37f80546001600160a01b0319166001600160a01b0384161790556107d169746f6b656e507269636560b01b610d51565b92915050565b60046020527fb80f8cbe89df52cb2888074671743630a9be22ee1c03ab2b1e87cb47cecbf4d9929092557f3e1afc8d2f3e4d5415fad334e15a717d0a723aa854548ea6d5d8e013383e9032557f6368616e676553656e696f7241737365745f73656e696f7252656465656d00006000527f62a32656a655b2959392dd0fe368bd1b052114609f39e3a062b1eb8fd40c915555565b50741858d8dc9d59551c985b98da19525b9d195c995cdd605a1b60005260016020527fea5a2989febffe30aa02134990e9b2dcedd6048c4789f7c9ef625b21f5b8a3fc5490565b60009182526002602052604090912080546001600160a01b0319166001600160a01b03909216919091179055565b6002602052600090815260409020546001600160a01b031681565b600091825260076020526040909120805460ff1916911515919091179055565b60086020526000908152604090205481565b7fa11d4468a2fbf400210d4362d401ad50fef527c28fc2b17ab532ef910a3b114c805460010190557fdd559e44a5bd6ef6eb5f5ea835e9ba8d6231a48efedea09de8a8a48d406bbb2080546001600160a01b0319166001600160a01b0393909316929092179091557f96ed315f8049a96d2a64f48a9917aafd240b2ca31fcdcfd912c6f0a26d0c4bb6556c737570706c79417070726f766560981b60005260036020527f8299221f5fbe34c9a4482a235f4014aa9e860381a219ac3359ec20464d95b51a5460ff1690565b7f72657061796d656e745570646174655f63757272656e6379416d6f756e74000060005260046020527fc0509bdabcaef071d53e40d0c542485513a33394b0532c42e10cf335327d737f55565b60016020526000908152604090205481565b600061070c7f63616c634d617853656e696f72417373657456616c7565000000000000000000610d51565b60066020526000908152604090205481565b60009182526001602052604090912055565b600061070c6c73656e696f7242616c616e636560981b610d51565b600061070c7f63616c634d696e4a756e696f72417373657456616c7565000000000000000000610d51565b60016020527ff4ba9d0c6c34bc83e64e6f77e6d6b5d44528c7bc0caab95bf9d804d684b0bc6e546d6d617853656e696f72526174696f60901b6000527f812ea4dc0fbe7e86cb87155ab28417c9416f733310594635b43f654c0c39136c549091565b60036020526000908152604090205460ff1681565b60006020819052908152604090205481565b600061070c6c31b0b631aab83230ba32a720ab60991b610d51565b60006107337363616c6353656e696f72546f6b656e507269636560601b610d51565b7f411bb1ec87433eb60ff3087549427a7b6686092f4381d5dd6eec200a1a7aff22805460010190557f2e361986e5e1d9892923a55f58c2f2fef7a7a82522b0124b8d8689701b2a5f5780546001600160a01b0319166001600160a01b0393909316929092179091557f8b5a80ef387a079edc4d8d6d19347af015abcc5aaa6ee6aa262fb1309ae8f520556c72656465656d417070726f766560981b60005260036020527fb178af2bff9da3b4e539b31648f7088af7aedc4b27e0f239d2234541fa28ce6e5460ff1690565b6106b883836108b2565b7563616c63417373657456616c75655f7472616e63686560501b600090815260056020527f85bf69cda164f4e77d61c4b1190a9b2a24a478b78a968b27d876b3047746349e80546001600160a01b0319166001600160a01b0384161790556107d169617373657456616c756560b01b610d51565b696d61785265736572766560b01b60005260016020527f2df2ac9861be49125077096456e1d687fa4f86e9e953bb8500630667091edfe35490565b6001600160a01b031660009081526008602052604090205490565b600090815260208181526040808320805460019081019091559091529020549056fea265627a7a723158209683a2f2adab06ef27bb582b3d6a8369e04be2e8c816497c16884879b232faea64736f6c634300050f0032";

export class AssessorMock__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<AssessorMock> {
    return super.deploy(overrides || {}) as Promise<AssessorMock>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): AssessorMock {
    return super.attach(address) as AssessorMock;
  }
  connect(signer: Signer): AssessorMock__factory {
    return super.connect(signer) as AssessorMock__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AssessorMockInterface {
    return new utils.Interface(_abi) as AssessorMockInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AssessorMock {
    return new Contract(address, _abi, signerOrProvider) as AssessorMock;
  }
}
