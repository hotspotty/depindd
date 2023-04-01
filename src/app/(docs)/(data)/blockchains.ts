import algorand from "../(pages)/blockchains/algorand.json"
import bsc from "../(pages)/blockchains/bsc.json"
import cardano from "../(pages)/blockchains/cardano.json"
import constellation from "../(pages)/blockchains/constellation.json"
import ethereum from "../(pages)/blockchains/ethereum.json"
import iotex from "../(pages)/blockchains/iotex.json"
import kadena from "../(pages)/blockchains/kadena.json"
import polkadot from "../(pages)/blockchains/polkadot.json"
import polygon from "../(pages)/blockchains/polygon.json"
import solana from "../(pages)/blockchains/solana.json"
import { BlockchainInfo } from "./types"

export const blockchains: BlockchainInfo[] = [
  solana as BlockchainInfo,
  polygon as BlockchainInfo,
  iotex as BlockchainInfo,
  algorand as BlockchainInfo,
  bsc as BlockchainInfo,
  constellation as BlockchainInfo,
  kadena as BlockchainInfo,
  cardano as BlockchainInfo,
  ethereum as BlockchainInfo,
  polkadot as BlockchainInfo,
]
