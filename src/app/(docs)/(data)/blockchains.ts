export type Blockchain =
  | "solana"
  | "polygon"
  | "iotex"
  | "algorand"
  | "bsc"
  | "hypergraph"
  | "kadena"
  | "cardano"

export const blockchainInfo = {
  solana: {
    name: "Solana",
    token: "SOL",
    website: "https://solana.com",
    coingecko: "https://www.coingecko.com/en/coins/solana",
  },
  polygon: {
    name: "Polygon",
    token: "MATIC",
    website: "https://polygon.technology",
    coingecko: "https://www.coingecko.com/en/coins/polygon",
  },
  iotex: {
    name: "IoTeX",
    token: "IOTX",
    website: "https://iotex.io",
    coingecko: "https://www.coingecko.com/en/coins/iotex",
  },
  algorand: {
    name: "Algorand",
    token: "ALGO",
    website: "https://algorand.com",
    coingecko: "https://www.coingecko.com/en/coins/algorand",
  },
  bsc: {
    name: "BSC",
    token: "BNB",
    website: "https://www.bnbchain.org",
    coingecko: "https://www.coingecko.com/en/coins/bnb",
  },
  hypergraph: {
    name: "Hypergraph",
    token: "DAG",
    website: "https://constellationnetwork.io/hypergraph",
    coingecko: "https://www.coingecko.com/en/coins/constellation",
  },
  kadena: {
    name: "Kadena",
    token: "KDA",
    website: "https://kadena.io",
    coingecko: "https://www.coingecko.com/en/coins/kadena",
  },
  cardano: {
    name: "Cardano",
    token: "ADA",
    website: "https://cardano.org",
    coingecko: "https://www.coingecko.com/en/coins/cardano",
  },
}
