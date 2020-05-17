serve: beta
	@cd docs && python3 -m http.server 8080
beta:
	@rm docs/*.html || true
	@cat lessons.yaml | yq . > lessons.json
	@node generate.js beta
	@rm lessons.json
generate:
	@rm docs/*.html || true
	@cat lessons.yaml | yq . > lessons.json
	@node generate.js
	@rm lessons.json
publish: generate lint
	git add .
	git commit -m 'generating new html'
	git push
lint:
	prettier --write lessons.yaml
