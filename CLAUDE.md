# Jefahnie Rocks Family Portal - AI Assistant Guidelines

## Project Overview
This is a family headquarters portal built with SvelteKit 2, Svelte 5, and a pnpm monorepo structure. The portal features a spatial interface with zoomable fields, ritual rails, and an aperture command palette.

## Architecture

### Tech Stack
- **Framework**: SvelteKit 2 + Svelte 5 (latest runed version)
- **Package Manager**: pnpm (monorepo structure)
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: Bits UI, cmdk-svelte, Lucide icons
- **Visualization**: Svelvet (will migrate to Pixi/Regl for scale)
- **State**: Svelte stores with derived states
- **Deployment**: GitHub Pages (moving to Cloudflare Pages)
- **Secrets**: Doppler integration
- **Domain**: jefahnierocks.com (Cloudflare)

### Project Structure
```
portal/
├── apps/
│   └── web/           # Main SvelteKit application
├── packages/
│   ├── types/         # Shared TypeScript types
│   ├── engine/        # Core business logic (future)
│   └── design-tokens/ # Design system tokens
└── build/            # Production build output
```

## Key Features

### 1. Zoomable Field (Level 0-1)
- Pillars → Nodes visualization
- Smooth pan/zoom with d3
- Force layout physics
- Activity-based opacity

### 2. Aperture (⌘K)
- Omnibox for navigation
- Filters the field
- Jump to Pillars/Nodes
- Search syntax: @pillars #topics $systems

### 3. Ritual Rail
- 3 programmable modes
- Re-colors/filters the field
- State-based UI updates

### 4. Now Lens HUD
- Current focus display
- Next up items
- One-sentence narrative

## Development Commands

### Setup
```bash
cd portal
pnpm install
```

### Development
```bash
pnpm dev          # Run dev server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm check        # Type checking
pnpm lint         # Linting
pnpm format       # Prettier formatting
```

### Deployment
The site auto-deploys to GitHub Pages on push to main branch.

## Validation Rules

### Code Quality
1. **TypeScript**: Strict mode enabled, all types must be explicit
2. **Components**: Use Svelte 5 runes (`$state`, `$derived`, `$effect`)
3. **Styling**: Use Tailwind classes, avoid inline styles
4. **State Management**: Use stores for global state, props for local

### Performance
1. **Bundle Size**: Keep under 200KB gzipped
2. **Lazy Loading**: Implement for heavy components
3. **Image Optimization**: Use WebP with fallbacks
4. **Caching**: Leverage service workers

### Security
1. **Secrets**: Never commit secrets, use Doppler
2. **CSP**: Implement Content Security Policy
3. **HTTPS**: Always use secure connections
4. **Input Validation**: Sanitize all user inputs

## AI Assistant Instructions

### When Adding Features
1. Check existing patterns in the codebase
2. Follow the established file structure
3. Use existing design tokens and components
4. Write tests for critical paths
5. Update this documentation

### When Fixing Bugs
1. Reproduce the issue first
2. Check for similar patterns that might have the same bug
3. Add regression tests
4. Document the fix in comments if non-obvious

### When Refactoring
1. Ensure all tests pass before and after
2. Keep commits atomic and well-described
3. Update type definitions as needed
4. Preserve backwards compatibility

## Future Roadmap

### Graphics Engine Swap
- Migrate from Svelvet to PixiJS/Regl for 10k+ nodes
- Maintain same store/API interface

### Physics Enhancement
- Replace d3-force with ngraph.forcelayout
- Add "settle, not bounce" behavior

### Ghost Paths
- Precompute path predictions from click history
- Draw dotted splines for suggestions

### Narrative Thread
- Store events in timeline
- Collapsible, scrubbable interface

### Persistence Layer
- Start with localforage
- Migrate to Supabase/Postgres
- Consider Rust kernel API

## Testing Strategy

### Unit Tests
- Test all utility functions
- Test store transformations
- Test component logic

### Integration Tests
- Test user flows
- Test API interactions
- Test state persistence

### E2E Tests
- Test critical paths
- Test cross-browser compatibility
- Test mobile responsiveness

## Design Principles

### Visual
- **Easing**: cubic-bezier(0.18, 0.76, 0.2, 0.98)
- **Grid**: Faint Penrose background at low opacity
- **Halo**: Annular glow (outer 12px, inner 8px, blur 16px)
- **Colors**: Glacier, Aurora, Fireweed, Gold tokens

### UX
- **Immediacy**: All actions < 100ms response
- **Clarity**: One-sentence explanations
- **Flow**: Minimize context switching
- **Discovery**: Progressive disclosure

## Monitoring

### Metrics to Track
- Page load time
- Time to interactive
- Bundle size changes
- Error rates
- User engagement

### Tools
- GitHub Actions for CI/CD
- Doppler for secrets
- Cloudflare Analytics (future)

## Support

For family members needing help:
- Check the help section in the portal
- Review this documentation
- Contact the maintainer

## License
Private family project - not for public distribution.