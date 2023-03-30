export type Blockchain =
  | "solana"
  | "polygon"
  | "iotex"
  | "algorand"
  | "bsc"
  | "constellation"
  | "kadena"
  | "cardano"

export const blockchainInfo = {
  solana: {
    name: "Solana",
    token: "SOL",
    website: "https://solana.com",
    coingecko: "https://www.coingecko.com/en/coins/solana",
    logo: "/images/blockchains/solana.png",
  },
  polygon: {
    name: "Polygon",
    token: "MATIC",
    website: "https://polygon.technology",
    coingecko: "https://www.coingecko.com/en/coins/polygon",
    logo: "/images/blockchains/polygon.png",
  },
  iotex: {
    name: "IoTeX",
    token: "IOTX",
    website: "https://iotex.io",
    coingecko: "https://www.coingecko.com/en/coins/iotex",
    logo: "/images/blockchains/iotex.png",
  },
  algorand: {
    name: "Algorand",
    token: "ALGO",
    website: "https://algorand.com",
    coingecko: "https://www.coingecko.com/en/coins/algorand",
    logo: "/images/blockchains/algorand.png",
  },
  bsc: {
    name: "BSC",
    token: "BNB",
    website: "https://www.bnbchain.org",
    coingecko: "https://www.coingecko.com/en/coins/bnb",
    logo: "/images/blockchains/bsc.png",
  },
  constellation: {
    name: "Constellation",
    token: "DAG",
    website: "https://constellationnetwork.io",
    coingecko: "https://www.coingecko.com/en/coins/constellation",
    logo: "/images/blockchains/constellation.webp",
  },
  kadena: {
    name: "Kadena",
    token: "KDA",
    website: "https://kadena.io",
    coingecko: "https://www.coingecko.com/en/coins/kadena",
    logo: "/images/blockchains/kadena.png",
  },
  cardano: {
    name: "Cardano",
    token: "ADA",
    website: "https://cardano.org",
    coingecko: "https://www.coingecko.com/en/coins/cardano",
    logo: "/images/blockchains/cardano.png",
  },
}
