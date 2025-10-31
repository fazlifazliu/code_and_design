//Slider für Hintergrundfarbe
let sliderFarbe;

//Slider für Eckenradius
let sliderEcken;

let drehwinkel = 0;


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


  //Aktuelle Werte der Slider lesen
  let farbe = sliderFarbe.value();
  let radius = sliderEcken.value();

  //Hintergrundfarbe von Schwarz zu Weiss mappen
  let grau = map(farbe, 0, 100, 0, 255);
  background(grau);

  //Abstand der Maus zur Mitte
  let abstandX = (mouseX - width / 2) / 5;
  let abstandY = (mouseY - height / 2) / 5;

  //Farben der Formen definieren
  let blau = color(0, 200, 255);
  let pink = color(230, 0, 130);

  // hinterstes Rechteck drehen
  push();
  translate(windowWidth / 2 , windowHeight / 2);
  rotate(drehwinkel);
  
  //Formen in wechselnder Farbe gelistet
  fill(blau);
  rect(0, 0, 300, 300, radius);
  pop();
//Ende hinterstes Rechteck drehen

//zweithinterstes Rechteck drehen
push();
translate(width / 2 + abstandX * 1, height / 2 + abstandY * 1);
rotate(drehwinkel *-1);

  fill(pink);
  rect(0,0, 250, 250, radius);

  pop();

  fill(blau);
  rect(width / 2 + abstandX * 2, height / 2 + abstandY * 2, 200, 200, radius);

  fill(pink);
  rect(width / 2 + abstandX * 3, height / 2 + abstandY * 3, 150, 150, radius);

  fill(blau);
  rect(width / 2 + abstandX * 4, height / 2 + abstandY * 4, 100, 100, radius);

  fill(pink);
  rect(width / 2 + abstandX * 5, height / 2 + abstandY * 5, 50, 50, radius);

  //Beschriftungen der Slider
  if (grau < 128) {
    fill(255); // heller Text auf dunklem Hintergrund
  } else {
    fill(0);   // dunkler Text auf hellem Hintergrund
  }

  textSize(12);
  text('Hintergrundfarbe', 160, 62);
  text('Eckenradius', 160, 112);

drehwinkel = drehwinkel + 1;
}
//Canvas an die Fenstergrösse anpassen
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  
}
