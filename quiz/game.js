console.log("game.js");

// We have 1 element with Id = 'question'
const question = document.getElementById("question");
// We have 4 element with class = 'Choice-Text'
const choices = Array.from(document.getElementsByClassName("choice-text"));

console.log(question);
console.log(choices);

// const questionCounterText = document.getElementById("questionCounter");
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");

const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// The questions are now in questions.json file
// let questions = [
//   {
//     question: "Inside which HTML element do we put the JavaScript?",
//     choice1: "<script>",
//     choice2: "<javascript>",
//     choice3: "<js>",
//     choice4: "<scripting>",
//     answer: 1,
//   },
//   {
//     question:
//       "What is the correct syntax for referring to an external script called 'abc.js'?",
//     choice1: "<script href='abc.js'>",
//     choice2: "<script name='abc.js'>",
//     choice3: "<script src='abc.js'>",
//     choice4: "<script file='abc.js'>",
//     answer: 3,
//   },
//   {
//     question: "How do you write 'Hello World' in an alert box?",
//     choice1: "msgBox('Hello World');",
//     choice2: "alertBox('Hello World');",
//     choice3: "msg('Hello World');",
//     choice4: "alert('Hello World');",
//     answer: 4,
//   },
// ];

let questions = [];

// fetch("questions.json")
fetch(
  // "https://opentdb.com/api.php?amount=40&category=17&difficulty=medium&type=multiple"
  // "https://opentdb.com/api.php?amount=40&category=9&difficulty=easy&type=multiple"
  "https://opentdb.com/api.php?amount=40&category=18&difficulty=easy&type=multiple"
)
  .then((res) => {
    console.log("fetch:", res);
    return res.json();
  })
  .then((loadedQuestions) => {
    console.log("loadedQuestions:", loadedQuestions.results);

    questions = loadedQuestions.results.map((loadedQuestion) => {
      const formattedQuestion = {
        question: loadedQuestion.question,
      };

      const answerChoices = [...loadedQuestion.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
      answerChoices.splice(
        formattedQuestion - 1,
        0,
        loadedQuestion.correct_answer
      );

      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index + 1)] = choice;
      });

      return formattedQuestion;
    });

    //questions = loadedQuestions;
    startGame();
    getNextQuestion();
  })
  .catch((err) => {
    console.log("ERROR:", err);
  });

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

// Another way to declare a function in javascript
// startGame0 = () => {
//   console.log("Game started");
// };
// startGame0();

//--------------------------------------------------------------------
// FUNCTION.   FUNCTION.   FUNCTION.   FUNCTION.   FUNCTION.   FUNCTION.
//--------------------------------------------------------------------
function startGame() {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  console.log(availableQuestions);
}
//--------------------------------------------------------------------

//--------------------------------------------------------------------
// FUNCTION.   FUNCTION.   FUNCTION.   FUNCTION.   FUNCTION.   FUNCTION.
//--------------------------------------------------------------------
function getNextQuestion() {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("end.html");
  }

  questionCounter++;

  // questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;
  // questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
  progressText.innerText = `Question: ${questionCounter}/${MAX_QUESTIONS}`;

  // Update de progress bar
  progressBarFull.style.width = `${100 * (questionCounter / MAX_QUESTIONS)}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];

  // question.innerText = currentQuestion.question;
  question.innerHTML = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    // choice.innerText = currentQuestion["choice" + number];
    choice.innerHTML = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;

  //   console.log(currentQuestion);
}
//--------------------------------------------------------------------

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    console.log(e.target);

    if (!acceptingAnswers) {
      return;
    }

    acceptingAnswers = false;

    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    console.log("selectedAnswer:", selectedAnswer);
    console.log("currentQuestion.answer:", currentQuestion.answer);
    console.log(selectedAnswer == currentQuestion.answer);

    // let classToApply = "incorrect";
    // if (selectedAnswer == currentQuestion.answer) {
    //   classToApply = "correct";
    // }

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    console.log("classToApply:", classToApply);

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNextQuestion();
    }, 1000);
  });
});

function incrementScore(num) {
  score += num;
  scoreText.innerText = score;
}

// Now we wait until the questions.json file is loaded.
//startGame();

// getNextQuestion();
