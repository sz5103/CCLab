// CCLab Mini Project - 9.R Particle World: Fireflies

let NUM_OF_PARTICLES = 50;
let MAX_OF_PARTICLES = 500;

let particles = [];

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  noStroke();


  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
}

function draw() {
  background(20, 20, 40, 100);


  if (frameCount % 10 === 0 && particles.length < MAX_OF_PARTICLES) {
    particles.push(new Particle(random(width), random(height)));
  }


  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.checkBounds();
    p.display();
  }


  if (particles.length > MAX_OF_PARTICLES) {
    particles.splice(0, 1);
  }
}


class Particle {
  constructor(startX, startY) {

    this.x = startX;
    this.y = startY;
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);
    this.dia = random(5, 10);
    this.glow = random(150, 255);
    this.glowChange = random(1, 3);
    this.color = color(random(200, 255), random(200, 255), 100, 200);
  }


  update() {
    this.x += this.vx;
    this.y += this.vy;


    this.vx += random(-0.05, 0.05);
    this.vy += random(-0.05, 0.05);


    this.glow += this.glowChange;
    if (this.glow > 255 || this.glow < 150) {
      this.glowChange *= -1;
    }
  }


  checkBounds() {
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }


  display() {
    push();
    translate(this.x, this.y);
    fill(red(this.color), green(this.color), blue(this.color), this.glow);
    ellipse(0, 0, this.dia);
    pop();
  }
}
