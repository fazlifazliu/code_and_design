let durchmesser;
durchmesser = 10;

let rotwert = 0;
let gruenwert = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(110, 100);
  fill(mouseX, 0, 0);
  rect(200, 200, 100);
  fill(mouseY, 255, 0);
  rect(0, 0, 100);
  fill(mouseX, 100, 0, 255)
  rect(0, 200, 100);
  fill(mouseY, 0, 0, 100);
  rect(200,0,100);
  ARROW(10,10,10,);

  durchmesser = durchmesser + 0.2

  console.log(rotwert);
}


// function mouseClicked() {

//   rotwert = rotwert + 100;
//   gruenwert = gruenwert + 50;



// }

// function mousePressed() {
//   background(0);


// }
