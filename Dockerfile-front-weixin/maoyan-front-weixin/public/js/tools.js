(function(){
        let index = 0;
        let id = 0;
        let slicks = document.querySelectorAll("div.slick-track a");
        let slickDots = document.querySelectorAll("ul.slick-dots li");
        let slickButtons = document.querySelectorAll("ul.slick-dots button");
        document.querySelector("div.banner").onmouseenter = function(){
            stopCartnoon();
        };
        document.querySelector("div.banner").onmouseleave = function(){
            startCartnoon();
        };
        for(let btn of slickButtons){
            btn.onclick = function(e){
                stopCartnoon();
                hide();
                index = e.target.innerHTML;
                show();

            }
        }
        let startCartnoon = function(){
            id = setInterval(function(){
                hide();
                index++;
                if(index >= slicks.length){
                    index = 0;
                }
                show();
            },2000);
        }
        let stopCartnoon = function(){
            clearInterval(id);
        }
        let hide = function(){
            slicks[index].style.opacity = 0;
            slicks[index].style.zIndex = 998;
            slickDots[index].className = "";
        }
        let show = function(){
            slicks[index].style.opacity = 1;
            slicks[index].style.zIndex = 999;
            slickDots[index].className = "slick-active";
        }

        startCartnoon();
})()
