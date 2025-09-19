const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");

const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

finalScore.innerText = mostRecentScore;

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
console.log("highScores:", highScores);

username.addEventListener("keyup", () => {
  console.log("username:", username.value);
  saveScoreBtn.disabled = !username.value;
});

function saveHighScore(e) {
  console.log("clicked the save button!, with value: ", username.value);
  e.preventDefault();

  const score = {
    // score: mostRecentScore,
    score: Math.floor(Math.random() * 1000),
    name: username.value,
  };

  username.value = "";

  console.log(score);

  highScores.push(score);

  highScores.sort((a, b) => b.score - a.score);

  // At index 5 cutoff => keep the 5 higher.
  highScores.splice(5);

  localStorage.setItem("highScores", JSON.stringify(highScores));

  console.log("highScores:", highScores);

  return window.location.assign("quick-quiz.html");
}

// How to save an array in the localStore and get it back.
localStorage.setItem("myArray", JSON.stringify([1, 2, 3, 4, 5]));
console.log(JSON.parse(localStorage.getItem("myArray")));
