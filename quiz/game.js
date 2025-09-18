console.log("game.js");

// We have 1 element with Id = 'question'
const question = document.getElementById("question");
// We have 4 element with class = 'Choice-Text'
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
  {
    question: "How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4,
  },
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

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
    //return window.location.assign("end.html");
    return;
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

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNextQuestion();
    }, 1000);
  });
});

startGame();

getNextQuestion();
