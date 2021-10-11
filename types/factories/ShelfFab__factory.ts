/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ShelfFab, ShelfFabInterface } from "../ShelfFab";

const _abi = [
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "tkn_",
        type: "address",
      },
      {
        internalType: "address",
        name: "title_",
        type: "address",
      },
      {
        internalType: "address",
        name: "debt_",
        type: "address",
      },
      {
        internalType: "address",
        name: "ceiling_",
        type: "address",
      },
    ],
    name: "newShelf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50612a1f806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c80635d558fbd14610030575b600080fd5b61006e6004803603608081101561004657600080fd5b506001600160a01b03813581169160208101358216916040820135811691606001351661008a565b604080516001600160a01b039092168252519081900360200190f35b6000808585858560405161009d906101b1565b6001600160a01b039485168152928416602084015290831660408084019190915292166060820152905190819003608001906000f0801580156100e4573d6000803e3d6000fd5b50604080516332fd71af60e11b815233600482015290519192506001600160a01b038316916365fae35e9160248082019260009290919082900301818387803b15801561013057600080fd5b505af1158015610144573d6000803e3d6000fd5b505060408051639c52a7f160e01b815230600482015290516001600160a01b0385169350639c52a7f19250602480830192600092919082900301818387803b15801561018f57600080fd5b505af11580156101a3573d6000803e3d6000fd5b509298975050505050505050565b61282c806101bf8339019056fe608060405234801561001057600080fd5b5060405161282c38038061282c8339818101604052608081101561003357600080fd5b508051602080830151604080850151606090950151600180546001600160a01b039485166001600160a01b0319918216811783553360009081529687905293909520556005805495841695851695909517909455600280548416909117905560048054948216948316949094179093556003805493909216921691909117905561276a806100c26000396000f3fe608060405234801561001057600080fd5b50600436106101fb5760003560e01c8063867904b41161011a578063bfe10928116100ad578063dd4670641161007c578063dd4670641461057f578063ddd5e1b21461059c578063e5a6b10f146105c8578063e6cb9013146105d0578063f7f0b4d6146105f3576101fb565b8063bfe1092814610514578063ce50dc7b1461051c578063d05c78da14610539578063d8aed1451461055c576101fb565b8063b5931f7c116100e9578063b5931f7c146104bb578063b69ef8a8146104de578063bcead63e146104e6578063bf353dbb146104ee576101fb565b8063867904b41461041a5780639adc339d146104465780639c52a7f114610472578063a293d1e814610498576101fb565b80634903b0d11161019257806365fae35e1161016157806365fae35e146103a657806367457022146103cc578063753ed1bd146103ef578063843f7b89146103f7576101fb565b80634903b0d11461035c5780634a79d50c146103795780636198e3391461038157806362f6b10f1461039e576101fb565b80630aebeb4e116101ce5780630aebeb4e146102c35780630e2286d3146102e05780630ecbcdab1461031557806320e0363014610338576101fb565b8063044215c614610200578063056e00b31461024057806308e45dc11461025d5780630ad58d2f14610291575b600080fd5b61021d6004803603602081101561021657600080fd5b5035610624565b604080516001600160a01b03909316835260208301919091528051918290030190f35b61021d6004803603602081101561025657600080fd5b5035610648565b61028f6004803603606081101561027357600080fd5b508035906001600160a01b03602082013516906040013561066d565b005b61028f600480360360608110156102a757600080fd5b50803590602081013590604001356001600160a01b0316610a01565b61028f600480360360208110156102d957600080fd5b5035610d29565b610303600480360360408110156102f657600080fd5b50803590602001356110f4565b60408051918252519081900360200190f35b61028f6004803603604081101561032b57600080fd5b508035906020013561116f565b6103406114b0565b604080516001600160a01b039092168252519081900360200190f35b6103036004803603602081101561037257600080fd5b50356114bf565b6103406114d1565b61028f6004803603602081101561039757600080fd5b50356114e0565b610340611731565b61028f600480360360208110156103bc57600080fd5b50356001600160a01b0316611740565b610303600480360360408110156103e257600080fd5b50803590602001356117e1565b6103406117fa565b6103ff611809565b60408051921515835260208301919091528051918290030190f35b6103036004803603604081101561043057600080fd5b506001600160a01b0381351690602001356118be565b61028f6004803603604081101561045c57600080fd5b50803590602001356001600160a01b0316611b2e565b61028f6004803603602081101561048857600080fd5b50356001600160a01b0316611d96565b610303600480360360408110156104ae57600080fd5b5080359060200135611e36565b610303600480360360408110156104d157600080fd5b5080359060200135611e86565b610303611e91565b610340611e97565b6103036004803603602081101561050457600080fd5b50356001600160a01b0316611ea6565b610340611eb8565b6103036004803603602081101561053257600080fd5b5035611ec7565b6103036004803603604081101561054f57600080fd5b5080359060200135611ed9565b61028f6004803603604081101561057257600080fd5b5080359060200135611f37565b61028f6004803603602081101561059557600080fd5b50356120f9565b61028f600480360360408110156105b257600080fd5b50803590602001356001600160a01b0316612272565b610340612305565b610303600480360360408110156105e657600080fd5b5080359060200135612314565b6106106004803603602081101561060957600080fd5b503561235e565b604080519115158252519081900360200190f35b600090815260096020526040902080546001909101546001600160a01b0390911691565b600960205260009081526040902080546001909101546001600160a01b039091169082565b3360009081526020819052604090205460011461068957600080fd5b6004805460408051633a27a67b60e11b81528084018790529051923592602480359334936001600160a01b039091169263744f4cf69282810192600092919082900301818387803b1580156106dd57600080fd5b505af11580156106f1573d6000803e3d6000fd5b505060048054604080516303c0053960e31b81529283018b905251600094506001600160a01b039091169250631e0029c89160248082019260209290919082900301818787803b15801561074457600080fd5b505af1158015610758573d6000803e3d6000fd5b505050506040513d602081101561076e57600080fd5b5051600554604080516323b872dd60e01b81526001600160a01b038a81166004830152306024830152604482018a905291519394509116916323b872dd916064808201926020929091908290030181600087803b1580156107ce57600080fd5b505af11580156107e2573d6000803e3d6000fd5b505050506040513d60208110156107f857600080fd5b5051610846576040805162461bcd60e51b815260206004820152601860248201527718dd5c9c995b98de4b5d1c985b9cd9995c8b59985a5b195960421b604482015290519081900360640190fd5b6003546040805163d8aed14560e01b8152600481018a90526024810184905290516001600160a01b039092169163d8aed1459160448082019260009290919082900301818387803b15801561089a57600080fd5b505af11580156108ae573d6000803e3d6000fd5b50506004805460408051632047a26760e01b81529283018c905260248301869052516001600160a01b039091169350632047a2679250604480830192600092919082900301818387803b15801561090457600080fd5b505af1158015610918573d6000803e3d6000fd5b50505050610925876123f9565b600660009054906101000a90046001600160a01b03166001600160a01b031663b69ef8a86040518163ffffffff1660e01b8152600401600060405180830381600087803b15801561097557600080fd5b505af1158015610989573d6000803e3d6000fd5b50505050508183336001600160a01b03166000356001600160e01b0319166001600160e01b0319168460003660405180848152602001806020018281038252848482818152602001925080828437600083820152604051601f909101601f1916909201829003965090945050505050a4505050505050565b600154604080516331a9108f60e11b8152600481018690529051859233926001600160a01b0390911691636352211e916024808201926020929091908290030181600087803b158015610a5357600080fd5b505af1158015610a67573d6000803e3d6000fd5b505050506040513d6020811015610a7d57600080fd5b50516001600160a01b031614610a9257600080fd5b60043560243534610aa28761235e565b610ae4576040805162461bcd60e51b815260206004820152600e60248201526d1b999d0b5b9bdd0b5b1bd8dad95960921b604482015290519081900360640190fd5b600087815260086020526040902054861115610b47576040805162461bcd60e51b815260206004820152601860248201527f77697468647261772d616d6f756e742d746f6f2d686967680000000000000000604482015290519081900360640190fd5b600660009054906101000a90046001600160a01b03166001600160a01b031663b69ef8a86040518163ffffffff1660e01b8152600401600060405180830381600087803b158015610b9757600080fd5b505af1158015610bab573d6000803e3d6000fd5b505050600088815260086020526040902054610bc8915087611e36565b600088815260086020526040902055600b54610be49087611e36565b600b556005546040805163a9059cbb60e01b81526001600160a01b038881166004830152602482018a90529151919092169163a9059cbb9160448083019260209291908290030181600087803b158015610c3d57600080fd5b505af1158015610c51573d6000803e3d6000fd5b505050506040513d6020811015610c6757600080fd5b5051610cb5576040805162461bcd60e51b815260206004820152601860248201527718dd5c9c995b98de4b5d1c985b9cd9995c8b59985a5b195960421b604482015290519081900360640190fd5b8183336001600160a01b03166000356001600160e01b0319166001600160e01b0319168460003660405180848152602001806020018281038252848482818152602001925080828437600083820152604051601f909101601f1916909201829003965090945050505050a450505050505050565b60048054604080516303c0053960e31b81528084018590529051923592602480359334936001600160a01b0390911692631e0029c8928281019260209291908290030181600087803b158015610d7e57600080fd5b505af1158015610d92573d6000803e3d6000fd5b505050506040513d6020811015610da857600080fd5b505115610df8576040805162461bcd60e51b81526020600482015260196024820152781b1bd85b8b5a185ccb5bdd5d1cdd185b991a5b99cb5919589d603a1b604482015290519081900360640190fd5b610e018461235e565b15610e44576040805162461bcd60e51b815260206004820152600e60248201526d1b999d0b5b9bdd0b5b1bd8dad95960921b604482015290519081900360640190fd5b600080610e5086610624565b600254604080516331a9108f60e11b8152600481018b9052905193955091935033926001600160a01b0390911691636352211e9160248083019260209291908290030181600087803b158015610ea557600080fd5b505af1158015610eb9573d6000803e3d6000fd5b505050506040513d6020811015610ecf57600080fd5b50516001600160a01b03161480610f665750336001600160a01b0316826001600160a01b0316636352211e836040518263ffffffff1660e01b81526004018082815260200191505060206040518083038186803b158015610f2f57600080fd5b505afa158015610f43573d6000803e3d6000fd5b505050506040513d6020811015610f5957600080fd5b50516001600160a01b0316145b610faf576040805162461bcd60e51b81526020600482015260156024820152743737ba16b637b0b716b7b916b7333a16b7bbb732b960591b604482015290519081900360640190fd5b60025460408051630575f5a760e11b81526004810189905290516001600160a01b0390921691630aebeb4e9160248082019260009290919082900301818387803b158015610ffc57600080fd5b505af1158015611010573d6000803e3d6000fd5b50505060008781526009602090815260408083208054600190910154825160609290921b6bffffffffffffffffffffffff1916828501526034808301919091528251808303909101815260549091018252805190830120808452600a9092528220919091559050611080876123f9565b5050508183336001600160a01b03166000356001600160e01b0319166001600160e01b0319168460003660405180848152602001806020018281038252848482818152602001925080828437600083820152604051601f909101601f1916909201829003965090945050505050a450505050565b600080821161113d576040805162461bcd60e51b815260206004820152601060248201526f6469766973696f6e206279207a65726f60801b604482015290519081900360640190fd5b81611160611157856b033b2e3c9fd0803ce8000000611ed9565b60028504612314565b8161116757fe5b049392505050565b600154604080516331a9108f60e11b8152600481018590529051849233926001600160a01b0390911691636352211e916024808201926020929091908290030181600087803b1580156111c157600080fd5b505af11580156111d5573d6000803e3d6000fd5b505050506040513d60208110156111eb57600080fd5b50516001600160a01b03161461120057600080fd5b600435602435346112108661235e565b611252576040805162461bcd60e51b815260206004820152600e60248201526d1b999d0b5b9bdd0b5b1bd8dad95960921b604482015290519081900360640190fd5b6007546001600160a01b0316156112c957600754604080516384d2823d60e01b81526004810189905290516001600160a01b03909216916384d2823d9160248082019260009290919082900301818387803b1580156112b057600080fd5b505af11580156112c4573d6000803e3d6000fd5b505050505b6004805460408051633a27a67b60e11b8152928301899052516001600160a01b039091169163744f4cf691602480830192600092919082900301818387803b15801561131457600080fd5b505af1158015611328573d6000803e3d6000fd5b505060035460408051630ecbcdab60e01b8152600481018b9052602481018a905290516001600160a01b039092169350630ecbcdab925060448082019260009290919082900301818387803b15801561138057600080fd5b505af1158015611394573d6000803e3d6000fd5b505060048054604080516301c7fecf60e21b81529283018b9052602483018a9052516001600160a01b03909116935063071ffb3c9250604480830192600092919082900301818387803b1580156113ea57600080fd5b505af11580156113fe573d6000803e3d6000fd5b50505060008781526008602052604090205461141b915086612314565b600087815260086020526040902055600b546114379086612314565b600b819055508183336001600160a01b03166000356001600160e01b0319166001600160e01b0319168460003660405180848152602001806020018281038252848482818152602001925080828437600083820152604051601f909101601f1916909201829003965090945050505050a4505050505050565b6007546001600160a01b031681565b60086020526000908152604090205481565b6002546001600160a01b031681565b600154604080516331a9108f60e11b8152600481018490529051839233926001600160a01b0390911691636352211e916024808201926020929091908290030181600087803b15801561153257600080fd5b505af1158015611546573d6000803e3d6000fd5b505050506040513d602081101561155c57600080fd5b50516001600160a01b03161461157157600080fd5b60048054604080516303c0053960e31b81528084018690529051923592602480359334936001600160a01b0390911692631e0029c8928281019260209291908290030181600087803b1580156115c657600080fd5b505af11580156115da573d6000803e3d6000fd5b505050506040513d60208110156115f057600080fd5b505115611640576040805162461bcd60e51b81526020600482015260196024820152781b1bd85b8b5a185ccb5bdd5d1cdd185b991a5b99cb5919589d603a1b604482015290519081900360640190fd5b600085815260096020526040808220805460019091015482516323b872dd60e01b8152306004820152336024820152604481019190915291516001600160a01b03909116926323b872dd926064808201939182900301818387803b1580156116a757600080fd5b505af11580156116bb573d6000803e3d6000fd5b505050508183336001600160a01b03166000356001600160e01b0319166001600160e01b0319168460003660405180848152602001806020018281038252848482818152602001925080828437600083820152604051601f909101601f1916909201829003965090945050505050a45050505050565b6004546001600160a01b031681565b3360009081526020819052604090205460011461175c57600080fd5b6001600160a01b03811660009081526020818152604080832060019055805134808252928101828152369282018390526004359460243594938593879333936001600160e01b0319813516938893919290919060608201848480828437600083820152604051601f909101601f1916909201829003965090945050505050a450505050565b60006b033b2e3c9fd0803ce80000006111608484611ed9565b6003546001600160a01b031681565b600554604080516370a0823160e01b81523060048201529051600092839283926001600160a01b03909216916370a0823191602480820192602092909190829003018186803b15801561185b57600080fd5b505afa15801561186f573d6000803e3d6000fd5b505050506040513d602081101561188557600080fd5b5051600b549091508110156118ac5760016118a2600b5483611e36565b92509250506118ba565b60006118a282600b54611e36565b9091565b604080516331a9108f60e11b81526004818101849052915160009235916024803592349233926001600160a01b038a1692636352211e928083019260209291829003018186803b15801561191157600080fd5b505afa158015611925573d6000803e3d6000fd5b505050506040513d602081101561193b57600080fd5b50516001600160a01b031614611988576040805162461bcd60e51b815260206004820152600d60248201526c1b999d0b5b9bdd0b5bdddb9959609a1b604482015290519081900360640190fd5b604080516bffffffffffffffffffffffff19606089901b16602080830191909152603480830189905283518084039091018152605490920183528151918101919091206000818152600a9092529190205415611a18576040805162461bcd60e51b815260206004820152600a6024820152696e66742d696e2d75736560b01b604482015290519081900360640190fd5b600254604080516371e928af60e01b815233600482015290516000926001600160a01b0316916371e928af91602480830192602092919082900301818787803b158015611a6457600080fd5b505af1158015611a78573d6000803e3d6000fd5b505050506040513d6020811015611a8e57600080fd5b50516000928352600a602090815260408085208390558285526009825280852080546001600160a01b0319166001600160a01b038d161781556001018a9055805186815291820181815236918301829052929850869488945033936001600160e01b03198235169388939160608201848480828437600083820152604051601f909101601f1916909201829003965090945050505050a450505092915050565b33600090815260208190526040902054600114611b4a57600080fd5b81653632b73232b960d11b1415611c6a57600c546001600160a01b031615611bdb57600554600c546040805163095ea7b360e01b81526001600160a01b0392831660048201526000602482018190529151929093169263095ea7b3926044808301939282900301818387803b158015611bc257600080fd5b505af1158015611bd6573d6000803e3d6000fd5b505050505b6005546040805163095ea7b360e01b81526001600160a01b03848116600483015260001960248301529151919092169163095ea7b391604480830192600092919082900301818387803b158015611c3157600080fd5b505af1158015611c45573d6000803e3d6000fd5b5050600c80546001600160a01b0319166001600160a01b03851617905550611d929050565b81643a37b5b2b760d91b1415611c9a57600580546001600160a01b0319166001600160a01b038316179055611d92565b81647469746c6560d81b1415611cca57600280546001600160a01b0319166001600160a01b038316179055611d92565b816370696c6560e01b1415611cf957600480546001600160a01b0319166001600160a01b038316179055611d92565b81666365696c696e6760c81b1415611d2b57600380546001600160a01b0319166001600160a01b038316179055611d92565b816a3234b9ba3934b13aba37b960a91b1415611d6157600680546001600160a01b0319166001600160a01b038316179055611d92565b816939bab139b1b934b132b960b11b14156101fb57600780546001600160a01b0319166001600160a01b0383161790555b5050565b33600090815260208190526040902054600114611db257600080fd5b6001600160a01b038116600090815260208181526040808320839055805134808252928101828152369282018390526004359460243594938593879333936001600160e01b0319813516938893919290919060608201848480828437600083820152604051601f909101601f1916909201829003965090945050505050a450505050565b80820382811115611e80576040805162461bcd60e51b815260206004820152600f60248201526e1cd859994b5cdd588b59985a5b1959608a1b604482015290519081900360640190fd5b92915050565b600081838161116757fe5b600b5481565b600c546001600160a01b031681565b60006020819052908152604090205481565b6006546001600160a01b031681565b600a6020526000908152604090205481565b6000811580611ef457505080820282828281611ef157fe5b04145b611e80576040805162461bcd60e51b815260206004820152600f60248201526e1cd859994b5b5d5b0b59985a5b1959608a1b604482015290519081900360640190fd5b600154604080516331a9108f60e11b8152600481018590529051849233926001600160a01b0390911691636352211e916024808201926020929091908290030181600087803b158015611f8957600080fd5b505af1158015611f9d573d6000803e3d6000fd5b505050506040513d6020811015611fb357600080fd5b50516001600160a01b031614611fc857600080fd5b60043560243534611fd88661235e565b61201a576040805162461bcd60e51b815260206004820152600e60248201526d1b999d0b5b9bdd0b5b1bd8dad95960921b604482015290519081900360640190fd5b6000868152600860205260409020541561207b576040805162461bcd60e51b815260206004820152601e60248201527f77697468647261772d72657175697265642d6265666f72652d72657061790000604482015290519081900360640190fd5b612086863387612431565b8183336001600160a01b03166000356001600160e01b0319166001600160e01b0319168460003660405180848152602001806020018281038252848482818152602001925080828437600083820152604051601f909101601f1916909201829003965090945050505050a4505050505050565b600154604080516331a9108f60e11b8152600481018490529051839233926001600160a01b0390911691636352211e916024808201926020929091908290030181600087803b15801561214b57600080fd5b505af115801561215f573d6000803e3d6000fd5b505050506040513d602081101561217557600080fd5b50516001600160a01b03161461218a57600080fd5b600754600435906024359034906001600160a01b03161561220b5760075460408051639df17b1960e01b81526004810188905290516001600160a01b0390921691639df17b199160248082019260009290919082900301818387803b1580156121f257600080fd5b505af1158015612206573d6000803e3d6000fd5b505050505b600085815260096020526040808220805460019091015482516323b872dd60e01b8152336004820152306024820152604481019190915291516001600160a01b03909116926323b872dd926064808201939182900301818387803b1580156116a757600080fd5b3360009081526020819052604090205460011461228e57600080fd5b600082815260096020526040808220805460019091015482516323b872dd60e01b8152306004828101919091526001600160a01b0387811660248481019190915260448401949094529451903595923594349416926323b872dd926064808201939182900301818387803b1580156116a757600080fd5b6005546001600160a01b031681565b80820182811015611e80576040805162461bcd60e51b815260206004820152600f60248201526e1cd859994b5859190b59985a5b1959608a1b604482015290519081900360640190fd5b6000818152600960209081526040808320805460019091015482516331a9108f60e11b81526004810191909152915130936001600160a01b0390921692636352211e926024808301939192829003018186803b1580156123bd57600080fd5b505afa1580156123d1573d6000803e3d6000fd5b505050506040513d60208110156123e757600080fd5b50516001600160a01b03161492915050565b6000818152600860205260409020548015611d9257600082815260086020526040812055600b5461242a9082611e36565b600b555050565b6004805460408051633a27a67b60e11b8152928301869052516001600160a01b039091169163744f4cf691602480830192600092919082900301818387803b15801561247c57600080fd5b505af1158015612490573d6000803e3d6000fd5b505060048054604080516303c0053960e31b815292830188905251600094506001600160a01b039091169250631e0029c89160248082019260209290919082900301818787803b1580156124e357600080fd5b505af11580156124f7573d6000803e3d6000fd5b505050506040513d602081101561250d57600080fd5b505190508082111561251d578091505b600554604080516323b872dd60e01b81526001600160a01b03868116600483015230602483015260448201869052915191909216916323b872dd9160648083019260209291908290030181600087803b15801561257957600080fd5b505af115801561258d573d6000803e3d6000fd5b505050506040513d60208110156125a357600080fd5b50516125f1576040805162461bcd60e51b815260206004820152601860248201527718dd5c9c995b98de4b5d1c985b9cd9995c8b59985a5b195960421b604482015290519081900360640190fd5b6003546040805163d8aed14560e01b8152600481018790526024810185905290516001600160a01b039092169163d8aed1459160448082019260009290919082900301818387803b15801561264557600080fd5b505af1158015612659573d6000803e3d6000fd5b50506004805460408051632047a26760e01b815292830189905260248301879052516001600160a01b039091169350632047a2679250604480830192600092919082900301818387803b1580156126af57600080fd5b505af11580156126c3573d6000803e3d6000fd5b50505050600660009054906101000a90046001600160a01b03166001600160a01b031663b69ef8a86040518163ffffffff1660e01b8152600401600060405180830381600087803b15801561271757600080fd5b505af115801561272b573d6000803e3d6000fd5b505050505050505056fea265627a7a72315820e8465ec87d41e92542b2b95e83d7a932f72750ece53757d5d8d8137093cbdcc864736f6c634300050f0032a265627a7a723158207ad30b034e759c29bc8e51811f4ebea9323e1ee82d3cfb8e2e998c6948f3899e64736f6c634300050f0032";

export class ShelfFab__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ShelfFab> {
    return super.deploy(overrides || {}) as Promise<ShelfFab>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ShelfFab {
    return super.attach(address) as ShelfFab;
  }
  connect(signer: Signer): ShelfFab__factory {
    return super.connect(signer) as ShelfFab__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ShelfFabInterface {
    return new utils.Interface(_abi) as ShelfFabInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ShelfFab {
    return new Contract(address, _abi, signerOrProvider) as ShelfFab;
  }
}
