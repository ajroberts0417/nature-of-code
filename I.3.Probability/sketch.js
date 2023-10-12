
// launch p5 in instance mode
new p5( function (p) {

  let walker;
  "use strict";

  p.setup = function() {
    p.createCanvas(400, 400);
    splatter = new PaintSplatter(); // initialize the walker in setup
    p.background(255); // set the background to white
    p.noStroke()
  }

  p.draw = function() {
    splatter.run(); // run the walker each frame
  }


  class PaintSplatter {
    // A gaussian paint splatterer
    constructor() {
    }
  
    display() {
      this.changePaintColor()
      this.paint()
    }

    changePaintColor() {
      // generate a paint color along a gaussian distribution
      const red = p.constrain(p.randomGaussian(128, 50), 0, 255)
      const blue = p.constrain(p.randomGaussian(180, 40), 0, 255)
      const green = p.constrain(p.randomGaussian(10, 3), 0, 255)
      const alpha = p.constrain(p.randomGaussian(120, 30), 0, 255)
      p.fill(red, green, blue, alpha)
    }
  
    paint() {
      // generate a location to paint along a gaussian
      const stdDev = p.width/8
      const xLoc = p.randomGaussian(p.width/2, stdDev)
      const yLoc = p.randomGaussian(p.height/2, stdDev)
      const radius = p.randomGaussian(15, 3)
      p.ellipse(xLoc, yLoc, radius)
    }
  
    run() {
      // Run the painter
      this.display();
    }
  }
}, "sketch1");
