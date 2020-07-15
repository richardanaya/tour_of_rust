let fs = require("fs")
let yaml = require('js-yaml');
let lessons = yaml.safeLoad(fs.readFileSync("wasm.yaml"));
for(x in lessons.common_words){
    fs.writeFileSync("wasm/"+x+"/common_words.yaml",yaml.safeDump(lessons.common_words[x]));
}

let chapters = [];

let i = 0;

for(x in lessons.pages){
    if(lessons.pages[x].chapter && lessons.pages[x].chapter != i){
        i = lessons.pages[x].chapter
    }
    if(chapters[i]==undefined){
        chapters[i] = [];
    }
    chapters[i].push(lessons.pages[x])
}

for(x in chapters){
    let chapter = chapters[x];
    let language_pages = {};
    for(y in chapter){
        let page = chapter[y];
        for(z in page){
            if(z == 'chapter'){
                continue;
            }
            let language_page = page[z];
            if(language_pages[z] == undefined){
                language_pages[z] = [];
            }
            language_pages[z].push(language_page)
        }    
    }
    for(l in language_pages){
        fs.writeFileSync("wasm/"+l+"/chapter_"+x+".yaml",yaml.safeDump(language_pages[l]));
    }
}