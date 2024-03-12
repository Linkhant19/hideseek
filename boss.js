window.onload = function() {
    document.getElementById("death").addEventListener("click", function() {
        selectBoss('death');
    });
}

function selectBoss(bossKey) {
    localStorage.setItem('Seeker', bossKey);
    window.location.href = "selection.html";
}


