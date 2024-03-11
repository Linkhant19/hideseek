window.onload = function() {
    document.getElementById("motherChick").addEventListener("click", loadNextPage);
    document.getElementById("dreamDamsel").addEventListener("click", loadDreamDamsel);
}

function loadNextPage() {
    window.location.href = "index.html?deck=motherChick";
}

function loadDreamDamsel() {
    window.location.href = "index.html?deck=dreamDamsel";
}