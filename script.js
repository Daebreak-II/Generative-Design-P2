// Variables
const WaterColor = "#177FD6";
const KelpColor = "#016031";
const KelpHighlight = "#068848";
const RockColor = "#182A52";
const FishColor1 = "#C3860D";
const FishColor2 = "#C3860D";
const FishColor3 = "#C3860D";

function preload() {

}

function setup() {
  createCanvas(400, 400);
}

seed = 0;
function draw() {
  //variables
  seed = 0
  
  if(mouseX == 0) {
    kelpLean = 0;
  } else {
    kelpLean = 200 * mouseX/width;
  }
  // print(mouseX + ", " + mouseY)
  
  // Drawing
  background(WaterColor);
  for(i = -width; i < width; i += 30 + NoiseGen(100)) {
    kelp(i);
  }
  for(k = 0; k < NoiseGen(50); k++) {
    fish(NoiseGen(width*2) - width/2 + kelpLean*0.7, NoiseGen(height));
  }
  
  for(f = -width; f < width; f +=  NoiseGen(50)) {
    rock(f);
  }
}


function kelp(x) {
  // draw stalk
  stroke(KelpColor);
  strokeWeight(3);
  line(x, height, x + kelpLean, 0);
  // calc ski==lope and draw leaves
  slope = (-height) / (kelpLean); 
  for(j = -50; j < height; j += 5 + NoiseGen(40)) {
    leaf(x + kelpLean + j/slope - 25, j, 0);
  }
  for(j = -50; j < height; j += 5 + NoiseGen(60)) {
    leaf(x + kelpLean + j/slope - 25, j, 0);
  }
  
  for(j = -50; j < height; j += 5 + NoiseGen(40)) {
    leaf(x + kelpLean + j/slope - 4, j, 1);
  }
  for(j = -50; j < height; j += 5 + NoiseGen(60)) {
    leaf(x + kelpLean + j/slope - 7, j, 1);
  }
}

// makes a leaf at x, y which leans z (1 = right, 0 = left)
function leaf(x, y, z) {
  noStroke();
  w = 30;
  h = 10;
  l = 50
  
  push();
  translate(x + w/2, y);
  if(z == 1) {
    rotate(radians(NoiseGen(-45) - 15 + kelpLean/10));
  } else {
    rotate(radians(NoiseGen(45) + 15 + kelpLean/10));
  }
  
  fill(KelpColor);
  ellipse(0, 0, w, h);
  
  fill(KelpHighlight);
  ellipse(0, 0, w*0.7, h*0.3);
  // stroke(0);
  // line(x + 5, y, x + w - 5, y);
  
  pop();
}

function fish(x, y) {
  noStroke();
  w = 25;
  h = 10;
  fill(FishColor1);
  ellipse(x, y, w, h);
  triangle(x - w*0.8, y - h/2, x - w*0.8, y + h/2, x - w/4, y);
  // triangle(0, 0, width, height, 0, height);
  fill(0);
  circle(x + w*0.35, y, 3);
}

function rock(x) {
  fill(RockColor);
  quad(x, height +10, x + 10 + NoiseGen(40), height+10, x + 10 + NoiseGen(40), height - 10 - NoiseGen(20), x + NoiseGen(10), height - 10 - NoiseGen(20));
}

// returns a number between 0 and x
function NoiseGen(x) {
  seed += 1;
  return noise(seed) * x;
}