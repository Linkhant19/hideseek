var seekerSeek = false;
var hiderReveal = false; //if Seek and Reveal gets played in the same turn, hider loses a life. 

var hidden;
var seekerdeck;
var hiderdeck;

var canHide = true;

window.onload = function() {
    buildSeekerDeck();
    buildHiderDeck();
    shuffleDeck(seekerdeck)
    shuffleDeck(hiderdeck)
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



