window.onload = function() {
    document.getElementById("motherChick").addEventListener("click", loadNextPage);
}

function loadNextPage() {
    window.location.href = "index.html?deck=motherChick";
}