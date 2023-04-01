import algorand from "@/app/(docs)/(pages)/blockchains/algorand.json"
import bsc from "@/app/(docs)/(pages)/blockchains/bsc.json"
import cardano from "@/app/(docs)/(pages)/blockchains/cardano.json"
import constellation from "@/app/(docs)/(pages)/blockchains/constellation.json"
import ethereum from "@/app/(docs)/(pages)/blockchains/ethereum.json"
import iotex from "@/app/(docs)/(pages)/blockchains/iotex.json"
import kadena from "@/app/(docs)/(pages)/blockchains/kadena.json"
import polkadot from "@/app/(docs)/(pages)/blockchains/polkadot.json"
import polygon from "@/app/(docs)/(pages)/blockchains/polygon.json"
import solana from "@/app/(docs)/(pages)/blockchains/solana.json"
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
