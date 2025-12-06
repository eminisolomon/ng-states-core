# Metadata Functions API

Complete API reference for metadata and utility functions.

## Overview

Metadata functions provide access to package information and utility data.

## getVersion

Get the current package version.

### Signature

```typescript
function getVersion(): string;
```

### Returns

`string` - Package version in semver format

### Example

```typescript
import { getVersion } from "ng-states-core";

const version = getVersion();
console.log(version); // '2.1.0'

// Use in your app
console.log(`Using ng-states-core v${getVersion()}`);
```

---

## getTotalStates

Get the total number of states (including FCT).

### Signature

```typescript
function getTotalStates(): number;
```

### Returns

`number` - Total number of states (37)

### Example

```typescript
import { getTotalStates } from "ng-states-core";

const total = getTotalStates();
console.log(total); // 37

console.log(`Nigeria has ${getTotalStates()} states`);
```

---

## getTotalLgas

Get the total number of Local Government Areas in Nigeria.

### Signature

```typescript
function getTotalLgas(): number;
```

### Returns

`number` - Total number of LGAs (774)

### Example

```typescript
import { getTotalLgas } from "ng-states-core";

const total = getTotalLgas();
console.log(total); // 774

console.log(`Nigeria has ${getTotalLgas()} LGAs`);
```

---

## getDataVersion

Get the version of the data included in the package.

### Signature

```typescript
function getDataVersion(): string;
```

### Returns

`string` - Data version identifier

### Example

```typescript
import { getDataVersion } from "ng-states-core";

const dataVersion = getDataVersion();
console.log(dataVersion); // '2024.1'

// Display data freshness
console.log(`Data last updated: ${getDataVersion()}`);
```

---

## Usage Examples

### Package Information

```typescript
import {
  getVersion,
  getTotalStates,
  getTotalLgas,
  getDataVersion,
} from "ng-states-core";

function getPackageInfo() {
  return {
    packageVersion: getVersion(),
    dataVersion: getDataVersion(),
    totalStates: getTotalStates(),
    totalLgas: getTotalLgas(),
  };
}

console.log(getPackageInfo());
// {
//   packageVersion: '2.1.0',
//   dataVersion: '2024.1',
//   totalStates: 37,
//   totalLgas: 774
// }
```

### Data Completeness Check

```typescript
import { getStates, getTotalStates, getTotalLgas } from "ng-states-core";

function verifyDataCompleteness() {
  const states = getStates();
  const actualStates = states.length;
  const expectedStates = getTotalStates();

  const actualLgas = states.reduce((sum, s) => sum + s.lgas.length, 0);
  const expectedLgas = getTotalLgas();

  return {
    statesComplete: actualStates === expectedStates,
    lgasComplete: actualLgas === expectedLgas,
    actualStates,
    expectedStates,
    actualLgas,
    expectedLgas,
  };
}

console.log(verifyDataCompleteness());
```

### About Page

```typescript
import { getVersion, getDataVersion } from "ng-states-core";

function generateAboutInfo() {
  return `
    Powered by ng-states-core v${getVersion()}
    Data Version: ${getDataVersion()}
    
    Complete Nigerian states, LGAs, and location data
    https://github.com/eminisolomon/ng-states-core
  `;
}

console.log(generateAboutInfo());
```

### Debug Information

```typescript
import {
  getVersion,
  getDataVersion,
  getTotalStates,
  getTotalLgas,
  getStates,
} from "ng-states-core";

function getDebugInfo() {
  const states = getStates();

  return {
    package: {
      version: getVersion(),
      dataVersion: getDataVersion(),
    },
    counts: {
      states: getTotalStates(),
      lgas: getTotalLgas(),
      actualStates: states.length,
      actualLgas: states.reduce((sum, s) => sum + s.lgas.length, 0),
    },
    environment: {
      node: process.version,
      platform: process.platform,
    },
  };
}

console.log(getDebugInfo());
```

## Related

- [State Functions](/api/states) - Get state data
- [Type Definitions](/api/types) - TypeScript types
- [Data Sources](/guide/data-sources) - About the data
