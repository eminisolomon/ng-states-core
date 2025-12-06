# Vue Integration

Learn how to use ng-states-core in Vue.js applications with composables and components.

## Installation

```bash
npm install ng-states-core
```

## State Selector Component

A simple state selector dropdown:

```vue
<template>
  <select v-model="selectedState">
    <option value="">Select a state</option>
    <option v-for="state in states" :key="state" :value="state">
      {{ state }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getStateNames } from "ng-states-core";

const selectedState = ref("");
const states = getStateNames();
</script>
```

## State and LGA Selector

Cascading dropdowns for state and LGA selection:

```vue
<template>
  <div>
    <select v-model="selectedState" @change="onStateChange">
      <option value="">Select State</option>
      <option v-for="state in states" :key="state" :value="state">
        {{ state }}
      </option>
    </select>

    <select
      v-if="lgas.length > 0"
      v-model="selectedLga"
      :disabled="!selectedState"
    >
      <option value="">Select LGA</option>
      <option v-for="lga in lgas" :key="lga" :value="lga">
        {{ lga }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { getStateNames, getLgas } from "ng-states-core";

const selectedState = ref("");
const selectedLga = ref("");
const lgas = ref<string[]>([]);

const states = getStateNames();

const onStateChange = () => {
  if (selectedState.value) {
    lgas.value = getLgas(selectedState.value);
    selectedLga.value = ""; // Reset LGA
  } else {
    lgas.value = [];
  }
};

// Or use watch
watch(selectedState, (newState) => {
  if (newState) {
    lgas.value = getLgas(newState);
    selectedLga.value = "";
  } else {
    lgas.value = [];
  }
});
</script>
```

## State Information Card

Display detailed state information:

```vue
<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error" class="error">{{ error }}</div>
  <div v-else-if="state" class="state-card">
    <h2>{{ state.state }}</h2>
    <p><strong>Capital:</strong> {{ state.capital }}</p>
    <p><strong>Region:</strong> {{ state.region }}</p>
    <p><strong>Population:</strong> {{ state.population.toLocaleString() }}</p>
    <p><strong>Slogan:</strong> {{ state.slogan }}</p>
    <p><strong>LGAs:</strong> {{ state.lgas.length }}</p>
    <p><strong>Postal Code:</strong> {{ state.postal_code }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { getState, type State } from "ng-states-core";

const props = defineProps<{
  stateName: string;
}>();

const state = ref<State | null>(null);
const loading = ref(true);
const error = ref("");

const loadState = () => {
  if (!props.stateName) {
    state.value = null;
    loading.value = false;
    return;
  }

  loading.value = true;
  error.value = "";

  try {
    state.value = getState(props.stateName);
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Unknown error";
    state.value = null;
  } finally {
    loading.value = false;
  }
};

onMounted(loadState);
watch(() => props.stateName, loadState);
</script>
```

## Composable: useStateData

Create a reusable composable for state data:

```typescript
// composables/useStateData.ts
import { ref, watch, type Ref } from "vue";
import { getState, type State } from "ng-states-core";

export function useStateData(stateName: Ref<string>) {
  const state = ref<State | null>(null);
  const loading = ref(true);
  const error = ref<string | null>(null);

  const loadState = () => {
    if (!stateName.value) {
      state.value = null;
      loading.value = false;
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      state.value = getState(stateName.value);
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Unknown error";
      state.value = null;
    } finally {
      loading.value = false;
    }
  };

  watch(stateName, loadState, { immediate: true });

  return { state, loading, error };
}
```

Usage:

```vue
<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else-if="state">{{ state.capital }}</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStateData } from "@/composables/useStateData";

const stateName = ref("Lagos");
const { state, loading, error } = useStateData(stateName);
</script>
```

## Search with Autocomplete

Implement a search autocomplete feature:

