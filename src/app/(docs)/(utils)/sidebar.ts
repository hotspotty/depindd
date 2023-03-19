export type SidebarSection = {
  section: string
  label: string
  items: { label: string; slug: string }[]
}[]

export const sidebarItems: SidebarSection = [
  {
    section: "about",
    label: "About",
    items: [
      { label: "What is DePIN", slug: "what-is-depin" },
      { label: "What is DePIN DD", slug: "what-is-depindd" },
    ],
  },
  {
    section: "leaderboards",
    label: "Leaderboards",
    items: [
      {
        label: "Miner payback time",
        slug: "miner-payback-time",
      },
    ],
  },
  {
    section: "categories",
    label: "Network categories",
    items: [
      {
        label: "Energy",
        slug: "energy-networks",
      },
      { label: "Sensor", slug: "sensor-networks" },
      { label: "Server", slug: "server-networks" },
      {
        label: "Wireless",
        slug: "wireless-networks",
      },
    ],
  },
  {
    section: "miner-networks",
    label: "Miner networks",
    items: [
      { label: "DIMO", slug: "dimo" },
      { label: "Helium IOT", slug: "helium-iot" },
      { label: "Helium MOBILE", slug: "helium-mobile" },
      { label: "Hivemapper", slug: "hivemapper" },
      { label: "XNET", slug: "xnet" },
    ],
  },
]
