# State Functions API

Complete API reference for state-related functions.

## getStates

Get all Nigerian states with complete data.

### Signature

```typescript
function getStates(): State[];
```

### Returns

`State[]` - Array of all 37 states (36 states + FCT)

### Example

```typescript
import { getStates } from "ng-states-core";

const allStates = getStates();
console.log(allStates.length); // 37

allStates.forEach((state) => {
  console.log(`${state.state}: ${state.capital}`);
});
```

---

## getState

Get detailed information for a specific state.

### Signature

```typescript
function getState(stateName: string): State;
```

### Parameters

- `stateName` (string) - Name of the state (case-insensitive)

### Returns

`State` - Complete state object

### Throws

`Error` - If state is not found

### Example

```typescript
import { getState } from "ng-states-core";

const lagos = getState("Lagos");
console.log(lagos.capital); // 'Ikeja'
console.log(lagos.population); // 15400000

// Case insensitive
const kano = getState("KANO");
console.log(kano.capital); // 'Kano'
```

---

## getStateNames

Get an array of all state names.

### Signature

```typescript
function getStateNames(): string[];
```

### Returns

`string[]` - Array of state names

### Example

```typescript
import { getStateNames } from "ng-states-core";

const names = getStateNames();
console.log(names);
// ['Abia', 'Adamawa', 'Akwa Ibom', ...]

// Useful for dropdowns
names.forEach((name) => {
  console.log(`<option value="${name}">${name}</option>`);
});
```

---

## getCapital

Get the capital city of a specific state.

### Signature

```typescript
function getCapital(stateName: string): string;
```

### Parameters

- `stateName` (string) - Name of the state (case-insensitive)

### Returns

`string` - Capital city name

### Throws

`Error` - If state is not found

### Example

```typescript
import { getCapital } from "ng-states-core";

const capital = getCapital("Lagos");
console.log(capital); // 'Ikeja'

// Case insensitive
console.log(getCapital("rivers")); // 'Port Harcourt'
```

---

## getLgas

Get all Local Government Areas for a specific state.

### Signature

```typescript
function getLgas(stateName: string): string[];
```

### Parameters

- `stateName` (string) - Name of the state (case-insensitive)

### Returns

`string[]` - Array of LGA names

### Throws

`Error` - If state is not found

### Example

```typescript
import { getLgas } from "ng-states-core";

const lagosLgas = getLgas("Lagos");
console.log(lagosLgas);
// ['Agege', 'Ajeromi-Ifelodun', 'Alimosho', ...]

console.log(lagosLgas.length); // 20
```

---

## State Interface

Complete type definition for state objects.

### Type Definition

```typescript
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

### Properties

| Property                | Type               | Description                     |
| ----------------------- | ------------------ | ------------------------------- |
| `state`                 | `string`           | Official state name             |
| `capital`               | `string`           | Capital city                    |
| `region`                | `GeopoliticalZone` | Geopolitical zone               |
| `postal_code`           | `string`           | Primary postal code             |
| `coordinates`           | `object`           | Geographic coordinates          |
| `coordinates.latitude`  | `number`           | Latitude in decimal degrees     |
| `coordinates.longitude` | `number`           | Longitude in decimal degrees    |
| `population`            | `number`           | Estimated population            |
| `created`               | `string`           | Creation date (YYYY-MM-DD)      |
| `slogan`                | `string`           | Official state slogan           |
| `lgas`                  | `string[]`         | Local Government Areas          |
| `senatorial_districts`  | `string[]`         | Senatorial districts (always 3) |
| `towns`                 | `string[]`         | Major towns                     |

### Example

```typescript
import { getState, State } from "ng-states-core";

const state: State = getState("Lagos");

// Access all properties
console.log(state.state); // 'Lagos'
console.log(state.capital); // 'Ikeja'
console.log(state.region); // 'South-West'
console.log(state.postal_code); // '100001'
console.log(state.coordinates.latitude); // 6.45407
console.log(state.coordinates.longitude); // 3.39467
console.log(state.population); // 15400000
console.log(state.created); // '1967-05-27'
console.log(state.slogan); // 'Centre of Excellence'
console.log(state.lgas.length); // 20
console.log(state.senatorial_districts); // ['Lagos Central', 'Lagos East', 'Lagos West']
console.log(state.towns.length); // Number of major towns
```

## Related

- [Search Functions](/api/search) - Search for states, LGAs, and towns
- [Geopolitical Zones](/api/zones) - Filter by region
- [Type Definitions](/api/types) - TypeScript types
