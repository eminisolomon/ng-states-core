# Search & Filter

Master the search and filter capabilities of ng-states-core.

## Overview

ng-states-core provides powerful search and filter functions to help you find states, LGAs, and towns quickly and efficiently.

## Search Functions

### Search States

Find states using partial matches:

```typescript
import { searchStates } from "ng-states-core";

// Search with partial name
const results = searchStates("lag");
console.log(results.map((s) => s.state));
// ['Lagos', 'Plateau'] (any state containing 'lag')

// Case insensitive
const results2 = searchStates("OYO");
console.log(results2.map((s) => s.state));
// ['Oyo']

// Returns empty array if no match
const noMatch = searchStates("xyz123");
console.log(noMatch); // []
```

### Search Towns

Search for towns across all states:

```typescript
import { searchTowns } from "ng-states-core";

// Search for towns containing 'aba'
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

## Find Functions

### Find State by LGA

Locate which state an LGA belongs to:

```typescript
import { findStateByLga } from "ng-states-core";

const state = findStateByLga("Ikeja");

if (state) {
  console.log(state.state); // 'Lagos'
  console.log(state.capital); // 'Ikeja'
}

// Case insensitive
const state2 = findStateByLga("ikeja");
console.log(state2?.state); // 'Lagos'

// Returns undefined if not found
const notFound = findStateByLga("Invalid LGA");
console.log(notFound); // undefined
```

### Find State by Town

Locate which state a town belongs to:

```typescript
import { findStateByTown } from "ng-states-core";

const state = findStateByTown("Lekki");

if (state) {
  console.log(state.state); // 'Lagos'
  console.log(state.region); // 'South-West'
}

// Another example
const abaState = findStateByTown("Aba");
console.log(abaState?.state); // 'Abia'
```

## Filter Functions

### Filter by Geopolitical Zone

Get all states in a specific region:

```typescript
import { getStatesByRegion } from "ng-states-core";

// Get all South-West states
const southWest = getStatesByRegion("South-West");
console.log(southWest.map((s) => s.state));
// ['Ekiti', 'Lagos', 'Ogun', 'Ondo', 'Osun', 'Oyo']

// Get all North-Central states
const northCentral = getStatesByRegion("North-Central");
console.log(northCentral.length); // 7

// Case insensitive
const southEast = getStatesByRegion("south-east");
console.log(southEast.length); // 5
```

### Filter by Population

Filter states by population:

```typescript
import { getStates } from "ng-states-core";

// Get states with population over 10 million
const populous = getStates().filter((s) => s.population > 10000000);
console.log(populous.map((s) => s.state));
// ['Lagos', 'Kano']

// Get least populous states
const leastPopulous = getStates()
  .sort((a, b) => a.population - b.population)
  .slice(0, 5);

leastPopulous.forEach((s) => {
  console.log(`${s.state}: ${s.population.toLocaleString()}`);
});
```

### Filter by LGA Count

Filter states by number of LGAs:

```typescript
import { getStates } from "ng-states-core";

// States with more than 20 LGAs
const manyLgas = getStates().filter((s) => s.lgas.length > 20);
console.log(
  manyLgas.map((s) => ({
    state: s.state,
    lgaCount: s.lgas.length,
  }))
);
```

## Advanced Search Examples

### Multi-criteria Search

Search with multiple criteria:

```typescript
import { getStates } from "ng-states-core";

function advancedSearch(criteria: {
  region?: string;
  minPopulation?: number;
  minLgas?: number;
}) {
  let results = getStates();

  if (criteria.region) {
    results = results.filter(
      (s) => s.region.toLowerCase() === criteria.region!.toLowerCase()
    );
  }

  if (criteria.minPopulation) {
    results = results.filter((s) => s.population >= criteria.minPopulation!);
  }

  if (criteria.minLgas) {
    results = results.filter((s) => s.lgas.length >= criteria.minLgas!);
  }

  return results;
}

const results = advancedSearch({
  region: "South-West",
  minPopulation: 5000000,
});

console.log(results.map((s) => s.state));
// ['Lagos', 'Oyo']
```

### Autocomplete Search

Build an autocomplete feature:

```typescript
import { searchStates, searchTowns } from "ng-states-core";

