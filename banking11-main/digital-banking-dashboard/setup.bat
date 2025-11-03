@echo off
echo ========================================
echo Digital Banking Dashboard - Setup Script
echo ========================================
echo.

:: Check if Node.js is installed
echo [1/6] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please download and install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo ✓ Node.js is installed
echo.

:: Check if MongoDB is running
echo [2/6] Checking MongoDB...
echo Note: Make sure MongoDB is running or use MongoDB Atlas
echo.

:: Install backend dependencies
echo [3/6] Installing backend dependencies...
cd backend
if not exist "node_modules" (
    echo Installing backend packages...
    call npm install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install backend dependencies
        pause
        exit /b 1
    )
) else (
    echo Backend dependencies already installed
)
echo ✓ Backend dependencies installed
echo.

:: Create backend .env if it doesn't exist
if not exist ".env" (
    echo Creating backend .env file...
    copy .env.example .env
    echo ✓ Created backend .env file
    echo Please update the .env file with your MongoDB URI and JWT secret
) else (
    echo ✓ Backend .env file already exists
)
echo.

:: Install frontend dependencies
echo [4/6] Installing frontend dependencies...
cd ..\frontend
if not exist "node_modules" (
    echo Installing frontend packages...
    call npm install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install frontend dependencies
        pause
        exit /b 1
    )
) else (
    echo Frontend dependencies already installed
)
echo ✓ Frontend dependencies installed
echo.

:: Create frontend .env if it doesn't exist
if not exist ".env" (
    echo Creating frontend .env file...
    echo VITE_API_URL=http://localhost:5000/api > .env
    echo ✓ Created frontend .env file
) else (
    echo ✓ Frontend .env file already exists
)
echo.

cd ..

echo [5/6] Setup Summary
echo ========================================
echo Backend: ./backend
echo Frontend: ./frontend
echo MongoDB: Please ensure MongoDB is running
echo ========================================
echo.

echo [6/6] Next Steps:
echo ========================================
echo 1. Start MongoDB (if local): mongod
echo 2. Update backend/.env with your configuration
echo 3. Start backend: cd backend ^&^& npm run dev
echo 4. Start frontend: cd frontend ^&^& npm run dev
echo 5. Open http://localhost:3000 in your browser
echo ========================================
echo.

echo ✓ Setup completed successfully!
echo.
pause
