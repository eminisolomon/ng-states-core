# Map Integration

Learn how to integrate ng-states-core with popular mapping libraries to display Nigerian states on interactive maps.

## Overview

ng-states-core provides geographic coordinates for all state capitals, making it easy to integrate with mapping libraries like Leaflet, Google Maps, and Mapbox.

## Leaflet Integration

### Installation

```bash
npm install leaflet
npm install @types/leaflet --save-dev
```

### Basic Map with State Markers

```typescript
import L from "leaflet";
import { getStates } from "ng-states-core";

// Initialize map
const map = L.map("map").setView([9.082, 8.6753], 6); // Center of Nigeria

// Add tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

// Add markers for all state capitals
const states = getStates();

states.forEach((state) => {
  const { latitude, longitude } = state.coordinates;

  L.marker([latitude, longitude]).addTo(map).bindPopup(`
      <strong>${state.state}</strong><br>
      Capital: ${state.capital}<br>
      Region: ${state.region}<br>
      Population: ${state.population.toLocaleString()}
    `);
});
```

### Colored Markers by Region

```typescript
import L from "leaflet";
import { getStates, type GeopoliticalZone } from "ng-states-core";

const regionColors: Record<GeopoliticalZone, string> = {
  "North-Central": "#FF6B6B",
  "North-East": "#4ECDC4",
  "North-West": "#45B7D1",
  "South-East": "#FFA07A",
  "South-South": "#98D8C8",
  "South-West": "#F7DC6F",
};

const states = getStates();

states.forEach((state) => {
  const { latitude, longitude } = state.coordinates;
  const color = regionColors[state.region];

  const marker = L.circleMarker([latitude, longitude], {
    radius: 8,
    fillColor: color,
    color: "#fff",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.8,
  }).addTo(map);

  marker.bindPopup(`
    <div style="color: ${color}">
      <h3>${state.state}</h3>
      <p><strong>Capital:</strong> ${state.capital}</p>
      <p><strong>Region:</strong> ${state.region}</p>
      <p><strong>LGAs:</strong> ${state.lgas.length}</p>
    </div>
  `);
});
```

### React + Leaflet

```tsx
import { useEffect, useRef } from "react";
import L from "leaflet";
import { getStates } from "ng-states-core";
import "leaflet/dist/leaflet.css";

export default function StateMap() {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map
    const map = L.map(mapContainerRef.current).setView([9.082, 8.6753], 6);
    mapRef.current = map;

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Add state markers
    const states = getStates();

    states.forEach((state) => {
      const { latitude, longitude } = state.coordinates;

      L.marker([latitude, longitude]).addTo(map).bindPopup(`
          <strong>${state.state}</strong><br>
          ${state.capital}
        `);
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div ref={mapContainerRef} style={{ height: "600px", width: "100%" }} />
  );
}
```

## Google Maps Integration

### Installation

```bash
npm install @googlemaps/js-api-loader
```

### Basic Google Map

```typescript
import { Loader } from "@googlemaps/js-api-loader";
import { getStates } from "ng-states-core";

const loader = new Loader({
  apiKey: "YOUR_GOOGLE_MAPS_API_KEY",
  version: "weekly",
});

loader.load().then(async () => {
  const { Map } = (await google.maps.importLibrary(
    "maps"
  )) as google.maps.MapsLibrary;
  const { AdvancedMarkerElement } = (await google.maps.importLibrary(
    "marker"
  )) as google.maps.MarkerLibrary;

  const map = new Map(document.getElementById("map") as HTMLElement, {
    center: { lat: 9.082, lng: 8.6753 },
    zoom: 6,
    mapId: "DEMO_MAP_ID",
  });

  const states = getStates();

  states.forEach((state) => {
    const { latitude, longitude } = state.coordinates;

    const marker = new AdvancedMarkerElement({
      map,
      position: { lat: latitude, lng: longitude },
      title: state.state,
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div>
          <h3>${state.state}</h3>
          <p><strong>Capital:</strong> ${state.capital}</p>
          <p><strong>Population:</strong> ${state.population.toLocaleString()}</p>
        </div>
      `,
    });

    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });
  });
});
```

### React + Google Maps

```tsx
import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { getStates } from "ng-states-core";

