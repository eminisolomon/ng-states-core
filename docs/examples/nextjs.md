# Next.js Integration

Learn how to use ng-states-core in Next.js applications with server-side rendering and client components.

## Installation

```bash
npm install ng-states-core
```

## Server Components (App Router)

### State List Page

```tsx
// app/states/page.tsx
import { getStates } from "ng-states-core";

export default function StatesPage() {
  const states = getStates();

  return (
    <div>
      <h1>Nigerian States</h1>
      <ul>
        {states.map((state) => (
          <li key={state.state}>
            <a href={`/states/${state.state.toLowerCase()}`}>
              {state.state} - {state.capital}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Dynamic State Page

```tsx
// app/states/[state]/page.tsx
import { getState, getStateNames } from "ng-states-core";
import { notFound } from "next/navigation";

interface PageProps {
  params: { state: string };
}

export async function generateStaticParams() {
  const states = getStateNames();

  return states.map((state) => ({
    state: state.toLowerCase(),
  }));
}

export default function StatePage({ params }: PageProps) {
  const stateName =
    params.state.charAt(0).toUpperCase() + params.state.slice(1);

  let state;
  try {
    state = getState(stateName);
  } catch {
    notFound();
  }

  return (
    <div>
      <h1>{state.state}</h1>
      <p>
        <strong>Capital:</strong> {state.capital}
      </p>
      <p>
        <strong>Region:</strong> {state.region}
      </p>
      <p>
        <strong>Population:</strong> {state.population.toLocaleString()}
      </p>
      <p>
        <strong>Slogan:</strong> {state.slogan}
      </p>

      <h2>Local Government Areas ({state.lgas.length})</h2>
      <ul>
        {state.lgas.map((lga) => (
          <li key={lga}>{lga}</li>
        ))}
      </ul>

      <h2>Major Towns</h2>
      <ul>
        {state.towns.map((town) => (
          <li key={town}>{town}</li>
        ))}
      </ul>
    </div>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const stateName =
    params.state.charAt(0).toUpperCase() + params.state.slice(1);

  try {
    const state = getState(stateName);
    return {
      title: `${state.state} - ${state.slogan}`,
      description: `Information about ${state.state} state: capital ${
        state.capital
      }, ${
        state.lgas.length
      } LGAs, population ${state.population.toLocaleString()}`,
    };
  } catch {
    return {
      title: "State Not Found",
    };
  }
}
```

## Client Components

### Interactive State Selector

```tsx
"use client";

import { useState, useEffect } from "react";
import { getStateNames, getLgas } from "ng-states-core";

export default function StateSelector() {
  const [selectedState, setSelectedState] = useState("");
  const [selectedLga, setSelectedLga] = useState("");
  const [lgas, setLgas] = useState<string[]>([]);

  const states = getStateNames();

  useEffect(() => {
    if (selectedState) {
      const stateLgas = getLgas(selectedState);
      setLgas(stateLgas);
      setSelectedLga("");
    } else {
      setLgas([]);
    }
  }, [selectedState]);

  return (
    <div>
      <select
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
      >
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      {lgas.length > 0 && (
        <select
          value={selectedLga}
          onChange={(e) => setSelectedLga(e.target.value)}
        >
          <option value="">Select LGA</option>
          {lgas.map((lga) => (
            <option key={lga} value={lga}>
              {lga}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
```

### Search Component

```tsx
"use client";

import { useState, useMemo } from "react";
import { searchStates, searchTowns } from "ng-states-core";

export default function LocationSearch() {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const results = useMemo(() => {
    if (query.length < 2) return [];

    const states = searchStates(query).map((s) => ({
      type: "state" as const,
      name: s.state,
      label: `${s.state} (State)`,
    }));

    const towns = searchTowns(query)
      .slice(0, 5)
      .map((t) => ({
        type: "town" as const,
        name: t.town,
        state: t.state,
        label: `${t.town}, ${t.state}`,
      }));

    return [...states, ...towns];
  }, [query]);

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShowResults(true)}
        onBlur={() => setTimeout(() => setShowResults(false), 200)}
        placeholder="Search states or towns..."
      />

      {showResults && results.length > 0 && (
        <ul className="search-results">
          {results.map((result, index) => (
            <li
              key={index}
              onClick={() => {
                setQuery(result.label);
                setShowResults(false);
              }}
            >
              {result.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

## API Routes

### Get State Data

```typescript
// app/api/states/[state]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getState } from "ng-states-core";

export async function GET(
  request: NextRequest,
  { params }: { params: { state: string } }
) {
  try {
    const state = getState(params.state);
    return NextResponse.json(state);
  } catch (error) {
    return NextResponse.json({ error: "State not found" }, { status: 404 });
  }
}
```

### Search API

```typescript
// app/api/search/route.ts
import { NextRequest, NextResponse } from "next/server";
import { searchStates, searchTowns } from "ng-states-core";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const states = searchStates(query);
  const towns = searchTowns(query).slice(0, 10);

  return NextResponse.json({
    states,
    towns,
  });
}
```

## Server Actions

### Form Submission with Server Actions

```tsx
// app/register/page.tsx
"use client";

import { useState } from "react";
import { submitRegistration } from "./actions";
import { getStateNames, getLgas } from "ng-states-core";

export default function RegistrationPage() {
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");

  const states = getStateNames();
  const lgas = state ? getLgas(state) : [];

  return (
    <form action={submitRegistration}>
      <input name="name" type="text" placeholder="Full Name" required />

      <select
        name="state"
        value={state}
        onChange={(e) => {
          setState(e.target.value);
          setLga("");
        }}
        required
      >
        <option value="">Select State</option>
        {states.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <select
        name="lga"
        value={lga}
        onChange={(e) => setLga(e.target.value)}
        disabled={!state}
        required
      >
        <option value="">Select LGA</option>
        {lgas.map((l) => (
          <option key={l} value={l}>
            {l}
          </option>
        ))}
      </select>

      <button type="submit">Register</button>
    </form>
  );
}
```

```typescript
// app/register/actions.ts
"use server";

import { getState } from "ng-states-core";

export async function submitRegistration(formData: FormData) {
  const name = formData.get("name") as string;
  const stateName = formData.get("state") as string;
  const lga = formData.get("lga") as string;

  // Validate state
  try {
    const state = getState(stateName);

    // Validate LGA belongs to state
    if (!state.lgas.includes(lga)) {
      throw new Error("Invalid LGA for selected state");
    }

    // Process registration
    console.log({ name, state: stateName, lga });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
```

## Static Site Generation

### Generate All State Pages

```tsx
// app/states/[state]/page.tsx
import { getStateNames, getState } from "ng-states-core";

export async function generateStaticParams() {
  const states = getStateNames();

  return states.map((state) => ({
    state: state.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export default function StatePage({ params }: { params: { state: string } }) {
  const stateName = params.state
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const state = getState(stateName);

  return (
    <div>
      <h1>{state.state}</h1>
      {/* State details */}
    </div>
  );
}
```

## Middleware

### Validate State Parameter

```typescript
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getStateNames } from "ng-states-core";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if accessing a state page
  if (pathname.startsWith("/states/")) {
    const stateName = pathname.split("/")[2];
    const validStates = getStateNames().map((s) => s.toLowerCase());

    if (!validStates.includes(stateName)) {
      return NextResponse.redirect(new URL("/404", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/states/:path*",
};
```

## TypeScript with Next.js

Full type safety:

```tsx
import { getState, type State } from "ng-states-core";

interface StateCardProps {
  stateName: string;
}

export default function StateCard({ stateName }: StateCardProps) {
  const state: State = getState(stateName);

  return (
    <div>
      <h2>{state.state}</h2>
      <p>{state.capital}</p>
    </div>
  );
}
```

## Next Steps

- [React Integration](/examples/react) - React hooks and components
- [Vue Integration](/examples/vue) - Vue composables
- [API Reference](/api/overview) - Complete API documentation
