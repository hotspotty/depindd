export type NavigationType = {
  title: string
  links: { title: string; href: string }[]
}[]

// TODO: generate this automatically based on the files and folders
export const navigation: NavigationType = [
  {
    title: "About",
    links: [
      { title: "What is DePIN", href: "/about/what-is-depin" },
      { title: "What is DePIN DD", href: "/about/what-is-depindd" },
    ],
  },
  {
    title: "Leaderboards",
    links: [
      {
        title: "Miner payback time ",
        href: "/leaderboards/miner-payback-time",
      },
      { title: "Network size", href: "/leaderboards/network-size-large" },
    ],
  },
  {
    title: "Network categories",
    links: [
      {
        title: "Energy",
        href: "/categories/energy-networks",
      },
      { title: "Sensor", href: "/categories/sensor-networks" },
      { title: "Server", href: "/categories/server-networks" },
      {
        title: "Wireless",
        href: "/categories/wireless-networks",
      },
    ],
  },
  {
    title: "Miner networks",
    links: [
      { title: "DIMO", href: "/miner-networks/dimo" },
      { title: "Helium IOT", href: "/miner-networks/helium-iot" },
      { title: "Helium MOBILE", href: "/miner-networks/helium-mobile" },
      { title: "Hivemapper", href: "/miner-networks/hivemapper" },
      { title: "XNET", href: "/miner-networks/xnet" },
    ],
  },
]
