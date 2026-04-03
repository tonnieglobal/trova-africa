@echo off
echo ==========================================
echo Push Trova Africa to GitHub
echo ==========================================
echo.
echo This script will push your project to GitHub.
echo.
echo Before running, please:
echo 1. Create a repository at https://github.com/new
echo 2. Note your username and repository name
echo.
echo.

set /p GITHUB_USERNAME="Enter your GitHub username: "
set /p REPO_NAME="Enter repository name (default: trova-africa): "

if "%REPO_NAME%"=="" set REPO_NAME=trova-africa

echo.
echo Adding remote origin...
git remote add origin https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git

echo Renaming branch to main...
git branch -M main

echo Pushing to GitHub...
git push -u origin main

echo.
echo ==========================================
if %ERRORLEVEL% == 0 (
  echo SUCCESS! Project pushed to GitHub.
  echo Repository: https://github.com/%GITHUB_USERNAME%/%REPO_NAME%
) else (
  echo ERROR: Push failed. Please check:
  echo - You created the repository on GitHub
  echo - Your username and repo name are correct
  echo - You are logged into GitHub CLI or have credentials configured
)
echo ==========================================
pause
