
let durchmesser = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  //plan: durchmesser der ellipse abhängig von distanz der maus




  //distanz des zentrums der ellipse zur maus messen, dist gibt immer einen positiven Wert zurück






  //  console.log(distanz);

  for (let i = 0; i < 10; i++) {
    let distanz = dist(mouseX, mouseY, i * 200, height / 2);
    let yPos = map(distanz, 0, width, -300, 300);
    //plan: y position ist abhängig von Distanz der Maus zur mitte

    let d = map(distanz, 0, width, 300, 50);
    ellipse(i * 200, height / 2 - yPos, d);



  }



}
