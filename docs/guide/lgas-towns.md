# LGAs & Towns

Learn how to work with Local Government Areas (LGAs) and towns data.

## Overview

Each Nigerian state is divided into Local Government Areas (LGAs), which are further subdivided into towns and communities. ng-states-core provides comprehensive data for all LGAs and major towns.

## Get LGAs for a State

Retrieve all LGAs in a specific state:

```typescript
import { getLgas } from "ng-states-core";

const lagosLgas = getLgas("Lagos");
console.log(lagosLgas);
// ['Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', ...]

console.log(lagosLgas.length); // 20

// Case insensitive
const kanoLgas = getLgas("KANO");
console.log(kanoLgas.length); // 44
```

## Find State by LGA

Determine which state an LGA belongs to:

```typescript
import { findStateByLga } from "ng-states-core";

const state = findStateByLga("Ikeja");

if (state) {
  console.log(state.state); // 'Lagos'
  console.log(state.capital); // 'Ikeja'
  console.log(state.region); // 'South-West'
}

// Case insensitive
const state2 = findStateByLga("ikeja");
console.log(state2?.state); // 'Lagos'

// Returns undefined if not found
const notFound = findStateByLga("Invalid LGA");
console.log(notFound); // undefined
```

## Working with Towns

### Get Towns for a State

Access major towns in a state:

```typescript
import { getState } from "ng-states-core";

const lagos = getState("Lagos");
console.log(lagos.towns);
// ['Ikeja', 'Epe', 'Ikorodu', 'Badagry', 'Lagos Island', ...]
```

### Find State by Town

Determine which state a town belongs to:

```typescript
import { findStateByTown } from "ng-states-core";

const state = findStateByTown("Lekki");

if (state) {
  console.log(state.state); // 'Lagos'
  console.log(state.capital); // 'Ikeja'
}

// Another example
const abaState = findStateByTown("Aba");
console.log(abaState?.state); // 'Abia'
```

### Search Towns

Search for towns across all states:

```typescript
import { searchTowns } from "ng-states-core";

const results = searchTowns("aba");

results.forEach(({ state, town }) => {
  console.log(`${town} in ${state}`);
});
// Aba in Abia
// Abakaliki in Ebonyi
// Abeokuta in Ogun
// ...

// Case insensitive
const results2 = searchTowns("IKE");
console.log(results2);
// [{ state: 'Lagos', town: 'Ikeja' }, ...]
```

## LGA Statistics

### Count LGAs by State

```typescript
import { getStates } from "ng-states-core";

const lgaCounts = getStates().map((state) => ({
  state: state.state,
  lgaCount: state.lgas.length,
}));

// Sort by LGA count
lgaCounts.sort((a, b) => b.lgaCount - a.lgaCount);

console.log(lgaCounts.slice(0, 5));
// Top 5 states by LGA count
```

### Total LGAs in Nigeria

```typescript
import { getStates } from "ng-states-core";

const totalLgas = getStates().reduce(
  (sum, state) => sum + state.lgas.length,
  0
);

console.log(totalLgas); // 774 (total LGAs in Nigeria)
```

### LGAs by Geopolitical Zone

```typescript
import { getStatesByRegion } from "ng-states-core";

function getLgaCountByZone(zone: string) {
  const states = getStatesByRegion(zone);
  const totalLgas = states.reduce((sum, s) => sum + s.lgas.length, 0);

  return {
    zone,
    states: states.length,
    lgas: totalLgas,
    averageLgasPerState: Math.round(totalLgas / states.length),
  };
}

console.log(getLgaCountByZone("South-West"));
// { zone: 'South-West', states: 6, lgas: 137, averageLgasPerState: 23 }
```

## Practical Examples

### Cascading Dropdowns

Create state and LGA selection:

```typescript
import { getStateNames, getLgas } from "ng-states-core";

class LocationSelector {
  private selectedState: string = "";
  private selectedLga: string = "";

  getStates() {
    return getStateNames();
  }

  getLgasForState() {
    if (!this.selectedState) return [];
    return getLgas(this.selectedState);
  }

  onStateChange(state: string) {
    this.selectedState = state;
    this.selectedLga = ""; // Reset LGA
  }

  onLgaChange(lga: string) {
    this.selectedLga = lga;
  }

  getSelection() {
    return {
      state: this.selectedState,
      lga: this.selectedLga,
    };
  }
}
```

