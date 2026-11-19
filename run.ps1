# ======================================================================
# CodeMaster AI - Unified Application Launcher (PowerShell)
# Developer: Ayananshu Mahapatra
# ======================================================================

$ErrorActionPreference = "Continue"

Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host "  CodeMaster AI Platform - Initializing Services                      " -ForegroundColor White
Write-Host "======================================================================" -ForegroundColor Cyan

$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-25.0.2.10-hotspot"
$javaExe = "$env:JAVA_HOME\bin\java.exe"
$backendDir = Join-Path $PSScriptRoot "backend"
$frontendDir = Join-Path $PSScriptRoot "frontend"
$jarPath = Join-Path $backendDir "target\codemaster-api-1.0.0-SNAPSHOT.jar"

# 1. Start Backend API
Write-Host "[1/3] Launching Spring Boot Backend on http://localhost:8080..." -ForegroundColor Yellow
if (Test-Path $jarPath) {
    Start-Process -FilePath $javaExe -ArgumentList "-jar", "`"$jarPath`"" -WorkingDirectory $backendDir
} else {
    $mvnCmd = "C:\Users\Ayananshu\AppData\Local\Programs\apache-maven-3.9.9\bin\mvn.cmd"
    Start-Process -FilePath "cmd.exe" -ArgumentList "/c `"$mvnCmd`" spring-boot:run" -WorkingDirectory $backendDir
}

Start-Sleep -Seconds 5

# 2. Start Frontend SPA
Write-Host "[2/3] Launching React 18 + Vite Frontend on http://localhost:5173..." -ForegroundColor Yellow
Start-Process -FilePath "cmd.exe" -ArgumentList "/c npm run dev" -WorkingDirectory $frontendDir

Start-Sleep -Seconds 3

# 3. Open Browser
Write-Host "[3/3] Opening CodeMaster AI in Default Browser..." -ForegroundColor Green
Start-Process "http://localhost:5173"

Write-Host "`n======================================================================" -ForegroundColor Cyan
Write-Host "  Platform Ready:                                                     " -ForegroundColor White
Write-Host "  - Frontend:         http://localhost:5173                          " -ForegroundColor Green
Write-Host "  - Swagger UI:       http://localhost:8080/swagger-ui.html          " -ForegroundColor Green
Write-Host "  - Health Telemetry: http://localhost:8080/api/health               " -ForegroundColor Green
Write-Host "======================================================================" -ForegroundColor Cyan
