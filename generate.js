const fs = require('fs');

let lessons = JSON.parse(fs.readFileSync('lessons.json'));

function getWord(words,lang,w){
    if(words[w+"_"+lang]){
        return words[w+"_"+lang];
    }
    return words[w+"_en"];
}

function titleClean(title){
    title = title.replace("<span class=\"emoji\">","");
    title = title.replace("</span>","");
    title = title.replace("🦀","Rust");
    return title;
}

function template(lang,title,code,content,index,isLast, words){
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
    </head>
    <body>
        <div class="tour">
            <div class="header">
                <span class="title"><a href="${getFileName(lang,0)}">${getWord(words,lang,"tor")}</a></span>
                <span class="nav">
                <span class="toc"><a href="TOC_${lang}.html">${getWord(words,lang,"toc")}</a></span>
                ${index!=0?`<span class="back"><a href="${getFileName(lang,index-1)}">${getWord(words,lang,"previous")}</a></span>`:""}
                <span class="next"><a href="${!isLast?getFileName(lang,index+1):`end_${lang}.html`}">${getWord(words,lang,"next")}</a></span>
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
</html>`
}

function pad(num, size) {
    var s = num+"";
    return s.padStart(2, '0')
}

function getFileName(lang,i){
    let fileName = pad(i,2)+`_${lang}.html`;
    if(i==0){
        if(lang == "en"){
            fileName = "index.html";
        } else {
            fileName = `index_${lang}.html`
        }
    }
    return fileName;
}

let languages = ["en","ie","de","ru"];

for(var l in languages){
    let lang = languages[l];
    let c = 0;
    let words = lessons.common_words;
    let langLessons = lessons.pages.filter(x=>x["content_"+lang])
    for(var i in langLessons){
        let fileName = getFileName(lang,i);
        let lesson = langLessons[i];
        fs.writeFileSync("docs/"+fileName, template(lang,lesson["title_"+lang],lesson["code_"+lang] || lesson.code,lesson["content_"+lang],c,i==langLessons.length-1,words))
        c++;
    }
    let fileName = `TOC_${lang}.html`;
    fs.writeFileSync("docs/"+fileName,`<html lang="${lang}">
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
        <title>${getWord(words,lang,"tor")} - ${getWord(words,lang,"toc")}</title>
        <link rel="stylesheet" href="tour.css">
        <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
        <link rel="manifest" href="site.webmanifest">
    </head>
    <body>
        <div class="tour">
            <div class="header">
                <span class="title"><a href="${getFileName(lang,0)}">${getWord(words,lang,"tor")}</a></span>
                <span class="nav">
                </span>
            </div>
            <div class="page">
            <h1>${getWord(words,lang,"lessons")}</h1>
            <p>
            <ul>
    ${langLessons.map((x,i)=>`<li><a href="${getFileName(lang,i)}">${i}. ${x["title_"+lang]}</a></li>`).join("\n")}
            <ul>
            </p>
            </div>
        </div>
    </body>
    </html>`)
    fileName = `end_${lang}.html`;
    fs.writeFileSync("docs/"+fileName,`<html lang="${lang}">
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
        <title>${getWord(words,lang,"tor")}- The End</title>
        <link rel="stylesheet" href="tour.css">
        <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
        <link rel="manifest" href="site.webmanifest">
    </head>
    <body>
        <div class="tour">
            <div class="header">
                <span class="title"><a href="${getFileName(lang,0)}">${getWord(words,lang,"tor")}</a></span>
                <span class="nav">
                <span class="toc"><a href="TOC_${lang}.html">${getWord(words,lang,"toc")}</a></span>
                <span class="back"><a href="${getFileName(lang,langLessons.length-1)}">${getWord(words,lang,"previous")}</a></span>
                </span>
            </div>
            <div class="page">
            <h1>The End</h1>
            <p>That's all for now. Stay tuned for new chapters. I hope you enjoy the journey ahead!</p>
            </div>
        </div>
    </body>
    </html>`)
}
