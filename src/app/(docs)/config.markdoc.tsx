import { Callout } from "@/components/Callout"
import { QuickLink, QuickLinks } from "@/components/QuickLinks"
import { Config, nodes as defaultNodes } from "@markdoc/markdoc"

const config: Config = {
  nodes: {
    document: {
      render: undefined,
    },
    th: {
      ...defaultNodes.th,
      attributes: {
        ...defaultNodes.th.attributes,
        scope: {
          type: String,
          default: "col",
        },
      },
    },
  },
  tags: {
    callout: {
      render: "Callout",
      attributes: {
        title: { type: String },
        type: {
          type: String,
          default: "note",
          matches: ["note", "warning"],
          errorLevel: "critical",
        },
      },
    },
    figure: {
      render: "Figure",
      selfClosing: true,
      attributes: {
        src: { type: String },
        alt: { type: String },
        caption: { type: String },
      },
    },
    "quick-links": {
      render: "QuickLinks",
    },
    "quick-link": {
      render: "QuickLink",
      selfClosing: true,
      attributes: {
        title: { type: String },
        description: { type: String },
        icon: { type: String },
        href: { type: String },
      },
    },
  },
}

const components = {
  Figure: ({
    src,
    alt = "",
    caption,
  }: {
    src: string
    alt?: string
    caption?: string
  }) => (
    <figure>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} />
      <figcaption>{caption}</figcaption>
    </figure>
  ),
  Callout: Callout,
  QuickLinks: QuickLinks,
  QuickLink: QuickLink,
}

export { config, components }
