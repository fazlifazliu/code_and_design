
let posX = 0;

let posY = 0;

let threshold;

function setup() {
  createCanvas(windowWidth, windowHeight);
  threshold = width / 2;
}

function draw() {
  background(220, 5);

  posY = random(-100, 10) +mouseY;

  posX = random(-10, 10) +mouseX;

  if (posX < threshold) {
    //farbe vor der Position 120
    fill(255, 100, 0);

  } else {

    //farbe nach der Position 120
    fill(0, 100, 255);
  }

  //Zufallswert für Y Position





  rect(posX, posY, 3, 30, 2);
  //rect(posY, posX, 30, 3, 2); // 

  /*fill(0);
  noStroke();
  rect(mouseX,mouseY,30,30);*/


  /*exakt gleich          posX==350 
  kleiner als             posX < 350
  groesser als            posX > 350
  kleiner oder gleich     posX <= 350 (wahr, falls posX 350 ist)
  groesser oder gleich    posX >= 350 (wahr, falls posX )
  ungleich                posX != 350 (trifft immer zu, ausser posX hat den Wert von 350)
  */

  /*
    if (posX < windowWidth) {
  
      //noLoop();    //falls die Bedingung zutrifft
      posX = posX + 3;
  
    }else{
  
      //posX = posX -350;
    }
  
  */
}