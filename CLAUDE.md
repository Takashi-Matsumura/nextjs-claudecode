# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the project
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Code Style
- **TypeScript**: Use strict mode with proper typing for all variables, parameters and return values
- **Imports**: Order - React, Next.js, components, utilities, types, CSS
- **Components**: Functional components with explicit return types
- **State Management**: Use React hooks for state management (useState, useEffect, custom hooks)
- **Naming**: PascalCase for components, camelCase for variables/functions
- **CSS**: Use TailwindCSS for styling with className attribute
- **Responsiveness**: Implement responsive design using Tailwind breakpoints (sm, md, lg, etc.)
- **JSX**: Use self-closing tags when appropriate, fragment syntax when needed
- **Props**: Define types using interfaces with descriptive names
- **Error Handling**: Use try/catch for async operations and proper error states
- **Accessibility**: Include aria attributes and semantic HTML elements
- **Formatting**: Double quotes for strings, semicolons at line endings
- **File Structure**: Group related components in subdirectories