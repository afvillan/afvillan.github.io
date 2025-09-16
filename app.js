var pics = [
  "images/cat01.jpg",
  "images/cat02.jpg",
  "images/cat03.jpg",
  "images/cat04.webp",
  "images/cat05.jpeg",
];

var indexImage = 1;
var btn = document.querySelector("button");
var image = document.querySelector("img");

// var clickSound = document.querySelector("audio");

var snd = new Audio("sounds/click_short.wav");

btn.addEventListener("click", function () {
  // clickSound.play();

  snd.play();

  indexImage = indexImage % pics.length;

  //console.log(pics[indexImage]);
  image.src = pics[indexImage];
  indexImage++;
});
