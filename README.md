# Tour of Rust

Welcome to the source repo of [Tour of Rust](https://tourofrust.com/).

# Goals

This project is meant to give an experienced programmer a swift introduction to Rust as an alternative to reading lengthy book style documentation.

* Chapter 1 - The Basics
* Chapter 2 - Basic Control Flow
* Chapter 3 - Basic Data Structure Types
* Chapter 4 - Generic Types
* Chapter 5 - Ownership & Borrowing Data
* Chapter 6 - Text
* Chapter 7 - Object Oriented Programming
* Chapter 8 - Smart Pointers
* Chapter 9 - Project Organization and Structure

Content goals:
* Chapter 1-4 should give you a strong taste of Rust's aesthetic
* Chapter 1-6 should give a person from C a good idea how their ideas translate
* Chapter 1-8 should give a person from C++ a good idea how their ideas translate
* Chapter 9+ should talk about Rust specific concepts that doesn't fit well into the above

This project also aims to provide this book in as many languages as possible.

# Contributors

* Deutsch - [Felix](https://github.com/jassler), [Ramin Azhdari](https://github.com/raminos), [Patrick Hintermayer](https://github.com/zerotask)
* English - [Richard Anaya](https://github.com/richardanaya)
* Español - [Alba Martínez Martínez](https://github.com/albatraduce), (Tech review by [Alberto Moreta](https://github.com/AlbertoMoreta) and [Fran Torres](https://github.com/franute))
* Français - [Mathieu Gemard](https://github.com/mgemard), [Vincent Foulon](https://github.com/VincentFoulon80)
* Interlingue - [David MacLeod](https://github.com/Dhghomon/)
* Magyar - [Nemin32](https://github.com/Nemin32/), [Dániel Buga](https://github.com/bugadani)
* Polski - [adamsky](https://github.com/adamsky)
* Português Brasileiro - [Denstone](https://github.com/denstone)
* Русский - [Danil Kondratiev](https://github.com/knightpp), [Yuriy Larin](https://github.com/blandger)
* 简体中文 - [Tengfei Niu](https://github.com/spartucus), [Haizhi Geng](https://github.com/JmPotato), [Zixing Liu](https://github.com/liushuyu)
* 繁體中文 - [kkpoon](https://github.com/kkpoon), [Kai](https://github.com/chihkaiyu)
* 日本語 - [7shi](https://github.com/7shi), [Rossy](https://github.com/rossy0213), [Yuji Sugiura](https://github.com/leader22), [TaKO8Ki](https://github.com/TaKO8Ki)
* 한국어 - [fermat39](https://github.com/fermat39), [Sungjin Han](https://github.com/meinside)
* ภาษาไทย - [pallat](https://github.com/pallat)
* Türkçe - [Rust Dili](https://github.com/RustDili/), [mertataol](https://github.com/mertataol), [doganid](https://github.com/doganid), [mhmmdd](https://github.com/mhmmdd)
* Ελληνικά - [DoubleHyphen](https://github.com/DoubleHyphen/)
* Italian - [Andrea Manzini](https://github.com/ilmanzo/)


# Looking for translators!

If you would like to contribute translations in a language that doesn't exist yet. Feel free to make a PR!

Look for your appropriate language under the `lessons` folder. Each chapter has its own file. You can modify an existing chapter's content or if there is one you'd like to translate from the english lessons, copy that chapter file over and modify it's content to your own language. Each page has various properties.

* **title** - this would be your localized page's title
* **content_markdown** - this would be your localized page's content as markdown using [shodown markdown](https://github.com/showdownjs/showdown/wiki/Showdown's-Markdown-syntax)
* **code** (optional) - this would be your localized page's code. This is the "embedded link" generated from https://play.rust-lang.org/ when you hit the "Share" button. Be sure your run the "rustfmt" tool! If you don't provide code, a page will fallback onto an english version of code (if it exists).

```yaml
- title: Capítulo 3 - Conclusión
  content_markdown: |
    ¡Rust tiene algunos increíbles ** punteros **!

    * A
    * `let`
    * C
  code: https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&code=fn%20main()%20%7B%7D%0A
```

Lastly, there is a file for common words you should fill out your localized translations of for deeper experience of the site.

## How to run the project locally

To run the site locally you need to install `yq`. There are several projects with the name `yq`, this
project uses [this one](https://kislyuk.github.io/yq/).

Run `yarn` to install javascript dependencies.

After installing the dependencies use `make` to launch the site. You will need to restart the server every time
to see the changes you've made.
Windows users should use `make.bat` instead.

# Releases

## Release 5 - May 30, 2020
* Chapter 6 released on text in English, Occidental
* Chapter 5 released in French and Brazillian Portuguese
* Chapter 4 released in Chinese and Spanish
* Chapter 3 released in French
* Minor fixes
* Chapter 2 of Tour of WebAssembly released

## Release 4 - May 30, 2020
* Chapter 5 released on ownership and sharing
* Chinese transalations chapter 1-3
* French translations for chapter 1-3
* Brazillian portuguese translations for chapter 2-4
* Spanish translations for chapter 3
* Starting new section for WebAssembly

## Release 3 - May 23, 2020
* Chapter 4 released on generic data structures
* Spanish for Chapter 2
* Chapter 1 in brazillian portuguese
* Updates for german and russian
* New pages and rewrites and reordering

## Release 2 - May 16, 2020
* Deutsch, English, Interlingue, Русский translations for chapter 2
* Spanish for chapter 1
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
