generate:
	@rm docs/*.html
	@cat lessons.yaml | yq . > lessons.json
	@node generate.js
	@rm lessons.json
serve: generate
	@python3 -m http.server 8080
publish: generate lint
	git add .
	git commit -m 'new pages'
	git push
lint:
	prettier --write lessons.json
