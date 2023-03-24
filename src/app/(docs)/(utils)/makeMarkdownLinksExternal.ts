const makeMarkdownLinksExternal = (nodes: any) => {
  let sections: any[] = []

  for (let node of nodes) {
    if (!node) continue

    if (node.name === "a") {
      node.attributes.target = "_blank"
    }

    sections.push(...makeMarkdownLinksExternal(node.children ?? []))
  }

  return sections
}

export default makeMarkdownLinksExternal
