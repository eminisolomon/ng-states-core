# States & Capitals

Learn how to work with Nigerian states and capitals data.

## Overview

ng-states-core provides comprehensive data for all 36 Nigerian states plus the Federal Capital Territory (FCT), including state names, capitals, and detailed metadata.

## Get All States

Retrieve complete data for all states:

```typescript
import { getStates } from "ng-states-core";

const allStates = getStates();
console.log(allStates.length); // 37

// Each state object contains:
console.log(allStates[0]);
// {
//   state: 'Abia',
//   capital: 'Umuahia',
//   region: 'South-East',
//   postal_code: '440001',
//   coordinates: { latitude: 5.52491, longitude: 7.49461 },
//   population: 4200000,
//   created: '1991-08-27',
//   slogan: "God's Own State",
//   lgas: [...],
//   senatorial_districts: [...],
//   towns: [...]
// }
```

## Get State Names Only

If you only need state names (e.g., for a dropdown):

```typescript
import { getStateNames } from "ng-states-core";

const stateNames = getStateNames();
console.log(stateNames);
// ['Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', ...]
```

## Get Specific State

Retrieve data for a specific state:

```typescript
import { getState } from "ng-states-core";

const lagos = getState("Lagos");
console.log(lagos.capital); // 'Ikeja'
console.log(lagos.region); // 'South-West'
console.log(lagos.population); // 15400000

// Case insensitive
const kano = getState("kano");
console.log(kano.capital); // 'Kano'
```

## Get State Capital

Get just the capital of a state:

```typescript
import { getCapital } from "ng-states-core";

const capital = getCapital("Lagos");
console.log(capital); // 'Ikeja'

// Case insensitive
console.log(getCapital("RIVERS")); // 'Port Harcourt'
```

## State Data Structure

Each state object contains the following properties:

### Basic Information

```typescript
interface State {
  state: string; // State name
  capital: string; // Capital city
  region: GeopoliticalZone; // Geopolitical zone
  slogan: string; // State slogan
}
```

### Geographic Data

```typescript
interface State {
  postal_code: string; // Primary postal code
  coordinates: {
    latitude: number;
    longitude: number;
  };
}
```

### Administrative Data

```typescript
interface State {
  lgas: string[]; // Local Government Areas
  senatorial_districts: string[]; // Senatorial districts
  towns: string[]; // Major towns
}
```

### Metadata

```typescript
interface State {
  population: number; // Population estimate
  created: string; // Creation date (YYYY-MM-DD)
}
```

## Working with Capitals

### List All Capitals

```typescript
import { getStates } from "ng-states-core";

const capitals = getStates().map((state) => ({
  state: state.state,
  capital: state.capital,
}));

console.log(capitals);
// [
//   { state: 'Abia', capital: 'Umuahia' },
//   { state: 'Adamawa', capital: 'Yola' },
//   ...
// ]
```

### Find State by Capital

```typescript
import { getStates } from "ng-states-core";

function findStateByCapital(capital: string): State | undefined {
  return getStates().find(
    (state) => state.capital.toLowerCase() === capital.toLowerCase()
  );
}

const state = findStateByCapital("Ikeja");
console.log(state?.state); // 'Lagos'
```

### Check if City is a Capital

```typescript
import { getStates } from "ng-states-core";

function isCapital(city: string): boolean {
  return getStates().some(
    (state) => state.capital.toLowerCase() === city.toLowerCase()
  );
}

console.log(isCapital("Ikeja")); // true
console.log(isCapital("Lekki")); // false
```

## Population Data

Access population information:

```typescript
import { getStates } from "ng-states-core";

// Get most populous states
const byPopulation = getStates()
  .sort((a, b) => b.population - a.population)
  .slice(0, 5);

byPopulation.forEach((state) => {
  console.log(`${state.state}: ${state.population.toLocaleString()}`);
});
// Lagos: 15,400,000
// Kano: 13,400,000
// ...
```

## Geographic Coordinates

Use coordinate data for mapping:

```typescript
import { getState } from "ng-states-core";

const lagos = getState("Lagos");
const { latitude, longitude } = lagos.coordinates;

console.log(`Lagos is located at ${latitude}°N, ${longitude}°E`);
// Lagos is located at 6.45407°N, 3.39467°E
```

## State Creation Dates

Access historical information:

```typescript
import { getStates } from "ng-states-core";

// Get newest states
const byCreationDate = getStates()
  .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
  .slice(0, 5);

byCreationDate.forEach((state) => {
  console.log(`${state.state}: Created ${state.created}`);
});
```

## Practical Examples

### State Information Card

```typescript
import { getState } from "ng-states-core";

function displayStateInfo(stateName: string) {
  const state = getState(stateName);

  return `
    State: ${state.state}
    Capital: ${state.capital}
    Region: ${state.region}
    Population: ${state.population.toLocaleString()}
    Slogan: ${state.slogan}
    Postal Code: ${state.postal_code}
    LGAs: ${state.lgas.length}
    Created: ${new Date(state.created).toLocaleDateString()}
  `;
}

console.log(displayStateInfo("Lagos"));
```

### State Comparison

```typescript
import { getState } from "ng-states-core";

function compareStates(state1: string, state2: string) {
  const s1 = getState(state1);
  const s2 = getState(state2);

  return {
    populationDiff: Math.abs(s1.population - s2.population),
    sameRegion: s1.region === s2.region,
    lgaCountDiff: Math.abs(s1.lgas.length - s2.lgas.length),
  };
}

console.log(compareStates("Lagos", "Kano"));
```

## Next Steps

- [Geopolitical Zones](/guide/geopolitical-zones) - Filter states by region
- [LGAs & Towns](/guide/lgas-towns) - Work with local government areas
- [Search & Filter](/guide/search-filter) - Search state data
- [API Reference](/api/states) - Complete state functions API
