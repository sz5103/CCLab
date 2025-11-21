

let bursts = [];
const NUM_BURSTS = 40;


function setup() {
  createCanvas(800, 600);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();




  for (let i = 0; i < NUM_BURSTS; i++) {
    let x = random(width);
    let y = random(height);
    let radius = random(20, 60);




    let hue = random(0, 360);
    let targetCol = color(hue, random(70, 100), random(80, 100), 100);


    bursts.push(new ColorBurst(x, y, radius, targetCol));
  }
}


function draw() {


  background(0, 0, 15);


  for (let b of bursts) {
    b.update(mouseX, mouseY);
    b.display();
  }


  drawInstructions();
}


function drawInstructions() {
  push();
  textAlign(LEFT, TOP);
  textSize(14);
  fill(0, 0, 80);
  text(
    20, 20
  );
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
  }


  update(mx, my) {


    let mousePos = createVector(mx, my);
    let d = p5.Vector.dist(this.pos, mousePos);


    this.isHovered = (d < this.activationRadius);


    if (this.isHovered) {
      this.activation += this.activationSpeed;
    } else {
      this.activation -= this.deactivationSpeed;
    }
    this.activation = constrain(this.activation, 0, 1);


    let t = frameCount * 0.01 + this.noiseOffset;
    let wiggleX = (noise(t) - 0.5) * this.wiggleStrength * this.activation * 10;
    let wiggleY = (noise(t + 100) - 0.5) * this.wiggleStrength * this.activation * 10;
    this.currentPos = p5.Vector.add(this.pos, createVector(wiggleX, wiggleY));




    let pulse = sin(frameCount * 0.05 + this.noiseOffset) * this.pulseAmount * this.activation;
    this.currentRadius = this.baseRadius + pulse;
  }


  display() {
    push();




    let grayBase = color(0, 0, 40);



    let c = lerpColor(grayBase, this.targetColor, this.activation);


    let glowRadius = this.currentRadius * 1.8;
    for (let i = 3; i >= 1; i--) {
      let alpha = map(i, 3, 1, 5, 40) * this.activation;
      fill(hue(c), saturation(c), brightness(c), alpha);
      ellipse(this.currentPos.x, this.currentPos.y, glowRadius * i);
    }


    fill(hue(c), saturation(c), brightness(c), 100);
    ellipse(this.currentPos.x, this.currentPos.y, this.currentRadius);



    if (this.isHovered) {
      stroke(0, 0, 100);
      strokeWeight(1);
      noFill();
      ellipse(this.currentPos.x, this.currentPos.y, this.activationRadius * 0.2);
    }


    pop();
  }
}
