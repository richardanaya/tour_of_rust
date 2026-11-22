serve: clean
	@node generate.js lessons docs beta
	@node generate.js wasm docs/webassembly beta
	@cd docs && python3 -m http.server 8080
test: clean
	@node generate.js lessons docs
	@node generate.js wasm docs/webassembly
	@cd docs && python3 -m http.server 8080
publish:
	@echo "The site is published automatically by GitHub Actions on push to master."
	@echo "To republish without a new commit:"
	@echo "  gh workflow run pages.yml --ref master"
	@echo "or use the Actions tab: Deploy to GitHub Pages → Run workflow."
	@echo "Do not force-push the gh-pages branch; it is no longer the Pages source."
lint:
	#prettier --write lessons/*/*.yaml
	#prettier --write wasm/*/*.yaml
clean:
	@rm docs/*.html 2> /dev/null || true
	@rm docs/webassembly/*.html 2> /dev/null || true
