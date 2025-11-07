/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

/*
  Follow the GOAL & RULES at bottom.
  Fixed version: removes stray code, keeps class self-contained.
*/

let dancer;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);

  if (document.getElementById("p5-canvas-container")) {
    canvas.parent("p5-canvas-container");
  }


  dancer = new sydneyDancer(width / 2, height / 2);
}

function draw() {
  background(0);


  if (typeof drawFloor === "function") {
    drawFloor();
  }

  dancer.update();
  dancer.display();
}


class sydneyDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;


    this.angle = 0;
    this.size = 90;
    this.tentacleCount = 6;
    this.xOffset = 0;
    this.yOffset = 0;
  }

  update() {

    this.angle += 0.05;
    this.xOffset = sin(this.angle) * 25;
    this.yOffset = cos(this.angle * 2) * 10;
  }

  display() {
    push();
    translate(this.x + this.xOffset, this.y + this.yOffset);

    noStroke();
    fill(200, 200, 200);
    ellipse(0, 0, this.size, this.size);


    fill(0);
    ellipse(-15, -10 + sin(this.angle * 2) * 3, 12, 12);
    ellipse(15, -10 - sin(this.angle * 2) * 3, 12, 12);


    stroke(200, 200, 200);
    strokeWeight(8);
    noFill();
    for (let i = 0; i < this.tentacleCount; i++) {
      let a = (TWO_PI / this.tentacleCount) * i;
      let wiggle = sin(this.angle * 3 + a) * 15;


      let tx = cos(a) * (this.size / 2);
      let ty = sin(a) * (this.size / 2);


      let ex = tx + wiggle;
      let ey = ty + 30 + wiggle * 0.5;

      line(tx, ty, ex, ey);
    }


    this.drawReferenceShapes();

    pop();
  }

  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}

/*
GOAL & RULES unchanged
- Only code inside your class.
- Only update() and display() are called from outside.
- Constructor only gets (startX, startY).
- Keep dancer <= 200x200.
*/


// ⬆️ draw your dancer above ⬆️
// ******** //

// the next function draws a SQUARE and CROSS
// to indicate the approximate size and the center point
// of your dancer.
// it is using "this" because this function, too, 
// is a part if your Dancer object.
// comment it out or delete it eventually.
this.drawReferenceShapes()

pop();

drawReferenceShapes()
noFill();
stroke(255, 0, 0);
line(-5, 0, 5, 0);
line(0, -5, 0, 5);
stroke(255);
rect(-100, -100, 200, 200);
fill(255);
stroke(0);





/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/