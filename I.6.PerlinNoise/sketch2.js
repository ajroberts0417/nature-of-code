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

    seedColor: "#0850f7",

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
      const seedColor = p.color(params.seedColor)
      // const rgbArray = colorToArray(seedColor)
      let xoff = params.xoff
      for(let x=0; x<p.width; x++){
        let yoff = params.yoff;
        for(let y=0; y<p.height; y++){
          const noise = p.noise(xoff, yoff);
          // https://beesbuzz.biz/code/16-hsv-color-transforms
          // hue = p.map(noise, 0, 1, 0, 360)  we are not going to mess with hue, but if we did, it's an angle of change, so we map from 0->360
          const saturation = noise
          // value = 1  -- do not adjust the value.

          const newRgbArray = scaleSaturation(seedColor.levels, saturation)

          this.colorPixel(x, y, newRgbArray)
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

}, "sketch2");

/**
 * @param {Array} rgbArray - the RGB vector to be transformed to the target HSV color in RGB space
 * @param {Number} h - the target hue as an angle from 0 to 360
 * @param {Number} s - the target saturation from 0 to 1
 * @param {Number} v - the target value (brightness) from 0 to 1
 * @returns {Array} - the transformed RGB vector, still in RGBArray form.
 * 
 * This is an inefficient but illustrative version of the algorithm. You can read more here:
 * https://beesbuzz.biz/code/16-hsv-color-transforms
 */
function exampleTransformColorByHSV(rgbArray, h, s, v) {
  u = sin(h)
  w = cos(h)
  vsu = v*s*u
  vsw = v*s*w
  transformRGBtoYIQ = [[1, 1, 1], [0.956, -0.272, -1.107], [0.621, -0.647, 1.705]]
  result = MatrixProd(rgbArray, transformRGBtoYIQ)
  transformHSV = [[v, 0, 0],[0, vsu, vsw],[0, -vsw, vsu]]
  result = MatrixProd(result, transformHSV)
  transformYIQtoRGB = [[0.299, 0.596, 0.211], [0.587, -0.274, -0.523], [0.114, -0.321, 0.311]]
  result = MatrixProd(result, transformYIQtoRGB)
  return result
}

/**
 * @param {Array} rgbArray - the RGB vector to be transformed to the target HSV color in RGB space
 * @param {Number} h - the target hue as an angle of change from the starting hue (0 to 360)
 * @param {Number} s - the target saturation from 0 to 1
 * @param {Number} v - the target value (brightness) from 0 to 1
 * @returns {Array} - the transformed RGB vector, still in RGBArray form.
 * 
 * This is an efficient but more confusing version of the above algorithm. You can read more here:
 * https://beesbuzz.biz/code/16-hsv-color-transforms
 * Basically, we're just breaking out all the matrix multiplication in advance to simplify and reduce calculations.
 */
function transformColorByHSV(rgbArray, h, s, v) {
  vsu = v*s*cos(h);
  vsw = v*s*sin(h);
  newRed = (.299*v + .701*vsu + .168*vsw)*rgbArray[0]
  +   (.587*v - .587*vsu + .330*vsw)*rgbArray[1]
  +   (.114*v - .114*vsu - .497*vsw)*rgbArray[2];
  newGreen = (.299*v - .299*vsu - .328*vsw)*rgbArray[0]
      +   (.587*v + .413*vsu + .035*vsw)*rgbArray[1]
      +   (.114*v - .114*vsu + .292*vsw)*rgbArray[2];
  newBlue = (.299*v - .300*vsu + 1.25*vsw)*rgbArray[0]
      +   (.587*v - .588*vsu - 1.05*vsw)*rgbArray[1]
      +   (.114*v + .886*vsu - .203*vsw)*rgbArray[2];
  return [newRed, newGreen, newBlue];
}

/**
 * @param {Array} rgbArray - the RGB vector to be resaturated at the target saturation, while keeping hue and value constant
 * @param {Number} s - the target saturation from 0 to 1
 * @returns {Array} - the transformed RGB vector, still in RGBArray form.
 */
function exampleScaleSaturation(rgbArray, s) {
  transformRGBtoYIQ = [[1, 1, 1], [0.956, -0.272, -1.107], [0.621, -0.647, 1.705]]
  result = MatrixProd(rgbArray, transformRGBtoYIQ)
  scaleSaturation = [[1, 0, 0], [0, s, 0], [0, 0, s]]
  result = MatrixProd(result, scaleSaturation)
  transformYIQtoRGB = [[0.299, 0.596, 0.211], [0.587, -0.274, -0.523], [0.114, -0.321, 0.311]]
  result = MatrixProd(result, transformYIQtoRGB)
  return result
}

/**
 * @param {Array} rgbArray - the RGB vector to be resaturated at the target saturation, while keeping hue and value constant
 * @param {Number} s - the target saturation from 0 to 1
 * @returns {Array} - the transformed RGB vector, still in RGBArray form.
 * 
 * This is an efficient but more confusing version of the above algorithm. You can read more here:
 * https://beesbuzz.biz/code/16-hsv-color-transforms
 * Basically, we're just breaking out all the matrix multiplication in advance to simplify and reduce calculations.
 */
function scaleSaturation(rgbArray, s) {
  newRed = (.299 + .701*s)*rgbArray[0]
  +   (.587 - .587*s)*rgbArray[1]
  +   (.114 - .114*s)*rgbArray[2];
  newGreen = (.299 - .299*s)*rgbArray[0]
      +   (.587 + .413*s)*rgbArray[1]
      +   (.114 - .114*s)*rgbArray[2];
  newBlue = (.299 - .300*s)*rgbArray[0]
      +   (.587 - .588*s)*rgbArray[1]
      +   (.114 + .886*s)*rgbArray[2];
  return [newRed, newGreen, newBlue];
}



function colorToArray(color) {

  const rgbString = color.toString();  // "rgb(255, 127, 0, 255)"

  // regex to group the numbers, parse them into integers, and store in an array
  const rgbIntArray = rgbString.match(/\d+/g).map(e => parseInt(e)); // [255, 127, 0, 255]

  return rgbIntArray
}


let MatrixProd = (A, B) =>
  A.map((row, i) =>
    B[0].map((_, j) =>
      row.reduce((acc, _, n) =>
        acc + A[i][n] * B[n][j], 0
      )
    )
  )




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