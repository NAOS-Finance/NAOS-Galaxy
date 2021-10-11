/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  LenderDeployer,
  LenderDeployerInterface,
} from "../LenderDeployer";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "root_",
        type: "address",
      },
      {
        internalType: "address",
        name: "currency_",
        type: "address",
      },
      {
        internalType: "address",
        name: "trancheFab_",
        type: "address",
      },
      {
        internalType: "address",
        name: "memberlistFab_",
        type: "address",
      },
      {
        internalType: "address",
        name: "restrictedtokenFab_",
        type: "address",
      },
      {
        internalType: "address",
        name: "reserveFab_",
        type: "address",
      },
      {
        internalType: "address",
        name: "assessorFab_",
        type: "address",
      },
      {
        internalType: "address",
        name: "coordinatorFab_",
        type: "address",
      },
      {
        internalType: "address",
        name: "operatorFab_",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    constant: true,
    inputs: [],
    name: "assessor",
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
    inputs: [],
    name: "assessorFab",
    outputs: [
      {
        internalType: "contract AssessorFabLike",
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
    name: "challengeTime",
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
    name: "coordinator",
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
    inputs: [],
    name: "coordinatorFab",
    outputs: [
      {
        internalType: "contract CoordinatorFabLike",
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
    name: "currency",
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
    inputs: [],
    name: "deploy",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "deployAssessor",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "deployCoordinator",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "deployJunior",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "deployReserve",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "deploySenior",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "deployer",
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
        internalType: "uint256",
        name: "minSeniorRatio_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxSeniorRatio_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxReserve_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "challengeTime_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "seniorInterestRate_",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "seniorName_",
        type: "string",
      },
      {
        internalType: "string",
        name: "seniorSymbol_",
        type: "string",
      },
      {
        internalType: "string",
        name: "juniorName_",
        type: "string",
      },
      {
        internalType: "string",
        name: "juniorSymbol_",
        type: "string",
      },
    ],
    name: "init",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "juniorMemberlist",
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
    inputs: [],
    name: "juniorName",
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
    inputs: [],
    name: "juniorOperator",
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
    inputs: [],
    name: "juniorSymbol",
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
    inputs: [],
    name: "juniorToken",
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
    inputs: [],
    name: "juniorTranche",
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
    constant: true,
    inputs: [],
    name: "maxSeniorRatio",
    outputs: [
      {
        internalType: "uint256",
        name: "value",
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
    name: "memberlistFab",
    outputs: [
      {
        internalType: "contract MemberlistFabLike",
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
    name: "minSeniorRatio",
    outputs: [
      {
        internalType: "uint256",
        name: "value",
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
    name: "operatorFab",
    outputs: [
      {
        internalType: "contract OperatorFabLike",
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
    name: "reserve",
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
    inputs: [],
    name: "reserveFab",
    outputs: [
      {
        internalType: "contract ReserveFabLike",
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
    name: "restrictedTokenFab",
    outputs: [
      {
        internalType: "contract RestrictedTokenFabLike",
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
    name: "root",
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
    inputs: [],
    name: "seniorInterestRate",
    outputs: [
      {
        internalType: "uint256",
        name: "value",
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
    name: "seniorMemberlist",
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
    inputs: [],
    name: "seniorName",
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
    inputs: [],
    name: "seniorOperator",
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
    inputs: [],
    name: "seniorSymbol",
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
    inputs: [],
    name: "seniorToken",
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
    inputs: [],
    name: "seniorTranche",
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
    inputs: [],
    name: "trancheFab",
    outputs: [
      {
        internalType: "contract TrancheFabLike",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161297d38038061297d833981810160405261012081101561003457600080fd5b508051602082015160408301516060840151608085015160a086015160c087015160e088015161010090980151601d8054336001600160a01b0319918216179091556000805482166001600160a01b039a8b16178155600180548316998b1699909917909855600280548216978a169790971790965560078054871695891695909517909455600880548616938816939093179092556003805485169187169190911790556004805484169186169190911790556005805483169585169590951790945560068054909116929093169190911790915561286390819061011a90396000f3fe608060405234801561001057600080fd5b50600436106102275760003560e01c8063953c02bb11610130578063cd96711f116100b8578063e5a6b10f1161007c578063e5a6b10f1461061c578063eaa2e16e14610624578063ebf0c7171461062c578063ec171add14610634578063f3b3a9fa1461063c57610227565b8063cd96711f146105f4578063d1b96e7f146105fc578063d1cc74a114610604578063d5f394881461060c578063e216ad1c1461061457610227565b8063a639d0dc116100ff578063a639d0dc146105cc578063a6c01960146105d4578063b0e97872146105dc578063cd2f7606146105e4578063cd3293de146105ec57610227565b8063953c02bb146105ac57806399ac0569146105b45780639ea5ab3b146105bc578063a4727272146105c457610227565b806353ac9912116101b3578063775c300c11610182578063775c300c146105845780637eee93091461058c57806386d4779e146105945780638ac766081461059c5780639277b9d8146105a457610227565b806353ac9912146105645780635900bc7e1461056c57806360ee1e871461057457806375c1d95e1461057c57610227565b80631eba87b9116101fa5780631eba87b91461027c578063279f1667146102845780634466ee891461030157806348bfc4671461055457806350e855991461055c57610227565b80630a0090971461022c5780630eb4f661146102505780631821d6961461025a5780631afbb9b914610262575b600080fd5b610234610644565b604080516001600160a01b039092168252519081900360200190f35b610258610653565b005b610234610778565b61026a610787565b60408051918252519081900360200190f35b61023461078d565b61028c61079c565b6040805160208082528351818301528351919283929083019185019080838360005b838110156102c65781810151838201526020016102ae565b50505050905090810190601f1680156102f35780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610258600480360361012081101561031857600080fd5b8135916020810135916040820135916060810135916080820135919081019060c0810160a0820135600160201b81111561035157600080fd5b82018360208201111561036357600080fd5b803590602001918460018302840111600160201b8311171561038457600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295949360208101935035915050600160201b8111156103d657600080fd5b8201836020820111156103e857600080fd5b803590602001918460018302840111600160201b8311171561040957600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295949360208101935035915050600160201b81111561045b57600080fd5b82018360208201111561046d57600080fd5b803590602001918460018302840111600160201b8311171561048e57600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295949360208101935035915050600160201b8111156104e057600080fd5b8201836020820111156104f257600080fd5b803590602001918460018302840111600160201b8311171561051357600080fd5b91908080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092955061082a945050505050565b6102586108ec565b61028c6109f6565b610234610a51565b61028c610a60565b610258610abb565b610234611000565b61025861100f565b610234611fee565b610234611ffd565b61026a61200c565b610234612012565b610258612021565b610234612566565b610234612575565b61026a612584565b61023461258a565b610234612599565b6102346125a8565b6102586125b7565b6102346126b4565b61026a6126c3565b6102346126c9565b6102346126d8565b6102346126e7565b6102346126f6565b610234612705565b610234612714565b610234612723565b61028c612732565b61026a61278d565b6014546001600160a01b031681565b6013546001600160a01b03161580156106775750601d546001600160a01b03166001145b61068057600080fd5b60035460015460408051634ef4d25b60e11b81526001600160a01b03928316600482015290519190921691639de9a4b69160248083019260209291908290030181600087803b1580156106d257600080fd5b505af11580156106e6573d6000803e3d6000fd5b505050506040513d60208110156106fc57600080fd5b5051601380546001600160a01b0319166001600160a01b03928316179081905560008054604080516332fd71af60e11b815291851660048301525192909316926365fae35e926024808301939282900301818387803b15801561075e57600080fd5b505af1158015610772573d6000803e3d6000fd5b50505050565b600e546001600160a01b031681565b600d5481565b6005546001600160a01b031681565b601a805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156108225780601f106107f757610100808354040283529160200191610822565b820191906000526020600020905b81548152906001019060200180831161080557829003601f168201915b505050505081565b601d546001600160a01b0316331461084157600080fd5b600c8690556040805160208082018352908b905260098b9055815180820183528a9052600a8a9055600b899055815180820190925290869052600d86905584516108919160179190870190612793565b5082516108a5906018906020860190612793565b5081516108b9906019906020850190612793565b5080516108cd90601a906020840190612793565b5050601d80546001600160a01b03191660011790555050505050505050565b6014546001600160a01b03161580156109105750601d546001600160a01b03166001145b61091957600080fd5b600554600c5460408051631af689a160e31b81526004810192909252516001600160a01b039092169163d7b44d08916024808201926020929091908290030181600087803b15801561096a57600080fd5b505af115801561097e573d6000803e3d6000fd5b505050506040513d602081101561099457600080fd5b5051601480546001600160a01b0319166001600160a01b03928316179081905560008054604080516332fd71af60e11b815291851660048301525192909316926365fae35e926024808301939282900301818387803b15801561075e57600080fd5b6019805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156108225780601f106107f757610100808354040283529160200191610822565b601c546001600160a01b031681565b6018805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156108225780601f106107f757610100808354040283529160200191610822565b600f546001600160a01b0316158015610adf5750601d546001600160a01b03166001145b610ae857600080fd5b6008546040805163a7ab089560e01b8152600481019182526017805460026000196001831615610100020190911604604483018190526001600160a01b039094169363a7ab0895939192601892918291602481019160649091019086908015610b925780601f10610b6757610100808354040283529160200191610b92565b820191906000526020600020905b815481529060010190602001808311610b7557829003601f168201915b5050838103825284546002600019610100600184161502019091160480825260209091019085908015610c065780601f10610bdb57610100808354040283529160200191610c06565b820191906000526020600020905b815481529060010190602001808311610be957829003601f168201915b5050945050505050602060405180830381600087803b158015610c2857600080fd5b505af1158015610c3c573d6000803e3d6000fd5b505050506040513d6020811015610c5257600080fd5b5051601580546001600160a01b0319166001600160a01b0392831617908190556002546001546040805163cde95a6760e01b815291851660048301529284166024820152915192169163cde95a67916044808201926020929091908290030181600087803b158015610cc357600080fd5b505af1158015610cd7573d6000803e3d6000fd5b505050506040513d6020811015610ced57600080fd5b5051600f80546001600160a01b0319166001600160a01b0392831617905560075460408051630b1676a960e31b8152905191909216916358b3b5489160048083019260209291908290030181600087803b158015610d4a57600080fd5b505af1158015610d5e573d6000803e3d6000fd5b505050506040513d6020811015610d7457600080fd5b5051601b80546001600160a01b0319166001600160a01b03928316179055600654600f54604080516309dc729d60e21b81529184166004830152519190921691632771ca749160248083019260209291908290030181600087803b158015610ddb57600080fd5b505af1158015610def573d6000803e3d6000fd5b505050506040513d6020811015610e0557600080fd5b5051601180546001600160a01b0319166001600160a01b03928316179055601b5460008054604080516332fd71af60e11b815291851660048301525192909316926365fae35e926024808301939282900301818387803b158015610e6857600080fd5b505af1158015610e7c573d6000803e3d6000fd5b505060155460008054604080516332fd71af60e11b81526001600160a01b03928316600482015290519190931694506365fae35e935060248084019382900301818387803b158015610ecd57600080fd5b505af1158015610ee1573d6000803e3d6000fd5b5050601554600f54604080516332fd71af60e11b81526001600160a01b03928316600482015290519190921693506365fae35e9250602480830192600092919082900301818387803b158015610f3657600080fd5b505af1158015610f4a573d6000803e3d6000fd5b505060115460008054604080516332fd71af60e11b81526001600160a01b03928316600482015290519190931694506365fae35e935060248084019382900301818387803b158015610f9b57600080fd5b505af1158015610faf573d6000803e3d6000fd5b5050600f5460008054604080516332fd71af60e11b81526001600160a01b03928316600482015290519190931694506365fae35e935060248084019382900301818387803b15801561075e57600080fd5b6002546001600160a01b031681565b6014546001600160a01b0316158015906110335750600e546001600160a01b031615155b801561104957506013546001600160a01b031615155b801561105f5750600f546001600160a01b031615155b61106857600080fd5b601354600e5460408051639adc339d60e01b81526730b9b9b2b9b9b7b960c11b60048201526001600160a01b03928316602482015290519190921691639adc339d91604480830192600092919082900301818387803b1580156110ca57600080fd5b505af11580156110de573d6000803e3d6000fd5b5050601354600f54604080516332fd71af60e11b81526001600160a01b03928316600482015290519190921693506365fae35e9250602480830192600092919082900301818387803b15801561113357600080fd5b505af1158015611147573d6000803e3d6000fd5b5050601354601054604080516332fd71af60e11b81526001600160a01b03928316600482015290519190921693506365fae35e9250602480830192600092919082900301818387803b15801561119c57600080fd5b505af11580156111b0573d6000803e3d6000fd5b5050601354601454604080516332fd71af60e11b81526001600160a01b03928316600482015290519190921693506365fae35e9250602480830192600092919082900301818387803b15801561120557600080fd5b505af1158015611219573d6000803e3d6000fd5b5050601354600e54604080516332fd71af60e11b81526001600160a01b03928316600482015290519190921693506365fae35e9250602480830192600092919082900301818387803b15801561126e57600080fd5b505af1158015611282573d6000803e3d6000fd5b5050600f5460135460408051639adc339d60e01b8152667265736572766560c81b60048201526001600160a01b0392831660248201529051919092169350639adc339d9250604480830192600092919082900301818387803b1580156112e757600080fd5b505af11580156112fb573d6000803e3d6000fd5b505060105460135460408051639adc339d60e01b8152667265736572766560c81b60048201526001600160a01b0392831660248201529051919092169350639adc339d9250604480830192600092919082900301818387803b15801561136057600080fd5b505af1158015611374573d6000803e3d6000fd5b5050600f54601454604080516332fd71af60e11b81526001600160a01b03928316600482015290519190921693506365fae35e9250602480830192600092919082900301818387803b1580156113c957600080fd5b505af11580156113dd573d6000803e3d6000fd5b5050601054601454604080516332fd71af60e11b81526001600160a01b03928316600482015290519190921693506365fae35e9250602480830192600092919082900301818387803b15801561143257600080fd5b505af1158015611446573d6000803e3d6000fd5b5050600f54601154604080516332fd71af60e11b81526001600160a01b03928316600482015290519190921693506365fae35e9250602480830192600092919082900301818387803b15801561149b57600080fd5b505af11580156114af573d6000803e3d6000fd5b5050601054601254604080516332fd71af60e11b81526001600160a01b03928316600482015290519190921693506365fae35e9250602480830192600092919082900301818387803b15801561150457600080fd5b505af1158015611518573d6000803e3d6000fd5b5050600f5460145460408051639adc339d60e01b81526a32b837b1b42a34b1b5b2b960a91b60048201526001600160a01b0392831660248201529051919092169350639adc339d9250604480830192600092919082900301818387803b15801561158157600080fd5b505af1158015611595573d6000803e3d6000fd5b505060105460145460408051639adc339d60e01b81526a32b837b1b42a34b1b5b2b960a91b60048201526001600160a01b0392831660248201529051919092169350639adc339d9250604480830192600092919082900301818387803b1580156115fe57600080fd5b505af1158015611612573d6000803e3d6000fd5b5050601554601b5460408051639adc339d60e01b8152691b595b58995c9b1a5cdd60b21b60048201526001600160a01b0392831660248201529051919092169350639adc339d9250604480830192600092919082900301818387803b15801561167a57600080fd5b505af115801561168e573d6000803e3d6000fd5b5050601654601c5460408051639adc339d60e01b8152691b595b58995c9b1a5cdd60b21b60048201526001600160a01b0392831660248201529051919092169350639adc339d9250604480830192600092919082900301818387803b1580156116f657600080fd5b505af115801561170a573d6000803e3d6000fd5b5050601c546010546040805163066c26f960e31b81526001600160a01b0392831660048201526000196024820152905191909216935063336137c89250604480830192600092919082900301818387803b15801561176757600080fd5b505af115801561177b573d6000803e3d6000fd5b5050601b54600f546040805163066c26f960e31b81526001600160a01b0392831660048201526000196024820152905191909216935063336137c89250604480830192600092919082900301818387803b1580156117d857600080fd5b505af11580156117ec573d6000803e3d6000fd5b5050601154600f5460408051639adc339d60e01b8152667472616e63686560c81b60048201526001600160a01b0392831660248201529051919092169350639adc339d9250604480830192600092919082900301818387803b15801561185157600080fd5b505af1158015611865573d6000803e3d6000fd5b505060125460105460408051639adc339d60e01b8152667472616e63686560c81b60048201526001600160a01b0392831660248201529051919092169350639adc339d9250604480830192600092919082900301818387803b1580156118ca57600080fd5b505af11580156118de573d6000803e3d6000fd5b505060115460155460408051639adc339d60e01b8152643a37b5b2b760d91b60048201526001600160a01b0392831660248201529051919092169350639adc339d9250604480830192600092919082900301818387803b15801561194157600080fd5b505af1158015611955573d6000803e3d6000fd5b505060125460165460408051639adc339d60e01b8152643a37b5b2b760d91b60048201526001600160a01b0392831660248201529051919092169350639adc339d9250604480830192600092919082900301818387803b1580156119b857600080fd5b505af11580156119cc573d6000803e3d6000fd5b505060145460135460408051639adc339d60e01b8152667265736572766560c81b60048201526001600160a01b0392831660248201529051919092169350639adc339d9250604480830192600092919082900301818387803b158015611a3157600080fd5b505af1158015611a45573d6000803e3d6000fd5b5050601454600f5460408051639adc339d60e01b81526c73656e696f725472616e63686560981b60048201526001600160a01b0392831660248201529051919092169350639adc339d9250604480830192600092919082900301818387803b158015611ab057600080fd5b505af1158015611ac4573d6000803e3d6000fd5b505060145460105460408051639adc339d60e01b81526c6a756e696f725472616e63686560981b60048201526001600160a01b0392831660248201529051919092169350639adc339d9250604480830192600092919082900301818387803b158015611b2f57600080fd5b505af1158015611b43573d6000803e3d6000fd5b5050601454600e5460408051639adc339d60e01b81526730b9b9b2b9b9b7b960c11b60048201526001600160a01b0392831660248201529051919092169350639adc339d9250604480830192600092919082900301818387803b158015611ba957600080fd5b505af1158015611bbd573d6000803e3d6000fd5b5050600e54600f5460408051639adc339d60e01b81526c73656e696f725472616e63686560981b60048201526001600160a01b0392831660248201529051919092169350639adc339d9250604480830192600092919082900301818387803b158015611c2857600080fd5b505af1158015611c3c573d6000803e3d6000fd5b5050600e5460105460408051639adc339d60e01b81526c6a756e696f725472616e63686560981b60048201526001600160a01b0392831660248201529051919092169350639adc339d9250604480830192600092919082900301818387803b158015611ca757600080fd5b505af1158015611cbb573d6000803e3d6000fd5b5050600e5460135460408051639adc339d60e01b8152667265736572766560c81b60048201526001600160a01b0392831660248201529051919092169350639adc339d9250604480830192600092919082900301818387803b158015611d2057600080fd5b505af1158015611d34573d6000803e3d6000fd5b5050600e54601454604080516332fd71af60e11b81526001600160a01b03928316600482015290519190921693506365fae35e9250602480830192600092919082900301818387803b158015611d8957600080fd5b505af1158015611d9d573d6000803e3d6000fd5b5050600e54601354604080516332fd71af60e11b81526001600160a01b03928316600482015290519190921693506365fae35e9250602480830192600092919082900301818387803b158015611df257600080fd5b505af1158015611e06573d6000803e3d6000fd5b5050600e54600d5460408051630a6ba04560e21b81527173656e696f72496e7465726573745261746560701b60048201526024810192909252516001600160a01b0390921693506329ae8114925060448082019260009290919082900301818387803b158015611e7557600080fd5b505af1158015611e89573d6000803e3d6000fd5b5050600e54600b5460408051630a6ba04560e21b8152696d61785265736572766560b01b60048201526024810192909252516001600160a01b0390921693506329ae8114925060448082019260009290919082900301818387803b158015611ef057600080fd5b505af1158015611f04573d6000803e3d6000fd5b5050600e54600a5460408051630a6ba04560e21b81526d6d617853656e696f72526174696f60901b60048201526024810192909252516001600160a01b0390921693506329ae8114925060448082019260009290919082900301818387803b158015611f6f57600080fd5b505af1158015611f83573d6000803e3d6000fd5b5050600e5460095460408051630a6ba04560e21b81526d6d696e53656e696f72526174696f60901b60048201526024810192909252516001600160a01b0390921693506329ae8114925060448082019260009290919082900301818387803b15801561075e57600080fd5b6003546001600160a01b031681565b6010546001600160a01b031681565b60095481565b6012546001600160a01b031681565b6010546001600160a01b03161580156120455750601d546001600160a01b03166001145b61204e57600080fd5b6008546040805163a7ab089560e01b8152600481019182526019805460026000196001831615610100020190911604604483018190526001600160a01b039094169363a7ab0895939192601a929182916024810191606490910190869080156120f85780601f106120cd576101008083540402835291602001916120f8565b820191906000526020600020905b8154815290600101906020018083116120db57829003601f168201915b505083810382528454600260001961010060018416150201909116048082526020909101908590801561216c5780601f106121415761010080835404028352916020019161216c565b820191906000526020600020905b81548152906001019060200180831161214f57829003601f168201915b5050945050505050602060405180830381600087803b15801561218e57600080fd5b505af11580156121a2573d6000803e3d6000fd5b505050506040513d60208110156121b857600080fd5b5051601680546001600160a01b0319166001600160a01b0392831617908190556002546001546040805163cde95a6760e01b815291851660048301529284166024820152915192169163cde95a67916044808201926020929091908290030181600087803b15801561222957600080fd5b505af115801561223d573d6000803e3d6000fd5b505050506040513d602081101561225357600080fd5b5051601080546001600160a01b0319166001600160a01b0392831617905560075460408051630b1676a960e31b8152905191909216916358b3b5489160048083019260209291908290030181600087803b1580156122b057600080fd5b505af11580156122c4573d6000803e3d6000fd5b505050506040513d60208110156122da57600080fd5b5051601c80546001600160a01b0319166001600160a01b03928316179055600654601054604080516309dc729d60e21b81529184166004830152519190921691632771ca749160248083019260209291908290030181600087803b15801561234157600080fd5b505af1158015612355573d6000803e3d6000fd5b505050506040513d602081101561236b57600080fd5b5051601280546001600160a01b0319166001600160a01b03928316179055601c5460008054604080516332fd71af60e11b815291851660048301525192909316926365fae35e926024808301939282900301818387803b1580156123ce57600080fd5b505af11580156123e2573d6000803e3d6000fd5b505060165460008054604080516332fd71af60e11b81526001600160a01b03928316600482015290519190931694506365fae35e935060248084019382900301818387803b15801561243357600080fd5b505af1158015612447573d6000803e3d6000fd5b5050601654601054604080516332fd71af60e11b81526001600160a01b03928316600482015290519190921693506365fae35e9250602480830192600092919082900301818387803b15801561249c57600080fd5b505af11580156124b0573d6000803e3d6000fd5b505060125460008054604080516332fd71af60e11b81526001600160a01b03928316600482015290519190931694506365fae35e935060248084019382900301818387803b15801561250157600080fd5b505af1158015612515573d6000803e3d6000fd5b505060105460008054604080516332fd71af60e11b81526001600160a01b03928316600482015290519190931694506365fae35e935060248084019382900301818387803b15801561075e57600080fd5b6007546001600160a01b031681565b6004546001600160a01b031681565b600c5481565b600f546001600160a01b031681565b601b546001600160a01b031681565b6016546001600160a01b031681565b600e546001600160a01b03161580156125db5750601d546001600160a01b03166001145b6125e457600080fd5b6004805460408051637bc2050f60e11b815290516001600160a01b039092169263f7840a1e9282820192602092908290030181600087803b15801561262857600080fd5b505af115801561263c573d6000803e3d6000fd5b505050506040513d602081101561265257600080fd5b5051600e80546001600160a01b0319166001600160a01b03928316179081905560008054604080516332fd71af60e11b815291851660048301525192909316926365fae35e926024808301939282900301818387803b15801561075e57600080fd5b6013546001600160a01b031681565b600a5481565b6006546001600160a01b031681565b6011546001600160a01b031681565b601d546001600160a01b031681565b6015546001600160a01b031681565b6001546001600160a01b031681565b6008546001600160a01b031681565b6000546001600160a01b031681565b6017805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156108225780601f106107f757610100808354040283529160200191610822565b600b5481565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106127d457805160ff1916838001178555612801565b82800160010185558215612801579182015b828111156128015782518255916020019190600101906127e6565b5061280d929150612811565b5090565b61282b91905b8082111561280d5760008155600101612817565b9056fea265627a7a72315820b9b210025b990fd29c542687133cbda1a49af0a7daeb8219750dd2f6a2d84e5b64736f6c634300050f0032";

export class LenderDeployer__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    root_: string,
    currency_: string,
    trancheFab_: string,
    memberlistFab_: string,
    restrictedtokenFab_: string,
    reserveFab_: string,
    assessorFab_: string,
    coordinatorFab_: string,
    operatorFab_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<LenderDeployer> {
    return super.deploy(
      root_,
      currency_,
      trancheFab_,
      memberlistFab_,
      restrictedtokenFab_,
      reserveFab_,
      assessorFab_,
      coordinatorFab_,
      operatorFab_,
      overrides || {}
    ) as Promise<LenderDeployer>;
  }
  getDeployTransaction(
    root_: string,
    currency_: string,
    trancheFab_: string,
    memberlistFab_: string,
    restrictedtokenFab_: string,
    reserveFab_: string,
    assessorFab_: string,
    coordinatorFab_: string,
    operatorFab_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      root_,
      currency_,
      trancheFab_,
      memberlistFab_,
      restrictedtokenFab_,
      reserveFab_,
      assessorFab_,
      coordinatorFab_,
      operatorFab_,
      overrides || {}
    );
  }
  attach(address: string): LenderDeployer {
    return super.attach(address) as LenderDeployer;
  }
  connect(signer: Signer): LenderDeployer__factory {
    return super.connect(signer) as LenderDeployer__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LenderDeployerInterface {
    return new utils.Interface(_abi) as LenderDeployerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LenderDeployer {
    return new Contract(address, _abi, signerOrProvider) as LenderDeployer;
  }
}
