
// launch p5 in instance mode
new p5( function (p) {
  "use strict";
  let walker;

  p.setup = function() {
    p.createCanvas(400, 400);
    walker = new Walker(); // initialize the walker in setup
    p.background(255); // set the background to white
  }

  p.draw = function() {
    walker.run(); // run the walker each frame
  }


  class Walker {
    // A random walk renderer
    constructor() {
      // Initialize the walker to the center of the canvas
      this.x = p.width/2;
      this.y = p.height/2;
    }
  
    display() {
      p.stroke(0); // set the color used to draw lines to black
      p.point(this.x, this.y); // draw a point at the walker's current position each frame.
    }
  
    step() {
      const bias = p.random(0, 1); // generate a random number, we'll this to bias the walker toward our mouse

      let stepx;
      let stepy;

      const mouseInSketch = p.mouseX && p.mouseY && 0 <= p.mouseX && p.mouseX <= p.width && 0 <= p.mouseY && p.mouseY <= p.height
      if(bias < 0.5 && mouseInSketch ) {
        // move in the direction of the mouse
        // magnitude*sqrt(p.mouseX^2 + p.mouseY^2) = 1
        const distX = p.mouseX - this.x
        const distY = p.mouseY - this.y
        const unitMagnitude = 1/p.sqrt(p.pow(distX, 2) + p.pow(distY, 2))
        stepx = distX * unitMagnitude
        stepy = distY * unitMagnitude

        // you can do the above work more easily using p5.createVector()
        // let movementVector = p.createVector(distX, distY).normalize()
        // stepx = movementVector.x
        // stepy = movementVector.y
      }
      else {
        // move in a random direction
        stepx = p.random(-1, 1);
        stepy = p.random(-1, 1);
      }

      this.x += stepx;
      this.y += stepy;
    }
  
    run() {
      // Run the walker
      this.step();
      this.display();
    }
  }
}, "sketch3");
