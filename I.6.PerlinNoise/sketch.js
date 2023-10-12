QuickSettings.useExtStyleSheet()


new p5( function (p) {

  // This program demonstrates how to use the random() function to generate random numbers
  "use strict";

  let params = {

    // noiseOctaves
    noiseOctaves: 4,
    noiseOctavesMin: 1,
    noiseOctavesMax: 10,
    noiseOctavesStep: 1,

    // noiseFalloff
    noiseFalloff: 0.5,
    noiseFalloffMin: 0,
    noiseFalloffMax: 1,
    noiseFalloffStep: 0.01,

    // xOff
    xoff: 0,
    xoffMin: 0,
    xoffMax: 100,
    xoffStep: 0.1,

    // yOff
    yoff: 0,
    yoffMin: 0,
    yoffMax: 100,
    yoffStep: 0.1,

    // xStepsize
    xStepsize: 0.01,
    xStepsizeMin: 0.001,
    xStepsizeMax: 0.1,
    xStepsizeStep: 0.001,

    // yStepsize
    yStepsize: 0.01,
    yStepsizeMin: 0.001,
    yStepsizeMax: 0.1,
    yStepsizeStep: 0.001,


    // stepsize
    stepsize: 0.01,
    stepsizeMin: 0.001,
    stepsizeMax: 0.1,
    stepsizeStep: 0.001,

  };

  let gui;
  let backgroundNoise;
  let prevStepsize;

  p.setup = function() {
    p.createCanvas(400, 400);
    p.background(255); // set the background to white
    p.frameRate(10);
    backgroundNoise = new BackgroundNoise()

    // create the GUI from a settings object
    gui = p.createGui(this);
    gui.addObject(params);
    gui.setPosition(0, 0)
    prevStepsize = params.stepsize;

    // only call draw when then gui is changed
    p.noLoop();
  }

  p.draw = function() {
    if (prevStepsize != params.stepsize) {
      gui.prototype.setValue('xStepsize', params.stepsize)
      gui.prototype.setValue('yStepsize', params.stepsize)
      prevStepsize = params.stepsize;
    }
    backgroundNoise.run()
  }

  class BackgroundNoise {
    constructor() {
    }

    draw() {
      p.loadPixels();
      p.noiseDetail(params.noiseOctaves, params.noiseFalloff)
      let xoff = params.xoff
      for(let x=0; x<p.width; x++){
        let yoff = params.yoff;
        for(let y=0; y<p.height; y++){
          const noise = p.noise(xoff, yoff);
          const brightness = p.map(noise, 0, 1, 0, 255);
          this.colorPixel(x, y, brightness)
          yoff+=params.yStepsize;
        }
        xoff+=params.xStepsize;
      }
      p.updatePixels()
    }

    colorPixel(x, y, brightness) {
      let d = p.pixelDensity();
      for (let i = 0; i < d; i++){
        for (let j = 0; j < d; j++) { // loop over
          let index = 4 * ((y * d + j) * p.width * d + (x * d + i));
          p.pixels[index] = brightness; // r
          p.pixels[index+1] = brightness; // g
          p.pixels[index+2] = brightness; // b
          p.pixels[index+3] = 255; // a
        }
      }
    }

    run(){
      this.draw()
    }
  }

}, "sketch1");
