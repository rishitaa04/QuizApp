// ------------------------------
// DOM Elements
// ------------------------------
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const scoreText = document.getElementById("score");
const questionCounterText = document.getElementById("questionCounter");

// ------------------------------
// Game State
// ------------------------------
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let questions = [];

// ------------------------------
// Load Questions from JSON
// ------------------------------
fetch("questions.json")
  .then((res) => res.json())
  .then((loadedQuestions) => {
    questions = loadedQuestions;
    startGame();
  })
  .catch((err) => console.error("Error loading JSON:", err));

// ------------------------------
// Game Start
// ------------------------------
startGame = () => {
  questionCounter = 0;
  score = 0;
  getNewQuestion();
};

// ------------------------------
// Load a New Question
// ------------------------------
getNewQuestion = () => {
  if (questions.length === 0) {
    // Save score temporarily
    localStorage.setItem("mostRecentScore", score);

    // Redirect to score page
    return window.location.assign("../Scores/score.html");
  }

  questionCounter++;
  questionCounterText.innerText = `${questionCounter}`;

  const questionIndex = Math.floor(Math.random() * questions.length);
  currentQuestion = questions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  // Remove used question
  questions.splice(questionIndex, 1);

  acceptingAnswers = true;
};

// ------------------------------
// Handle User Answer
// ------------------------------
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;

    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(10);
    }

    // Add coloring (correct/incorrect)
    selectedChoice.parentElement.classList.add(classToApply);

    // Reset after delay & load next question
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

// ------------------------------
// Score Handler
// ------------------------------
incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};