function autocompleteLocation(query: string) {
  if (query.length < 2) return [];

  const results = [];

  // Search states
  const states = searchStates(query);
  results.push(
    ...states.map((s) => ({
      type: "state" as const,
      name: s.state,
      label: `${s.state} (State)`,
      data: s,
    }))
  );

  // Search towns
  const towns = searchTowns(query).slice(0, 10);
  results.push(
    ...towns.map((t) => ({
      type: "town" as const,
      name: t.town,
      state: t.state,
      label: `${t.town}, ${t.state}`,
      data: t,
    }))
  );

  return results;
}

const results = autocompleteLocation("lag");
console.log(results);
```

### Fuzzy Matching

Implement fuzzy search:

```typescript
import { getStates } from "ng-states-core";

function fuzzySearch(query: string, threshold = 0.6) {
  const lowerQuery = query.toLowerCase();

  return getStates().filter((state) => {
    const stateName = state.state.toLowerCase();
    const capital = state.capital.toLowerCase();

    // Simple fuzzy match: check if query is substring
    return stateName.includes(lowerQuery) || capital.includes(lowerQuery);
  });
}

const results = fuzzySearch("kat");
console.log(results.map((s) => s.state));
// ['Katsina'] (matches state name)
```

### Search with Ranking

Rank search results by relevance:

```typescript
import { searchStates } from "ng-states-core";

function rankedSearch(query: string) {
  const results = searchStates(query);

  // Rank by how early the match appears
  return results.sort((a, b) => {
    const aIndex = a.state.toLowerCase().indexOf(query.toLowerCase());
    const bIndex = b.state.toLowerCase().indexOf(query.toLowerCase());
    return aIndex - bIndex;
  });
}

const results = rankedSearch("o");
console.log(results.map((s) => s.state));
// States starting with 'O' appear first
```

## Practical Examples

### Location Validator

Validate if a location exists:

```typescript
import { findStateByLga, findStateByTown } from "ng-states-core";

function validateLocation(location: string, type: "lga" | "town") {
  if (type === "lga") {
    const state = findStateByLga(location);
    return {
      valid: !!state,
      state: state?.state,
      message: state
        ? `${location} is in ${state.state}`
        : `${location} is not a valid LGA`,
    };
  } else {
    const state = findStateByTown(location);
    return {
      valid: !!state,
      state: state?.state,
      message: state
        ? `${location} is in ${state.state}`
        : `${location} is not a valid town`,
    };
  }
}

console.log(validateLocation("Ikeja", "lga"));
// { valid: true, state: 'Lagos', message: 'Ikeja is in Lagos' }
```

### Search All Locations

Search across states, LGAs, and towns:

```typescript
import { searchStates, searchTowns, getStates } from "ng-states-core";

function searchAllLocations(query: string) {
  const results = {
    states: searchStates(query),
    towns: searchTowns(query),
    lgas: [] as Array<{ lga: string; state: string }>,
  };

  // Search LGAs
  getStates().forEach((state) => {
    state.lgas.forEach((lga) => {
      if (lga.toLowerCase().includes(query.toLowerCase())) {
        results.lgas.push({ lga, state: state.state });
      }
    });
  });

  return results;
}

const results = searchAllLocations("ik");
console.log(results);
```

### Geographic Search

Search by coordinates proximity:

```typescript
import { getStates } from "ng-states-core";

function findNearbyStates(lat: number, lon: number, maxDistance = 2) {
  return getStates().filter((state) => {
    const { latitude, longitude } = state.coordinates;

    // Simple distance calculation (not accurate for large distances)
    const distance = Math.sqrt(
      Math.pow(latitude - lat, 2) + Math.pow(longitude - lon, 2)
    );

    return distance <= maxDistance;
  });
}

// Find states near Lagos coordinates
const nearby = findNearbyStates(6.45407, 3.39467);
console.log(nearby.map((s) => s.state));
```

## Next Steps

- [React Integration](/examples/react) - Use search in React components
- [Vue Integration](/examples/vue) - Use search in Vue applications
- [API Reference](/api/search) - Complete search API documentation
- [TypeScript Support](/guide/typescript) - Type-safe searching
