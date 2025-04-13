# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the project
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Code Style
- **TypeScript**: Use strict mode with proper typing
- **Imports**: Order - React, Next.js, components, utilities, types, CSS
- **Components**: Functional components with explicit return types
- **Naming**: PascalCase for components, camelCase for variables/functions
- **CSS**: Use TailwindCSS for styling with className
- **Fonts**: Use Geist Sans and Geist Mono via Next.js font system
- **JSX**: Use self-closing tags when appropriate
- **Props**: Define types using interfaces or type aliases
- **Error Handling**: Use try/catch for async operations
- **Formatting**: Double quotes for strings, semicolons at line endings