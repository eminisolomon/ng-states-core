# Quick Start

Get up and running with ng-states-core in minutes.

## Installation

```bash
npm install ng-states-core
```

## Common Use Cases

### 1. State Selector Dropdown

Create a dropdown for selecting Nigerian states:

```typescript
import { getStateNames } from "ng-states-core";

const states = getStateNames();
// ['Abia', 'Adamawa', 'Akwa Ibom', ...]

// In your HTML/JSX
states.forEach((state) => {
  console.log(`<option value="${state}">${state}</option>`);
});
```

### 2. Get State Information

Retrieve detailed information about a specific state:

```typescript
import { getState } from "ng-states-core";

const lagos = getState("Lagos");

console.log(lagos.capital); // 'Ikeja'
console.log(lagos.region); // 'South-West'
console.log(lagos.population); // 15400000
console.log(lagos.postal_code); // '100001'
console.log(lagos.slogan); // 'Centre of Excellence'
```

### 3. Cascading State and LGA Dropdowns

Create dependent dropdowns for state and LGA selection:

```typescript
import { getStateNames, getLgas } from "ng-states-core";

// Get all states
const states = getStateNames();

// When user selects a state, get its LGAs
function onStateChange(selectedState: string) {
  const lgas = getLgas(selectedState);
  console.log(lgas);
  // For Lagos: ['Agege', 'Ajeromi-Ifelodun', 'Alimosho', ...]
}
```

### 4. Find State by LGA

Determine which state an LGA belongs to:

```typescript
import { findStateByLga } from "ng-states-core";

const state = findStateByLga("Ikeja");

if (state) {
  console.log(state.state); // 'Lagos'
  console.log(state.capital); // 'Ikeja'
}
```

### 5. Search for States

Search states using partial matches:

```typescript
import { searchStates } from "ng-states-core";

const results = searchStates("lag");
console.log(results.map((s) => s.state));
// ['Lagos', 'Plateau'] (any state containing 'lag')
```

### 6. Filter by Geopolitical Zone

Get all states in a specific region:

```typescript
import { getStatesByRegion } from "ng-states-core";

const southWest = getStatesByRegion("South-West");
console.log(southWest.map((s) => s.state));
// ['Ekiti', 'Lagos', 'Ogun', 'Ondo', 'Osun', 'Oyo']
```

### 7. Get All Geopolitical Zones

List all available zones:

```typescript
import { getGeopoliticalZones } from "ng-states-core";

const zones = getGeopoliticalZones();
console.log(zones);
// ['North-Central', 'North-East', 'North-West',
//  'South-East', 'South-South', 'South-West']
```

### 8. Search Towns

Find towns across all states:

```typescript
import { searchTowns } from "ng-states-core";

const results = searchTowns("aba");

results.forEach(({ state, town }) => {
  console.log(`${town} in ${state}`);
});
// Aba in Abia
// Abakaliki in Ebonyi
// Abeokuta in Ogun
```

## Real-World Example: Registration Form

Here's a complete example of a registration form with state and LGA selection:

```typescript
import { getStateNames, getLgas, getState } from "ng-states-core";

class RegistrationForm {
  private selectedState: string = "";
  private selectedLga: string = "";

  getStates() {
    return getStateNames();
  }

  getLgasForSelectedState() {
    if (!this.selectedState) return [];
    return getLgas(this.selectedState);
  }

  onStateChange(state: string) {
    this.selectedState = state;
    this.selectedLga = ""; // Reset LGA when state changes
  }

  onLgaChange(lga: string) {
    this.selectedLga = lga;
  }

  getStateDetails() {
    if (!this.selectedState) return null;
    return getState(this.selectedState);
  }

  submit() {
    console.log({
      state: this.selectedState,
      lga: this.selectedLga,
      stateDetails: this.getStateDetails(),
    });
  }
}
```

## TypeScript Support

ng-states-core is written in TypeScript and provides full type definitions:

```typescript
import { State, GeopoliticalZone } from "ng-states-core";

function processState(state: State) {
  console.log(state.state);
  console.log(state.capital);
  console.log(state.lgas);
  console.log(state.towns);
}

function processZone(zone: GeopoliticalZone) {
  // zone is typed as one of the 6 geopolitical zones
  console.log(zone);
}
```

## Next Steps

- [States & Capitals](/guide/states-capitals) - Learn more about state data
- [Search & Filter](/guide/search-filter) - Master search functionality
- [React Integration](/examples/react) - Use in React applications
- [API Reference](/api/overview) - Explore all available functions
