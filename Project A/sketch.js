let slimeX, slimeY;
let slimeSize = 180;
let ySpeed = 0;
let excited = false;

let slimeColor;

let particleX = -100;
let particleY = -100;
let particleVX = 0;
let particleVY = 0;
let particleLife = 0;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  slimeX = width / 2;
  slimeY = height - slimeSize / 2;

  slimeColor = color(100, 240, 120);
}

function draw() {
  drawBackground();
  updateSlime();
  drawSlime();
  updateParticle();
}

function drawBackground() {
  for (let y = 0; y < height; y++) {
    let c = lerpColor(color(180, 220, 255), color(240, 255, 255), y / height);
    stroke(c);
    line(0, y, width, y);
  }
  noStroke();
  fill(100, 220, 255, 80);
  ellipse(width / 2, height * 1.2, 800, 300);
}

function updateSlime() {
  let d = dist(mouseX, mouseY, slimeX, slimeY);
  excited = d < 150;

  ySpeed = ySpeed + 0.6;
  slimeY = slimeY + ySpeed;

  if (slimeY > height - slimeSize / 2) {
    slimeY = height - slimeSize / 2;
    ySpeed = 0;
  }
}

function drawSlime() {
  fill(slimeColor);
  noStroke();
  ellipse(slimeX, slimeY, slimeSize, slimeSize * 0.8);

  fill(255);
  ellipse(slimeX - slimeSize * 0.15, slimeY - slimeSize * 0.1, slimeSize * 0.15);
  ellipse(slimeX + slimeSize * 0.15, slimeY - slimeSize * 0.1, slimeSize * 0.15);

  fill(40);
  let eyeOffset = (mouseX - slimeX) / 50;
  if (eyeOffset > 5) eyeOffset = 5;
  if (eyeOffset < -5) eyeOffset = -5;
  ellipse(slimeX - slimeSize * 0.15 + eyeOffset, slimeY - slimeSize * 0.1, slimeSize * 0.07);
  ellipse(slimeX + slimeSize * 0.15 + eyeOffset, slimeY - slimeSize * 0.1, slimeSize * 0.07);
}

// create several small particles using a simple for loop
function makeParticle(x, y) {
  for (let i = 0; i < 6; i++) { // makes 6 particles each time
    particleX = x;
    particleY = y;
    particleVX = random(-3, 3);
    particleVY = random(-6, -3);
    particleLife = 100;

    // draw each one slightly offset for a "burst" look
    noStroke();
    fill(120, 220, 120);
    ellipse(particleX + particleVX * 4, particleY + particleVY * 4, 10);
  }
}

function updateParticle() {
  if (particleLife > 0) {
    particleX = particleX + particleVX;
    particleY = particleY + particleVY;
    particleVY = particleVY + 0.2;
    particleLife = particleLife - 1;

    noStroke();
    fill(120, 220, 120);
    ellipse(particleX, particleY, 10);
  }
}

function mousePressed() {
  let d = dist(mouseX, mouseY, slimeX, slimeY);
  if (d < slimeSize / 2) {
    ySpeed = -12;
    makeParticle(slimeX, slimeY);

    // change color when clicked
    let r = random(50, 255);
    let g = random(50, 255);
    let b = random(50, 255);
    slimeColor = color(r, g, b);
  }
}
