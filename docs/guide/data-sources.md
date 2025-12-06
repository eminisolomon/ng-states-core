# Data Sources

Learn about the data sources and accuracy of ng-states-core.

## Overview

ng-states-core provides comprehensive, accurate data for all Nigerian states. This guide explains where the data comes from and how it's maintained.

## Data Sources

### Official Government Sources

Primary data is sourced from:

- **National Population Commission (NPC)** - Population estimates
- **National Bureau of Statistics (NBS)** - Statistical data
- **Independent National Electoral Commission (INEC)** - Administrative boundaries
- **Nigerian Postal Service (NIPOST)** - Postal codes

### Geographic Data

Coordinate data is sourced from:

- **OpenStreetMap** - Geographic coordinates
- **GeoNames** - Location data
- **Google Maps** - Verification and validation

### Administrative Data

LGA and town information from:

- **Official state government websites**
- **Federal Ministry of Information**
- **Local government publications**

## Data Accuracy

### Population Data

Population figures are estimates based on:

- 2006 National Census (official)
- Projected growth rates from NBS
- State government estimates

> [!NOTE]
> Population data is approximate and updated periodically. The next official census will provide more accurate figures.

### Geographic Coordinates

Coordinates represent the approximate center of each state capital:

- Accuracy: ±0.01 degrees (approximately 1km)
- Format: Decimal degrees (WGS84)
- Source: Multiple verified sources

### Postal Codes

Postal codes are the primary codes for each state:

- Format: 6-digit NIPOST codes
- Represents: State capital area
- Note: Multiple postal codes exist per state

### LGAs and Towns

LGA data is comprehensive and current:

- Total LGAs: 774 (as of 2024)
- Source: INEC official list
- Verification: Cross-referenced with state governments

Town data includes major towns and cities:

- Criteria: Population centers, administrative importance
- Coverage: Major towns per state
- Updates: Regular community contributions

## Data Updates

### Update Frequency

- **LGAs**: Updated when official changes occur
- **Population**: Reviewed annually
- **Coordinates**: Stable, rarely change
- **Postal Codes**: Updated as NIPOST announces changes

### Version History

The package follows semantic versioning:

- **Major versions**: Breaking changes to data structure
- **Minor versions**: New features, additional data fields
- **Patch versions**: Data corrections, bug fixes

## Data Validation

### Quality Assurance

All data goes through multiple validation steps:

1. **Source Verification** - Cross-reference multiple sources
2. **Format Validation** - Ensure consistent formatting
3. **Automated Tests** - Verify data integrity
4. **Community Review** - Open-source contributions

### Known Limitations

> [!IMPORTANT]
> Be aware of these limitations:

- **Population data** is estimated and may not reflect current figures
- **Town lists** are not exhaustive, only major towns included
- **Postal codes** represent primary codes, not all codes per state
- **Coordinates** are approximate center points, not precise boundaries

## Data Structure

### State Object

Each state contains verified data:

```typescript
{
  state: string;              // Official state name
  capital: string;            // Official capital city
  region: string;             // Geopolitical zone
  postal_code: string;        // Primary NIPOST code
  coordinates: {
    latitude: number;         // Decimal degrees
    longitude: number;        // Decimal degrees
  };
  population: number;         // Estimated population
  created: string;            // State creation date (YYYY-MM-DD)
  slogan: string;             // Official state slogan
  lgas: string[];            // All LGAs (774 total)
  senatorial_districts: string[]; // 3 per state
  towns: string[];           // Major towns
}
```

## Contributing Data

### Report Issues

Found incorrect data? Help us improve:

1. **GitHub Issues** - Report data inaccuracies
2. **Pull Requests** - Submit corrections with sources
3. **Discussions** - Suggest improvements

### Contribution Guidelines

When contributing data:

- **Provide sources** - Link to official sources
- **Verify accuracy** - Cross-check information
- **Follow format** - Match existing data structure
- **Include tests** - Add tests for new data

See the [Contributing Guide](/guide/contributing) for details.

## Data License

### Usage Rights

ng-states-core data is provided under the MIT License:

- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed

### Attribution

While not required, attribution is appreciated:

```
Data provided by ng-states-core
https://github.com/eminisolomon/ng-states-core
```

## Frequently Asked Questions

### Is the population data current?

Population figures are estimates based on the 2006 census with projected growth. They should be used as approximations, not exact figures.

### How often is the data updated?

The package is updated regularly. Critical corrections are released as patch versions. New features and data enhancements come in minor versions.

### Can I trust this data for production use?

Yes, the data is sourced from official sources and verified. However, always validate critical data for your specific use case.

### What if I find incorrect data?

Please report it via [GitHub Issues](https://github.com/eminisolomon/ng-states-core/issues) with:

- What's incorrect
- What it should be
- Source/reference for the correction

### Are all towns included?

No, only major towns are included. The package focuses on significant population centers and administrative towns.

### Why are coordinates approximate?

Coordinates represent the approximate center of state capitals, not precise boundaries. For detailed mapping, use dedicated GIS data sources.

## Next Steps

- [Contributing Guide](/guide/contributing) - Help improve the data
- [API Reference](/api/overview) - Explore available functions
- [GitHub Repository](https://github.com/eminisolomon/ng-states-core) - View source code
- [Report Issues](https://github.com/eminisolomon/ng-states-core/issues) - Report data issues
