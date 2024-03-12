window.onload = function() {
    document.getElementById("golem").addEventListener("click", loadGolem);
    document.getElementById("dreamDamsel").addEventListener("click", loadDreamDamsel);
    document.getElementById("sight").addEventListener("click", loadSight);
}

function loadDreamDamsel() {
    window.location.href = "index.html?deck=dreamDamsel";
}

function loadGolem() {
    window.location.href = "index.html?deck=golem";
}

function loadSight() {
    window.location.href = "index.html?deck=sight";
}