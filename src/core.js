const intervalId = setInterval(startTimer, 1000);
const cardMinHeight = 55;
const cardMinWidth = 36;
const cardMaxHeight = 110*2;
const cardMaxWidth = 72*2;
var viewH = window.innerHeight;
var viewV = window.innerWidth;
var GlobTimeS = 0;
var GlobTimeM = 0;
var GlobResultP = 0;
var GlobSPP = 0;

$(document).ready(function() {
    $("button").on("click", function() {
        GameArea();
        showMenu();
    });
    $("#menu-button").on("click", showMenu );
    $("#bg").on("change", changeBg );
    $("#style").on("change", changeStyle );
    $("#cards_quantity").on("change", function() {
        GameArea();
        showMenu();
    });
    $("#close_menu").on("click", showMenu );
});

$(window).resize(function() {
    areaScaling();
});

function GameArea() {
    GlobTimeS = 0;
    GlobTimeM = 0;
    GlobResultP = 0;
    GlobSPP = 0;
    let cardsQuantity = document.getElementById("cards_quantity").value;
    cardsQuantity = cardsQuantity == "" ? 4 : cardsQuantity;
    changeBg();
    if ( cardsQuantity < 4 || cardsQuantity > 104 || cardsQuantity % 2 != 0 ) {
        alert("Only even numbers from 4 to 104 are allowed.");
        exit;
    }
    document.getElementById("content_inner").innerHTML="";
    let style = document.getElementById("style").value;
    const cardsPairs = [];
    for ( let i = 1; i <=2; i++ ) {
        for ( let i2 = 1; i2 <= (cardsQuantity/2); i2++ ) {
            cardsPairs.push(i2);
        }
    }
    let Pairs = cardsPairs.sort(() => Math.random() - 0.5);
    for ( let i = 1 ; i <= cardsQuantity ; i++ ) {
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
    areaScaling();
    document.getElementById("play-time-min").innerText = "00";
    document.getElementById("play-time-sec").innerText = "00";
    document.getElementById("result").innerText = "0";
    document.getElementById("sec-per-pair").innerHTML="-";
}

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
    if ( shownL >= 1 ) {
        for (let i = 0 ; i < shownL ; i++) {
            let shownCard = shown[0];
            let shownCardId = shownCard.id;
                document.getElementById(shownCardId).classList.remove("card-rotate_show180");
                document.getElementById(shownCardId).classList.add("card-rotate_hide90");
                hideCard(shownCardId);
        }
    }
}

function startTimer() {
    if ( document.getElementsByClassName("card").length >= 1 ) {
        if ( GlobTimeS < 59 ) {
            GlobTimeS++;
        } else {
            GlobTimeS = 0;
            GlobTimeM++;
        }
        let Tsec = GlobTimeS < 10 ? '0' + GlobTimeS : GlobTimeS;
        let Tmin = GlobTimeM < 10 ? '0' + GlobTimeM : GlobTimeM;
        document.getElementById("play-time-min").innerText = Tmin;
        document.getElementById("play-time-sec").innerText = Tsec;
    }
    if ( GlobResultP !== 0) {
        let spp = (( 60 * GlobTimeM) + GlobTimeS ) / GlobResultP;
        document.getElementById("result").innerText = GlobResultP;
        document.getElementById("sec-per-pair").innerText = spp.toFixed(2);
    }
}

function showMenu() {
    var box = document.getElementById("menu");
    var boxClass = box.className !== 'show' ? 'show' : 'hide';
    if ( boxClass === 'hide' || !boxClass || boxClass === "" ) {
        document.getElementById("menu").className = "hide";
        document.getElementById("shadow_box").remove();
        document.getElementById("menu-button").style.display = "inline-block";
    } else if(boxClass === 'show') {
        shadowBox = document.createElement("div");
        shadowBox.id = ("shadow_box");
        document.body.appendChild(shadowBox);
        document.getElementById("menu").className = "show";
        document.getElementById("menu-button").style.display = "none";
    }
}

