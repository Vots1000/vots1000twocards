function GameArea() {
    let cardsQuantity = document.getElementById("cards_quantity").value;
    let bg = document.getElementById("bg").value;
    let urlBg = "src/bg/" + bg + ".jpg";
    document.body.style.backgroundImage = ("url("+urlBg+")");
    if(cardsQuantity < 2 || cardsQuantity > 40 || cardsQuantity % 2 != 0) {
        alert("Only even numbers from 2 to 40 are allowed.");
        exit;
    }

    document.getElementById("content_inner").innerHTML="";
    let style = document.getElementById("style").value;
    const cardsPairs = [];
    for (let i = 1; i <=2; i++) {
    for (let i2 = 1; i2 <= (cardsQuantity/2); i2++) {
    cardsPairs.push(i2);
    }    
    }
    let Pairs = cardsPairs.sort(() => Math.random() - 0.5);
    for (let i = 1 ; i <= cardsQuantity ; i++) {
        let box;
        let boxIn;
        box = document.createElement("div");
        box.className = ("card card-style_" + style);
        box.id = ("card_" + i);
        boxIn = document.createElement("div");
        boxIn.className = ("card-inner");
        boxInSpan = document.createElement("span");
        boxInSpan.className = ("card-inner-span");
        boxInSpan.innerHTML = (Pairs[i-1]);
        
        boxInSpanStart = document.createElement("span");
        boxInSpanStart.className = ("card-inner-span-site");
        boxInSpanStart.innerHTML = ("|");
        boxInSpanEnd = document.createElement("span");
        boxInSpanEnd.className = ("card-inner-span-site");
        boxInSpanEnd.innerHTML = ("|");
        
        box.addEventListener("click", cardClick);
        boxIn.appendChild(boxInSpanStart);
        boxIn.appendChild(boxInSpan); 
        boxIn.appendChild(boxInSpanEnd);  
        box.appendChild(boxIn);        
        document.getElementById("content_inner").appendChild(box);
    }
    document.getElementById("result").innerHTML="0";
    document.getElementById("play-time").innerHTML="0";

    
}
function startTimer(){

if(document.getElementsByClassName("card").length < 1) {


} else {

let t = document.getElementById("play-time").innerHTML;
let tt = parseFloat(t) + 1;
document.getElementById("play-time").innerHTML = tt;

let p = document.getElementById("result").innerHTML;
if(parseFloat(p) != 0) {
let spp = tt/parseFloat(p);

document.getElementById("sec-per-pair").innerHTML = spp.toFixed(2);

}

}

}
const intervalId = setInterval(startTimer, 1000);

$(document).ready(function() {
    $("button").on("click", function() {
        GameArea();
    }
    );
    }

);

function cardClick() {
    let style = document.getElementById("style").value;
    let shown = document.getElementsByClassName("card-rotate_show");
    let shownL = shown.length;
 
    if(shownL == 2) {
        for (let i = 0 ; i < shownL ; i++) {
            let shownCard = shown[0];
            let shownCardId = shownCard.id;
            document.getElementById(shownCardId).className = ("card card-style_" + style + " card-rotate_hide" );
        }
    }

    let getClass = this.className;
    if(getClass.includes("card-rotate_show") == true) {
        let getClass2 = getClass.replace('card-rotate_show','');
        this.className = (getClass2 + " card-rotate_hide");
        this.getElementsByClassName("card-inner-span")[0].style.fontSize= "1px";
        
    } else if (getClass.includes("card-rotate_hide") == true) {
        let getClass2 = getClass.replace(' card-rotate_hide','');
        this.className = (getClass2 + " card-rotate_show");
        this.getElementsByClassName("card-inner-span")[0].style.fontSize= "20px";
    } else {
        let getClass2 = getClass.replace(' card-rotate_show','');
        this.className = (getClass2 + " card-rotate_show");
        this.getElementsByClassName("card-inner-span")[0].style.fontSize= "20px";
    }
    
    let shown2 = document.getElementsByClassName("card-rotate_show"); 
    let shownL2 = shown.length;
    if(shownL2 == 2) {
        if (shown2[0].innerHTML == shown2[1].innerHTML) {
         let divId1 = shown2[0].id;
         let divId2 = shown2[1].id;
         
         
         this.addEventListener("animationend", (event) => { 
         document.getElementById(divId1).style.visibility = "hidden";
         document.getElementById(divId1).className = ("card-place");
         document.getElementById(divId2).style.visibility = "hidden";
         document.getElementById(divId2).className = ("card-place");
         
         /* document.getElementById(divId1).remove();
         
         document.getElementById(divId2).remove();*/
         
         
         
         
         
          if(document.getElementsByClassName("card").length == 0){
          
          
          
          clearInterval(interval);
          
          
          /*alert("no cards");*/}
         
         });
      
      let result = document.getElementById("result").innerHTML;  
      document.getElementById("result").innerHTML = parseFloat(result) + 1
    
    
       
    }
      
      
  
    }
    
    
    
}