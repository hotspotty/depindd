export type SidebarSection = {
  section: string
  label: string
  items: string[]
}

export const sidebarItems: SidebarSection[] = [
  {
    section: "about",
    label: "About",
    items: ["what-is-depin", "what-is-depindd"],
  },
  {
    section: "leaderboards",
    label: "Leaderboards",
    items: ["miner-payback-time"],
  },
  {
    section: "categories",
    label: "Network categories",
    items: [
      "energy-networks",
      "sensor-networks",
      "server-networks",
      "wireless-networks",
    ],
  },
  {
    section: "miner-networks",
    label: "Miner networks",
    items: ["dimo", "helium-iot", "helium-mobile", "hivemapper", "xnet"],
  },
]
