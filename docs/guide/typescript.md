# TypeScript Support

Learn how to use ng-states-core with TypeScript for type-safe development.

## Overview

ng-states-core is written in TypeScript and provides comprehensive type definitions out of the box. No additional `@types` packages are needed.

## Type Definitions

### State Interface

The main `State` interface includes all state data:

```typescript
import { State } from "ng-states-core";

interface State {
  state: string;
  capital: string;
  region: GeopoliticalZone;
  postal_code: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  population: number;
  created: string;
  slogan: string;
  lgas: string[];
  senatorial_districts: string[];
  towns: string[];
}
```

### Geopolitical Zone Type

The `GeopoliticalZone` type is a union of all valid zones:

```typescript
import { GeopoliticalZone } from "ng-states-core";

type GeopoliticalZone =
  | "North-Central"
  | "North-East"
  | "North-West"
  | "South-East"
  | "South-South"
  | "South-West";

// TypeScript will enforce valid zones
const zone: GeopoliticalZone = "South-West"; // OK
const invalid: GeopoliticalZone = "Invalid"; // Error!
```

### Town Search Result

```typescript
import { TownSearchResult } from "ng-states-core";

interface TownSearchResult {
  state: string;
  town: string;
}
```

## Type-Safe Functions

### getState

Returns a `State` object or throws an error:

```typescript
import { getState, State } from "ng-states-core";

const lagos: State = getState("Lagos");

// TypeScript knows all properties
console.log(lagos.capital); // string
console.log(lagos.population); // number
console.log(lagos.coordinates); // { latitude: number; longitude: number }
```

### getStates

Returns an array of `State` objects:

```typescript
import { getStates, State } from "ng-states-core";

const states: State[] = getStates();

states.forEach((state: State) => {
  console.log(state.state);
  console.log(state.lgas.length);
});
```

### getStatesByRegion

Accepts a `GeopoliticalZone` and returns `State[]`:

```typescript
import { getStatesByRegion, GeopoliticalZone, State } from "ng-states-core";

const zone: GeopoliticalZone = "South-West";
const states: State[] = getStatesByRegion(zone);

// TypeScript will error on invalid zones
// getStatesByRegion("Invalid"); // Error!
```

### findStateByLga

Returns `State | undefined`:

```typescript
import { findStateByLga, State } from "ng-states-core";

const state: State | undefined = findStateByLga("Ikeja");

if (state) {
  // TypeScript knows state is defined here
  console.log(state.capital);
} else {
  console.log("LGA not found");
}
```

### searchTowns

Returns an array of `TownSearchResult`:

```typescript
import { searchTowns, TownSearchResult } from "ng-states-core";

const results: TownSearchResult[] = searchTowns("aba");

results.forEach((result: TownSearchResult) => {
  console.log(result.state); // string
  console.log(result.town); // string
});
```

## Generic Functions

### Type-Safe State Processor

```typescript
import { State, getState } from "ng-states-core";

function processState<T>(stateName: string, processor: (state: State) => T): T {
  const state = getState(stateName);
  return processor(state);
}

// Usage
const population = processState("Lagos", (state) => state.population);
const lgaCount = processState("Kano", (state) => state.lgas.length);
```

### Type-Safe Filter

```typescript
import { State, getStates } from "ng-states-core";

function filterStates(predicate: (state: State) => boolean): State[] {
  return getStates().filter(predicate);
}

// Usage
const populous = filterStates((s) => s.population > 10000000);
const southWest = filterStates((s) => s.region === "South-West");
```

## Custom Types

### Extended State Type

Extend the `State` type with custom properties:

```typescript
import { State } from "ng-states-core";

interface ExtendedState extends State {
  customField: string;
  metadata: {
    lastUpdated: Date;
    verified: boolean;
  };
}

function enrichState(state: State): ExtendedState {
  return {
    ...state,
    customField: "custom value",
    metadata: {
      lastUpdated: new Date(),
      verified: true,
    },
  };
}
```

### State Summary Type

Create a simplified type:

