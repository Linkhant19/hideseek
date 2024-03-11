window.onload = function() {
    document.getElementById("motherChick").addEventListener("click", loadMotherChick);
    document.getElementById("golem").addEventListener("click", loadGolem);
}

function loadMotherChick() {
    window.location.href = "index.html?deck=motherChick";
}

window.onload = function() {
    document.getElementById("dreamDamsel").addEventListener("click", loadNextPage);
}

function loadNextPage() {
    window.location.href = "index.html?deck=dreamDamsel";
}

function loadGolem() {
    window.location.href = "index.html?deck=golem";
}