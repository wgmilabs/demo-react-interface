import {utils} from 'ethers'
import {Contract} from '@ethersproject/contracts'
import ERC721MarketPlaceV1 from './abi/ERC721MarketPlaceV1.json';
import ERC721MarketPlaceV2 from './abi/ERC721MarketPlaceV2.json';
import {ChainId} from "@usedapp/core";

const ERC721MarketPlaceInterfaceV1 = new utils.Interface(ERC721MarketPlaceV1.abi)
const ERC721MarketPlaceInterfaceV2 = new utils.Interface(ERC721MarketPlaceV2.abi)
const version1Contract = "0xf79d9b10C6D44F4562368d890e2f35E3f4a3af62";
const version2Contract = "0xe8e5FDBeD6A5855b4A26eE95C18dE0e587C0B2f0";

export const contractV1 = new Contract(version1Contract, ERC721MarketPlaceInterfaceV1);
export const contractV2 = new Contract(version2Contract, ERC721MarketPlaceInterfaceV2);

export const getContract = (version: number) => {
    switch (version) {
        case 0:
            return contractV1;
        case 1:
            return contractV2;
        default:
            return contractV1;
    }
}

export const getExplorerUrl = (chainId: ChainId) => {
    switch (chainId) {
        case ChainId.Mainnet:
            return 'https://etherscan.io/address/';
        case ChainId.Ropsten:
            return 'https://ropsten.etherscan.io/address/';
        case ChainId.Kovan:
            return 'https://kovan.etherscan.io/address/';
        case ChainId.Rinkeby:
            return 'https://rinkeby.etherscan.io/address/';
        case ChainId.Goerli:
            return 'https://goerli.etherscan.io/address/';
        case ChainId.BSC:
            return 'https://bscscan.com/address/';
        case ChainId.BSCTestnet:
            return 'https://testnet.bscscan.com/address/';
    }
}

