@echo off
echo ========================================
echo Starting Digital Banking Dashboard
echo ========================================
echo.

:: Check if dependencies are installed
if not exist "backend\node_modules" (
    echo ERROR: Backend dependencies not installed!
    echo Please run setup.bat first
    pause
    exit /b 1
)

if not exist "frontend\node_modules" (
    echo ERROR: Frontend dependencies not installed!
    echo Please run setup.bat first
    pause
    exit /b 1
)

echo Starting backend server...
start "Backend Server" cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak >nul

echo Starting frontend server...
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo Both servers are starting...
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo ========================================
echo.
echo Press any key to close this window
echo (Backend and Frontend will keep running)
pause >nul
