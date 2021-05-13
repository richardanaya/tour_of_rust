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
echo    publish             Publish the website via Github pages
echo    lint                Run Prettier
echo    clean               Remove docs and wasm html pages
exit /b 0

:serve
call :clean
call node generate.js lessons docs beta
call node generate.js wasm docs\webassembly beta
call cd docs && python -m http.server 8080
exit /b 0

:test
call :clean
call node generate.js lessons docs
call node generate.js wasm docs\webassembly
call cd docs && python -m http.server 8080
exit /b 0

:publish
call :clean
call git branch -D gh-pages
call git checkout -b gh-pages
call node generate.js lessons docs
call node generate.js wasm docs/webassembly
call mv docs\* .
call git add . || true
call git commit -m 'generating new html' || true
call git push -f origin gh-pages || true
call git checkout master
exit /b 0

:lint
call prettier --write .\lessons\*\*.yaml
call prettier --write .\wasm\*\*.yaml
exit /b 0

:clean
del .\docs\*.html
del .\docs\webassembly\*.html
exit /b 0