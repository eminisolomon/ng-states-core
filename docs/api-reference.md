# API Reference

Complete reference for all functions in ng-states-core.

## State Functions

### getStates()

Get all Nigerian states with complete data.

```typescript
function getStates(): State[];
```

**Example:**

```typescript
const states = getStates();
console.log(states.length); // 37
```

---

### getStateNames()

Get list of all state names.

```typescript
function getStateNames(): string[];
```

**Example:**

```typescript
const names = getStateNames();
// ['Abia', 'Adamawa', 'Akwa Ibom', ...]
```

---

### getState(state)

Get complete data for a specific state.

```typescript
function getState(state: string): StateData;
```

**Parameters:**

- `state` - State name (case-insensitive)

**Example:**

```typescript
const lagos = getState("Lagos");
console.log(lagos.capital); // 'Ikeja'
```

---

### getStateData(state)

Alias for `getState()`.

```typescript
function getStateData(state: string): StateData;
```

---

### getStatesAndCapitals()

Get all states with their capitals.

```typescript
function getStatesAndCapitals(): StateWithCapital[];
```

**Example:**

```typescript
const data = getStatesAndCapitals();
// [{ state: 'Abia', capital: 'Umuahia' }, ...]
```

---

### getCapital(state)

Get the capital city of a state.

```typescript
function getCapital(state: string): string;
```

**Example:**

```typescript
const capital = getCapital("Lagos");
console.log(capital); // 'Ikeja'
```

## LGA & Location Functions

### getLgas(state)

Get local government areas for a state.

```typescript
function getLgas(state: string): string[];
```

**Example:**

```typescript
const lgas = getLgas("Lagos");
console.log(lgas.length); // 20
```

---

### getSenatorialDistricts(state)

Get senatorial districts for a state.

```typescript
function getSenatorialDistricts(state: string): string[];
```

**Example:**

```typescript
const districts = getSenatorialDistricts("Lagos");
// ['Lagos Central', 'Lagos East', 'Lagos West']
```

---

### getTowns(state)

Get major towns in a state.

```typescript
function getTowns(state: string): string[];
```

**Example:**

```typescript
const towns = getTowns("Lagos");
// ['Ikeja', 'Lekki', 'Victoria Island', ...]
```

---

### findStateByLga(lga)

Find which state an LGA belongs to.

```typescript
function findStateByLga(lga: string): StateData | undefined;
```

**Example:**

```typescript
const state = findStateByLga("Ikeja");
console.log(state?.state); // 'Lagos'
```

---

### findStateByTown(town)

Find which state a town belongs to.

```typescript
function findStateByTown(town: string): StateData | undefined;
```

**Example:**

```typescript
const state = findStateByTown("Lekki");
console.log(state?.state); // 'Lagos'
```

## Region Functions

### getGeopoliticalZones()

Get list of all geopolitical zones.

```typescript
function getGeopoliticalZones(): string[];
```

**Example:**

```typescript
const zones = getGeopoliticalZones();
// ['North-Central', 'North-East', 'North-West',
//  'South-East', 'South-South', 'South-West']
```

---

### getStatesByRegion(region)

Get all states in a geopolitical zone.

```typescript
function getStatesByRegion(region: string): State[];
```

**Example:**

```typescript
const southWest = getStatesByRegion("South-West");
console.log(southWest.map((s) => s.state));
// ['Ekiti', 'Lagos', 'Ogun', 'Ondo', 'Osun', 'Oyo']
```

---

### getRegion(state)

Get the geopolitical zone for a state.

```typescript
function getRegion(state: string): string;
```

**Example:**

```typescript
const region = getRegion("Lagos");
console.log(region); // 'South-West'
```

## Search Functions

### searchStates(query)

Search for states by name.

```typescript
function searchStates(query: string): State[];
```

**Example:**

```typescript
const results = searchStates("lag");
console.log(results[0].state); // 'Lagos'
```

---

### searchTowns(query)

Search for towns across all states.

```typescript
function searchTowns(query: string): Array<{ state: string; town: string }>;
```

**Example:**

```typescript
const results = searchTowns("aba");
// [{ state: 'Abia', town: 'Aba' }, ...]
```

## Metadata Functions

### getPostalCode(state)

Get postal code for a state.

```typescript
function getPostalCode(state: string): string;
```

**Example:**

```typescript
const code = getPostalCode("Lagos");
console.log(code); // '100001'
```

---

### getCoordinates(state)

Get geographic coordinates for a state.

```typescript
function getCoordinates(state: string): { latitude: number; longitude: number };
```

**Example:**

```typescript
const coords = getCoordinates("Lagos");
console.log(coords); // { latitude: 6.601838, longitude: 3.3514863 }
```

---

### getPopulation(state)

Get population for a state.

```typescript
function getPopulation(state: string): number;
```

**Example:**

```typescript
const pop = getPopulation("Lagos");
console.log(pop); // 15400000
```

---

### getCreationDate(state)

Get creation date for a state.

```typescript
function getCreationDate(state: string): string;
```

**Example:**

```typescript
const date = getCreationDate("Lagos");
console.log(date); // '1967-05-27'
```

---

### getSlogan(state)

Get slogan for a state.

```typescript
function getSlogan(state: string): string;
```

**Example:**

```typescript
const slogan = getSlogan("Lagos");
console.log(slogan); // 'Centre of Excellence'
```

## TypeScript Types

```typescript
interface State {
  state: string;
  capital: string;
  region: string;
  postal_code: string;
  coordinates: { latitude: number; longitude: number };
  population: number;
  created: string;
  slogan: string;
  lgas: string[];
  senatorial_districts: string[];
  towns: string[];
}

type GeopoliticalZone =
  | "North-Central"
  | "North-East"
  | "North-West"
  | "South-East"
  | "South-South"
  | "South-West";
```
