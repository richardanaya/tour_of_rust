# Tour of Rust

Welcome to the source repo of [Tour of Rust](https://tourofrust.com/).

# Contributors

* Deutsch - [Felix](https://github.com/jassler)
* English - [Richard Anaya](https://github.com/richardanaya)
* Interlingue - [David MacLeod](https://github.com/Dhghomon/)
* Русский - [Danil Kondratiev](https://github.com/knightpp)

# Looking for translators!

If you would like to contribute translations in a language that doesn't exist yet.  Feel free to make an issue and I will modify the generator for your language.

The only file you should modify in your pull request is: **lessons.yaml**

Adding new languages should be as simple as adding new properites per page under an appropriate language code object. Let's assume we're doing spanish and your language code is "es":

* **title** - this would be your localized page's title
* **content_markdown** - this would be your localized page's content as markdown using [shodown markdown](https://github.com/showdownjs/showdown/wiki/Showdown's-Markdown-syntax)
* **code** (optional) - this would be your localized page's code. This is the "embedded link" generated from https://play.rust-lang.org/ when you hit the "Share" button. Be sure your run the "rustfmt" tool! If you don't provide code, a page will fallback onto an english version of code (if it exists).

```yaml
  - es:
      title: Capítulo 3 - Conclusión
      content_markdown: |
        ¡Rust tiene algunos increíbles ** punteros **!

        * A
        * `let`
        * C
      code: https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&code=fn%20main()%20%7B%7D%0A

```


Lastly, there is a section for common words you should fill out your localized translations of for deeper experience of the site.

# Releases

## Unreleased
* New markdown formatting for pages

## Release 1 - May 10 2020
* Deutsch, English, Interlingue, Русский translations for chapter 2
* Deutsch, Interlingue, Русский translations for chapter 1
* Domain name setup
* Mobile improvements
* Deeper localization capabilites of generator

## Release 0 - May 3rd 2020
* Chapter 1

# Credit

This tutorial format and many of the examples were inspired by the wonderful [Tour of Go](https://tour.golang.org/)
