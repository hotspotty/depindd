## Installation

[Install pnpm](https://pnpm.io/installation) if you haven't already:

```bash
brew install pnpm
```

Download the dependencies:

```bash
pnpm install
cp .env.example .env.local
```

## Run locally

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Global search

By default this template uses [Algolia DocSearch](https://docsearch.algolia.com) for the global search. DocSearch is free for open-source projects, and you can sign up for an account on their website. Once your DocSearch account is ready, update the following [environment variables](https://nextjs.org/docs/basic-features/environment-variables) in your project with the values provided by Algolia:

```
NEXT_PUBLIC_DOCSEARCH_APP_ID=
NEXT_PUBLIC_DOCSEARCH_API_KEY=
NEXT_PUBLIC_DOCSEARCH_INDEX_NAME=
```

## Learn more

To learn more about the technologies used in this site template, see the following resources:

- [Tailwind CSS](https://tailwindcss.com/docs) - the official Tailwind CSS documentation
- [Next.js](https://nextjs.org/docs) - the official Next.js documentation
- [Headless UI](https://headlessui.dev) - the official Headless UI documentation
- [Markdoc](https://markdoc.io) - the official Markdoc documentation
- [DocSearch](https://docsearch.algolia.com) - the official DocSearch documentation