```typescript
import { State, getStates } from "ng-states-core";

type StateSummary = Pick<State, "state" | "capital" | "region">;

function getStateSummaries(): StateSummary[] {
  return getStates().map((state) => ({
    state: state.state,
    capital: state.capital,
    region: state.region,
  }));
}
```

## Type Guards

### Check if Value is State

```typescript
import { State } from "ng-states-core";

function isState(value: unknown): value is State {
  return (
    typeof value === "object" &&
    value !== null &&
    "state" in value &&
    "capital" in value &&
    "region" in value
  );
}

// Usage
const data: unknown = getSomeData();

if (isState(data)) {
  // TypeScript knows data is State
  console.log(data.capital);
}
```

### Check if Value is GeopoliticalZone

```typescript
import { GeopoliticalZone } from "ng-states-core";

const validZones: GeopoliticalZone[] = [
  "North-Central",
  "North-East",
  "North-West",
  "South-East",
  "South-South",
  "South-West",
];

function isGeopoliticalZone(value: string): value is GeopoliticalZone {
  return validZones.includes(value as GeopoliticalZone);
}

// Usage
const input: string = getUserInput();

if (isGeopoliticalZone(input)) {
  // TypeScript knows input is GeopoliticalZone
  const states = getStatesByRegion(input);
}
```

## Utility Types

### State Property Types

Extract specific property types:

```typescript
import { State } from "ng-states-core";

type StateName = State["state"]; // string
type StateCapital = State["capital"]; // string
type StateRegion = State["region"]; // GeopoliticalZone
type StateCoordinates = State["coordinates"]; // { latitude: number; longitude: number }
```

### Partial State Updates

Use TypeScript utility types:

```typescript
import { State } from "ng-states-core";

type StateUpdate = Partial<Pick<State, "population" | "slogan">>;

function updateStateData(stateName: string, updates: StateUpdate): State {
  const state = getState(stateName);
  return { ...state, ...updates };
}
```

## Best Practices

### Use Type Annotations

```typescript
import { State, GeopoliticalZone } from "ng-states-core";

// Good: Explicit type annotation
const state: State = getState("Lagos");
const zone: GeopoliticalZone = "South-West";

// Also good: Type inference
const states = getStates(); // TypeScript infers State[]
```

### Handle Undefined Returns

```typescript
import { findStateByLga, State } from "ng-states-core";

// Good: Handle undefined
const state = findStateByLga("Ikeja");
if (state) {
  console.log(state.capital);
}

// Better: Use optional chaining
console.log(findStateByLga("Ikeja")?.capital);

// Best: Provide default
const capital = findStateByLga("Ikeja")?.capital ?? "Unknown";
```

### Use Const Assertions

```typescript
import { GeopoliticalZone } from "ng-states-core";

// Good: Type-safe zone constants
const ZONES = [
  "North-Central",
  "North-East",
  "North-West",
  "South-East",
  "South-South",
  "South-West",
] as const;

type Zone = (typeof ZONES)[number]; // Same as GeopoliticalZone
```

## Integration with Frameworks

### React with TypeScript

```typescript
import { useState } from "react";
import { State, getState } from "ng-states-core";

function StateInfo({ stateName }: { stateName: string }) {
  const [state, setState] = useState<State | null>(null);

  useEffect(() => {
    try {
      const stateData = getState(stateName);
      setState(stateData);
    } catch (error) {
      setState(null);
    }
  }, [stateName]);

  if (!state) return <div>Loading...</div>;

  return <div>{state.capital}</div>;
}
```

### Vue with TypeScript

```typescript
import { ref, Ref } from "vue";
import { State, getState } from "ng-states-core";

export function useStateData(stateName: string) {
  const state: Ref<State | null> = ref(null);
  const loading: Ref<boolean> = ref(true);

  try {
    state.value = getState(stateName);
  } catch (error) {
    state.value = null;
  } finally {
    loading.value = false;
  }

  return { state, loading };
}
```

## Next Steps

- [API Reference](/api/types) - Complete type definitions
- [React Integration](/examples/react) - TypeScript with React
- [Vue Integration](/examples/vue) - TypeScript with Vue
- [Getting Started](/guide/getting-started) - Basic usage
