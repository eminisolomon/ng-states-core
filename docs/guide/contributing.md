# Contributing

Thank you for your interest in contributing to ng-states-core documentation!

## About This Guide

This guide covers contributing to the **documentation**. For contributing to the package code and data, see the main [CONTRIBUTING.md](https://github.com/eminisolomon/ng-states-core/blob/main/CONTRIBUTING.md) in the repository root.

## Documentation Structure

The documentation is built with [VitePress](https://vitepress.dev/) and organized as follows:

```
docs/
├── .vitepress/          # VitePress configuration
├── guide/               # User guides
├── api/                 # API reference
├── examples/            # Code examples
└── index.md             # Homepage
```

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm, yarn, or pnpm
- Git

### Setup

1. **Fork and clone the repository**:

```bash
git clone https://github.com/YOUR_USERNAME/ng-states-core.git
cd ng-states-core
```

2. **Install dependencies**:

```bash
npm install
```

3. **Start the documentation dev server**:

```bash
npm run docs:dev
```

The documentation will be available at `http://localhost:5173`.

## Making Changes

### Documentation Guidelines

Follow these guidelines when writing documentation:

#### Writing Style

- **Be concise** - Get to the point quickly
- **Be clear** - Use simple language
- **Be practical** - Include code examples
- **Be accurate** - Test all code examples

#### Code Examples

- **Test all examples** - Ensure they work
- **Use TypeScript** - Show type annotations
- **Include comments** - Explain complex parts
- **Show output** - Include expected results

Example:

```typescript
import { getState } from "ng-states-core";

// Get Lagos state data
const lagos = getState("Lagos");

console.log(lagos.capital); // Output: 'Ikeja'
```

#### Formatting

- Use **code blocks** with language specification
- Use **headings** to organize content
- Use **lists** for steps or options
- Use **tables** for structured data
- Use **alerts** for important notes

VitePress alerts:

```markdown
> [!NOTE]
> Useful information

> [!TIP]
> Helpful advice

> [!IMPORTANT]
> Critical information

> [!WARNING]
> Potential issues

> [!CAUTION]
> Dangerous actions
```

### Adding New Pages

1. **Create the markdown file** in the appropriate directory:

   - Guides: `docs/guide/`
   - API docs: `docs/api/`
   - Examples: `docs/examples/`

2. **Add to sidebar** in `docs/.vitepress/config.mjs`:

```javascript
sidebar: {
  '/guide/': [
    {
      text: 'Introduction',
      items: [
        { text: 'Your New Page', link: '/guide/your-new-page' }
      ]
    }
  ]
}
```

3. **Test locally**:

```bash
npm run docs:dev
```

### Updating Existing Pages

1. **Edit the markdown file** directly
2. **Preview changes** in the dev server (hot reload enabled)
3. **Test all code examples**
4. **Check for broken links**

## Submitting Changes

### Pull Request Process

1. **Create a branch**:

```bash
git checkout -b docs/your-feature-name
```

2. **Make your changes** and commit:

```bash
git add .
git commit -m "docs: add guide for XYZ feature"
```

3. **Push to your fork**:

```bash
git push origin docs/your-feature-name
```

4. **Open a Pull Request** on GitHub

### Commit Message Format

Follow conventional commits:

- `docs: add new guide for search functions`
- `docs: fix typo in getting started`
- `docs: update API reference for getState`
- `docs: improve examples in React integration`

### PR Checklist

Before submitting:

- [ ] All code examples are tested and working
- [ ] No broken links (run `npm run docs:build` to check)
- [ ] Spelling and grammar checked
- [ ] Follows existing documentation style
- [ ] Added to sidebar if new page
- [ ] Previewed in dev server

## Types of Contributions

### Documentation Improvements

- Fix typos and grammar
- Improve clarity and readability
- Add missing information
- Update outdated content

### Code Examples

- Add new examples
- Improve existing examples
- Add framework-specific examples
- Add real-world use cases

### API Documentation

- Document new functions
- Add parameter descriptions
- Include return type information
- Provide usage examples

### Guides and Tutorials

- Write getting started guides
- Create how-to guides
- Add best practices
- Share tips and tricks

## Building Documentation

### Local Build

Test the production build:

```bash
npm run docs:build
```

This will:

- Build the static site
- Check for dead links
- Validate all pages

### Preview Production Build

```bash
npm run docs:preview
```

## Getting Help

Need help contributing?

- 💬 [GitHub Discussions](https://github.com/eminisolomon/ng-states-core/discussions)
- 🐛 [GitHub Issues](https://github.com/eminisolomon/ng-states-core/issues)
- 📧 Email: [your-email@example.com]

## Code of Conduct

Please be respectful and constructive in all interactions. We're all here to make ng-states-core better!

## License

By contributing to ng-states-core documentation, you agree that your contributions will be licensed under the MIT License.

## Next Steps

- [Getting Started](/guide/getting-started) - Learn the basics
- [API Reference](/api/overview) - Explore the API
- [Main Contributing Guide](https://github.com/eminisolomon/ng-states-core/blob/main/CONTRIBUTING.md) - Contribute to code
