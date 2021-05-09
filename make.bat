@echo off

if ["%~1"] == [""] (
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
)

if "%~1" == "help" (
    call :help
)

if "%~1" == "--help" (
    call :help
)

if "%~1" == "serve" (
    call node generate.js lessons docs beta
    call node generate.js wasm docs/webassembly beta
    call cd docs && python -m http.server 8080
)

if "%~1" == "test" (
    call node generate.js lessons docs
    call node generate.js wasm docs/webassembly
    call cd docs && python -m http.server 8080
)

if "%~1" == "publish" (
    call git branch -D gh-pages
	call git checkout -b gh-pages
	call node generate.js lessons docs
	call node generate.js wasm docs/webassembly
	call mv docs/* .
	call git add . || true
	call git commit -m 'generating new html' || true
	call git push -f origin gh-pages || true
	call git checkout master
)

if "%~1" == "lint" (
    call prettier --write lessons.yaml
	call prettier --write wasm.yaml
)

if "%~1" == "clean" (
    call rm docs/*.html 2> /dev/null || true
	call rm docs/wasm/*.html 2> /dev/null || true
)