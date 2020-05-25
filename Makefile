serve:
	# Make beta lessons
	@rm docs/*.html || true
	@cat lessons.yaml | yq . > lessons.json
	@node generate.js lessons.json docs beta
	@rm lessons.json
	# Make beta wasm
	@rm docs/wasm/*.html || true
	@cat wasm.yaml | yq . > wasm.json
	@node generate.js wasm.json docs/webassembly beta
	@rm wasm.json

	@cd docs && python3 -m http.server 8080
test: generate
	# Make production lessons
	@rm docs/*.html || true
	@cat lessons.yaml | yq . > lessons.json
	@node generate.js lessons.json docs
	@rm lessons.json
	# Make production wasm
	@rm docs/wasm/*.html || true
	@cat wasm.yaml | yq . > wasm.json
	@node generate.js wasm.json docs/webassembly
	@rm wasm.json

	@cd docs && python3 -m http.server 8080
publish:
	git branch -D gh-pages
	git checkout -b gh-pages
	# Make production lessons
	@rm docs/*.html || true
	@cat lessons.yaml | yq . > lessons.json
	@node generate.js lessons.json docs
	@rm lessons.json
	# Make production wasm
	@rm docs/wasm/*.html || true
	@cat wasm.yaml | yq . > wasm.json
	@node generate.js wasm.json docs/webassembly
	@rm wasm.json

	mv docs/* .


	git add . || true
	git commit -m 'generating new html' || true
	git push -f origin gh-pages || true

	git checkout master
lint:
	prettier --write lessons.yaml
