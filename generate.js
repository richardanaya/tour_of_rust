const fs = require('fs');

let lessons = JSON.parse(fs.readFileSync('lessons.json'));

function template(title,code,content,index,isLast){
    return `<html>
    <head>
        <link href="https://fonts.googleapis.com/css?family=Fira+Sans&display=swap" rel="stylesheet">
        <title>Tour of Rust -${title}</title>
        <link rel="stylesheet" href="tour.css">
    </head>
    <body>
        <div class="tour">
            <div class="header">
                <span class="title"><a href="index.html">Tour of Rust</a></span>
                <span class="nav">
                <span class="back"><a href="TOC.html">Table of Contents</a></span>
                ${index!=0?`<span class="back"><a href="${getFileName(index-1)}">Back</a></span>`:""}
                <span class="next"><a href="${!isLast?getFileName(index+1):"end.html"}">Next</a></span>
                </span>
            </div>
            <div class="page">
            <h1>${title}</h1>
            ${content}
            </div>
            ${code?`<div class="code">
            <iframe width="100%" src="${code}" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
            </div>`:`<div class="code"><center><br><br><br><br><br><img src="ferris.png"></center></div>`}
        </div>
    </body>
</html>`
}

function pad(num, size) {
    var s = num+"";
    return s.padStart(2, '0')
}

function getFileName(i){
    let fileName = pad(i,2)+".html";
    if(i==0){
        fileName = "index.html";
    }
    return fileName;
}

let c = 0;
for(var i in lessons){
    let fileName = getFileName(i);
    let lesson = lessons[i];
    fs.writeFileSync(fileName, template(lesson.title,lesson.code,lesson.content,c,i==lessons.length-1))
    c++;
}
let fileName = "TOC.html";
fs.writeFileSync(fileName,`<html>
<head>
    <link href="https://fonts.googleapis.com/css?family=Fira+Sans&display=swap" rel="stylesheet">
    <title>Tour of Rust - Table of Contents</title>
    <link rel="stylesheet" href="tour.css">
</head>
<body>
    <div class="tour">
        <div class="header">
            <span class="title"><a href="index.html">Tour of Rust</a></span>
        </div>
        <div class="page">
        <h1>Lessons</h1>
        <p>
        <ul>
${lessons.map((x,i)=>`<li><a href="${getFileName(i)}">${i}. ${x.title}</a></li>`).join("\n")}
        <ul>
        </p>
        </div>
    </div>
</body>
</html>`)
fileName = "end.html";
fs.writeFileSync(fileName,`<html>
<head>
    <link href="https://fonts.googleapis.com/css?family=Fira+Sans&display=swap" rel="stylesheet">
    <title>Tour of Rust - The End</title>
    <link rel="stylesheet" href="tour.css">
</head>
<body>
    <div class="tour">
        <div class="header">
            <span class="title"><a href="index.html">Tour of Rust</a></span>
            <span class="nav">
            <span class="back"><a href="TOC.html">Table of Contents</a></span>
            <span class="back"><a href="${getFileName(lessons.length-1)}">Back</a></span>
            </span>
        </div>
        <div class="page">
        <h1>The End</h1>
        <p>That's all for now. Stay tuned for new chapters. I hope you enjoy the journey ahead!</p>
        </div>
    </div>
</body>
</html>`)