# Contributing to DePIN DD

We really appreciate and value contributions to DePIN DD. Please take 5' to review the items listed below to make sure that your contributions are merged as soon as possible.

## Creating Pull Requests (PRs)

As a contributor, you are expected to **fork this repository**, work on your own fork and then submit pull requests. The pull requests will be reviewed and eventually merged into the main repo. See ["Fork-a-Repo"](https://help.github.com/articles/fork-a-repo/) for how this works.

## A typical workflow

1. Make sure your fork is up to date with the main repository:

```
cd depindd
git remote add upstream https://github.com/hotspotty/depindd.git
git fetch upstream
git pull --rebase upstream main
```

NOTE: The directory `depindd` represents your fork's local copy.

2. Branch out from `main` into `fix/some-bug-#123`:
   (Postfixing #123 will associate your PR with the issue #123 and make everyone's life easier =D)

```
git checkout -b fix/some-bug-#123
```

3. Make your changes, add your files, commit, and push to your fork.

```
git add SomeFile.js
git commit "Fix some bug #123"
git push origin fix/some-bug-#123
```

4. Go to [github.com/hotspotty/depindd](https://github.com/hotspotty/depindd) in your web browser and issue a new pull request.

5. Maintainers will review your code and possibly ask for changes before your code is pulled in to the main repository. We'll check that all tests pass, review the coding style, and check for general code correctness. If everything is OK, we'll merge your pull request and your code will be part of [DePIN DD](https://depindd.com).

## Adding a new DePIN project

1. Come up with a slug for the project. This slug will act as the filename and id within the codebase. Let's say the project is called `Project X`, then you can go to [slugify.online](https://slugify.online/), enter `Project X` and press the `SLUGIFY` button so you get your slug: `project-x`
2. Create a branch called `add-project/project-x`:

```shell
git checkout -b add-project/project-x
```

3. Create an empty `project-x.md` file in [/src/app/(docs)/(pages)/projects](</src/app/(docs)/(pages)/projects>)
4. Create a `project-x.json` file in [/src/app/(docs)/(pages)/projects](</src/app/(docs)/(pages)/projects>) and paste the following JSON content:

```json
{
  "slug": "",
  "title": "",
  "miners": [],
  "lego": "wireless",
  "categories": ["5G"],
  "token": "",
  "blockchain": "polygon",
  "status": "development",
  "logo": "/images/projects/<project-id>.jpeg",
  "usedBy": ["dimo"], // Includes all DePIN projects that make use of this project
  "links": [
    { "type": "website", "url": "" },
    { "type": "foundation", "url": "" },
    { "type": "company", "url": "" },
    { "type": "blog", "url": "" },
    { "type": "medium", "url": "" },
    { "type": "twitter", "url": "" },
    { "type": "reddit", "url": "" },
    { "type": "forum", "url": "" },
    { "type": "discord", "url": "" },
    { "type": "telegram", "url": "" },
    { "type": "youtube", "url": "" },
    { "type": "instagram", "url": "" },
    { "type": "linkedin", "url": "" },
    { "type": "tiktok", "url": "" },
    { "type": "facebook", "url": "" },
    { "type": "github", "url": "" },
    { "type": "whitepaper", "url": "" },
    { "type": "documentation", "url": "" },
    { "type": "governance", "url": "" },
    { "type": "tokenomics", "url": "" },
    { "type": "explorer", "url": "" },
    { "type": "shop", "url": "" },
    { "type": "coingecko", "url": "" },
    { "type": "analytics", "url": "" },
    { "type": "crunchbase", "url": "" },
    { "type": "other", "url": "" }
  ]
}
```

5. Update the project details in `project-x.json` using the [LEGO classification](https://depindd.com/about/depin-lego) and the [possible values](</src/app/(docs)/(data)/types.ts>).
6. For the `blockchain` field, you can only use the blockchains listed in [/src/app/(docs)/(pages)/blockchains](</src/app/(docs)/(pages)/blockchains>). For example `"solana"`, because `solana.json` exists in that folder. If one is missing, it needs to be added as part of the PR. If a project didn't make up what blockhain they'll use for their token, use "tbd". If the project doesn't plan to issue a token, use "n/a".
7. Download the logo from the project's Twitter account and save it as `project-x.png` (or other extension) in [/public/images/projects](/public/images/projects)
8. Add a link to that image to the `project-x.json` file
9. Update [/app/(docs)/(data)/projects.ts](</src/app/(docs)/(data)/projects.ts>) to add the `project-x.json` data:

```ts
import projectX from "../(pages)/projects/project-x.json"

...

export const projects: ProjectInfo[] = [
  ...,
  projectX as ProjectInfo,
  ...,
]
```

10. Commit the changes and push them to your forked repository:

```shell
git add .
git commit "Add Project X"
git push -u origin add-project/project-x
```

12. Go to [github.com/hotspotty/depindd](https://github.com/hotspotty/depindd) in your web browser and issue a new pull request
