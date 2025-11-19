const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const scoreList = document.getElementById("scoreList");
const highestScoreText = document.getElementById("highestScore");

// Retrieve score sent from game.js
const mostRecentScore = localStorage.getItem("mostRecentScore");

// Display latest score
finalScore.innerText = mostRecentScore;

// Enable save button only when username is typed
username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
});

// Load scores on page load
function loadScores() {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    // Show highest score
    if (highScores.length > 0) {
        const highest = Math.max(...highScores.map(s => s.score));
        highestScoreText.innerText = highest;
    } else {
        highestScoreText.innerText = "No scores yet";
    }

    // Show list of scores
    scoreList.innerHTML = highScores
        .map(score => `<li>${score.name} - ${score.score}</li>`)
        .join("");
}

loadScores();

// Save Score
saveScoreBtn.addEventListener("click", () => {
    const scoreEntry = {
        name: username.value,
        score: mostRecentScore
    };

    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    // Add new score
    highScores.push(scoreEntry);

    // Sort high → low
    highScores.sort((a, b) => b.score - a.score);

    // Keep top 10
    highScores.splice(10);

    // Save back
    localStorage.setItem("highScores", JSON.stringify(highScores));

    username.value = "";
    saveScoreBtn.disabled = true;

    // Refresh the list
    loadScores();
});
