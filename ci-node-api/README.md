## Project Objective

Build a simple Node.js REST API with:

- `GET /health`
- `GET /users`

And implement CI to:

- install dependencies
- run tests
- run ESLint
- build the project

Tooling used:

- Node.js
- GitHub + GitHub Actions
- ESLint (Flat Config)
- Jest

## Project Structure

The repository must look like this:

```
ci-node-api/
├── src/
│   ├── app.js
│   └── server.js
├── tests/
│   └── app.test.js
├── package.json
├── eslint.config.mjs
└── .github/
    └── workflows/
        └── ci.yml
```

Important:

- `package.json` must be at the repository root.
- Do not commit `node_modules/`.

## ESLint Flat Config (Node.js + Jest)

Your API runs in Node, not the browser. Use Node and Jest globals.

The correct config file name for this repo is `eslint.config.mjs`.

```javascript
import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.node,
    },
  },
  {
    files: ["**/*.test.js"],
    languageOptions: {
      globals: globals.jest,
    },
  },
]);
```

Why this is correct:

- `globals.node` enables `require`, `module`, `process`, `__dirname`.
- `globals.jest` enables `describe`, `test`, `expect` in test files.
- `sourceType: "commonjs"` matches `require` usage.

## CI Pipeline (GitHub Actions)

Create .github/workflows/ci.yml with:

```yaml
name: Node.js CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Install Dependencies
        run: npm install

      - name: Run Tests
        run: npm test

      - name: Run ESLint
        run: npm run lint

      - name: Build Application
        run: npm run build
```

## Run Locally

```bash
npm install
npm run lint
npm test
npm start
```

## Debugging Guide

If something fails, use this checklist:

1. `npm run lint` fails with `no-undef` for `describe`/`test`/`expect`:
   - Ensure `globals.jest` is set for `**/*.test.js` in `eslint.config.mjs`.

2. `npm run lint` fails with `require` or `module` not defined:
   - Ensure `globals.node` is used in the base config.
   - Ensure `sourceType: "commonjs"` is set.

3. CI fails with "missing package.json":
   - Confirm the repo root is `ci-node-api/`.
   - `package.json` must be at the root, not in a subfolder.

4. Tests fail locally but pass in CI:
   - Delete `node_modules/` and reinstall: `npm install`.
   - Ensure your Node.js version matches CI (Node 18).

5. Server does not start:
   - Run `npm start` and check for port conflicts.
   - Confirm `src/server.js` listens on a port.

## .gitignore

```
node_modules/
```
