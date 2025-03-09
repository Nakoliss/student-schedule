# Complete reorganization script
# This script will copy any remaining files to their new locations

Write-Host "Starting reorganization completion..." -ForegroundColor Yellow

# Copy calendar-related files
Write-Host "Copying calendar files..." -ForegroundColor Yellow
Copy-Item -Force src\components\calendar\*.* src\features\calendar\components\ -ErrorAction SilentlyContinue
Copy-Item -Force src\api\events.ts src\features\calendar\api\ -ErrorAction SilentlyContinue
Copy-Item -Force src\hooks\use-events.ts src\features\calendar\hooks\ -ErrorAction SilentlyContinue
Copy-Item -Force src\components\WeeklyCalendar.tsx src\features\calendar\components\ -ErrorAction SilentlyContinue

# Copy courses-related files
Write-Host "Copying courses files..." -ForegroundColor Yellow
Copy-Item -Force src\components\courses\*.* src\features\courses\components\ -ErrorAction SilentlyContinue

# Copy notes-related files
Write-Host "Copying notes files..." -ForegroundColor Yellow
Copy-Item -Force src\components\notes\*.* src\features\notes\components\ -ErrorAction SilentlyContinue
Copy-Item -Force src\types\notes.ts src\features\notes\types\ -ErrorAction SilentlyContinue

# Copy shared components and hooks
Write-Host "Copying shared components and hooks..." -ForegroundColor Yellow
Copy-Item -Force src\components\ErrorBoundary.tsx src\shared\components\ -ErrorAction SilentlyContinue
Copy-Item -Force src\components\Sidebar.tsx src\shared\components\ -ErrorAction SilentlyContinue
Copy-Item -Force src\hooks\use-mobile.tsx src\shared\hooks\ -ErrorAction SilentlyContinue
Copy-Item -Force src\hooks\use-toast.ts src\shared\hooks\ -ErrorAction SilentlyContinue

Write-Host "`nReorganization completion script executed!" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Continue updating imports in your files" -ForegroundColor Cyan
Write-Host "2. Test the application after all updates" -ForegroundColor Cyan
Write-Host "3. Once everything works, remove duplicate files from old locations" -ForegroundColor Cyan 