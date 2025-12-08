let bursts = [];
const NUM_BURSTS = 40;
const CANVAS_W = 800;
const CANVAS_H = 600;

function setup() {
  createCanvas(CANVAS_W, CANVAS_H);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
  background(0, 0, 15);

  for (let i = 0; i < NUM_BURSTS; i++) {
    const x = random(width);
    const y = random(height);
    const radius = random(20, 60);

    const hueVal = random(0, 360);
    const targetCol = color(hueVal, random(70, 100), random(80, 100), 100);

    bursts.push(new ColorBurst(x, y, radius, targetCol));
  }
}

function draw() {
  fill(0, 0, 15, 15);
  rect(0, 0, width, height);

  const mousePos = createVector(mouseX, mouseY);

  for (let b of bursts) {
    b.update(mousePos);
    b.display();
  }

  drawInstructions();
}

function drawInstructions() {
  push();
  textAlign(LEFT, TOP);
  textSize(14);
  fill(0, 0, 90);
  text("Move the mouse to wake bursts. Click a burst to change it.", 20, 20);
  pop();
}

class ColorBurst {
  constructor(x, y, baseRadius, targetColor) {
    this.pos = createVector(x, y);
    this.baseRadius = baseRadius;
    this.targetColor = targetColor;

    this.activation = 0;
    this.activationSpeed = 0.04;
    this.deactivationSpeed = 0.01;
    this.activationRadius = baseRadius * 2.5;

    this.pulseAmount = random(5, 20);
    this.noiseOffset = random(1000);
    this.wiggleStrength = random(0.3, 1.2);

    this.isHovered = false;
    this.currentPos = this.pos.copy();
    this.currentRadius = this.baseRadius;

    this.driftVel = p5.Vector.random2D().mult(random(0.1, 0.4));
    this.wasPressed = false;
  }

  update(mousePos) {
    this.pos.add(this.driftVel);

    if (this.pos.x < -50) this.pos.x = width + 50;
    if (this.pos.x > width + 50) this.pos.x = -50;
    if (this.pos.y < -50) this.pos.y = height + 50;
    if (this.pos.y > height + 50) this.pos.y = -50;

    const d = p5.Vector.dist(this.pos, mousePos);
    this.isHovered = d < this.activationRadius;

    if (this.isHovered) {
      this.activation += this.activationSpeed;
    } else {
      this.activation -= this.deactivationSpeed;
    }
    this.activation = constrain(this.activation, 0, 1);

    const t = frameCount * 0.01 + this.noiseOffset;
    const wiggleX = (noise(t) - 0.5) * this.wiggleStrength * this.activation * 10;
    const wiggleY = (noise(t + 100) - 0.5) * this.wiggleStrength * this.activation * 10;
    this.currentPos = p5.Vector.add(this.pos, createVector(wiggleX, wiggleY));

    const pulse =
      sin(frameCount * 0.05 + this.noiseOffset) *
      this.pulseAmount *
      this.activation;
    this.currentRadius = this.baseRadius + pulse;

    if (mouseIsPressed && this.isHovered && !this.wasPressed) {
      const hueVal = random(0, 360);
      this.targetColor = color(hueVal, random(70, 100), random(80, 100), 100);
      this.baseRadius = random(20, 70);
      this.activationRadius = this.baseRadius * 2.5;
      this.pulseAmount = random(5, 25);
    }
    this.wasPressed = mouseIsPressed;
  }

  display() {
    push();

    const grayBase = color(0, 0, 40);
    const c = lerpColor(grayBase, this.targetColor, this.activation);

    const glowRadius = this.currentRadius * 1.9;
    for (let i = 4; i >= 1; i--) {
      const alpha = map(i, 4, 1, 3, 40) * this.activation;
      fill(hue(c), saturation(c), brightness(c), alpha);
      ellipse(this.currentPos.x, this.currentPos.y, glowRadius * i);
    }

    fill(hue(c), saturation(c), brightness(c), 100);
    ellipse(this.currentPos.x, this.currentPos.y, this.currentRadius);

    if (this.isHovered && this.activation > 0.3) {
      for (let i = 0; i < 6; i++) {
        const angle = random(TWO_PI);
        const distFromCenter = random(this.currentRadius * 0.4, this.currentRadius * 0.9);
        const sx = this.currentPos.x + cos(angle) * distFromCenter;
        const sy = this.currentPos.y + sin(angle) * distFromCenter;
        fill(hue(c), saturation(c), 100, 90);
        ellipse(sx, sy, random(3, 6));
      }
    }

    if (this.isHovered) {
      stroke(0, 0, 100);
      strokeWeight(1);
      noFill();
      ellipse(
        this.currentPos.x,
        this.currentPos.y,
        this.activationRadius * 0.25
      );
    }

    pop();
  }
}
