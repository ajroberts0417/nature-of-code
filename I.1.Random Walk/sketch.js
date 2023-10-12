
// launch p5 in instance mode
new p5( function (p) {

  let walker;
  "use strict";

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
      // Randomly move the walker in one of the four cardinal directions
      let choice = p.random([0, 1, 2, 3]);
      if (choice == 0) {
        this.x++;
      }
      if (choice == 1) {
        this.x--;
      }
      if (choice == 2) {
        this.y++;
      }
      if (choice == 3) {
        this.y--;
      }
    }
  
    run() {
      // Run the walker
      this.step();
      this.display();
    }
  }
}, "sketch1");
