# Test script to verify the reorganization structure

Write-Host "Checking feature directory structure..." -ForegroundColor Yellow

$allFeaturesExist = $true

$requiredDirs = @(
    "src\features\calendar\components",
    "src\features\calendar\api",
    "src\features\calendar\hooks",
    "src\features\calendar\types",
    "src\features\calendar\utils",
    "src\features\courses\components",
    "src\features\courses\api",
    "src\features\courses\hooks",
    "src\features\courses\types",
    "src\features\notes\components",
    "src\features\notes\api",
    "src\features\notes\hooks",
    "src\features\notes\types",
    "src\shared\components",
    "src\shared\hooks",
    "src\shared\utils",
    "src\shared\types"
)

foreach ($dir in $requiredDirs) {
    if (Test-Path $dir) {
        Write-Host "✅ $dir exists" -ForegroundColor Green
    } else {
        Write-Host "❌ $dir does not exist" -ForegroundColor Red
        $allFeaturesExist = $false
    }
}

Write-Host "`nChecking key files..." -ForegroundColor Yellow

$requiredFiles = @(
    "src\features\calendar\index.ts",
    "src\features\courses\index.ts",
    "src\features\notes\index.ts",
    "src\shared\index.ts",
    "REORGANIZATION.md",
    "REORGANIZATION-STATUS.md"
)

$allFilesExist = $true

foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "✅ $file exists" -ForegroundColor Green
    } else {
        Write-Host "❌ $file does not exist" -ForegroundColor Red
        $allFilesExist = $false
    }
}

if ($allFeaturesExist -and $allFilesExist) {
    Write-Host "`n✅ Reorganization directory structure is complete!" -ForegroundColor Green
    Write-Host "Next steps: Update all imports according to REORGANIZATION-STATUS.md" -ForegroundColor Cyan
} else {
    Write-Host "`n❌ Some directories or files are missing. Please check the output above." -ForegroundColor Red
} 