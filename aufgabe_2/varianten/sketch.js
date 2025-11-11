//Slider für Hintergrundfarbe
let sliderFarbe;

//Slider für Eckenradius
let sliderEcken;

let drehwinkel = 0;
let radius;


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  rectMode(CENTER);
  noStroke();


  //Slider mit Bereich und Startwert
  sliderFarbe = createSlider(0, 100, 0);
  sliderFarbe.position(20, 50);

  sliderEcken = createSlider(0, 15, 0);
  sliderEcken.position(20, 100);


}

function draw() {

  //randomSeed(200);

  //Aktuelle Werte der Slider lesen
  let farbe = sliderFarbe.value();
  radius = sliderEcken.value();

  //Hintergrundfarbe von Schwarz zu Weiss mappen
  let grau = map(farbe, 0, 100, 0, 255);
  background(grau);

  for (let i = 0; i < 3; i++) {
    push();
    let PosX = i * width / 2;
    let PosY = height / 2;

    translate(PosX, PosY);
    let form;
    if (i % 2 == 0) {
      form = "ellipse";
    } else {
      form = "rechteck";
    }
    magnete(PosX, PosY, form);
    pop();
  }





  //Beschriftungen der Slider
  if (grau < 128) {
    fill(255); // heller Text auf dunklem Hintergrund
  } else {
    fill(0);   // dunkler Text auf hellem Hintergrund
  }

  textSize(12);
  text('Hintergrundfarbe', 160, 62);
  text('Eckenradius', 160, 112);

  drehwinkel = drehwinkel + 0.1;
}
//Canvas an die Fenstergrösse anpassen
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);


}


function magnete(mittelpunktX, mittelpunktY, form) {
  //Abstand der Maus zur Mitte
  let abstandX = (mouseX - mittelpunktX) / 30;
  let abstandY = (mouseY - mittelpunktY) / 30;

  //Farben der Formen definieren
  let blau = color(0, 200, 255);
  let pink = color(230, 0, 130);
  for (let i = 0; i < 10; i++) {
    let faktor = 10 - i;
    push();
    translate(abstandX * i, abstandY * i);

    if (i % 2 == 0) {
      rotate(drehwinkel);
      fill(blau);
    } else {
      rotate(drehwinkel * 1);
      fill(pink);
    }

    if (form == "rechteck") {
      rect(0, 0, faktor * 50, faktor * 50, radius);
    } else {
      ellipse(0, 0, faktor * 55, faktor * 50)
    }

    pop();
  }
}