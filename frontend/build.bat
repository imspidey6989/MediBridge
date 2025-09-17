@echo off
REM MediBridge Frontend Build Script for Windows

echo Building MediBridge Frontend...

REM Install dependencies
echo Installing dependencies...
npm ci

REM Build the project
echo Building project...
npm run build

REM Create deployment directory
echo Preparing deployment...
if not exist deploy mkdir deploy
xcopy dist\* deploy\ /E /I /Y
if exist public xcopy public\* deploy\ /E /Y

echo Build completed! Files are in the 'deploy' directory
echo You can now copy the 'deploy' directory to your web server
pause