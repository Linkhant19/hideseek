var seekerSeek = false; // true if Seek card gets played
var hiderReveal = false; // true while Hider not hiding
// if Seek and Reveal gets played in the same turn, hider loses a life. 

var hidden; // Seeker's hidden card. Not visible to Hider
var seekerdeck; 
var simpleseekerdeck; // 1 seek card, 9 nothing cards
var hiderdeck;
var truedeck;  // Hider Character Selection Deck
var trueSeeker; // Seeker Selection Deck
var hiderCard;  
var turnsLeft;  // Turns left to win
var health = 2;

var hideTurns = 2; // number of consecutive hide turns left
var canHide = true; // if hideTurns > 0, Hider canHide

var extraNormal = 0;

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const deck = urlParams.get('deck'); 
    truedeck = deck;
    //this is how we get info from selection page.
    const Seeker = localStorage.getItem('Seeker');
    trueSeeker = Seeker;

    buildSeekerDeck(trueSeeker);
    buildHiderDeck(truedeck);
    shuffleDeck(seekerdeck);
    shuffleDeck(hiderdeck);
    turnsLeft = 20;
    document.getElementById("health").innerText = 2;
    startGame();
    document.getElementById("restart").addEventListener("click", restartGame);
}

function restartGame() {
    buildSeekerDeck(trueSeeker);
    buildHiderDeck(truedeck);
    shuffleDeck(seekerdeck);
    shuffleDeck(hiderdeck);
    turnsLeft = 20;
    hideTurns = 2;
    health = 2;
    extraNormal = 0;
    canHide = true;
    document.getElementById("stand").disabled = false;
    document.getElementById("hide").disabled = false;
    document.getElementById("results").innerText = "";
    document.getElementById("seeker-card").innerText = "";
    document.getElementById("hider-card").innerText = "";
    document.getElementById("health").innerText = health;
    startGame();
}

function buildSeekerDeck(seeker) {
    if (seeker == "death") {
        seekerdeck = ["Seek", "Seek", "Seek", 
        "Normal", "Normal",
        "Death Mark", 
        "Die, Die, Die!", "Die, Die, Die!", 
        "Void", "Void", "Void"]
    } else {
        seekerdeck = ["Seek", "Seek", "Nothing", "Nothing", "Nothing"];
    }
}

function buildSimpleSeekerDeck() {
    seekerdeck = ["Seek", "Nothing", "Nothing", "Nothing", "Nothing", "Nothing", "Nothing", "Nothing", "Nothing", "Nothing"];
}

function buildHiderDeck(deck) {
    if (deck=="motherChick"){
        hiderdeck = ["It's raining CHICKS!", 
        "It's raining CHICKS!", 
        "It's raining CHICKS!", 
        "Normal", "Normal", "Normal"];
    } 
    else if (deck=="golem"){
        hiderdeck = ["Normal", "Normal", "Normal",
        "Healing Gem", "Healing Gem",
        "Slam!", "Slam!", "Slam!"]
    }
    else if (deck=="dreamDamsel"){
        hiderdeck = ["Daydream", "Daydream",
        "Nightmare", "Nightmare", "Nightmare",
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
    
    document.getElementById("turns").innerText = turnsLeft;
    if (hideTurns <= 0) {
        canHide = false;
    }

    if (extraNormal > 0) {
        for(let i = 0; i < extraNormal; i++) {
            seekerdeck.push("Normal");
        }
    }
    shuffleDeck(seekerdeck);

    console.log(seekerdeck);
    
    // part where Seeker chooses card
    hidden = seekerdeck.pop();
    buildSeekerDeck(trueSeeker);
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

    if (hiderCard == "Nightmare") {
        buildSimpleSeekerDeck();
    }

    if (hiderCard == "Daydream") { // Daydream needs to be fixed later to avoid other effects too. 
        hiderReveal = false;
    }

    if (hiderCard == "Healing Gem" && health < 2) {
        health = health + 1;
        document.getElementById("health").innerText = health;
    }

    if (hiderCard == "Slam!") {
        extraNormal = extraNormal + 1;
    }

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
        return;
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
    
    turnsLeft = turnsLeft - 1;
    document.getElementById("turns").innerText = turnsLeft;

    if (turnsLeft <= 0) {
        message = "Turns Over! Hider Won!";
        document.getElementById("results").innerText = message;
        endGame();
    } else if (seekerSeek && hiderReveal) {
        health = health - 1;
        document.getElementById("health").innerText = health;
        if (health <= 0) {
            message = "Hider Lose!";
            document.getElementById("results").innerText = message;
            endGame();
        }
    } else {
        message = "Hider played " + hiderCard;
        document.getElementById("results").innerText = message;
        
        startGame();
    }
}








