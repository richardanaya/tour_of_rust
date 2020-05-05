generate:
	@node generate.js
serve: generate
	@python3 -m http.server 8080
publish: generate
	git add .
	git commit -m 'new pages'
	git push
lint:
	prettier --write lessons.json