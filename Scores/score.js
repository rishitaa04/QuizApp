const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");

// Retrieve the score stored in localStorage by game.js
const mostRecentScore = localStorage.getItem("mostRecentScore");

// Display score
finalScore.innerText = mostRecentScore;

// Enable save button only when username is typed
username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
});

// Save Score Function
saveScoreBtn.addEventListener("click", () => {
    const scoreEntry = {
        name: username.value,
        score: mostRecentScore
    };

    // Read existing scores OR create empty list
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    // Add new score
    highScores.push(scoreEntry);

    // Sort scores (high to low)
    highScores.sort((a, b) => b.score - a.score);

    // Keep only top 10
    highScores.splice(10);

    // Save back to localStorage
    localStorage.setItem("highScores", JSON.stringify(highScores));

    // Redirect back to game or home
    window.location.assign("../Home.html");
});
