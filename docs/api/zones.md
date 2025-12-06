# Geopolitical Zones API

Complete API reference for geopolitical zone functions.

## getGeopoliticalZones

Get all geopolitical zones in Nigeria.

### Signature

```typescript
function getGeopoliticalZones(): GeopoliticalZone[];
```

### Returns

`GeopoliticalZone[]` - Array of all 6 geopolitical zones

### Example

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

// Use in a dropdown
zones.forEach((zone) => {
  console.log(`<option value="${zone}">${zone}</option>`);
});
```

---

## getStatesByRegion

Get all states in a specific geopolitical zone.

### Signature

```typescript
function getStatesByRegion(region: string): State[];
```

### Parameters

- `region` (string) - Geopolitical zone name (case-insensitive)

### Returns

`State[]` - Array of states in the specified region

### Throws

`Error` - If region is not valid

### Example

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

// Case insensitive
const southEast = getStatesByRegion("south-east");
console.log(southEast.length); // 5
```

---

## GeopoliticalZone Type

Type definition for geopolitical zones.

### Type Definition

```typescript
type GeopoliticalZone =
  | "North-Central"
  | "North-East"
  | "North-West"
  | "South-East"
  | "South-South"
  | "South-West";
```

### Values

| Zone            | States | Description                                           |
| --------------- | ------ | ----------------------------------------------------- |
| `North-Central` | 7      | Benue, FCT, Kogi, Kwara, Nasarawa, Niger, Plateau     |
| `North-East`    | 6      | Adamawa, Bauchi, Borno, Gombe, Taraba, Yobe           |
| `North-West`    | 7      | Jigawa, Kaduna, Kano, Katsina, Kebbi, Sokoto, Zamfara |
| `South-East`    | 5      | Abia, Anambra, Ebonyi, Enugu, Imo                     |
| `South-South`   | 6      | Akwa Ibom, Bayelsa, Cross River, Delta, Edo, Rivers   |
| `South-West`    | 6      | Ekiti, Lagos, Ogun, Ondo, Osun, Oyo                   |

### Example

```typescript
import { GeopoliticalZone, getStatesByRegion } from "ng-states-core";

// Type-safe zone variable
const zone: GeopoliticalZone = "South-West";
const states = getStatesByRegion(zone);

// TypeScript will error on invalid zones
// const invalid: GeopoliticalZone = "Invalid"; // Error!
```

---

## Usage Examples

### Group States by Zone

```typescript
import { getGeopoliticalZones, getStatesByRegion } from "ng-states-core";

function groupStatesByZone() {
  const zones = getGeopoliticalZones();

  return zones.map((zone) => ({
    zone,
    states: getStatesByRegion(zone).map((s) => ({
      name: s.state,
      capital: s.capital,
    })),
  }));
}

const grouped = groupStatesByZone();
console.log(grouped);
```

### Zone Statistics

```typescript
import { getGeopoliticalZones, getStatesByRegion } from "ng-states-core";

function getZoneStats() {
  const zones = getGeopoliticalZones();

  return zones.map((zone) => {
    const states = getStatesByRegion(zone);
    const totalPop = states.reduce((sum, s) => sum + s.population, 0);
    const totalLgas = states.reduce((sum, s) => sum + s.lgas.length, 0);

    return {
      zone,
      stateCount: states.length,
      totalPopulation: totalPop,
      totalLgas: totalLgas,
      avgPopulation: Math.round(totalPop / states.length),
    };
  });
}

console.log(getZoneStats());
```

### Find Zone by State

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
    difference: Math.abs(pop1 - pop2),
  };
}

console.log(compareZones("South-West", "North-West"));
```

### Filter by Multiple Zones

```typescript
import { getStatesByRegion } from "ng-states-core";

function getStatesByZones(zones: string[]) {
  return zones.flatMap((zone) => getStatesByRegion(zone));
}

// Get all southern states
const southern = getStatesByZones(["South-East", "South-South", "South-West"]);

console.log(southern.map((s) => s.state));
```

### Zone Type Guard

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

function isValidZone(value: string): value is GeopoliticalZone {
  return validZones.includes(value as GeopoliticalZone);
}

const input = getUserInput();

if (isValidZone(input)) {
  // TypeScript knows input is GeopoliticalZone
  const states = getStatesByRegion(input);
}
```

## Related

- [State Functions](/api/states) - Get state data
- [Search Functions](/api/search) - Search states
- [Zones Guide](/guide/geopolitical-zones) - Detailed guide