### Validate LGA

Check if an LGA exists and get its state:

```typescript
import { findStateByLga } from "ng-states-core";

function validateLga(lga: string) {
  const state = findStateByLga(lga);

  return {
    valid: !!state,
    state: state?.state,
    message: state
      ? `${lga} is a valid LGA in ${state.state}`
      : `${lga} is not a valid LGA`,
  };
}

console.log(validateLga("Ikeja"));
// { valid: true, state: 'Lagos', message: 'Ikeja is a valid LGA in Lagos' }

console.log(validateLga("Invalid"));
// { valid: false, state: undefined, message: 'Invalid is not a valid LGA' }
```

### LGA Autocomplete

Create an autocomplete for LGAs:

```typescript
import { getStates } from "ng-states-core";

function searchLgas(query: string) {
  if (query.length < 2) return [];

  const results: Array<{ lga: string; state: string }> = [];

  getStates().forEach((state) => {
    state.lgas.forEach((lga) => {
      if (lga.toLowerCase().includes(query.toLowerCase())) {
        results.push({ lga, state: state.state });
      }
    });
  });

  return results.slice(0, 10); // Limit results
}

const results = searchLgas("ik");
console.log(results);
// [
//   { lga: 'Ikeja', state: 'Lagos' },
//   { lga: 'Ikorodu', state: 'Lagos' },
//   { lga: 'Ikwuano', state: 'Abia' },
//   ...
// ]
```

### Town Finder

Find all towns matching a search term:

```typescript
import { searchTowns } from "ng-states-core";

function findTowns(searchTerm: string) {
  const results = searchTowns(searchTerm);

  return results.map(({ state, town }) => ({
    town,
    state,
    label: `${town}, ${state}`,
  }));
}

const towns = findTowns("port");
console.log(towns);
// [
//   { town: 'Port Harcourt', state: 'Rivers', label: 'Port Harcourt, Rivers' },
//   ...
// ]
```

### Location Hierarchy

Display complete location hierarchy:

```typescript
import { getState } from "ng-states-core";

function getLocationHierarchy(stateName: string) {
  const state = getState(stateName);

  return {
    state: state.state,
    capital: state.capital,
    region: state.region,
    lgas: state.lgas.length,
    towns: state.towns.length,
    lgaList: state.lgas,
    townList: state.towns,
  };
}

console.log(getLocationHierarchy("Lagos"));
```

### LGA to Town Mapping

Check if a location is an LGA or town:

```typescript
import { findStateByLga, findStateByTown } from "ng-states-core";

function identifyLocation(location: string) {
  const asLga = findStateByLga(location);
  const asTown = findStateByTown(location);

  if (asLga && asTown) {
    return { type: "both", state: asLga.state };
  } else if (asLga) {
    return { type: "lga", state: asLga.state };
  } else if (asTown) {
    return { type: "town", state: asTown.state };
  } else {
    return { type: "unknown", state: null };
  }
}

console.log(identifyLocation("Ikeja"));
// { type: 'both', state: 'Lagos' } (Ikeja is both an LGA and a town)

console.log(identifyLocation("Lekki"));
// { type: 'town', state: 'Lagos' }
```

## Senatorial Districts

Access senatorial district data:

```typescript
import { getState } from "ng-states-core";

const lagos = getState("Lagos");
console.log(lagos.senatorial_districts);
// ['Lagos Central', 'Lagos East', 'Lagos West']

// All states have 3 senatorial districts
getStates().forEach((state) => {
  console.log(`${state.state}: ${state.senatorial_districts.length} districts`);
});
```

## Next Steps

- [Search & Filter](/guide/search-filter) - Advanced search techniques
- [States & Capitals](/guide/states-capitals) - Work with state data
- [React Integration](/examples/react) - Use in React components
- [API Reference](/api/states) - Complete API documentation
