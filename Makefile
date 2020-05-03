generate:
	@node generate.js
serve: generate
	@python3 -m http.server 8080
