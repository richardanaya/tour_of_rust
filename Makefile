serve:
# Make beta lessons
	@rm docs/*.html 2> /dev/null || true
	@node generate.js lessons docs beta
# Make beta wasm
	@rm docs/wasm/*.html 2> /dev/null || true
	@node generate.js wasm docs/webassembly beta

	@cd docs && python3 -m http.server 8080
test:
# Make production lessons
	@rm docs/*.html 2> /dev/null || true
	@node generate.js lessons docs
# Make production wasm
	@rm docs/wasm/*.html 2> /dev/null || true
	@node generate.js wasm docs/webassembly

	@cd docs && python3 -m http.server 8080
publish:
	git branch -D gh-pages
	git checkout -b gh-pages
# Make production lessons
	@rm docs/*.html 2> /dev/null || true
	@node generate.js lessons docs
# Make production wasm
	@rm docs/wasm/*.html 2> /dev/null || true
	@node generate.js wasm docs/webassembly

	mv docs/* .

	git add . || true
	git commit -m 'generating new html' || true
	git push -f origin gh-pages || true

	git checkout master
lint:
	#prettier --write lessons.yaml
	#prettier --write wasm.yaml
