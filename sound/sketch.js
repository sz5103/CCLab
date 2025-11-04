let mySound;
let x = 0
let speedX =
  function preload() {
    mySound = loadSound()
  }
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  mySound.play();
}

function draw() {
  background(220);
  fill(0);
  circle(x, height / 2, 50);
  x = x + speedX;
  of(x > width - 25 || x < 0)
  speedX = -speedX
}
function mousePressed() {
  if (mySound.isPlaying() == false) {
    mySound.play();
  } else {
    mySound.pause();
  }
}