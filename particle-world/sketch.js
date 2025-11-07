// CCLab Mini Project - 9.R Particle World: Fireflies

let NUM_OF_PARTICLES = 50; // initial number of fireflies
let MAX_OF_PARTICLES = 500;

let particles = [];

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  noStroke();

  // generate fireflies
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
}

function draw() {
  background(20, 20, 40, 100); // night sky tone

  // occasionally add new fireflies
  if (frameCount % 10 === 0 && particles.length < MAX_OF_PARTICLES) {
    particles.push(new Particle(random(width), random(height)));
  }

  // update and display each firefly
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.checkBounds();
    p.display();
  }

  // remove oldest particles if limit exceeded
  if (particles.length > MAX_OF_PARTICLES) {
    particles.splice(0, 1);
  }
}

// Particle Class: defines each firefly
class Particle {
  constructor(startX, startY) {
    // properties
    this.x = startX;
    this.y = startY;
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);
    this.dia = random(5, 10);
    this.glow = random(150, 255); // brightness
    this.glowChange = random(1, 3);
    this.color = color(random(200, 255), random(200, 255), 100, 200);
  }

  // update position and glow
  update() {
    this.x += this.vx;
    this.y += this.vy;

    // subtle random drift
    this.vx += random(-0.05, 0.05);
    this.vy += random(-0.05, 0.05);

    // firefly glow pulse
    this.glow += this.glowChange;
    if (this.glow > 255 || this.glow < 150) {
      this.glowChange *= -1;
    }
  }

  // keep particles inside canvas bounds
  checkBounds() {
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }

  // draw firefly
  display() {
    push();
    translate(this.x, this.y);
    fill(red(this.color), green(this.color), blue(this.color), this.glow);
    ellipse(0, 0, this.dia);
    pop();
  }
}