function areaScaling() {
    if( !document.getElementById("end-box") ) {
        var cardWidth = cardMaxWidth;
        var cardHeight = cardMaxHeight;
        var cardGetWidth = document.getElementsByClassName("card")[0].style.width /*?? cardMaxWidth*/;
        var cardGetHeight = document.getElementsByClassName("card")[0].style.height /*?? cardMaxHeight*/;
        if( !cardGetWidth || !cardGetHeight || cardGetWidth == '' || cardGetHeight == '' ) {
            cardGetWidth = cardMaxWidth;
            cardGetHeight = cardMaxHeight;
            for ( let i = 0 ; i < document.getElementsByClassName("card").length ; i++ ) {
                document.getElementsByClassName("card")[i].style.width = (cardMaxWidth + "px");
                document.getElementsByClassName("card")[i].style.height = (cardMaxHeight + "px");
            }
            for ( let i = 0 ; i < document.getElementsByClassName("card-place").length ; i++ ) {
                document.getElementsByClassName("card-place")[i].style.width = (cardMaxWidth + "px");
                document.getElementsByClassName("card-place")[i].style.height = (cardMaxHeight + "px");
            }
        } else {
            cardGetWidth = parseFloat(cardGetWidth.replace("px",""));
            cardGetHeight = parseFloat(cardGetHeight.replace("px",""));
        }
        let resizeDone = false;
        while ( resizeDone != true ) {
            var contentHeight = document.body.scrollHeight;
            var windowHeight = document.body.clientHeight;
            if ( contentHeight <= windowHeight ) {
                if ( cardGetWidth == cardMaxWidth || cardGetHeight == cardMaxHeight ) {
                    resizeDone = true;
                } else if ( cardGetWidth > cardMaxWidth || cardGetHeight > cardMaxHeight ) {
                    for ( let i = 0 ; i < document.getElementsByClassName("card").length ; i++ ) {
                        document.getElementsByClassName("card")[i].style.width = (cardMaxWidth + "px");
                        document.getElementsByClassName("card")[i].style.height = (cardMaxHeight + "px");
                    }
                    for ( let i = 0 ; i < document.getElementsByClassName("card-place").length ; i++ ) {
                        document.getElementsByClassName("card-place")[i].style.width = (cardMaxWidth + "px");
                        document.getElementsByClassName("card-place")[i].style.height = (cardMaxHeight + "px");
                    }
                    resizeDone = true;
                } else if ( (cardGetWidth < cardMaxWidth || cardGetHeight < cardMaxHeight) && (document.body.clientHeight > viewH || document.body.clientWidth > viewV) ) {
                    for ( let i = 0 ; i < document.getElementsByClassName("card").length ; i++ ) {
                        document.getElementsByClassName("card")[i].style.width = (cardMaxWidth + "px");
                        document.getElementsByClassName("card")[i].style.height = (cardMaxHeight + "px");
                    }
                    for ( let i = 0 ; i < document.getElementsByClassName("card-place").length ; i++ ) {
                        document.getElementsByClassName("card-place")[i].style.width = (cardMaxWidth + "px");
                        document.getElementsByClassName("card-place")[i].style.height = (cardMaxHeight + "px");
                    }
                    resizeDone = true;
                    areaScaling();
               } else {
                   resizeDone = true;
               }
           } else if ( contentHeight > windowHeight ) {
               if( cardGetWidth <= cardMinWidth || cardGetHeight <= cardMinHeight ) {
                   cardWidth = cardMinWidth;
                   cardHeight = cardMinHeight;
                   resizeDone = true;
               } else {
                   cardWidth = cardWidth * 0.9;
                   cardHeight = cardHeight * 0.9;
               }
               for (let i = 0 ; i < document.getElementsByClassName("card").length ; i++) {
                   document.getElementsByClassName("card")[i].style.width = (cardWidth + "px");
                   document.getElementsByClassName("card")[i].style.height = (cardHeight + "px");
               }
               for (let i = 0 ; i < document.getElementsByClassName("card-place").length ; i++) {
                   document.getElementsByClassName("card-place")[i].style.width = (cardWidth + "px");
                   document.getElementsByClassName("card-place")[i].style.height = (cardHeight + "px");
               }
            }
        }
    }
    viewH = document.body.clientHeight;
    viewV = document.body.clientWidth;
    if ( viewV <= 610 ) {
        document.getElementById("play-time-label").innerText = " Time: ";
        document.getElementById("result-label").innerText = " Pairs: ";
        document.getElementById("sec-per-pair-label").innerText = " SPP: ";
    } else {
        document.getElementById("play-time-label").innerText = " Play time: ";
        document.getElementById("result-label").innerText = " Result(pairs): ";
        document.getElementById("sec-per-pair-label").innerText = " Seconds per pair: ";
    }
}

