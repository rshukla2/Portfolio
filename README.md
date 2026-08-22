# Rishi Shukla | Portfolio

[![Deploy to GitHub Pages](https://github.com/rshukla2/Portfolio/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/rshukla2/Portfolio/actions/workflows/deploy-pages.yml)
[![CI](https://github.com/rshukla2/Portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/rshukla2/Portfolio/actions/workflows/ci.yml)
[![CC0 1.0](https://img.shields.io/badge/license-CC0--1.0-blue.svg)](LICENSE)

My public portfolio for applied AI experiments, software engineering work, and practical AI education.

**Live site:** [rishishukla.ai](https://rishishukla.ai/)

## Built with

- React 19 and TypeScript
- Vite
- Tailwind CSS
- Lucide icons

## Run locally

Requirements: Node.js 22 or newer and npm.

```bash
npm install
npm run dev
```

The development server runs at `http://localhost:3000`.

## Validate a production build

```bash
npm run check
npm run preview
```

`npm run check` type-checks the project and creates the production build in `dist/`. The preview server runs at `http://localhost:4173` by default.

## Deploy to GitHub Pages

The [deployment workflow](.github/workflows/deploy-pages.yml) validates, builds, and publishes the site on every push to `main`. It gets the repository-specific base path from GitHub Pages during the build, so Vite assets work at `/Portfolio/` without a hard-coded deployment path.

For the first deployment:

1. Make the GitHub repository public.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions** as the source.
4. Push the repository to `main`, or run **Deploy to GitHub Pages** from the Actions tab.

Pull requests run the separate [CI workflow](.github/workflows/ci.yml) without deploying. Dependabot checks npm packages and GitHub Actions monthly.

## Updating portfolio content

Most text, links, experience, and project details live in [`src/data/portfolioData.ts`](src/data/portfolioData.ts). Page sections live in [`src/components`](src/components).

This is a fully static site. It does not require API keys, a backend, or repository secrets.

## Public-domain dedication

Original code and content in this repository are dedicated to the public domain under [CC0 1.0 Universal](LICENSE). Third-party packages, fonts, icons, and trademarks remain subject to their respective terms; see [third-party notices](THIRD_PARTY_NOTICES.md).
