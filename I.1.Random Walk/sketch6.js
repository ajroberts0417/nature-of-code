
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
    // A walker that moves with step size determined by perlin noise
    constructor() {
      // Initialize the walker to the center of the canvas
      this.x = p.width/2;
      this.y = p.height/2;
      // set an xOffset and yOffset for the noise function
      this.xOff = 0;
      this.yOff = 10000;
    }
  
    display() {
      p.stroke(0); // set the color used to draw lines to black
      p.point(this.x, this.y); // draw a point at the walker's current position each frame.
    }
  
    step() {
      let stepx = p.noise(this.xOff)
      let stepy = p.noise(this.yOff)
      
      // remap the perlin noise to a -1 -> 1 range
      this.x += p.map(stepx, 0, 1, -1, 1);
      this.y += p.map(stepy, 0, 1, -1, 1);

      this.xOff += 0.005
      this.yOff += 0.005
    }

    checkEdges() {
      if(this.x < 0){
        this.x = p.width
      }
      else if (this.x > p.width) {
        this.x = 0
      }
      if(this.y < 0) {
        this.y = p.height
      }
      else if(this.y > p.height){
        this.y = 0
      }
    }
  
    run() {
      // Run the walker
      this.step();
      this.checkEdges();
      this.display();
    }
  }
}, "sketch6");
