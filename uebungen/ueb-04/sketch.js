
let drehwinkel = 0;

let bild; 

function preload(){

  bild= loadImage("images/mond.jpg");
}

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  rectMode(CENTER);
  background(0);


}

function draw() {

  clear();

  let ratio = width/ bild.width;
  image(bild,0,0, bild.width *ratio, bild.height * ratio);

  push();

  //Rechteck rechts
  //Koordinatensystem verschieben
  translate(width / 2 + 200, height / 2);

  //rotieren
  rotate(drehwinkel);

  fill(0, 255, 255);
  rotate(45);
  rect(0, 0, 3, 400);
  pop();


  push();

  //Rechteck rechts
  //Koordinatensystem verschieben
  translate(width / 2 - 200, height / 2);
  drehwinkel = drehwinkel + 1;

  //rotieren
  rotate(drehwinkel * -1);

  fill(0, 0, 255);


  rect(0, 0, 200, 200);

  pop();

  drehwinkel = drehwinkel + 1;

}

  function keyPressed(){

    if(key == 's'){
      saveCanvas('meinBild.png')
    }
  }




