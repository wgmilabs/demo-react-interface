import {utils} from 'ethers'
import {Contract} from '@ethersproject/contracts'
import ERC721MarketPlace from './abi/ERC721MarketPlace.json';
import {ChainId} from "@usedapp/core";

const ERC721MarketPlaceInterface = new utils.Interface(ERC721MarketPlace.abi)
const ERC721MarketPlaceContractAddress = "0xf79d9b10C6D44F4562368d890e2f35E3f4a3af62"

export const contract =  new Contract(ERC721MarketPlaceContractAddress, ERC721MarketPlaceInterface)
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

