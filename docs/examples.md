# Examples

Practical examples for common use cases.

## Registration Form

```typescript
import { getStateNames, getLgas } from "ng-states-core";

class RegistrationForm {
  private selectedState = "";
  private selectedLga = "";

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

  submit() {
    console.log({
      state: this.selectedState,
      lga: this.selectedLga,
    });
  }
}
```

## Search Autocomplete

```typescript
import { searchStates, searchTowns } from "ng-states-core";

function autocomplete(query: string) {
  if (query.length < 2) return [];

  const states = searchStates(query).map((s) => ({
    type: "state",
    label: `${s.state} (State)`,
  }));

  const towns = searchTowns(query)
    .slice(0, 5)
    .map((t) => ({
      type: "town",
      label: `${t.town}, ${t.state}`,
    }));

  return [...states, ...towns];
}

console.log(autocomplete("lag"));
```

## Filter by Region

```typescript
import { getGeopoliticalZones, getStatesByRegion } from "ng-states-core";

function getStatesByZone() {
  const zones = getGeopoliticalZones();

  return zones.map((zone) => ({
    zone,
    states: getStatesByRegion(zone).map((s) => s.state),
  }));
}

console.log(getStatesByZone());
```

## Validate Location

```typescript
import { findStateByLga } from "ng-states-core";

function validateLga(lga: string) {
  const state = findStateByLga(lga);

  return {
    valid: !!state,
    state: state?.state,
    message: state
      ? `${lga} is in ${state.state}`
      : `${lga} is not a valid LGA`,
  };
}

console.log(validateLga("Ikeja"));
// { valid: true, state: 'Lagos', message: 'Ikeja is in Lagos' }
```

## React Hook

```typescript
import { useState, useEffect } from "react";
import { getState, type State } from "ng-states-core";

function useStateData(stateName: string) {
  const [state, setState] = useState<State | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!stateName) {
      setState(null);
      setLoading(false);
      return;
    }

    try {
      const data = getState(stateName);
      setState(data);
    } catch (error) {
      setState(null);
    } finally {
      setLoading(false);
    }
  }, [stateName]);

  return { state, loading };
}

// Usage
function MyComponent() {
  const { state, loading } = useStateData("Lagos");

  if (loading) return <div>Loading...</div>;
  if (!state) return <div>Not found</div>;

  return <div>{state.capital}</div>;
}
```

## Display State Info

```typescript
import { getState } from "ng-states-core";

function displayStateInfo(stateName: string) {
  const state = getState(stateName);

  return `
    State: ${state.state}
    Capital: ${state.capital}
    Region: ${state.region}
    Population: ${state.population.toLocaleString()}
    LGAs: ${state.lgas.length}
    Postal Code: ${state.postal_code}
  `;
}

console.log(displayStateInfo("Lagos"));
```

## Map Integration

```typescript
import { getStates } from "ng-states-core";

// Example with Leaflet
function addStateMarkers(map) {
  const states = getStates();

  states.forEach((state) => {
    const { latitude, longitude } = state.coordinates;

    L.marker([latitude, longitude]).addTo(map).bindPopup(`
        <strong>${state.state}</strong><br>
        Capital: ${state.capital}
      `);
  });
}
```

## Population Statistics

```typescript
import { getStates } from "ng-states-core";

function getPopulationStats() {
  const states = getStates();

  const total = states.reduce((sum, s) => sum + s.population, 0);
  const avg = total / states.length;

  const sorted = states.sort((a, b) => b.population - a.population).slice(0, 5);

  return {
    total,
    average: Math.round(avg),
    top5: sorted.map((s) => ({
      state: s.state,
      population: s.population,
    })),
  };
}

console.log(getPopulationStats());
```
