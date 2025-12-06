# Getting Started

A simple TypeScript library for Nigerian states, LGAs, and senatorial districts.

## Installation

```bash
npm install ng-states-core
```

## Quick Start

```typescript
import { getStates, getState, getLgas } from "ng-states-core";

// Get all states
const states = getStates();
console.log(states.length); // 37

// Get specific state
const lagos = getState("Lagos");
console.log(lagos.capital); // 'Ikeja'

// Get LGAs for a state
const lgas = getLgas("Lagos");
console.log(lgas.length); // 20
```

## Basic Examples

### State Selector

```typescript
import { getStateNames } from "ng-states-core";

const states = getStateNames();
// ['Abia', 'Adamawa', 'Akwa Ibom', ...]

// Use in HTML
states.forEach((state) => {
  console.log(`<option value="${state}">${state}</option>`);
});
```

### State and LGA Dropdown

```typescript
import { getStateNames, getLgas } from "ng-states-core";

const states = getStateNames();
const selectedState = "Lagos";
const lgas = getLgas(selectedState);

console.log(lgas); // ['Agege', 'Ajeromi-Ifelodun', ...]
```

### Find State by LGA

```typescript
import { findStateByLga } from "ng-states-core";

const state = findStateByLga("Ikeja");
console.log(state?.state); // 'Lagos'
```

### Filter by Region

```typescript
import { getStatesByRegion } from "ng-states-core";

const southWest = getStatesByRegion("South-West");
console.log(southWest.map((s) => s.state));
// ['Ekiti', 'Lagos', 'Ogun', 'Ondo', 'Osun', 'Oyo']
```

## TypeScript Support

Full TypeScript support with type definitions included:

```typescript
import { State, StateData } from "ng-states-core";

const state: State = getState("Lagos");
```

## Next Steps

- [API Reference](/api-reference) - Complete function reference
- [Examples](/examples) - More code examples
