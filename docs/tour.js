function setupKeys(){
    document.body.addEventListener("keyup",function(e){
        if(e.ctrlKey || e.altKey || e.metaKey || e.shiftKey){
            return;
        }
        let link;
        if(e.keyCode == 39){
            link = document.querySelector(".next a");
        }
        if(e.keyCode == 37){
            link = document.querySelector(".back a");
        }
        if(link){
            link.click();
        }
    })
}

let iframe = document.querySelector("iframe");
if(iframe){
    iframe.addEventListener( "load", function(e) {
        setTimeout(()=>{
            document.querySelector('a').focus();
        },100)
        setupKeys();
    });
} else {
    setupKeys();
}

hljs.initHighlightingOnLoad();