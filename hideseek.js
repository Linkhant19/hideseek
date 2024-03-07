var seekerSeek = false;
var hiderReveal = false; //if Seek and Reveal gets played in the same turn, hider loses a life. 

var hidden;
var seekerdeck;
var hiderdeck;
var hiderCard;

var hideTurns = 2;
var canHide = true;

window.onload = function() {
    buildSeekerDeck();
    buildHiderDeck();
    shuffleDeck(seekerdeck)
    shuffleDeck(hiderdeck)
    startGame();
}

function buildSeekerDeck() {
    seekerdeck = ["Seek", "Seek", "Nothing", "Nothing", "Nothing"]
}

function buildHiderDeck() {
    hiderdeck = ["Nothing", "Shield", "Nothing"]
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
    if (hideTurns <= 0) {
        canHide = false;
    }

    hidden = seekerdeck.pop();
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
    document.getElementById("hide").addEventListener("click", hide)

}

function stand() {
    hideTurns = 2;
    let cardImg = document.createElement("img");
    hiderCard = hiderdeck.pop();
    cardImg.src = "./cards/" + hiderCard + ".png";
    document.getElementById("hidercard").src = "./cards/" + hiderCard + ".png";
    hiderReveal = true;

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

    let message = "";
    if (seekerSeek && hiderReveal) {
        message = "Hider Lose!";
    }
    else {
        message = "Continue";
        startGame();
    }

    document.getElementById("seeker-card").innerText = hidden;
    document.getElementById("hider-card").innerText = hiderCard;
    document.getElementById("results").innerText = message;
}








