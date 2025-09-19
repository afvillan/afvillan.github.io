const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

console.log("highScores:", highScores);

highScores.forEach((score) => {
  console.log(`<li class="high-score">${score.name}--${score.score}</li>`);
});

var a = highScores.map((score) => {
  return `<li class="high-score">${score.name}  -  ${score.score}</li>`;
});

console.log(a);

var highScoresLi = highScores
  .map((score) => {
    return `<li class="high-score">${score.name}  -  ${score.score}</li>`;
  })
  .join("\n");

console.log(highScoresLi);

// highScoresList.innerText = highScoresLi;
highScoresList.innerHTML = highScoresLi;
