QuickSettings.useExtStyleSheet()


new p5( function (p) {

  // This program demonstrates how to use the random() function to generate random numbers
  "use strict";
  // note that the hue value is injected into the params
  let params = {
    // seeds
    // seeds: 500,
    // seedsMin: 1,
    // seedsMax: 2000,

    // // angle (phi)
    // angle: 360 * (Math.sqrt(5)-1) / 2,
    // angleMax: 360,
    // angleStep: 0.1,

    // // radius of the seed
    // radius: 3,
    // radiusMin: 0.5,
    // radiusMax: 5,
    // radiusStep: 0.1,

    color1: "#0850f7",
    color2: "#FFFFFF",

    // // scale
    // zoom: 5,
    // zoomMax: 50,
    // zoomStep: 0.1,
    // opacity: 150,
    // opacityMax: 255,

    // noiseOctaves
    noiseOctaves: 8,
    noiseOctavesMin: 1,
    noiseOctavesMax: 10,
    noiseOctavesStep: 1,

    // noiseFalloff
    noiseFalloff: 0.72,
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
    xStepsize: 0.025,
    xStepsizeMin: 0.001,
    xStepsizeMax: 0.1,
    xStepsizeStep: 0.001,

    // yStepsize
    yStepsize: 0.025,
    yStepsizeMin: 0.001,
    yStepsizeMax: 0.1,
    yStepsizeStep: 0.001,


    // stepsize
    stepsize: 0.025,
    stepsizeMin: 0.001,
    stepsizeMax: 0.1,
    stepsizeStep: 0.001,


    // baseHue: color(255, 255, 255, 255),

  };

  let gui;
  let backgroundNoise;
  let prevStepsize;

  p.setup = function() {
    p.angleMode(p.DEGREES)
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
      // const seedColor = p.color(params.seedColor)
      // const rgbArray = colorToArray(seedColor)
      let xoff = params.xoff
      for(let x=0; x<p.width; x++){
        let yoff = params.yoff;
        for(let y=0; y<p.height; y++){
          const noise = p.noise(xoff, yoff);
          // https://beesbuzz.biz/code/16-hsv-color-transforms
          // hue = p.map(noise, 0, 1, 0, 360)  we are not going to mess with hue, but if we did, it's an angle of change, so we map from 0->360
          // const saturation = noise
          // value = 1  -- do not adjust the value.
          const newColor = p.lerpColor(p.color(params.color1), p.color(params.color2), noise)

          // const newRgbArray = scaleSaturation(seedColor.levels, saturation)

          this.colorPixel(x, y, newColor.levels)
          yoff+=params.yStepsize;
        }
        xoff+=params.xStepsize;
      }
      p.updatePixels()
    }

    colorPixel(x, y, rgbArray) {
      let d = p.pixelDensity();
      for (let i = 0; i < d; i++){
        for (let j = 0; j < d; j++) { // loop over
          let index = 4 * ((y * d + j) * p.width * d + (x * d + i));
          p.pixels[index] = rgbArray[0]; // r
          p.pixels[index+1] = rgbArray[1]; // g
          p.pixels[index+2] = rgbArray[2]; // b
          p.pixels[index+3] = 255; // a
        }
      }
    }

    run(){
      this.draw()
    }
  }

}, "sketch3");




// Abandoned work:

// /**
//  * Returns the lightness of an RGB color, which is the average of the highest and lowest values
//  * @param {p5.Color} color - The color to get the lightness of
//  * @returns {number} The lightness of the color
//  * @example
//  * getLightnessOfRGB('rgb(255, 255, 255)') // returns 1
//  * getLightnessOfRGB('rgb(0, 0, 0)') // returns 0
//  * getLightnessOfRGB('rgb(255, 0, 0)') // returns 0.5
//  * getLightnessOfRGB('rgb(255, 255, 0)') // returns 0.75
//  * getLightnessOfRGB('rgb(255, 127, 0)') // returns 0.625
//  *  */
// function getLightnessOfRGB(color) {
//   const rgbString = color.toString();  // "rgb(255, 127, 0, 255)"

//   // regex to group the numbers, parse them into integers, and store in an array
//   const rgbIntArray = rgbString.match(/\d+/g).map(e => parseInt(e)); // [255, 127, 0, 255]
  
//   // Get the highest and lowest out of red green and blue
//   const highest = Math.max(...rgbIntArray);
//   const lowest = Math.min(...rgbIntArray);

//   // Return the average divided by 255
//   return (highest + lowest) / 2 / 255;
// }


// /**
//  * Returns a more or less saturated color of the same hue as the input color, without using HSV
//  * @param {Array} rgbArray - An array of the RGB values of the color
//  * @returns {String} The new RGB string
//  * */
// function changeSaturationOfRGB(color) {
//   const lightness = getLightnessOfRGB(rgbArray);

//   const rgbString = color.toString();  // "rgb(255, 127, 0, 255)"

//   // regex to group the numbers, parse them into integers, and store in an array
//   const rgbIntArray = rgbString.match(/\d+/g).map(e => parseInt(e)); // [255, 127, 0, 255]
  
//   const saturation = 1 - lightness;
//   const newSaturation = saturation * 0.5;
//   const newLightness = lightness + newSaturation;
//   const newRGBArray = rgbArray.map(e => Math.round(e * newLightness / lightness));
//   return `rgb(${newRGBArray.join(', ')})`;
// }