# Reorganize codebase script
# Create feature directories if they don't exist

# Calendar feature
New-Item -ItemType Directory -Force -Path src\features\calendar\components
New-Item -ItemType Directory -Force -Path src\features\calendar\api  
New-Item -ItemType Directory -Force -Path src\features\calendar\hooks
New-Item -ItemType Directory -Force -Path src\features\calendar\types
New-Item -ItemType Directory -Force -Path src\features\calendar\utils

# Courses feature
New-Item -ItemType Directory -Force -Path src\features\courses\components
New-Item -ItemType Directory -Force -Path src\features\courses\api
New-Item -ItemType Directory -Force -Path src\features\courses\hooks
New-Item -ItemType Directory -Force -Path src\features\courses\types

# Notes feature
New-Item -ItemType Directory -Force -Path src\features\notes\components
New-Item -ItemType Directory -Force -Path src\features\notes\api
New-Item -ItemType Directory -Force -Path src\features\notes\hooks
New-Item -ItemType Directory -Force -Path src\features\notes\types

# Shared code
New-Item -ItemType Directory -Force -Path src\shared\components
New-Item -ItemType Directory -Force -Path src\shared\hooks
New-Item -ItemType Directory -Force -Path src\shared\utils
New-Item -ItemType Directory -Force -Path src\shared\types

# Move calendar files
Copy-Item src\components\calendar\*.* src\features\calendar\components\
Copy-Item src\components\calendar\types.ts src\features\calendar\types\
Copy-Item src\hooks\use-events.ts src\features\calendar\hooks\
Copy-Item src\api\events.ts src\features\calendar\api\

# Move course files
Copy-Item src\components\courses\*.* src\features\courses\components\

# Move notes files
Copy-Item src\components\notes\*.* src\features\notes\components\
Copy-Item src\types\notes.ts src\features\notes\types\

# Move shared files
Copy-Item src\components\ErrorBoundary.tsx src\shared\components\
Copy-Item src\components\Sidebar.tsx src\shared\components\
Copy-Item src\hooks\use-mobile.tsx src\shared\hooks\
Copy-Item src\hooks\use-toast.ts src\shared\hooks\

# We're just copying for now - actual replacement would require updating imports
Write-Host "Files have been copied to their new locations, but original files are still intact."
Write-Host "Next steps would be to update all import paths and then remove the original files." 