import Ajv, { JSONSchemaType } from "ajv"
import fs from "fs"
import { glob } from "glob"
import path from "path"
import { ProjectInfo } from "../app/(docs)/(data)/projects"

const projectInfoJsonSchema: JSONSchemaType<ProjectInfo> = {
  type: "object",
  properties: {
    slug: { type: "string" },
    title: { type: "string" },
    miners: {
      type: "array",
      uniqueItems: true,
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          url: { type: "string" },
          price: { type: "number" },
        },
        required: ["title", "url", "price"],
      },
    },
    lego: {
      type: "string",
      pattern: "(?:data|sensors|servers|wireless|hardware)",
    },
    categories: {
      type: "array",
      uniqueItems: true,
      items: {
        type: "string",
        pattern:
          "(?:connectivity|positioning|mobility|energy|environmental|healthcare|smart city|smart home|geo-location|general|storage|marketplace|proof|warehouse|analytics|tool|compute|CDN|VPN|manufacturer)",
      },
    },
    token: { type: "string" },
    blockchain: {
      type: "string",
      pattern:
        "(?:tbd|n/a|solana|polygon|iotex|algorand|bsc|constellation|kadena|cardano|ethereum|polkadot)",
    },
    status: { type: "string", pattern: "(?:development|production)" },
    logo: { type: "string" },
    links: {
      type: "array",
      uniqueItems: true,
      items: {
        type: "object",
        properties: {
          label: { type: "string", nullable: true },
          type: {
            type: "string",
            pattern:
              "(?:website|foundation|company|blog|medium|twitter|reddit|forum|discord|telegram|youtube|instagram|linkedin|tiktok|facebook|github|whitepaper|documentation|governance|tokenomics|explorer|shop|coingecko|analytics|crunchbase|other)",
          },
          url: { type: "string" },
        },
        required: ["type", "url"],
      },
    },
  },
  required: [
    "slug",
    "title",
    "miners",
    "lego",
    "categories",
    "token",
    "blockchain",
    "status",
    "logo",
    "links",
  ],
  additionalProperties: false,
}

async function validateProjectJsonFiles() {
  const projectJsonPaths = await glob(
    path.join(process.cwd(), "src/app/(docs)/(pages)/projects", "**/*.json")
  )

  const ajv = new Ajv()

  // validate is a type guard for ProjectInfo - type is inferred from schema type
  const compile = ajv.compile(projectInfoJsonSchema)

  return projectJsonPaths.map((projectJsonPath) => {
    const projectJson = fs.readFileSync(projectJsonPath, "utf-8")
    const projectJsonParsed = JSON.parse(projectJson) // TODO: see why the 'pattern' validation is not working, while it is working when the json file is imported directly

    if (!compile(projectJsonParsed)) {
      return {
        title: projectJsonPath,
        exitCode: 1,
        errors: compile.errors ?? [],
      }
    }

    return {
      title: projectJsonPath,
      exitCode: 0,
      errors: [],
    }
  })
}

async function validate() {
  console.log("validating json files...")

  let exitCode = 0

  const errors = {}

  const results = await validateProjectJsonFiles()

  exitCode = results.reduce((acum, cur) => (acum + cur.exitCode > 0 ? 1 : 0), 0)

  results.forEach((res) => {
    if (res.errors.length > 0) {
      errors[res.title] = res.errors
    }
  })

  if (exitCode > 0) {
    console.log("Validation failed")
    console.log("Errors:", JSON.stringify(errors))
  } else {
    console.log("Validation successful")
  }

  return exitCode
}

validate()
  .then((exitCode) => process.exit(exitCode))
  .catch((err) => {
    console.error(err)
    process.exit(-1)
  })

export {}
