# Reorganization Status

## Completed
- ✅ Created the feature-based directory structure
- ✅ Copied files to their new locations
- ✅ Created index files for features
- ✅ Updated TypeScript configuration for new path aliases
- ✅ Updated sample imports in some files

## Next Steps
1. Update all import statements across the codebase:
   - Update imports in all components to reference the new structure
   - Update imports in all pages to reference the new structure
   - Update imports in all hooks to reference the new structure

2. Clean up duplicated files:
   - Once all imports are updated and the application works correctly,
     remove the original files from their old locations

## How to Complete the Migration

### For each component file:
1. Update imports to use the new structure:
   - Replace `@/components/calendar/...` with `@/features/calendar/components/...`
   - Replace `@/components/courses/...` with `@/features/courses/components/...`
   - Replace `@/components/notes/...` with `@/features/notes/components/...`
   - Replace `@/components/Sidebar` with `@/shared/components/Sidebar`
   - Replace `@/components/ErrorBoundary` with `@/shared/components/ErrorBoundary`

2. Update hooks imports:
   - Replace `@/hooks/use-events` with `@/features/calendar/hooks/use-events`
   - Replace `@/hooks/use-mobile` with `@/shared/hooks/use-mobile`
   - Replace `@/hooks/use-toast` with `@/shared/hooks/use-toast`

3. Update type imports:
   - Replace `@/components/calendar/types` with `@/features/calendar/types/types`
   - Replace `@/types/notes` with `@/features/notes/types/notes`

### To simplify imports further:
Once all files are updated, you can further clean up by using the feature-level exports:

```tsx
// Instead of:
import { CalendarGrid } from '@/features/calendar/components/CalendarGrid';
import { CalendarHeader } from '@/features/calendar/components/CalendarHeader';

// You can use:
import { CalendarGrid, CalendarHeader } from '@/features/calendar';
``` 