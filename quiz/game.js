console.log("game.js");

const question = document.getElementById("question");

const choices = Array.from(document.getElementsByClassName("choice-text"));

console.log(question);
console.log(choices);

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1,
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'abc.js'?",
    choice1: "<script href='abc.js'>",
    choice2: "<script name='abc.js'>",
    choice3: "<script src='abc.js'>",
    choice4: "<script file='abc.js'>",
    answer: 3,
  },
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame0 = () => {
  console.log("Game started");
};

startGame0();

function startGame() {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  console.log(availableQuestions);
}

function getNextQuestion() {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    return window.location.assign("end.html");
  }

  questionCounter++;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];

  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;

  //   console.log(currentQuestion);
}

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

    getNextQuestion();
  });
});

startGame();

getNextQuestion();
