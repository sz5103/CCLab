limeX, slimeY;
let slimeSize = 180;
let ySpeed = 0;
let excited = false;

let slimeColor;

let canvas = createCanvas(800, 500);
canvas.parent("p5-canvas-container");
slimeX = width / 2;
slimeY = height - slimeSize / 2;
slimeColor = color(100, 240, 120);


function draw() {
  drawBackground();
  updateSlime();
  drawSlime();
}

function drawBackground() {
  for (let y = 0; y < height; y++) {
    let c = lerpColor(color(150, 200, 255), color(220, 255, 255), y / height);
    stroke(c);
    line(0, y, width, y);
  }


  noStroke();
  fill(100, 220, 255, 80);
  ellipse(width / 2, height * 1.2, 900, 400);


  noFill();
  stroke(100, 180, 255, 80);
  for (let i = 0; i < 5; i++) {
    beginShape();
    for (let x = 0; x <= width; x += 10) {
      let y = height * 0.75 + sin((x * 0.02) + frameCount * 0.03 + i) * (5 + i * 2);
      vertex(x, y);
    }
    endShape();
  }


  noStroke();
  for (let i = 0; i < 30; i++) {
    let x = (i * 30 + frameCount * 0.5) % width;
    let y = (sin(frameCount * 0.02 + i) * 10 + height * 0.7) - i * 5;
    fill(200, 240, 255, 100);
    ellipse(x, y, 6, 6);
  }
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
  noStroke();
  for (let i = 10; i > 0; i--) {
    let alpha = map(i, 10, 0, 30, 0);
    fill(red(slimeColor), green(slimeColor), blue(slimeColor), alpha);
    ellipse(slimeX, slimeY, slimeSize + i * 8, slimeSize * 0.8 + i * 6);
  }


  fill(slimeColor);
  noStroke();
  ellipse(slimeX, slimeY, slimeSize, slimeSize * 0.8);


  if (excited) {
    for (let i = 0; i < 5; i++) {
      let shimmerX = slimeX + random(-slimeSize / 3, slimeSize / 3);
      let shimmerY = slimeY + random(-slimeSize / 3, slimeSize / 3);
      fill(255, 255, 255, 40);
      ellipse(shimmerX, shimmerY, random(5, 10));
    }
  }


  fill(255);
  ellipse(slimeX - slimeSize * 0.15, slimeY - slimeSize * 0.1, slimeSize * 0.15);
  ellipse(slimeX + slimeSize * 0.15, slimeY - slimeSize * 0.1, slimeSize * 0.15);

  fill(40);
  let eyeOffset = (mouseX - slimeX) / 50;
  eyeOffset = constrain(eyeOffset, -5, 5);
  ellipse(slimeX - slimeSize * 0.15 + eyeOffset, slimeY - slimeSize * 0.1, slimeSize * 0.07);
  ellipse(slimeX + slimeSize * 0.15 + eyeOffset, slimeY - slimeSize * 0.1, slimeSize * 0.07);


  for (let i = 0; i < 10; i++) {
    let angle = random(TWO_PI);
    let radius = random(slimeSize * 0.5, slimeSize * 0.8);
    let x = slimeX + cos(angle) * radius;
    let y = slimeY + sin(angle) * radius;
    fill(255, 255, 255, 50);
    ellipse(x, y, 4, 4);
  }
}

function mousePressed() {
  let d = dist(mouseX, mouseY, slimeX, slimeY);
  if (d < slimeSize / 2) {
    ySpeed = -12;


    let r = random(50, 255);
    let g = random(50, 255);
    let b = random(50, 255);
    slimeColor = color(r, g, b);
  }
}