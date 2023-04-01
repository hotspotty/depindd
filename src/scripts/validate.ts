import Ajv, { JSONSchemaType } from "ajv"
import fs from "fs"
import { glob } from "glob"
import path from "path"
import {
  ProjectInfo,
  projectLinkValidationPattern,
  projectLegoValidationPattern,
  projectCategoryValidationPattern,
  projectStatusValidationPattern,
  BlockchainInfo,
  blockchainValidationPattern,
} from "../app/(docs)/(data)/types"

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
      pattern: projectLegoValidationPattern,
    },
    categories: {
      type: "array",
      uniqueItems: true,
      items: {
        type: "string",
        pattern: projectCategoryValidationPattern,
      },
    },
    token: { type: "string" },
    blockchain: {
      type: "string",
      pattern: blockchainValidationPattern,
    },
    status: { type: "string", pattern: projectStatusValidationPattern },
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
    slug: { type: "string", pattern: blockchainValidationPattern },
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

  console.log(blockchainJsonPaths)

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
