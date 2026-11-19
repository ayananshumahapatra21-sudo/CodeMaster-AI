@echo off
title CodeMaster AI - Unified Application Launcher
echo ======================================================================
echo   Starting CodeMaster AI Platform
echo   Architect & Developer: Ayananshu Mahapatra
echo ======================================================================

set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-25.0.2.10-hotspot"
set "MAVEN_CMD=C:\Users\Ayananshu\AppData\Local\Programs\apache-maven-3.9.9\bin\mvn.cmd"
set "JAR_PATH=%~dp0backend\target\codemaster-api-1.0.0-SNAPSHOT.jar"

echo [1/3] Starting Spring Boot 3 REST API on Port 8080...
if exist "%JAR_PATH%" (
    start "CodeMaster API (Backend: 8080)" "%JAVA_HOME%\bin\java.exe" -jar "%JAR_PATH%"
) else (
    start "CodeMaster API (Backend: 8080)" cmd /k "cd /d %~dp0backend && "%MAVEN_CMD%" spring-boot:run"
)

echo [2/3] Waiting for Backend to Initialize...
timeout /t 5 /nobreak >nul

echo [3/3] Starting React 18 + Vite Frontend on Port 5173...
start "CodeMaster Frontend (Port 5173)" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo ======================================================================
echo   CodeMaster AI Platform is now running!
echo   Frontend Dashboard:  http://localhost:5173
echo   REST API Health:     http://localhost:8080/api/health
echo   Swagger OpenAPI:     http://localhost:8080/swagger-ui.html
echo ======================================================================
echo.
timeout /t 3 /nobreak >nul
start http://localhost:5173
pause
