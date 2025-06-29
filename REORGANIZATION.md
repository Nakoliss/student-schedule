# Code Reorganization Documentation

## New Structure

We've reorganized the codebase to follow a feature-based architecture:

```
/src
  /features           # Feature modules
    /calendar         # Calendar feature
      /api            # Calendar-specific API calls
      /components     # Calendar components
      /hooks          # Calendar hooks
      /types          # Calendar types
      /utils          # Calendar utilities
      index.ts        # Public exports
    /courses          # Courses feature
      /api            # Courses-specific API calls
      /components     # Courses components
      /hooks          # Courses hooks
      /types          # Courses types
      index.ts        # Public exports
    /notes            # Notes feature  
      /api            # Notes-specific API calls
      /components     # Notes components
      /hooks          # Notes hooks
      /types          # Notes types
      index.ts        # Public exports
  /shared             # Shared code across features
    /components       # Shared components
    /hooks            # Shared hooks
    /utils            # Shared utilities
    /types            # Shared types
    index.ts          # Public exports
  /pages              # Route components
  App.tsx             # Main application component
  main.tsx            # Entry point
```

## Benefits of the New Structure

1. **Improved organization**: Related code is grouped together by feature
2. **Better encapsulation**: Features are self-contained with their own components, API, hooks, etc.
3. **Clearer dependencies**: It's easier to see which features depend on which
4. **Easier onboarding**: New developers can understand the codebase more quickly
5. **Simplified imports**: Feature-based exports reduce import complexity

## Migration Process

### 1. Directory Structure Creation

We've created the new directory structure with the `reorganize.ps1` script.

### 2. File Relocation

Files have been copied (not moved) to their new locations to preserve the original structure while the migration is in progress.

### 3. Update Imports

For each file, imports need to be updated to reflect the new structure. For example:

**Old imports:**
```tsx
import { CalendarGrid } from '@/components/calendar/CalendarGrid';
import { getEventStyle } from '@/components/calendar/utils';
import { Event } from '@/components/calendar/types';
```

**New imports:**
```tsx
import { CalendarGrid, getEventStyle } from '@/features/calendar';
import type { Event } from '@/features/calendar/types/types';
```

### 4. Path Aliasing

Update the TypeScript and Vite configurations to include path aliases for the new structure:

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/features/*": ["./src/features/*"],
      "@/shared/*": ["./src/shared/*"]
    }
  }
}
```

### 5. Testing

Thoroughly test the application after the migration to ensure everything works as expected.

### 6. Cleanup

Once the migration is complete and tested, remove the original files.

## Example of Updated Imports

See the `import-example.tsx` file for an example of how imports would be updated in the new structure.

## Next Steps

1. Complete the import updates for all files
2. Update the TypeScript configuration
3. Test the application
4. Clean up the original files 