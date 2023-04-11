function changeBg() {
    let bg = document.getElementById("bg").value;
    let urlBg = "src/bg/" + bg + ".jpg";
    document.body.style.backgroundImage = ("url("+urlBg+")");
}

function changeStyle() {
    let style = document.getElementById("style").value;
    let cards = document.getElementsByClassName("card");
    let cardsQ = cards.length;
    for (let i = 0; i < cardsQ; i++) {
        for (let i2 = 1; i2 <= 3; i2++) {
         cards[i].classList.remove("card-style_" + i2);
        }
        cards[i].classList.add("card-style_" + style);
    }
    let shown = document.getElementsByClassName("card-rotate_show180");
    let shownL = shown.length;
    if(shownL >= 1) {
        for (let i = 0 ; i < shownL ; i++) {
            let shownCard = shown[0];
            let shownCardId = shownCard.id;
                document.getElementById(shownCardId).classList.remove("card-rotate_show180");
                document.getElementById(shownCardId).classList.add("card-rotate_hide90");
                hideCard(shownCardId);
        }
    }    
}

function GameArea() {
    let cardsQuantity = document.getElementById("cards_quantity").value;
    changeBg();
    if(cardsQuantity < 4 || cardsQuantity > 104 || cardsQuantity % 2 != 0) {
        alert("Only even numbers from 2 to 104 are allowed.");
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
    document.getElementById("sec-per-pair").innerHTML="-";
}
function startTimer(){
    let tt;
    if(document.getElementsByClassName("card").length >= 1) {
        let t = document.getElementById("play-time").innerHTML; 
        tt = parseFloat(t) + 1;
        document.getElementById("play-time").innerHTML = tt; 
    } else {
        tt = document.getElementById("play-time").innerHTML;
    }
    let p = document.getElementById("result").innerHTML;
    if(parseFloat(p) != 0) {
        let spp = tt/parseFloat(p);
        document.getElementById("sec-per-pair").innerHTML = spp.toFixed(2);
    }
}

const intervalId = setInterval(startTimer, 1000);

$(document).ready(function() {
    $("button").on("click", function() {
        GameArea();
    });
    $("#bg").on("change", function() {
        changeBg();
    });
    $("#style").on("change", function() {
        changeStyle();
    });
});

function cardClick() {
    let style = document.getElementById("style").value;
    let shown = document.getElementsByClassName("card-rotate_show180");
    let shownL = shown.length;
    let thisId = this.id;
    let shownTwo = false;
    if(shownL == 2) {
        let shownCard = shown[0];
        shownTwo = true;
        for (let i = 0 ; i < shownL ; i++) {
            let shownCardId = shownCard.id;
            if ( shownCardId != thisId ) {
                document.getElementById(shownCardId).classList.remove("card-rotate_show180");
                document.getElementById(shownCardId).classList.add("card-rotate_hide90");
                shownCard = shown[0];
                hideCard(shownCardId);
            } else {
                shownCard = shown[1];
            }
        }
    } else {
    shownTwo = false;
    }

    let getClass = this.className;
    if(getClass.includes("card-rotate_show180") == true && shownTwo == false) {
        this.classList.remove("card-rotate_show180");
        this.classList.add("card-rotate_hide90");
        hideCard(this.id);
    } else if (getClass.includes("card-rotate_show180") == true && shownTwo == true) {
    
    } else if (getClass.includes("card-rotate_hide180") == true) {
        this.classList.remove("card-rotate_hide180");
        this.classList.add("card-rotate_show90");
        showCard(this.id);
    } else {
        this.classList.add("card-rotate_show90");
        showCard(this.id);
    }
}
    
function showCard(cardId) {
    document.getElementById(cardId).addEventListener("animationend", (event) => {
 
        if(document.getElementById(cardId).className.includes("card-rotate_show90")) {

            if(document.getElementById(cardId).className.includes("card-style_3")) {
            document.getElementById(cardId).getElementsByClassName("card-inner-span")[0].style.color= "#000000";
            document.getElementById(cardId).getElementsByClassName("card-inner-span")[0].style.fontSize= "0px";
            document.getElementById(cardId).getElementsByClassName("card-inner")[0].style.backgroundColor = ("#ffffff");
            let cardno = document.getElementById(cardId).getElementsByClassName("card-inner-span")[0].innerText;
            document.getElementById(cardId).getElementsByClassName("card-inner")[0].style.backgroundImage = ("url('src/cards/3/" + cardno +".jpg')");
            } else {
            document.getElementById(cardId).getElementsByClassName("card-inner-span")[0].style.color= "#000000";
            document.getElementById(cardId).getElementsByClassName("card-inner-span")[0].style.fontSize= "40px";
            document.getElementById(cardId).getElementsByClassName("card-inner")[0].style.backgroundColor = ("#48FF73");
            }
            document.getElementById(cardId).classList.remove("card-rotate_show90");
            document.getElementById(cardId).classList.add("card-rotate_show180");
            checkPairs(cardId);
        }
    });
}

function hideCard(cardId) {
    document.getElementById(cardId).addEventListener("animationend", (event) => {
 
        if(document.getElementById(cardId).className.includes("card-rotate_hide90")) {
            document.getElementById(cardId).getElementsByClassName("card-inner-span")[0].style.color= "transparent";
            document.getElementById(cardId).getElementsByClassName("card-inner-span")[0].style.fontSize= "0px";
            document.getElementById(cardId).getElementsByClassName("card-inner")[0].style.backgroundColor = ("transparent");
            document.getElementById(cardId).getElementsByClassName("card-inner")[0].style.backgroundImage = "none";
            document.getElementById(cardId).classList.remove("card-rotate_hide90");
            document.getElementById(cardId).classList.add("card-rotate_hide180");
            checkPairs(cardId);
        }
    });
}


function checkPairs(cardId) {
    let shown2 = document.getElementsByClassName("card-rotate_show180");
    let shownL2 = shown2.length;

    if(shownL2 == 2) {
        if (shown2[0].getElementsByClassName("card-inner-span")[0].innerHTML == shown2[1].getElementsByClassName("card-inner-span")[0].innerHTML) {
        let divId1 = shown2[0].id;
        let divId2 = shown2[1].id;
            document.getElementById(cardId).addEventListener("animationend", (event) => {
            document.getElementById(divId1).style.visibility = "hidden";
            document.getElementById(divId1).className = ("card-place");
            document.getElementById(divId2).style.visibility = "hidden";
            document.getElementById(divId2).className = ("card-place");
            if(document.getElementsByClassName("card").length == 0){
               gameEnd();
            }
        });
        let result = document.getElementById("result").innerHTML;
        document.getElementById("result").innerHTML = parseFloat(result) + 1;
        }
    }
}

function gameEnd() {
    let vTime = document.getElementById("play-time").innerHTML;
    let vResult = document.getElementById("result").innerHTML;
    let vSPP = parseFloat(vTime)/parseFloat(vResult);
    let vCardsNumber = document.getElementById("cards_quantity").value;
    let vPairsNumber = parseFloat(vCardsNumber)/2;
    endBox = document.createElement("div");
    endBox.id = ("end-box");
    endBoxInner = document.createElement("div");
    endBoxInner.id = ("end-box-inner");
    endBox.addEventListener("click", closeEndBox);
    endBox.appendChild(endBoxInner);
    endBoxInnerHead = document.createElement("div");
    endBoxInnerHead.id = ("end-box-inner_head");
    endBoxInnerHead.innerText = ('You did it !');
    endBoxInner.appendChild(endBoxInnerHead);
    endBoxInnerBody = document.createElement("div");
    endBoxInnerBody.id = ("end-box-inner_body");
    endBoxInnerBody.innerText = ("Time: " + vTime + "s | Pairs: " + vResult + " | Cards: " + vCardsNumber + " | Seconds per pair: " + vSPP.toFixed(2));
    endBoxInner.appendChild(endBoxInnerBody);
    document.body.appendChild(endBox);
}

function closeEndBox() {
    document.getElementById("end-box").remove();
    GameArea();
}