import Ajv, { JSONSchemaType } from "ajv"
import fs from "fs"
import { glob } from "glob"
import path from "path"
import {
  BlockchainInfo,
  ProjectInfo,
  blockchainSlugs,
  categories,
  legos,
  linkTypes,
  projectStatuses,
} from "../app/(docs)/(data)/types"

const getValidationPattern = (values) => `(?:${values.join("|")})`

const projectLinkValidationPattern = getValidationPattern(linkTypes)

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
      pattern: getValidationPattern(legos),
    },
    categories: {
      type: "array",
      uniqueItems: true,
      items: {
        type: "string",
        pattern: getValidationPattern(categories),
      },
    },
    token: { type: "string" },
    blockchain: {
      type: "string",
      pattern: getValidationPattern([
        "tbd", // This is for projects that have yet to decide which blockchain they will use
        "n/a", // This is for projects that don't plan to have a token
        ...blockchainSlugs,
      ]),
    },
    status: { type: "string", pattern: getValidationPattern(projectStatuses) },
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
            pattern: projectLinkValidationPattern,
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

  const compile = ajv.compile(projectInfoJsonSchema)

  return projectJsonPaths.map((projectJsonPath) => {
    const projectJson = fs.readFileSync(projectJsonPath, "utf-8")
    const projectJsonParsed = JSON.parse(projectJson)

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

const blockchainInfoJsonSchema: JSONSchemaType<BlockchainInfo> = {
  type: "object",
  properties: {
    slug: { type: "string", pattern: getValidationPattern(blockchainSlugs) },
    title: { type: "string" },
    token: { type: "string" },
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
            pattern: projectLinkValidationPattern,
          },
          url: { type: "string" },
        },
        required: ["type", "url"],
      },
    },
  },
  required: ["slug", "title", "token", "logo", "links"],
  additionalProperties: false,
}

async function validateBlockchainJsonFiles() {
  const blockchainJsonPaths = await glob(
    path.join(process.cwd(), "src/app/(docs)/(pages)/blockchains", "**/*.json")
  )

  const ajv = new Ajv()

  const compile = ajv.compile(blockchainInfoJsonSchema)

  return blockchainJsonPaths.map((blockchainJsonPath) => {
    const blockchainJson = fs.readFileSync(blockchainJsonPath, "utf-8")
    const blockchainJsonParsed = JSON.parse(blockchainJson)

    if (!compile(blockchainJsonParsed)) {
      return {
        title: blockchainJsonPath,
        exitCode: 1,
        errors: compile.errors ?? [],
      }
    }

    return {
      title: blockchainJsonPath,
      exitCode: 0,
      errors: [],
    }
  })
}

async function validate() {
  console.log("validating json files...")

  let exitCode = 0

  const errors = {}

  const projectResults = await validateProjectJsonFiles()

  const blockchainResults = await validateBlockchainJsonFiles()

  const results = [...projectResults, ...blockchainResults]

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
