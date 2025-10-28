
/// Variante ALT /// 


//Slider für Hintergrundfarbe
let sliderFarbe;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  noStroke();

  //Slider mit Bereich und Startwert
  sliderFarbe = createSlider(0, 100, 0);
  sliderFarbe.position(20, 50);

}

function draw() {

  //Aktuelle Werte der Slider lesen
  let farbe = sliderFarbe.value();

  //Hintergrundfarbe von Schwarz zu Weiss mappen
  let grau = map(farbe, 0, 100, 0, 255);
  background(grau);

  //Abstand der Maus zur Mitte
  let abstandX = (mouseX - width / 2) / 5;
  let abstandY = (mouseY - height / 2) / 5;

  //Farben der Formen definieren
  let blau = color(0, 200, 255);
  let pink = color(230, 0, 130);


  //Formen in wechselnder Farbe gelistet
  fill(blau);
  ellipse(width / 2, height / 2, 300);

  fill(pink);
  ellipse(width / 2 + abstandX * 1, height / 2 + abstandY * 1, 250);

  fill(blau);
  ellipse(width / 2 + abstandX * 2, height / 2 + abstandY * 2, 200);

  fill(pink);
  ellipse(width / 2 + abstandX * 3, height / 2 + abstandY * 3, 150);

  fill(blau);
  ellipse(width / 2 + abstandX * 4, height / 2 + abstandY * 4, 100);

  fill(pink);
  ellipse(width / 2 + abstandX * 5, height / 2 + abstandY * 5, 50);

  //Beschriftung Slider
  if (grau < 128) {
    fill(255); // heller Text auf dunklem Hintergrund
  } else {
    fill(0);   // dunkler Text auf hellem Hintergrund
  }

  textSize(12);
  text('Hintergrundfarbe', 160, 62);


}
//Canvas an die Fenstergrösse anpassen
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
