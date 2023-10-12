
// launch p5 in instance mode
new p5( function (p) {

  // This program demonstrates how to use the random() function to generate random numbers
  let randomCounts = [];
  "use strict";

  p.setup = function() {
    p.createCanvas(400, 400);
    p.background(255); // set the background to white
    p.frameRate(200)
  }

  p.draw = function() {
    // pick a number along a gaussian distribution mean 10 stdDis 3
    let index = p.floor(exponentialDistribution()*10)
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

  function exponentialDistribution() {
    // give me a linearly increasing probability from 0 -> 1
    // see the graph to visualize this distribution
    while(true){
      const r1 = p.sqrt(p.random(1))
      const r2 = p.random(1)
      if(r1 >= r2){
        return r1
      }
    }
  }

}, "sketch4");
