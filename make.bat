@echo off

if ["%~1"] == [""] (
    goto :help
)

if "%~1" == "serve" (
    goto :serve
)

if "%~1" == "test" (
    goto :test
)

if "%~1" == "publish" (
    goto :publish
)

if "%~1" == "lint" (
    goto :lint
)

if "%~1" == "clean" (
    goto :clean
)

:help
echo Usage:
echo    make.bat [options]
echo.
echo Options:
echo    serve               Start the Python webserver
echo    test                Start the test Python webserver
echo    publish             Show how to publish (GitHub Actions)
echo    lint                Run Prettier
echo    clean               Remove generated html pages
exit /b 0

:serve
call :clean
call node generate.js lessons docs beta
call cd docs && python -m http.server 8080
exit /b 0

:test
call :clean
call node generate.js lessons docs
call cd docs && python -m http.server 8080
exit /b 0

:publish
echo The site is published automatically by GitHub Actions on push to master.
echo To republish without a new commit:
echo   gh workflow run pages.yml --ref master
echo or use the Actions tab: Deploy to GitHub Pages - Run workflow.
echo Do not force-push the gh-pages branch; it is no longer the Pages source.
exit /b 0

:lint
call prettier --write .\lessons\*\*.yaml
exit /b 0

:clean
del .\docs\*.html
exit /b 0
