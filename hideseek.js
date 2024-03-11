var seekerSeek = false;
var hiderReveal = false; //if Seek and Reveal gets played in the same turn, hider loses a life. 

var hidden;
var seekerdeck;
var hiderdeck;
var truedeck;
var hiderCard;
var turnsLeft;

var hideTurns = 2;
var canHide = true;

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const deck = urlParams.get('deck'); 
    truedeck = deck;
    //this is how we get info from selection page.

    buildSeekerDeck();
    buildHiderDeck(deck);
    shuffleDeck(seekerdeck)
    shuffleDeck(hiderdeck)
    turnsLeft = 10;
    startGame();
    document.getElementById("restart").addEventListener("click", restartGame);
}

function restartGame() {
    buildSeekerDeck();
    buildHiderDeck(truedeck);
    shuffleDeck(seekerdeck);
    shuffleDeck(hiderdeck);
    turnsLeft = 10;
    hideTurns = 2;
    canHide = true;
    document.getElementById("stand").disabled = false;
    document.getElementById("hide").disabled = false;
    document.getElementById("results").innerText = "";
    document.getElementById("seeker-card").innerText = "";
    document.getElementById("hider-card").innerText = "";
    startGame();
}

function buildSeekerDeck() {
    seekerdeck = ["Seek", "Seek", "Nothing", "Nothing", "Nothing"];
}

function buildHiderDeck(deck) {
    if (deck=="motherChick"){
        hiderdeck = ["It's raining CHICKS!", 
        "It's raining CHICKS!", 
        "It's raining CHICKS!", 
        "normal", "normal", "normal"];
    }
    else {
        hiderdeck = ["Nothing", "Shield", "Nothing"];
    }
}

function shuffleDeck(deck) {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length); 
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}

function startGame() {
    console.log("turnsLeft: ", turnsLeft);
    console.log(turnsLeft <= 0);
    
    document.getElementById("turns").innerText = turnsLeft;
    if (hideTurns <= 0) {
        canHide = false;
    }

    hidden = seekerdeck.pop();
    buildSeekerDeck();
    shuffleDeck(seekerdeck);

    if (hidden == "Seek") {
        seekerSeek = true;
    }
    else {
        seekerSeek = false;
    }
    console.log("Seeker drew", hidden)
    let cardImg = document.createElement("img");
    let card = hidden;
    cardImg.src = "./cards/" + card + ".png";

    document.getElementById("stand").addEventListener("click", stand);
    document.getElementById("hide").addEventListener("click", hide);

}

function endGame() {
    document.getElementById("stand").removeEventListener("click", stand);
    document.getElementById("hide").removeEventListener("click", hide);
}

function stand() {
    hideTurns = 2;
    canHide = true;
    hiderReveal = true;
    let cardImg = document.createElement("img");
    hiderCard = hiderdeck.pop();
    buildHiderDeck(truedeck);
    shuffleDeck(hiderdeck);

    cardImg.src = "./cards/" + hiderCard + ".png";
    document.getElementById("hidercard").src = "./cards/" + hiderCard + ".png";
    

    compare();
}

function hide() {
    if (!canHide) {
        message = "You can't hide for more than 2 consecutive turns, Coward!";
        document.getElementById("results").innerText = message;
        return
    }
    hideTurns = hideTurns - 1;
    hiderReveal = false;
    hiderCard = "Hide";

    compare();
}

function compare() {
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";
    document.getElementById("seeker-card").innerText = hidden;
    document.getElementById("hider-card").innerText = hiderCard;

    let message = "";
    console.log("seekerSeek", seekerSeek);
    console.log("hiderReveal", hiderReveal);
    if (seekerSeek && hiderReveal) {
        message = "Hider Lose!";
        document.getElementById("results").innerText = message;
        endGame();
    }
    else {
        turnsLeft = turnsLeft - 1;
        document.getElementById("turns").innerText = turnsLeft;
        if (turnsLeft <= 0) {
            message = "Turns Over! Hider Won!";
            document.getElementById("results").innerText = message;
            endGame();
        } else {
            message = "Hider played " + hiderCard;
            document.getElementById("results").innerText = message;
            
            startGame();
        }
    }
    
    
}