export default function GoogleStateMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      version: "weekly",
    });

    loader.load().then(async () => {
      const { Map } = (await google.maps.importLibrary(
        "maps"
      )) as google.maps.MapsLibrary;

      const map = new Map(mapRef.current!, {
        center: { lat: 9.082, lng: 8.6753 },
        zoom: 6,
      });

      const states = getStates();

      states.forEach((state) => {
        const marker = new google.maps.Marker({
          position: {
            lat: state.coordinates.latitude,
            lng: state.coordinates.longitude,
          },
          map,
          title: state.state,
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `<strong>${state.state}</strong><br>${state.capital}`,
        });

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });
      });
    });
  }, []);

  return <div ref={mapRef} style={{ height: "600px", width: "100%" }} />;
}
```

## Mapbox Integration

### Installation

```bash
npm install mapbox-gl
```

### Basic Mapbox Map

```typescript
import mapboxgl from "mapbox-gl";
import { getStates } from "ng-states-core";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "YOUR_MAPBOX_ACCESS_TOKEN";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12",
  center: [8.6753, 9.082],
  zoom: 5.5,
});

const states = getStates();

states.forEach((state) => {
  const { latitude, longitude } = state.coordinates;

  new mapboxgl.Marker()
    .setLngLat([longitude, latitude])
    .setPopup(
      new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <h3>${state.state}</h3>
          <p><strong>Capital:</strong> ${state.capital}</p>
          <p><strong>Region:</strong> ${state.region}</p>
        `)
    )
    .addTo(map);
});
```

### Clustered Markers

```typescript
import mapboxgl from "mapbox-gl";
import { getStates } from "ng-states-core";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12",
  center: [8.6753, 9.082],
  zoom: 5.5,
});

map.on("load", () => {
  const states = getStates();

  // Create GeoJSON from states
  const geojson = {
    type: "FeatureCollection",
    features: states.map((state) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [state.coordinates.longitude, state.coordinates.latitude],
      },
      properties: {
        name: state.state,
        capital: state.capital,
        region: state.region,
        population: state.population,
      },
    })),
  };

  map.addSource("states", {
    type: "geojson",
    data: geojson,
    cluster: true,
    clusterMaxZoom: 14,
    clusterRadius: 50,
  });

  map.addLayer({
    id: "clusters",
    type: "circle",
    source: "states",
    filter: ["has", "point_count"],
    paint: {
      "circle-color": [
        "step",
        ["get", "point_count"],
        "#51bbd6",
        10,
        "#f1f075",
        20,
        "#f28cb1",
      ],
      "circle-radius": ["step", ["get", "point_count"], 20, 10, 30, 20, 40],
    },
  });

  map.addLayer({
    id: "unclustered-point",
    type: "circle",
    source: "states",
    filter: ["!", ["has", "point_count"]],
    paint: {
      "circle-color": "#11b4da",
      "circle-radius": 8,
      "circle-stroke-width": 1,
      "circle-stroke-color": "#fff",
    },
  });
});
```

## Filter by Region

Display only states from a specific region:

```typescript
import { getStatesByRegion, type GeopoliticalZone } from "ng-states-core";
import L from "leaflet";

function displayRegion(region: GeopoliticalZone) {
  // Clear existing markers
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });

  // Add markers for selected region
  const states = getStatesByRegion(region);

  states.forEach((state) => {
    const { latitude, longitude } = state.coordinates;

    L.marker([latitude, longitude])
      .addTo(map)
      .bindPopup(`<strong>${state.state}</strong><br>${state.capital}`);
  });

  // Fit map to markers
  if (states.length > 0) {
    const bounds = L.latLngBounds(
      states.map((s) => [s.coordinates.latitude, s.coordinates.longitude])
    );
    map.fitBounds(bounds, { padding: [50, 50] });
  }
}

// Usage
displayRegion("South-West");
```

## Population Heatmap

Create a heatmap based on population:

```typescript
import { getStates } from "ng-states-core";
import L from "leaflet";

const states = getStates();

// Find max population for scaling
const maxPopulation = Math.max(...states.map((s) => s.population));

states.forEach((state) => {
  const { latitude, longitude } = state.coordinates;

  // Scale radius based on population
  const radius = (state.population / maxPopulation) * 30 + 5;

  // Color based on population
  const intensity = state.population / maxPopulation;
  const color = `rgba(255, ${Math.floor(255 * (1 - intensity))}, 0, 0.6)`;

  L.circle([latitude, longitude], {
    radius: radius * 1000, // Convert to meters
    fillColor: color,
    color: color,
    weight: 1,
    fillOpacity: 0.6,
  }).addTo(map).bindPopup(`
      <strong>${state.state}</strong><br>
      Population: ${state.population.toLocaleString()}
    `);
});
```

## Next Steps

- [React Integration](/examples/react) - React components
- [Search Examples](/examples/search) - Search functionality
- [API Reference](/api/overview) - Complete API documentation
