
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
      const stepsize = this.montecarlo()*10
      this.x += p.random(-stepsize, stepsize)
      this.y += p.random(-stepsize, stepsize)
    }

    montecarlo() {
      while(true) {

        const r1 = p.sqrt(p.random(1))
        const r2 = p.random(1)

        if(r1 >= r2){
          return r1
        }

      }
    }
  
    run() {
      // Run the walker
      this.step();
      this.display();
    }
  }
}, "sketch5");
