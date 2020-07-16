serve: clean
	@node generate.js lessons docs beta
	@node generate.js wasm docs/webassembly beta
	@cd docs && python3 -m http.server 8080
test: clean
	@node generate.js lessons docs
	@node generate.js wasm docs/webassembly
	@cd docs && python3 -m http.server 8080
publish: clean
	git branch -D gh-pages
	git checkout -b gh-pages
	@node generate.js lessons docs
	@node generate.js wasm docs/webassembly
	mv docs/* .
	git add . || true
	git commit -m 'generating new html' || true
	git push -f origin gh-pages || true
	git checkout master
lint:
	#prettier --write lessons.yaml
	#prettier --write wasm.yaml
clean:
	@rm docs/*.html 2> /dev/null || true
	@rm docs/wasm/*.html 2> /dev/null || true