```vue
<template>
  <div class="search-container">
    <input
      v-model="query"
      type="text"
      placeholder="Search states or towns..."
      @focus="showResults = true"
      @blur="onBlur"
    />

    <ul v-if="showResults && results.length > 0" class="search-results">
      <li
        v-for="(result, index) in results"
        :key="index"
        @mousedown="selectResult(result)"
      >
        {{ result.label }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { searchStates, searchTowns } from "ng-states-core";

const query = ref("");
const showResults = ref(false);

const results = computed(() => {
  if (query.value.length < 2) return [];

  const states = searchStates(query.value).map((s) => ({
    type: "state" as const,
    name: s.state,
    label: `${s.state} (State)`,
  }));

  const towns = searchTowns(query.value)
    .slice(0, 5)
    .map((t) => ({
      type: "town" as const,
      name: t.town,
      state: t.state,
      label: `${t.town}, ${t.state}`,
    }));

  return [...states, ...towns];
});

const selectResult = (result: any) => {
  query.value = result.label;
  showResults.value = false;
};

const onBlur = () => {
  setTimeout(() => {
    showResults.value = false;
  }, 200);
};
</script>
```

## Geopolitical Zone Filter

Filter states by geopolitical zone:

```vue
<template>
  <div>
    <select v-model="selectedZone">
      <option value="">Select Geopolitical Zone</option>
      <option v-for="zone in zones" :key="zone" :value="zone">
        {{ zone }}
      </option>
    </select>

    <ul v-if="states.length > 0">
      <li v-for="state in states" :key="state.state">
        {{ state.state }} - {{ state.capital }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { getGeopoliticalZones, getStatesByRegion } from "ng-states-core";

const selectedZone = ref("");
const zones = getGeopoliticalZones();

const states = computed(() => {
  return selectedZone.value ? getStatesByRegion(selectedZone.value) : [];
});
</script>
```

## Form with Validation

Use in a registration form:

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <input v-model="formData.name" type="text" placeholder="Full Name" />
      <span v-if="errors.name" class="error">{{ errors.name }}</span>
    </div>

    <div>
      <select v-model="formData.state" @change="onStateChange">
        <option value="">Select State</option>
        <option v-for="state in states" :key="state" :value="state">
          {{ state }}
        </option>
      </select>
      <span v-if="errors.state" class="error">{{ errors.state }}</span>
    </div>

    <div>
      <select v-model="formData.lga" :disabled="!formData.state">
        <option value="">Select LGA</option>
        <option v-for="lga in lgas" :key="lga" :value="lga">
          {{ lga }}
        </option>
      </select>
      <span v-if="errors.lga" class="error">{{ errors.lga }}</span>
    </div>

    <button type="submit">Submit</button>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { getStateNames, getLgas } from "ng-states-core";

const states = getStateNames();
const lgas = ref<string[]>([]);

const formData = reactive({
  name: "",
  state: "",
  lga: "",
});

const errors = reactive<Record<string, string>>({});

const onStateChange = () => {
  if (formData.state) {
    lgas.value = getLgas(formData.state);
    formData.lga = ""; // Reset LGA
  } else {
    lgas.value = [];
  }
};

const validate = () => {
  Object.keys(errors).forEach((key) => delete errors[key]);

  if (!formData.name) errors.name = "Name is required";
  if (!formData.state) errors.state = "State is required";
  if (!formData.lga) errors.lga = "LGA is required";

  return Object.keys(errors).length === 0;
};

const handleSubmit = () => {
  if (validate()) {
    console.log("Form submitted:", formData);
  }
};
</script>
```

## Composition API with TypeScript

Full TypeScript support:

```vue
<script setup lang="ts">
import { ref, computed, type Ref } from "vue";
import {
  getStates,
  getState,
  type State,
  type GeopoliticalZone,
} from "ng-states-core";

const selectedState: Ref<string> = ref("");
const states: State[] = getStates();

const stateData = computed((): State | null => {
  if (!selectedState.value) return null;
  try {
    return getState(selectedState.value);
  } catch {
    return null;
  }
});

const zone = computed((): GeopoliticalZone | null => {
  return stateData.value?.region ?? null;
});
</script>
```

## Next Steps

- [React Integration](/examples/react) - Use in React applications
- [Next.js App](/examples/nextjs) - Server-side rendering
- [API Reference](/api/overview) - Complete API documentation
