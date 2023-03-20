interface Miner {
  name: string
  url: string
  price: number
}

interface Score {
  type: "governance" | "tokenomics" | "ease-of-mining"
  value: number
  description: string
}

export interface NetworkInfo {
  id: string // Miner network filename
  miners: Miner[]
  scores: Score[]
  category: "energy" | "sensor" | "server" | "wireless"
  token: string // All caps, no dollar sign. E.g. HNT
  blockchain: "solana" | "polygon"
  state: "development" | "production"
}

export const networks: NetworkInfo[] = [
  {
    id: "dimo",
    miners: [],
    scores: [
      {
        type: "governance",
        value: 8,
        description:
          "DIMO's community governance is considered strong, as demonstrated by the creation of DIP-6, which outlines governance for the DIMO Foundation, an entity registered with the Cayman Islands Monetary Authority (CIMA). Digital Infrastructure Inc., the corporation that initially developed DIMO, still plays a role in the network through a legal services agreement with the Foundation. However, all decisions are made by the community and are pushed through by the Foundation, which covers important roles such as being the smart contract admin, treasury allocation, enacting contracts to pursue network duties, using IP and the DIMO brand as seen fit by the community, and revoking any licenses in instances of malice. These powers are enacted solely through the involvement of the community via DIPs. If you're interested in learning more, we suggest taking a look at [DIP-6](https://docs.dimo.zone/governance/dip6).",
      },
      {
        type: "tokenomics",
        value: 6,
        description: `In its current state the ease of mining on DIMO is arguably one of the easiest within the DePIN ecosystem and is fairly passive once installed. ince rewards are accrued via the baseline issuance, users are incentivized simply by how active they are on the network and ensuring their hardware device is connected to their car and the app.
        
        As the network matures, the difficulty will increase in order to achieve several goals. Firstly, it will incentivize a continuous data connection, which will allow for a fuller story of driver behavior and vehicle performance to be captured over a longer period of time. Secondly, it will reward those who provide a greater quantity and frequency of reliable data, as this will be more valuable to the network than sporadic or low-quality data. Finally, the system will avoid rewarding based on distance or time traveled, as this could incentivize unnecessary and wasteful driving behavior that would not benefit the network or its users.`,
      },
      {
        type: "ease-of-mining",
        value: 9,
        description: `In its current state the ease of mining on DIMO is arguably one of the easiest within the DePIN ecosystem and is fairly passive once installed. ince rewards are accrued via the baseline issuance, users are incentivized simply by how active they are on the network and ensuring their hardware device is connected to their car and the app.
        
        As the network matures, the difficulty will increase in order to achieve several goals. Firstly, it will incentivize a continuous data connection, which will allow for a fuller story of driver behavior and vehicle performance to be captured over a longer period of time. Secondly, it will reward those who provide a greater quantity and frequency of reliable data, as this will be more valuable to the network than sporadic or low-quality data. Finally, the system will avoid rewarding based on distance or time traveled, as this could incentivize unnecessary and wasteful driving behavior that would not benefit the network or its users.`,
      },
    ],
    category: "sensor",
    token: "DIMO",
    blockchain: "polygon",
    state: "production",
  },
  {
    id: "helium-iot",
    miners: [],
    scores: [
      {
        type: "governance",
        value: 7,
        description:
          "The governance of the Helium network is facilitated by the community through their voting and submission of Helium Improvement Proposals (HIPs). The Helium Foundation, a 501(c)(6) non-profit organization, and Nova Labs, Inc., a corporation, are the current governing entities responsible for implementing these changes. The Helium Foundation possesses complete control over the brand assets and intellectual property of Helium, and they intend to oversee the maintenance of the Helium blockchain, miner, and Hotspot app source code. Meanwhile, Nova Labs, Inc. continues to play an essential role in issuing chain-variables and rescue blocks while also sharing signing responsibility with The Helium Foundation. Further information can be obtained from this Medium article.",
      },
      {
        type: "tokenomics",
        value: 6,
        description: `Helium's HNT token issuance began in August 2019 with a planned maximum supply of 60 million but only 43 million were issued due to slow block times. The adjusted max supply is now 223 million due to token halving every two years. HNT has two basic functions, one being the token itself and the other being Data Credits, which are pegged to $USD (one Data Credit remains constant at $0.00001) and derived from HNT through a burn transaction. Data Credits are used to pay for wireless data transmission fees on the network, and HNT adjusts to network usage patterns through a burn and mint equilibrium design. Net Emissions provide enough HNT to reward consensus group members and hotspots, but there will be a cap on the number of HNT created via Net Emissions to maintain the deflationary effect of Burn and Mint. Net Emissions has yet to become active.
          
          Following the approval of HIP51, the Helium DAO was established to facilitate the creation of subDAOs to allow for a plethora of communication networks on the Helium Network, collectively known as Decentralized Network Protocols (DNPs). These DNPs would each be assigned a unique token, referred to as Decentralized Network Tokens (DNTs), and would allow for the HNT-Data Credit burn-and-mint equilibrium as the foundation of the Helium Flywheel to continue, while the corresponding subDAOs determine Proof-of-Coverage rules and earnings for their respective tokens. Currently, the IOT and MOBILE subDAOs are active, as Helium only supports LoRaWAN and 5G. You can check out the Helium GitHub to dive deep on this process and get a sneak peek of other potential protocols that are in discussion.`,
      },
      {
        type: "ease-of-mining",
        value: 8,
        description:
          "As the Helium Network's blockchain and proof of coverage systems continue to strengthen, earning tokens on the network has become a relatively straightforward process. The physical or software maintenance required for hotspots is minimal, as long as they have consistent power and internet connectivity. However, the challenge lies in securing premium physical locations that ensure reliable coverage, which is crucial for optimal earnings on the network.",
      },
    ],
    category: "wireless",
    token: "IOT",
    blockchain: "solana",
    state: "production",
  },
  {
    id: "helium-mobile",
    miners: [],
    scores: [
      {
        type: "governance",
        value: 7,
        description:
          "The governance of the Helium network is facilitated by the community through their voting and submission of Helium Improvement Proposals (HIPs). The Helium Foundation, a 501(c)(6) non-profit organization, and Nova Labs, Inc., a corporation, are the current governing entities responsible for implementing these changes. The Helium Foundation possesses complete control over the brand assets and intellectual property of Helium, and they intend to oversee the maintenance of the Helium blockchain, miner, and Hotspot app source code. Meanwhile, Nova Labs, Inc. continues to play an essential role in issuing chain-variables and rescue blocks while also sharing signing responsibility with The Helium Foundation. Further information can be obtained from this Medium article.",
      },
      {
        type: "tokenomics",
        value: 7,
        description: `Helium's HNT token issuance began in August 2019 with a planned maximum supply of 60 million but only 43 million were issued due to slow block times. The adjusted max supply is now 223 million due to token halving every two years. HNT has two basic functions, one being the token itself and the other being Data Credits, which are pegged to $USD (one Data Credit remains constant at $0.00001) and derived from HNT through a burn transaction. Data Credits are used to pay for wireless data transmission fees on the network, and HNT adjusts to network usage patterns through a burn and mint equilibrium design. Net Emissions provide enough HNT to reward consensus group members and hotspots, but there will be a cap on the number of HNT created via Net Emissions to maintain the deflationary effect of Burn and Mint. Net Emissions has yet to become active.
          
          Following the approval of HIP51, the Helium DAO was established to facilitate the creation of subDAOs to allow for a plethora of communication networks on the Helium Network, collectively known as Decentralized Network Protocols (DNPs). These DNPs would each be assigned a unique token, referred to as Decentralized Network Tokens (DNTs), and would allow for the HNT-Data Credit burn-and-mint equilibrium as the foundation of the Helium Flywheel to continue, while the corresponding subDAOs determine Proof-of-Coverage rules and earnings for their respective tokens. Currently, the IOT and MOBILE subDAOs are active, as Helium only supports LoRaWAN and 5G. You can check out the Helium GitHub to dive deep on this process and get a sneak peek of other potential protocols that are in discussion.`,
      },
      {
        type: "ease-of-mining",
        value: 5,
        description: `As the Helium Network's blockchain and proof of coverage systems continue to strengthen, earning tokens on the network has become a relatively straightforward process. The physical or software maintenance required for hotspots is minimal, as long as they have consistent power and internet connectivity. However, the challenge lies in securing premium physical locations that ensure reliable coverage, which is crucial for optimal earnings on the network.
          
          Mining on the IoT network has always been much simpler and more straightforward than for the MOBILE network. IoT miners are roughly a tenth of the cost of MOBILE miners, can be set up in 10 minutes vs. 30+, and earn much more passively as nearby IoT hotspots beacon off of each other and prove coverage (whereas MOBILE hotspots don’t have nearly the same range and therefore must be validated by modeled rf coverage or a special device that’s coming out soon, called the Spot.`,
      },
    ],
    category: "wireless",
    token: "MOBILE",
    blockchain: "solana",
    state: "production",
  },
  {
    id: "hivemapper",
    miners: [],
    scores: [
      {
        type: "governance",
        value: 4,
        description:
          "Currently, Hivemapper Incorporated maintains the majority of governance control over the network, but a recent shift has occurred with the introduction of the first Map Improvement Proposals (MIPs) presented by the Hivemapper Foundation and proposed on the Hivemapper [Discord](https://discord.com/invite/FRWMKyy5v2) and [Medium](https://medium.com/@hivemapper). This move towards formal community governance is a positive step towards decentralization.",
      },
      {
        type: "tokenomics",
        value: 7,
        description: `The Hivemapper Network has a fixed maximum supply of 10 billion HONEY tokens, with 40% initially allocated to contributors, 20% to investors, 20% to employees of Hivemapper Inc., 15% to Hivemapper Inc. for R&D and operational support, and 5% to the Hivemapper Foundation for governance. The exact amount of tokens minted each week for contributors is determined by the global map progress, which is calculated using map progress units (MPUs) at the regional (RMPU) or global (GMPU) level. For any given reward period (one week), a region produces between 0 and 1 MPUs based on its coverage, activity, and resilience. The GMPU is equal to the weighted average of the RMPUs for a given period, and it is used to calculate the amount of HONEY minted for contributors in that period. The total MPU amount is 520, which is a crucial factor to note as it would result in a minimum of 10 years for max token accrual by contributors.
          
          The HONEY token operates through a burn and mint system to establish an on-chain marketplace that connects contributors and customers. To access map data customers purchase USD-pegged map credits, which burn HONEY tokens. The tokens burned are then reminted as Map Consumption Rewards. With the consumption of more services and the rise in demand for map credits, the speed at which tokens are burned and reminted will increase, leading to a connection between the value of HONEY and the utility provided by the Hivemapper Network.`,
      },
      {
        type: "ease-of-mining",
        value: 7,
        description:
          "HONEY earnings are calculated based on coverage, freshness, and quality. Following the guidelines provided by Hivemapper and collecting imagery in desired locations, revisiting these areas for up-to-date imagery, and properly setting up the dashcam are crucial to earning HONEY. This straightforward system makes earning HONEY easy.",
      },
    ],
    category: "sensor",
    token: "HONEY",
    blockchain: "solana",
    state: "production",
  },
  {
    id: "xnet",
    miners: [],
    scores: [
      {
        type: "governance",
        value: 3,
        description:
          "Currently, XNET is under the sole governance of XNET, Inc. as they are deeply involved in shaping the network's strategy and focus. However, XNET, Inc. values the opinions and inputs of its participants and intends to establish a system of checks and balances through the launch of the XNET Foundation DAO later this year.",
      },
      {
        type: "tokenomics",
        value: 5,
        description: `The deflationary XNET token has a total max supply of 24 billion tokens. The allocation breakdown is as follows: Foundation Pool (18%), Ecosystem Pool (13%), Operator Pool (39%), Investor Pool (15%), and Insider Pool (15%). Tokens from each pool will be gradually released or subject to specific lockup or vesting periods. XNET mining is limited to the operator pool, which holds 9,360,000,000 tokens or 39%. Participants operating XNET Mobile Network nodes and validating the network will receive rewards from this pool over several years, with a 10-15 day lockup period on the tokens.
          
          XNET's whitepaper provides a practical example to explain tokenomics. When an operator pays $1 for 1 GB of data from XNET Mobile Network Operator, it is divided into three parts. $0.40 is used to buy and burn $XNET tokens from the market to pay for the data traffic itself. $0.30 covers the costs of back-end operation and running the network core. The remaining $0.30 is allocated to various services and network growth, and newly issued $XNET tokens are issued from the Operator Pool. Generally, the value of $XNET issued from the Operator Pool is higher than the value of the data tickets burned.`,
      },
      {
        type: "ease-of-mining",
        value: 5,
        description: `XNET's deployment model is focused on providing 5G connection to specific clusters, which are deemed to have a greater need. In contrast to other 5G protocols, XNET does not allow its operators to deploy miners wherever they see fit, instead focusing on specific areas with eligible hexes for rewards. Fortunately, their [explorer](https://explorer.xnetmobile.com/) provides an easy method for checking eligibility, and as expansion occurs to a greater number of clusters, the difficulty of earning tokens is expected to trend downwards.
          
        XNET mining is more difficult than most other DePIN protocols, due to the complex and technical nature of the equipment deployed (cellular radios and antennas).`,
      },
    ],
    category: "wireless",
    token: "XNET",
    blockchain: "polygon",
    state: "production",
  },
]
