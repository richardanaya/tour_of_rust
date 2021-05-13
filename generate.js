const showdown = require('showdown');
const fs = require('fs');
const yaml = require('js-yaml');

const lessonSource = process.argv[2];
const targetDir = process.argv[3];
const generateBetaContent = process.argv.length >= 4 && process.argv[4] === 'beta';

/**
 * @param {number} num
 * @returns {string}
 */
function pad(num) {
  const s = `${num}`;
  return s.padStart(2, '0');
}

/**
 * @param {string} lang
 * @param {number} i
 * @param {boolean} isBeta currently unused
 * @param {string} chapter
 * @returns {string}
 */
function getFileName(lang, i, isBeta, chapter) {
  if (i === 0 && lang === 'en') {
    return 'index.html';
  }
  let fileName = `${pad(i)}_${lang}.html`;
  if (chapter !== undefined && chapter !== null) {
    fileName = `chapter_${chapter}_${lang}.html`;
  }
  return fileName;
}

/**
 * @param {string} source
 * @returns {string[]}
 */
const getDirectories = (source) => fs.readdirSync(source, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

/**
 * @param {string} path
 * @returns {any}
 */
const getYaml = (path) => yaml.safeLoad(fs.readFileSync(path));

const languages = getDirectories(lessonSource);
const commonWords = {};
const chapters = [];

languages.forEach((lang) => {
//   const lang = languages[x];
  const langDir = `${lessonSource}/${lang}`;
  commonWords[lang] = getYaml(`${langDir}/common_words.yaml`);
  const languageFiles = fs.readdirSync(langDir, { withFileTypes: true })
    .filter((f) => f.isFile() && f.name.indexOf('chapter_') === 0)
    .map((f) => f.name);
  languageFiles.forEach((l) => {
    const chap = parseInt(l.substring(8, l.indexOf('.')), 10);
    if (chapters[chap] === undefined) {
      chapters[chap] = {};
    }
    chapters[chap][lang] = getYaml(`${langDir}/${l}`);
  });
});

const pages = [];
chapters.forEach((c, x) => {
  for (let i = 0; i < c.en.length; i += 1) {
    const page = {};
    if (i === 0 && x !== 0) {
      page.chapter = x;
    }
    Object.keys(c).forEach((lang) => {
      page[lang] = c[lang][i];
    });
    pages.push(page);
  }
});

const lessons = {
  common_words: commonWords,
  pages,
};

const converter = new showdown.Converter();

/**
 * @param {string[]} words
 * @param {string} lang
 * @param {string} w
 * @returns {string}
 */
function getWord(words, lang, w) {
  if (words[lang][w]) {
    return words[lang][w];
  }
  return words.en[w];
}

/**
 *
 * @param {string[]} words
 * @param {string} lang
 * @returns {string}
 */
const getHead = (words, lang) => `<!DOCTYPE html>
    <html lang="${lang}">
    <head>
        <title>${getWord(words, lang, 'tor')} - Let's go on an adventure!</title>

        <meta charset="UTF-8">
        <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
        <meta content="utf-8" http-equiv="encoding">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="keywords" content="Rust, Programming, Learning">
        <meta name="description" content="Welcome to the Tour of Rust. This is meant to be a step by step guide through the features of the Rust programming language">
        <meta name="theme-color" content="#ff6801"/>

        <link rel="stylesheet" href="tour.css">
        <link rel="preload" href="https://fonts.gstatic.com/s/neuton/v12/UMBQrPtMoH62xUZKdK0vfQr4LLkw6A.woff2" as="font" />
        <link rel="preload" href="https://fonts.gstatic.com/s/neuton/v12/UMBTrPtMoH62xUZCz4g6UCj1Bg.woff2" as="font" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Neuton:ital,wght@0,400;0,700;1,400&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@400;700&display=swap" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="manifest" href="./site.webmanifest">

        <script src="./tour.js" defer></script>
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-155199982-1"></script>
        <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-155199982-1', { 'anonymize_ip': true });
        </script>
    </head>`;

/**
 * @param {Array} lessons
 * @param {string} lang
 * @param {string} title
 * @param {string} code
 * @param {string} content
 * @param {number} index
 * @param {boolean} isLast
 * @param {string[]} words
 * @param {boolean} isBeta
 * @returns
 */
function template(lessonsData, lang, title, code, content, index, isLast, words, isBeta) {
  return `${getHead(words, lang)}
    <body>
        <div class="tour">
            <div class="header">
                <span class="title"><a href="${getFileName(lang, 0, isBeta, lessonsData[0]?.chapter)}">${getWord(words, lang, 'tor')}</a></span>
                <span class="nav">
                <span class="toc"><a href="TOC_${lang}.html">${getWord(words, lang, 'toc')}</a></span>
            </div>
            <div class="page">
            <h1>${title}</h1>
            ${content}
            <div class="bottomnav">
                ${index !== 0 ? `<span class="back"><a href="${isBeta ? 'beta_' : ''}${getFileName(lang, index - 1, isBeta, lessonsData[index - 1]?.chapter)}" rel="prev">❮ ${getWord(words, lang, 'previous')}</a></span>` : ''}
                ${isLast ? '' : `<span class="next"><a href="${isBeta ? 'beta_' : ''}${getFileName(lang, index + 1, isBeta, lessonsData[index + 1]?.chapter)}" rel="next">${getWord(words, lang, 'next')} ❯</a></span>`}
            </div>
            </div>
            ${code ? `<div class="code">
            <iframe width="100%" src="${code}" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals" title="Rust Playground" loading="lazy"></iframe>
            </div>` : '<div class="code"><center><img src="/ferris_lofi.png" alt="Mascot Ferris" width="300" height="236"></center></div>'}
        </div>
    </body>
</html>`;
}

languages.forEach((lang) => {
  let c = 0;
  const words = lessons.common_words;
  const langLessons = lessons.pages.filter((x) => {
    if (!generateBetaContent && x.beta === true) {
      return false;
    }
    return true;
  });
  const betaLessons = lessons.pages.filter(() => true);

  langLessons.forEach((lesson, i) => {
    let fileName = getFileName(lang, i, false, lesson?.chapter);
    if (i === 0 && lang === 'en') {
      fileName = 'index.html';
    }

    let lessonTitle = `[${getWord(words, lang, 'untranslated')}] ${lesson.en.title}`;
    let lessonContent = converter.makeHtml(lesson.en.content_markdown);
    let lessonCode = lesson.en.code;
    if (lesson[lang]) {
      let targetLang = lang;
      if (lesson[lang].clone) {
        targetLang = lesson[lang].clone;
      }
      lessonTitle = lesson[targetLang].title;

      let content = lesson[targetLang].content_html;
      if (!content) {
        content = converter.makeHtml(lesson[targetLang].content_markdown);
      }
      lessonContent = content;
      lessonCode = lesson[targetLang].code || lesson.en.code;

      if (lesson[lang].clone) {
        if (lesson[lang].code) {
          lessonCode = lesson[lang].code;
        }
      }
    }

    fs.writeFileSync(`${targetDir}/${fileName}`, template(langLessons, lang, lessonTitle, lessonCode, lessonContent, c, i === langLessons.length - 1, words, false));
    c += 1;
  });

  c = 0;

  betaLessons.forEach((lesson, i) => {
    if (lesson[lang]) {
      let targetLang = lang;
      if (lesson[lang].clone) {
        targetLang = lesson[lang].clone;
      }
      const fileName = getFileName(lang, i, true, lesson.chapter);

      let lessonTitle = `[${getWord(words, targetLang, 'untranslated')}] ${lesson.en.title}`;
      let lessonContent = lesson.en.content_markdown;
      let lessonCode = lesson.en.code;
      if (lesson[targetLang]) {
        lessonTitle = lesson[targetLang].title;
        let content = lesson[targetLang].content_html;
        if (!content) {
          content = converter.makeHtml(lesson[targetLang].content_markdown);
        }
        lessonContent = content;
        lessonCode = lesson[targetLang].code || lesson.en.code;
      }
      fs.writeFileSync(`${targetDir}/beta_${fileName}`, template(betaLessons, lang, lessonTitle, lessonCode, lessonContent, c, i === betaLessons.length - 1, words, true));
      c += 1;
    }
  });

  const fileName = `TOC_${lang}.html`;
  fs.writeFileSync(`${targetDir}/${fileName}`,
    `${getHead(words, lang)}
    <body>
        <div class="tour">
            <div class="header">
                <span class="title"><a href="${getFileName(lang, 0)}">${getWord(words, lang, 'tor')}</a></span>
                <span class="nav">
                </span>
            </div>
            <h1>${getWord(words, lang, 'lessons')}</h1>
            <p>
            <ul>
        ${langLessons.map((x, i) => {
    let targetLang = lang;
    if (x[lang] && x[lang].clone) {
      targetLang = x[lang].clone;
    }
    let s = `<li><a href="${getFileName(lang, i, false, x.chapter)}">${x[targetLang] ? x[targetLang].title : `[${getWord(words, targetLang, 'untranslated')}] ${x.en.title}`}</a></li>`;
    if (x.chapter !== undefined) {
      s = `</ul><h3><a href="${getFileName(lang, i, false, x.chapter)}">${x[targetLang] ? x[targetLang].title : `[${getWord(words, targetLang, 'untranslated')}] ${x.en.title}`}</a></h3><ul>`;
    }
    return s;
  }).join('\n')}
            <ul>
            </p>
        </div>
    </body>
    </html>`);
});
