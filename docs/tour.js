function setupKeys(){
    document.body.addEventListener("keyup",function(e){
        if(e.keyCode == 39){
            let next = document.querySelector(".next a");
            if(next){
                next.click();
            }
        }
        if(e.keyCode == 37){
            let prev = document.querySelector(".back a");
            if(prev){
                prev.click();
            }
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