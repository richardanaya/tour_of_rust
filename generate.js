let lessonSource = process.argv[2];
let target_dir = process.argv[3];
let generate_beta_content = process.argv.length >= 4 && process.argv[4]=="beta";

const fs = require('fs');
let showdown = require("./showdown.js");
converter = new showdown.Converter();

let lessons = JSON.parse(fs.readFileSync(lessonSource));

function getWord(words,lang,w){
    if(words[lang][w]){
        return words[lang][w];
    }
    return words["en"][w];
}

function titleClean(title){
    title = title.replace("<span class=\"emoji\">","");
    title = title.replace("</span>","");
    title = title.replace("🦀","Rust");
    return title;
}

function template(lessons,lang,title,code,content,index,isLast, words, is_beta){
    return `<html lang="${lang}">
    <head>
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-155199982-1"></script>
        <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-155199982-1');
        </script>
        <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
        <meta content="utf-8" http-equiv="encoding">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css?family=Fira+Sans&display=swap" rel="stylesheet">
        <title>${getWord(words,lang,"tor")} - ${titleClean(title)}</title>
        <link rel="stylesheet" href="tour.css">
        <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
        <link rel="manifest" href="site.webmanifest">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.0.3/build/styles/pojoaque.min.css">
        <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.3/highlight.min.js"></script>
    </head>
    <body>
        <div class="tour">
            <div class="header">
                <span class="title"><a href="${getFileName(lang,0,is_beta,lessons[0].chapter)}">${getWord(words,lang,"tor")}</a></span>
                <span class="nav">
                <span class="toc"><a href="TOC_${lang}.html">${getWord(words,lang,"toc")}</a></span>
                ${index!=0?`<span class="back"><a href="${is_beta?"beta_":""}${getFileName(lang,index-1,is_beta,index!=0?lessons[index-1].chapter:undefined)}">${getWord(words,lang,"previous")}</a></span>`:""}
                ${isLast?"":`<span class="next"><a href="${is_beta?"beta_":""}${getFileName(lang,index+1,is_beta,lessons[index+1].chapter)}">${getWord(words,lang,"next")}</a></span>`}
                </span>
            </div>
            <div class="page">
            <h1>${title}</h1>
            ${content}
            </div>
            ${code?`<div class="code">
            <iframe width="100%" src="${code}" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
            </div>`:`<div class="code"><center><br><br><br><br><br><img src="ferris.png"><br><br><br><br><br></center></div>`}
        </div>
    </body>
    <script src="tour.js"></script>
</html>`
}

function pad(num, size) {
    var s = num+"";
    return s.padStart(2, '0')
}

function getFileName(lang,i,is_beta,chapter){
    let fileName = pad(i,2)+`_${lang}.html`;
    if(i==0 && !is_beta){
        if(lang == "en"){
            fileName = "index.html";
        } else {
            fileName = `index_${lang}.html`
        }
    }
    if(chapter !== undefined){
        fileName = `chapter_${chapter}_${lang}.html`
    }
    return fileName;
}

let languages = Object.keys(lessons.pages[0]);

for(var l in languages){
    let lang = languages[l];
    let c = 0;
    let words = lessons.common_words;
    let langLessons = lessons.pages.filter(x=>{
        if(!generate_beta_content && x.beta == true){
            return false;
        }
        return true;
    });
    let betaLessons = lessons.pages.filter(x=>{
        return true;
    });
    for(var i in langLessons){
        let lesson = langLessons[i];
        let fileName = getFileName(lang,i,false,lesson.chapter);
       
        let lesson_title = "["+getWord(words,lang,"untranslated")+"] "+lesson["en"].title;
        let lesson_content = converter.makeHtml(lesson["en"].content_markdown)
        let lesson_code = lesson["en"].code 
        if(lesson[lang]){
            lesson_title = lesson[lang].title;
            let content = lesson[lang]["content_html"];
            if(!content){
                content = converter.makeHtml(lesson[lang]["content_markdown"]);
            }
            lesson_content = content;
            lesson_code = lesson[lang].code || lesson["en"].code;
        }
        
        fs.writeFileSync(target_dir+"/"+fileName, template(langLessons, lang,lesson_title,lesson_code,lesson_content,c,i==langLessons.length-1,words,false))
        c++;
    }
    c = 0;
    for(var i in betaLessons){
        let lesson = betaLessons[i];
        if(lesson[lang]){
            let fileName = getFileName(lang,i,true,lesson.chapter);
       
            let lesson_title = "["+getWord(words,lang,"untranslated")+"] "+lesson["en"].title;
            let lesson_content = lesson["en"].content_markdown
            let lesson_code = lesson["en"].code 
            if(lesson[lang]){
                lesson_title = lesson[lang].title;
                let content = lesson[lang]["content_html"];
                if(!content){
                    content = converter.makeHtml(lesson[lang]["content_markdown"]);
                }
                lesson_content = content;
                lesson_code = lesson[lang].code || lesson["en"].code;
            }
            fs.writeFileSync(target_dir+"/beta_"+fileName, template(betaLessons, lang, lesson_title,lesson_code,lesson_content,c,i==betaLessons.length-1,words,true))
            c++;
        }
    }
    let fileName = `TOC_${lang}.html`;
    fs.writeFileSync(target_dir+"/"+fileName,`<html lang="${lang}">
    <head>
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-155199982-1"></script>
        <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-1 55199982-1');
        </script>
        <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
        <meta content="utf-8" http-equiv="encoding">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css?family=Fira+Sans&display=swap" rel="stylesheet">
        <title>${getWord(words,lang,"tor")} - ${getWord(words,lang,"toc")}</title>
        <link rel="stylesheet" href="tour.css">
        <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
        <link rel="manifest" href="site.webmanifest">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.0.3/build/styles/pojoaque.min.css">
        <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.3/highlight.min.js"></script>
    </head>
    <body>
        <div class="tour">
            <div class="header">
                <span class="title"><a href="${getFileName(lang,0)}">${getWord(words,lang,"tor")}</a></span>
                <span class="nav">
                </span>
            </div>
            <h1>${getWord(words,lang,"lessons")}</h1>
            <p>
            <ul>
        ${langLessons.map((x,i)=> {
            let s = `<li><a href="${getFileName(lang,i,false,x.chapter)}">${x[lang]?x[lang]["title"]:"["+getWord(words,lang,"untranslated")+"] "+x["en"].title}</a></li>`;
            if(x.chapter != undefined){
                s = `</ul><h3><a href="${getFileName(lang,i,false,x.chapter)}">${x[lang]?x[lang]["title"]:"["+getWord(words,lang,"untranslated")+"] "+x["en"].title}</a></h3><ul>`;
            }
            return s;
        }).join("\n")}
            <ul>
            </p>
        </div>
    </body>
    <script src="tour.js"></script>
    </html>`)
}
