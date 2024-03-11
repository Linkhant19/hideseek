window.onload = function() {
    document.getElementById("motherChick").addEventListener("click", loadMotherChick);
    document.getElementById("golem").addEventListener("click", loadGolem);
    document.getElementById("dreamDamsel").addEventListener("click", loadDreamDamsel);
}

function loadMotherChick() {
    window.location.href = "index.html?deck=motherChick";
}

function loadDreamDamsel() {
    window.location.href = "index.html?deck=dreamDamsel";
}

function loadGolem() {
    window.location.href = "index.html?deck=golem";
}