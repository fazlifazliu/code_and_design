let valueSlider;



function setup() {
  createCanvas(windowWidth, windowHeight);

//Slider mit Startwert und Bereich
  valueSlider = createSlider(-10,38,9);
  valueSlider.position(20,20);

}

function draw() {

//Aktuellen Sliderwert lesen
  let inputValue = valueSlider.value();


// Min-Max range definieren
  let inputMin = -10;
  let inputMax = 38;

  let outputMin = 0; 
  let outputMax = 255; 

  let outputValue = map(inputValue, inputMin, inputMax, outputMin, outputMax)

  //console.log(outputValue);

  background(outputValue);

  //let kreisoutputValue= map(inputValue,inputMin, outputMax, outputMin);

  //background 0 , kreis 255
  //background 255, kreis 0
  //background 125, kreis 125
  //background 100, kreis 155

  fill(255-outputValue);
  noStroke()
  ellipse(200,200,400,400);
  fill(mouseX);
  ellipse(200,200,300,300);
  fill(mouseY)
  ellipse(200,200,200,200);
  
}
