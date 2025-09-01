# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**estaff-web** - A Next.js 14 platform connecting freelancers and companies. The application is a Portuguese-language marketplace with distinct brand identities for different user segments.

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom design system
- **Database**: Supabase (PostgreSQL + Auth + Storage)
- **UI Components**: Custom React components with React Hook Form
- **Validation**: Zod schemas
- **Animation**: Framer Motion
- **Font**: DM Sans (Google Fonts)

## Development Commands

```bash
# Development server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Architecture

### Directory Structure

- `/app` - Next.js App Router pages and layouts
  - `/(public)` - Public-facing pages (landing, freelancer/company sections)
  - `/(admin)` - Admin/authenticated pages
- `/components` - Reusable React components
  - `/ui` - Core UI components (Button, Card, Badge, etc.)
  - `/forms` - Form components with React Hook Form integration
- `/lib` - Utility functions and service configurations
  - `/supabase` - Supabase client configurations (client.ts, server.ts)
  - `/utils.ts` - Shared utility functions

### Key Architectural Patterns

1. **Route Groups**: Using `(public)` and `(admin)` for logical separation without affecting URL structure
2. **Supabase Integration**: Separate client/server configurations for SSR compatibility
3. **Component Architecture**: Atomic design with ui primitives and composed form components
4. **Type Safety**: Strict TypeScript with path aliases configured

## Brand Design System

The application uses a sophisticated multi-brand color system defined in `tailwind.config.ts`:

- **Freelancer Brand** (`freela`): Pink/coral (#ec4464) - energetic and creative
- **Company Brand** (`empresa`): Navy blue (#142444) - professional and trustworthy  
- **Institutional** (`institucional`): Warm beige (#ecd4a4) - approachable and reliable
- **Neutral** (`gray`): Custom gray scale for UI elements

### Animation System

Premium animations available:
- `fade-in`, `fade-up`, `fade-down` - Entrance animations
- `slide-in-*` - Directional slide animations
- `zoom-in`, `float`, `pulse-glow` - Attention animations
- `gradient`, `shimmer` - Background effects
- Custom timing functions for smooth interactions

## Environment Configuration

Create `.env.local` from `.env.example` with:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
```

## Import Aliases

The project uses TypeScript path aliases:
- `@/*` - Root directory
- `@/components/*` - Components directory
- `@/lib/*` - Library/utilities
- `@/app/*` - App directory

## Styling Guidelines

- Use the custom spacing scale (1-40) for consistent layouts
- Apply brand colors contextually (freela for freelancer features, empresa for company features)
- Leverage the animation classes for micro-interactions
- Use the typography scale (xs to 9xl) for hierarchical text

## Component Development

When creating new components:
1. Place in appropriate subdirectory under `/components`
2. Use TypeScript with proper type definitions
3. Apply Tailwind classes using the custom design tokens
4. Integrate with React Hook Form for forms using Zod validation
5. Consider mobile-first responsive design

## Supabase Integration

- Client-side: Use `@/lib/supabase/client.ts` for browser operations
- Server-side: Use `@/lib/supabase/server.ts` for SSR/API routes
- Authentication flows are handled through Supabase Auth
- Database queries use the Supabase client with TypeScript types

## Performance Considerations

- Images should be optimized and domains added to `next.config.js`
- Use Next.js dynamic imports for heavy components
- Implement proper loading states with the animation system
- Consider using React.memo for frequently re-rendered components