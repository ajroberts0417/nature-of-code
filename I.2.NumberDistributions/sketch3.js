
// launch p5 in instance mode
new p5( function (p) {

  // This program demonstrates how to use the random() function to generate random numbers
  let randomCounts = [];
  "use strict";

  p.setup = function() {
    p.createCanvas(400, 400);
    p.background(255); // set the background to white
  }

  p.draw = function() {
    // pick a number along a gaussian distribution mean 10 stdDis 3
    let index = p.floor(p.randomGaussian(10, 3))
    // increment the count for that number
    randomCounts[index] = (randomCounts[index] || 0) + 1;
    // draw a bar chart to visualize the randomCounts array
    p.background(255);
    p.stroke(0);
    p.fill(175);
    let barWidth = p.width/randomCounts.length;
    for (let n = 0; n < randomCounts.length; n++) {
      let barHeight = randomCounts[n];
      let xStart = n*barWidth
      p.rect(xStart, p.height-barHeight, barWidth-1, barHeight);
    }
  }

}, "sketch3");
