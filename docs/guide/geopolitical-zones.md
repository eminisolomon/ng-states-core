# Geopolitical Zones

Learn how to filter and group Nigerian states by geopolitical zones.

## Overview

Nigeria is divided into 6 geopolitical zones, each comprising multiple states. ng-states-core provides functions to work with these zones efficiently.

## The Six Geopolitical Zones

1. **North-Central** - 7 states including FCT
2. **North-East** - 6 states
3. **North-West** - 7 states
4. **South-East** - 5 states
5. **South-South** - 6 states
6. **South-West** - 6 states

## Get All Zones

Retrieve a list of all geopolitical zones:

```typescript
import { getGeopoliticalZones } from "ng-states-core";

const zones = getGeopoliticalZones();
console.log(zones);
// [
//   'North-Central',
//   'North-East',
//   'North-West',
//   'South-East',
//   'South-South',
//   'South-West'
// ]
```

## Get States by Zone

Retrieve all states in a specific geopolitical zone:

```typescript
import { getStatesByRegion } from "ng-states-core";

// Get all South-West states
const southWest = getStatesByRegion("South-West");
console.log(southWest.map((s) => s.state));
// ['Ekiti', 'Lagos', 'Ogun', 'Ondo', 'Osun', 'Oyo']

// Get all North-Central states
const northCentral = getStatesByRegion("North-Central");
console.log(northCentral.map((s) => s.state));
// ['Benue', 'Federal Capital Territory', 'Kogi',
//  'Kwara', 'Nasarawa', 'Niger', 'Plateau']
```

## Case Insensitive

Zone names are case-insensitive:

```typescript
import { getStatesByRegion } from "ng-states-core";

const southEast1 = getStatesByRegion("South-East");
const southEast2 = getStatesByRegion("south-east");
const southEast3 = getStatesByRegion("SOUTH-EAST");

// All return the same results
console.log(southEast1.length === southEast2.length); // true
```

## Zone Breakdown

### North-Central

```typescript
import { getStatesByRegion } from "ng-states-core";

const northCentral = getStatesByRegion("North-Central");
// States: Benue, FCT, Kogi, Kwara, Nasarawa, Niger, Plateau
```

### North-East

```typescript
const northEast = getStatesByRegion("North-East");
// States: Adamawa, Bauchi, Borno, Gombe, Taraba, Yobe
```

### North-West

```typescript
const northWest = getStatesByRegion("North-West");
// States: Jigawa, Kaduna, Kano, Katsina, Kebbi, Sokoto, Zamfara
```

### South-East

```typescript
const southEast = getStatesByRegion("South-East");
// States: Abia, Anambra, Ebonyi, Enugu, Imo
```

### South-South

```typescript
const southSouth = getStatesByRegion("South-South");
// States: Akwa Ibom, Bayelsa, Cross River, Delta, Edo, Rivers
```

### South-West

```typescript
const southWest = getStatesByRegion("South-West");
// States: Ekiti, Lagos, Ogun, Ondo, Osun, Oyo
```

## Practical Examples

### Zone Selector

Create a dropdown grouped by zones:

```typescript
import { getGeopoliticalZones, getStatesByRegion } from "ng-states-core";

function getGroupedStates() {
  const zones = getGeopoliticalZones();

  return zones.map((zone) => ({
    zone,
    states: getStatesByRegion(zone).map((s) => ({
      name: s.state,
      capital: s.capital,
    })),
  }));
}

const grouped = getGroupedStates();
console.log(grouped);
// [
//   {
//     zone: 'North-Central',
//     states: [
//       { name: 'Benue', capital: 'Makurdi' },
//       { name: 'Federal Capital Territory', capital: 'Abuja' },
//       ...
//     ]
//   },
//   ...
// ]
```

### Zone Statistics

Calculate statistics for each zone:

```typescript
import { getGeopoliticalZones, getStatesByRegion } from "ng-states-core";

function getZoneStatistics() {
  const zones = getGeopoliticalZones();

  return zones.map((zone) => {
    const states = getStatesByRegion(zone);
    const totalPopulation = states.reduce((sum, s) => sum + s.population, 0);
    const totalLgas = states.reduce((sum, s) => sum + s.lgas.length, 0);

    return {
      zone,
      stateCount: states.length,
      totalPopulation,
      totalLgas,
      averagePopulation: Math.round(totalPopulation / states.length),
    };
  });
}

console.log(getZoneStatistics());
```

### Find Zone by State

Determine which zone a state belongs to:

```typescript
import { getState } from "ng-states-core";

function getZoneForState(stateName: string): string {
  const state = getState(stateName);
  return state.region;
}

console.log(getZoneForState("Lagos")); // 'South-West'
console.log(getZoneForState("Kano")); // 'North-West'
```

### Compare Zones

Compare different zones:

```typescript
import { getStatesByRegion } from "ng-states-core";

function compareZones(zone1: string, zone2: string) {
  const states1 = getStatesByRegion(zone1);
  const states2 = getStatesByRegion(zone2);

  const pop1 = states1.reduce((sum, s) => sum + s.population, 0);
  const pop2 = states2.reduce((sum, s) => sum + s.population, 0);

  return {
    zone1: {
      name: zone1,
      states: states1.length,
      population: pop1,
    },
    zone2: {
      name: zone2,
      states: states2.length,
      population: pop2,
    },
    populationDifference: Math.abs(pop1 - pop2),
  };
}

console.log(compareZones("South-West", "North-West"));
```

### Zone Population Ranking

Rank zones by total population:

```typescript
import { getGeopoliticalZones, getStatesByRegion } from "ng-states-core";

function rankZonesByPopulation() {
  const zones = getGeopoliticalZones();

  const zoneData = zones.map((zone) => {
    const states = getStatesByRegion(zone);
    const totalPopulation = states.reduce((sum, s) => sum + s.population, 0);

    return {
      zone,
      population: totalPopulation,
      states: states.length,
    };
  });

  return zoneData.sort((a, b) => b.population - a.population);
}

const ranked = rankZonesByPopulation();
ranked.forEach((zone, index) => {
  console.log(
    `${index + 1}. ${zone.zone}: ${zone.population.toLocaleString()}`
  );
});
```

### Filter States by Multiple Zones

Get states from multiple zones:

```typescript
import { getStatesByRegion } from "ng-states-core";

function getStatesByZones(zones: string[]) {
  return zones.flatMap((zone) => getStatesByRegion(zone));
}

// Get all southern states
const southernStates = getStatesByZones([
  "South-East",
  "South-South",
  "South-West",
]);

console.log(southernStates.map((s) => s.state));
```

### Zone Capitals

List all state capitals in a zone:

```typescript
import { getStatesByRegion } from "ng-states-core";

function getZoneCapitals(zone: string) {
  return getStatesByRegion(zone).map((state) => ({
    state: state.state,
    capital: state.capital,
    coordinates: state.coordinates,
  }));
}

const southWestCapitals = getZoneCapitals("South-West");
console.log(southWestCapitals);
// [
//   { state: 'Ekiti', capital: 'Ado-Ekiti', coordinates: {...} },
//   { state: 'Lagos', capital: 'Ikeja', coordinates: {...} },
//   ...
// ]
```

## TypeScript Support

The `GeopoliticalZone` type ensures type safety:

```typescript
import { GeopoliticalZone, getStatesByRegion } from "ng-states-core";

function processZone(zone: GeopoliticalZone) {
  // zone is typed as one of the 6 valid zones
  const states = getStatesByRegion(zone);
  return states;
}

// TypeScript will error on invalid zones
// processZone("Invalid Zone"); // Error!
processZone("South-West"); // OK
```

## Next Steps

- [States & Capitals](/guide/states-capitals) - Learn about state data
- [LGAs & Towns](/guide/lgas-towns) - Work with local government areas
- [Search & Filter](/guide/search-filter) - Search and filter functionality
- [API Reference](/api/zones) - Complete zones API documentation
