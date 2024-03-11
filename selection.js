window.onload = function() {
    document.getElementById("motherChick").addEventListener("click", loadMotherChick);
    document.getElementById("golem").addEventListener("click", loadGolem);
}

function loadMotherChick() {
    window.location.href = "index.html?deck=motherChick";
}

function loadGolem() {
    window.location.href = "index.html?deck=golem";
}