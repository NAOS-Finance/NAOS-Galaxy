/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ShelfMock, ShelfMockInterface } from "../ShelfMock";

const _abi = [
  {
    constant: false,
    inputs: [],
    name: "balanceRequest",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
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
        name: "loan",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "usr",
        type: "address",
      },
    ],
    name: "claim",
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
        name: "currency_",
        type: "address",
      },
      {
        internalType: "address",
        name: "recepeint",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "doApprove",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "loan",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "registry",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "nft",
        type: "uint256",
      },
    ],
    name: "file",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "loan",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "usr",
        type: "address",
      },
    ],
    name: "lock",
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
        name: "nftID",
        type: "bytes32",
      },
    ],
    name: "nftlookup",
    outputs: [
      {
        internalType: "uint256",
        name: "loan",
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
        name: "loan",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "usr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "currencyAmount",
        type: "uint256",
      },
    ],
    name: "recover",
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
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "shelf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
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
        name: "loan",
        type: "uint256",
      },
    ],
    name: "token",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
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
        name: "loan",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "usr",
        type: "address",
      },
    ],
    name: "unlock",
    outputs: [],
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
  "0x608060405234801561001057600080fd5b50610c52806100206000396000f3fe608060405234801561001057600080fd5b506004361061014d5760003560e01c8063843f7b89116100c3578063cff102651161007c578063cff1026514610403578063ddd5e1b214610420578063debc685a1461044c578063dfc4a5161461047e578063eb9d76eb146104b4578063f1d2ec1d146104e65761014d565b8063843f7b8914610335578063a4ed608714610358578063a98d6f4f14610375578063ac055e4014610392578063bf3e9d7c146103b5578063ce50dc7b146103e65761014d565b80632c7730fe116101155780632c7730fe146102335780633655626e146102625780635e2dcc1e1461029b57806366dfbfb4146102c757806368a9d29a146102f35780636edfc001146103105761014d565b8063044215c614610152578063056e00b31461019257806308e45dc1146101af57806321e8e12a146101e35780632554f27214610208575b600080fd5b61016f6004803603602081101561016857600080fd5b5035610512565b604080516001600160a01b03909316835260208301919091528051918290030190f35b61016f600480360360208110156101a857600080fd5b50356105c3565b6101e1600480360360608110156101c557600080fd5b508035906001600160a01b036020820135169060400135610627565b005b6101e1600480360360408110156101f957600080fd5b508035906020013515156106ea565b6101e16004803603606081101561021e57600080fd5b5080359060208101351515906040013561070a565b6102506004803603602081101561024957600080fd5b5035610723565b60408051918252519081900360200190f35b61027f6004803603602081101561027857600080fd5b5035610735565b604080516001600160a01b039092168252519081900360200190f35b6101e1600480360360408110156102b157600080fd5b50803590602001356001600160a01b0316610750565b6101e1600480360360408110156102dd57600080fd5b50803590602001356001600160a01b031661077e565b61027f6004803603602081101561030957600080fd5b503561081b565b6101e16004803603604081101561032657600080fd5b50803590602001351515610836565b61033d610856565b60408051921515835260208301919091528051918290030190f35b6102506004803603602081101561036e57600080fd5b50356108e8565b6102506004803603602081101561038b57600080fd5b50356108fa565b6101e1600480360360408110156103a857600080fd5b508035906020013561090c565b6103d2600480360360208110156103cb57600080fd5b503561091e565b604080519115158252519081900360200190f35b610250600480360360208110156103fc57600080fd5b5035610933565b6102506004803603602081101561041957600080fd5b503561097f565b6101e16004803603604081101561043657600080fd5b50803590602001356001600160a01b0316610991565b6101e16004803603606081101561046257600080fd5b508035906001600160a01b036020820135169060400135610a2f565b6101e16004803603606081101561049457600080fd5b506001600160a01b03813581169160208101359091169060400135610aef565b6101e1600480360360608110156104ca57600080fd5b508035906001600160a01b036020820135169060400135610b74565b6101e1600480360360408110156104fc57600080fd5b50803590602001356001600160a01b0316610b7e565b7f14df914960a5581256b1314a57ec976e43c8689072545a0de6f3eedbe605d6e655643a37b5b2b760d91b6000527fb95f50ed56e4e9994274594187b899ef6b37c96ef0c63e3b74c7fffca3d5a161805460019081019091557fb802d0713978018b2a559671deb0885243d1d107bb8ccf3719cdbca9e333e1a5546020919091527f95bd412ce5b28ea953159c653b761f1c71bbe19ccada9619fe0406efe18e14de546001600160a01b0390911691565b506439b432b63360d91b6000527f4a377ade3a830d6150503191a29325e359ee01df8a37cfe01d5a7a3473374bf55460016020527ff022e44fe791cddc293ad4a13b3c5134de32a3a3b0b3988802a1c4e3cd89e4d3546001600160a01b0390911691565b7fc243d8258193fafd719bb92ba599a42d8a8e22a8535e36c09285f8a8724863a5929092557f6d8e6c11a019d4f45662e0c57810fec505ffb2e4a13577eaf9814dde5bd8406e80546001600160a01b0319166001600160a01b03929092169190911790557fc70142b280e3d43521ed2fcaa2fb2b2cfe6db34e7a5e4a938439450b21178ffb55663932b1b7bb32b960c91b60009081526020527ffbb951131f6a8ddd18b92d02e4993708a264a319d88b64360ad5fbb5e2da9b2080546001019055565b600091825260036020526040909120805460ff1916911515919091179055565b61071483836106ea565b61071e838261090c565b505050565b60046020526000908152604090205481565b6005602052600090815260409020546001600160a01b031681565b60009182526002602052604090912080546001600160a01b0319166001600160a01b03909216919091179055565b7fe661fe62889bfacd1da19e6b4f86bbce306485ed727b57f7820ce23b00e06543919091557fdbd0382d9a48ac2b6447b1badca8bab3710b864863a63765ad2d7543b71b7c8f80546001600160a01b0319166001600160a01b03909216919091179055636c6f636b60e01b60009081526020527f9106f335b4c01d4e9949f1b538c11d3e557a2a0c29c003ab5d93cde4c59f981080546001019055565b6002602052600090815260409020546001600160a01b031681565b600091825260076020526040909120805460ff1916911515919091179055565b6d18985b185b98d954995c5d595cdd60921b6000527f039d6d4135ead48468a2190299c91f3190f912c0f4652db26ee19d2bb0c64755805460019081019091557f58ed7a0ba0d18b4f69f4ca6a9255ea65ab2077476c157f00a58182e75a702f7a546020919091527fbd7704f2e7425031062358eb85cec1a25708fee595fb412c0dc75b236b2e65775460ff90911691565b60016020526000908152604090205481565b60066020526000908152604090205481565b60009182526001602052604090912055565b60036020526000908152604090205460ff1681565b60008181526006602090815260408220929092556806e66746c6f6f6b75760bc1b9052600190527f5f57b3fafe6d82bdf66526c36e8638cf71e7ee7a6d1c39b404762555f54241225490565b60006020819052908152604090205481565b7ff542efd1accdb9ec15c511d7904c1d409fcb1dcc13d297c72a4bab0acdd7dab1919091557f8bb9775359ca67d357b6cb4faac2cd233d7cf93f9642c8efa64a6c7ba3bb649280546001600160a01b0319166001600160a01b0390921691909117905564636c61696d60d81b60009081526020527f2a003660f5cf40196cf08b4bf704d9eb6f7cc410f5ef03a856f84dbd21aa4aaa80546001019055565b7fa41f16d5722a40526f46cc4c27bf1a9c5597164e630f3e2fa69d4d8c722b08c2929092557fb2735fdd22efee1dc102c88ddbfbe4b73d9338f9888a00618550a58be9b6e0df80546001600160a01b0319166001600160a01b03929092169190911790557f8b4e185a82ab833a2e69985a3f23f030998a98c8b025e34bc9730dbd745a3472556366696c6560e01b60009081526020527f0d92b3f9f6dfbc9e49050cf2af4db239b8606b6dabd9aea510609899bebbc68980546001019055565b6040805163095ea7b360e01b81526001600160a01b038481166004830152602482018490529151859283169163095ea7b39160448083019260209291908290030181600087803b158015610b4257600080fd5b505af1158015610b56573d6000803e3d6000fd5b505050506040513d6020811015610b6c57600080fd5b505050505050565b6107148383610750565b7f2cc8fa109fa68464813196dbd9920c4353a8e7a7f01ef55676353f7d40d72650919091557f6d2c0a46cd0f9473c373da33e8c560771da5e241c07800d704314958249be7b380546001600160a01b0319166001600160a01b0390921691909117905565756e6c6f636b60d01b60009081526020527fc76e44f0f5729d9c60a37ef77d3a90c0c4cab6cd89f1c2b64b4d434561b2205c8054600101905556fea265627a7a723158209b59b3aff861fc68010e23da258b7c855f001ef4cc6f15b287b39a65860194b864736f6c634300050f0032";

export class ShelfMock__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ShelfMock> {
    return super.deploy(overrides || {}) as Promise<ShelfMock>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ShelfMock {
    return super.attach(address) as ShelfMock;
  }
  connect(signer: Signer): ShelfMock__factory {
    return super.connect(signer) as ShelfMock__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ShelfMockInterface {
    return new utils.Interface(_abi) as ShelfMockInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ShelfMock {
    return new Contract(address, _abi, signerOrProvider) as ShelfMock;
  }
}