function cardClick() {
    let style = document.getElementById("style").value;
    let shown = document.getElementsByClassName("card-rotate_show180");
    let shownL = shown.length;
    let thisId = this.id;
    let shownTwo = false;
    if ( shownL == 2 ) {
        let shownCard = shown[0];
        shownTwo = true;
        for ( let i = 0 ; i < shownL ; i++ ) {
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
    } else if ( shownL > 2) {
        shownTwo = false;
        for ( let i = 0 ; i < shownL ; i++ ) {
            let shownCard = shown[0];
            let shownCardId = shownCard.id;
                document.getElementById(shownCardId).classList.remove("card-rotate_show180");
                document.getElementById(shownCardId).classList.add("card-rotate_hide90");
                hideCard(shownCardId);
        }
    } else {
        shownTwo = false;
    }
    let getClass = this.className;
    if ( getClass.includes("card-rotate_show180") == true && shownTwo == false ) {
        this.classList.remove("card-rotate_show90");
        this.classList.remove("card-rotate_show180");
        this.classList.remove("card-rotate_hide180");
        this.classList.add("card-rotate_hide90");
        hideCard(this.id);
    } else if ( getClass.includes("card-rotate_show180") == true && shownTwo == true ) {

    } else if ( getClass.includes("card-rotate_hide180") == true ) {
        this.classList.remove("card-rotate_hide180");
        this.classList.add("card-rotate_show90");
        showCard(this.id);
    } else {
        this.classList.remove("card-rotate_hide90");
        this.classList.remove("card-rotate_hide180");
        this.classList.remove("card-rotate_show180");
        this.classList.add("card-rotate_show90");
        showCard(this.id);
    }
}

function showCard(cardId) {
    document.getElementById(cardId).addEventListener("animationend", (event) => {
        if ( document.getElementById(cardId).className.includes("card-rotate_show90") ) {

            if ( document.getElementById(cardId).className.includes("card-style_3") ) {
            document.getElementById(cardId).getElementsByClassName("card-inner-span")[0].style.color= "#000000";
            document.getElementById(cardId).getElementsByClassName("card-inner-span")[0].style.fontSize= "0px";
            document.getElementById(cardId).getElementsByClassName("card-inner")[0].style.backgroundColor = ("#ffffff");
            let cardno = document.getElementById(cardId).getElementsByClassName("card-inner-span")[0].innerText;
            document.getElementById(cardId).getElementsByClassName("card-inner")[0].style.backgroundImage = ("url('src/cards/3/" + cardno +".jpg')");
            document.getElementById(cardId).getElementsByClassName("card-inner")[0].style.backgroundSize = ("100%");

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

function hideCard( cardId ) {
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

function checkPairs( cardId ) {
    let shown2 = document.getElementsByClassName("card-rotate_show180");
    let shownL2 = shown2.length;

    if ( shownL2 == 2 ) {
        if ( shown2[0].getElementsByClassName("card-inner-span")[0].innerHTML == shown2[1].getElementsByClassName("card-inner-span")[0].innerHTML ) {
        let divId1 = shown2[0].id;
        let divId2 = shown2[1].id;
            document.getElementById(cardId).addEventListener("animationend", (event) => {
            document.getElementById(divId1).style.visibility = "hidden";
            document.getElementById(divId1).className = ("card-place");
            document.getElementById(divId2).style.visibility = "hidden";
            document.getElementById(divId2).className = ("card-place");
            if ( document.getElementsByClassName("card").length == 0 ) {
               gameEnd();
            }
        });
        GlobResultP++;
        }
    }
}

function gameEnd() {
    let vSPP = (( 60 * GlobTimeM) + GlobTimeS ) / GlobResultP;
    let vCardsNumber = document.getElementById("cards_quantity").value;
    let vPairsNumber = parseFloat(vCardsNumber)/2;
    let Tsec = GlobTimeS < 10 ? '0' + GlobTimeS : GlobTimeS;
    let Tmin = GlobTimeM < 10 ? '0' + GlobTimeM : GlobTimeM;
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
    endBoxInnerBody.innerText = ("Time: " + Tmin + ":" + Tsec + " | Pairs: " + GlobResultP + " | Cards: " + vCardsNumber + " | Seconds per pair: " + vSPP.toFixed(2));
    endBoxInner.appendChild(endBoxInnerBody);
    document.body.appendChild(endBox);
}

function closeEndBox() {
    document.getElementById("end-box").remove();
    GameArea();
}