# Tour of Rust

Welcome to the source repo of [Tour of Rust](https://tourofrust.com/).

# Contributors

* Deutsch - [Felix](https://github.com/jassler)
* English - [Richard Anaya](https://github.com/richardanaya)
* Interlingue - [David MacLeod](https://github.com/Dhghomon/)
* Русский - [Danil Kondratiev](https://github.com/knightpp)

# Looking for translators!

If you would like to contribute translations in a language that doesn't exist yet.  Feel free to make an issue and I will modify the generator for your language.

The only file you should modify is: **lessons.json**

Adding new languages should be as simple as adding new "title"/"content"/"code" properties to the lessons.json per lesson postfixed with the appropriate language code (e.g. "content_es").

To generate a language specific code example go to https://play.rust-lang.org/, write your code, and "share" and "get embed code as link" and place as a property "code" postfixed with language code (e.g. "code_es").  Make sure to run "rustfmt" tool from the "Tools" dropdown.

# Releases


## Release 1 - May 10 2020
* Deutsch, Interlingue, Русский translations for chapter 2
* Deutsch, Interlingue, Русский translations for chapter 1
* Domain name setup
* Mobile improvements
* Deeper localization capabilites of generator

## Release 0 - May 3rd 2020
* Chapter 1

# Credit

This tutorial format and many of the examples were inspired by the wonderful [Tour of Go](https://tour.golang.org/)
