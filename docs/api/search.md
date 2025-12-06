# Search Functions API

Complete API reference for search and find functions.

## searchStates

Search for states using partial name matching.

### Signature

```typescript
function searchStates(query: string): State[];
```

### Parameters

- `query` (string) - Search term (case-insensitive)

### Returns

`State[]` - Array of matching states

### Example

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

// No matches
const noMatch = searchStates("xyz");
console.log(noMatch); // []
```

---

## searchTowns

Search for towns across all states.

### Signature

```typescript
function searchTowns(query: string): TownSearchResult[];
```

### Parameters

- `query` (string) - Search term (case-insensitive)

### Returns

`TownSearchResult[]` - Array of matching towns with their states

### Example

```typescript
import { searchTowns } from "ng-states-core";

const results = searchTowns("aba");

results.forEach(({ state, town }) => {
  console.log(`${town} in ${state}`);
});
// Aba in Abia
// Abakaliki in Ebonyi
// Abeokuta in Ogun

// Case insensitive
const results2 = searchTowns("IKE");
console.log(results2);
// [{ state: 'Lagos', town: 'Ikeja' }, ...]
```

---

## findStateByLga

Find which state a Local Government Area belongs to.

### Signature

```typescript
function findStateByLga(lga: string): State | undefined;
```

### Parameters

- `lga` (string) - LGA name (case-insensitive)

### Returns

`State | undefined` - State object if found, `undefined` otherwise

### Example

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

// Not found
const notFound = findStateByLga("Invalid LGA");
console.log(notFound); // undefined
```

---

## findStateByTown

Find which state a town belongs to.

### Signature

```typescript
function findStateByTown(town: string): State | undefined;
```

### Parameters

- `town` (string) - Town name (case-insensitive)

### Returns

`State | undefined` - State object if found, `undefined` otherwise

### Example

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

// Not found
const notFound = findStateByTown("Unknown Town");
console.log(notFound); // undefined
```

---

## TownSearchResult Interface

Type definition for town search results.

### Type Definition

```typescript
interface TownSearchResult {
  state: string;
  town: string;
}
```

### Properties

| Property | Type     | Description                          |
| -------- | -------- | ------------------------------------ |
| `state`  | `string` | State name where the town is located |
| `town`   | `string` | Town name                            |

### Example

```typescript
import { searchTowns, TownSearchResult } from "ng-states-core";

const results: TownSearchResult[] = searchTowns("port");

results.forEach((result: TownSearchResult) => {
  console.log(`${result.town} is in ${result.state}`);
});
// Port Harcourt is in Rivers
```

---

## Usage Examples

### Autocomplete Search

```typescript
import { searchStates, searchTowns } from "ng-states-core";

function autocomplete(query: string) {
  if (query.length < 2) return [];

  const states = searchStates(query).map((s) => ({
    type: "state",
    label: `${s.state} (State)`,
    value: s.state,
  }));

  const towns = searchTowns(query)
    .slice(0, 10)
    .map((t) => ({
      type: "town",
      label: `${t.town}, ${t.state}`,
      value: t.town,
    }));

  return [...states, ...towns];
}

console.log(autocomplete("lag"));
```

### Validate Location

```typescript
import { findStateByLga, findStateByTown } from "ng-states-core";

function validateLocation(location: string, type: "lga" | "town") {
  const findFn = type === "lga" ? findStateByLga : findStateByTown;
  const state = findFn(location);

  return {
    valid: !!state,
    state: state?.state,
    message: state
      ? `${location} is in ${state.state}`
      : `${location} is not a valid ${type}`,
  };
}

console.log(validateLocation("Ikeja", "lga"));
// { valid: true, state: 'Lagos', message: 'Ikeja is in Lagos' }
```

### Search All Locations

```typescript
import { searchStates, searchTowns, getStates } from "ng-states-core";

function searchAll(query: string) {
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

console.log(searchAll("ik"));
```

## Related

- [State Functions](/api/states) - Get state data
- [Geopolitical Zones](/api/zones) - Filter by region
- [Search Guide](/guide/search-filter) - Search examples
