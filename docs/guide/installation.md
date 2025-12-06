# Installation

Get ng-states-core up and running in your project quickly.

## Prerequisites

- Node.js 14.x or higher
- npm, yarn, or pnpm package manager

## Package Manager Installation

Choose your preferred package manager:

::: code-group

```bash [npm]
npm install ng-states-core
```

```bash [yarn]
yarn add ng-states-core
```

```bash [pnpm]
pnpm add ng-states-core
```

:::

## Verify Installation

After installation, verify that the package is installed correctly:

```typescript
import { getStates } from "ng-states-core";

console.log(getStates().length); // Should output: 37
```

## TypeScript Configuration

ng-states-core includes TypeScript definitions out of the box. No additional `@types` packages are needed.

If you're using TypeScript, ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
```

## CommonJS vs ES Modules

ng-states-core supports both CommonJS and ES Modules:

### ES Modules (Recommended)

```typescript
import { getStates, getState, getLgas } from "ng-states-core";
```

### CommonJS

```javascript
const { getStates, getState, getLgas } = require("ng-states-core");
```

## CDN Usage

For quick prototyping or browser-only projects, you can use a CDN:

```html
<script type="module">
  import { getStates } from "https://esm.sh/ng-states-core";

  console.log(getStates());
</script>
```

## Troubleshooting

### Module Not Found

If you encounter a "module not found" error:

1. Clear your package manager cache:

   ```bash
   npm cache clean --force
   # or
   yarn cache clean
   # or
   pnpm store prune
   ```

2. Delete `node_modules` and reinstall:

   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### TypeScript Errors

If TypeScript can't find type definitions:

1. Ensure you're using TypeScript 4.0 or higher
2. Check that `node_modules/ng-states-core` contains `index.d.ts`
3. Try restarting your IDE/editor

## Next Steps

- [Quick Start](/guide/quick-start) - Start using ng-states-core
- [Getting Started](/guide/getting-started) - Learn the basics
- [API Reference](/api/overview) - Explore all available functions
