serve: beta
	@cd docs && python3 -m http.server 8080
test: generate
	@cd docs && python3 -m http.server 8080
beta: beta_generate_lessons beta_generate_wasm
beta_generate_lessons:
	@rm docs/*.html || true
	@cat lessons.yaml | yq . > lessons.json
	@node generate.js lessons.json docs beta
	@rm lessons.json
beta_generate_wasm:
	@rm docs/wasm/*.html || true
	@cat wasm.yaml | yq . > wasm.json
	@node generate.js wasm.json docs/webassembly beta
	@rm wasm.json
generate: generate_lessons generate_wasm
generate_lessons:
	@rm docs/*.html || true
	@cat lessons.yaml | yq . > lessons.json
	@node generate.js lessons.json docs
	@rm lessons.json
generate_wasm:
	@rm docs/wasm/*.html || true
	@cat wasm.yaml | yq . > wasm.json
	@node generate.js wasm.json docs/webassembly
	@rm wasm.json
publish: generate lint
	git checkout website
	git add . || true
	git commit -m 'generating new html' || true
	git push || true
	git checkout master
lint:
	prettier --write lessons.yaml
