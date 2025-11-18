

let handpose;
let video;
let hands = [];
let isReady = false;

const WRIST = 0;
const THUMB_TIP = 4;
const INDEX_TIP = 8;
const MIDDLE_TIP = 12;
const FINGER_PATHS = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
  [17, 18, 19, 20]
];

const WIPE_INDICES = [
  { index: WRIST, scale: 1.3 },
  { index: 5, scale: 1.2 },
  { index: 9, scale: 1.2 },
  { index: 13, scale: 1.0 },
  { index: 17, scale: 1.0 },
  { index: THUMB_TIP, scale: 0.8 },
  { index: INDEX_TIP, scale: 1.0 },
  { index: MIDDLE_TIP, scale: 0.95 },
  { index: 16, scale: 0.9 },
  { index: 20, scale: 0.8 }
];

const PALM_LOOP = [WRIST, 1, 2, 5, 9, 13, 17];

let fogLayer;
let prevWipePos = null;
let drips = [];
let fogDensity = 0.8;
let smoothing = 0.2;

function preload() {
  handpose = ml5.handPose();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  fogLayer = createGraphics(windowWidth, windowHeight);
  fogLayer.pixelDensity(1);
  initFogTexture();

  handpose.detectStart(video, gotHands);
}

function initFogTexture() {
  fogLayer.push();
  fogLayer.clear();
  let baseCol = color(205, 215, 225, 235);
  fogLayer.background(baseCol);
  fogLayer.noStroke();
  for (let i = 0; i < 250; i++) {
    let x = random(fogLayer.width);
    let y = random(fogLayer.height);
    let r = random(60, 200);
    let alpha = random(8, 25);
    fogLayer.fill(100, 200, 240, alpha);
    fogLayer.ellipse(x, y, r);
  }
  fogLayer.pop();
}

function gotHands(results) {
  hands = results;
  isReady = hands.length > 0;
  if (!isReady) prevWipePos = null;
}

function draw() {
  drawMirrorVideo();
  applySteamFilm();

  let wiped = false;
  if (isReady && hands.length > 0) {
    let hand = hands[0];
    wiped = wipeFogWithHand(hand);
  } else {
    prevWipePos = null;
  }
  if (!wiped) {
    fogDensity = lerp(fogDensity, 0.5, 0.003);
  }

  image(fogLayer, 0, 0, width, height);
  updateDrips();
  drawDrips();
  drawStatusHint();
}

function drawMirrorVideo() {
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);
  pop();
}

function applySteamFilm() {
  fogLayer.push();
  fogLayer.noStroke();
  let mistAlpha = map(fogDensity, 0, 1, 0, 8);
  fogLayer.fill(212, 220, 232, mistAlpha);
  fogLayer.rect(0, 0, fogLayer.width, fogLayer.height);
  fogLayer.pop();
}

function wipeFogWithHand(hand) {
  let tip = hand.keypoints[INDEX_TIP];
  let wrist = hand.keypoints[WRIST];
  let middle = hand.keypoints[MIDDLE_TIP];
  if (!tip || !wrist || !middle) return false;

  let pointer = getScreenPosition(tip.x, tip.y);
  let openness = 0.6;
  if (wrist && middle) {
    let d = dist(wrist.x, wrist.y, middle.x, middle.y);
    openness = constrain(map(d, 40, 180, 1.2, 0.5), 0.4, 1.4);
  }

  let baseRadius = 65 * openness;
  let wipeSpeed = prevWipePos ? dist(pointer.x, pointer.y, prevWipePos.x, prevWipePos.y) : 0;
  baseRadius += wipeSpeed * 0.3;

  fogLayer.push();
  fogLayer.erase(255, 0);
  fogLayer.noFill();
  fogLayer.stroke(255);
  fogLayer.strokeWeight(baseRadius * 0.5);
  fogLayer.strokeCap(ROUND);
  fogLayer.strokeJoin(ROUND);
  for (let path of FINGER_PATHS) {
    let pts = [];
    for (let idx of path) {
      let kp = hand.keypoints[idx];
      if (!kp) continue;
      pts.push(getScreenPosition(kp.x, kp.y));
    }
    if (pts.length < 2) continue;
    fogLayer.beginShape();
    for (let p of pts) {
      fogLayer.vertex(p.x, p.y);
    }
    fogLayer.endShape();
  }
  fogLayer.noStroke();
  for (let spec of WIPE_INDICES) {
    let kp = hand.keypoints[spec.index];
    if (!kp) continue;
    let pos = getScreenPosition(kp.x, kp.y);
    let r = baseRadius * spec.scale * 0.6;
    fogLayer.ellipse(pos.x, pos.y, r);
  }

  // Handfläche ausfüllen
  let palmPoints = [];
  for (let idx of PALM_LOOP) {
    let kp = hand.keypoints[idx];
    if (!kp) continue;
    palmPoints.push(getScreenPosition(kp.x, kp.y));
  }
  if (palmPoints.length >= 3) {
    fogLayer.fill(255);
    fogLayer.beginShape();
    for (let p of palmPoints) {
      fogLayer.vertex(p.x, p.y);
    }
    fogLayer.endShape(CLOSE);
  }

  fogLayer.noErase();
  fogLayer.pop();

  if (wipeSpeed > 18) {
    for (let i = 0; i < 3; i++) {
      drips.push(new DripParticle(pointer.x + random(-20, 20), pointer.y + random(-10, 15)));
    }
  }

  prevWipePos = pointer.copy();
  fogDensity = lerp(fogDensity, 0.2, 0.04);
  return true;
}

function getScreenPosition(x, y) {
  let sx = map(x, 0, video.width, width, 0);
  let sy = map(y, 0, video.height, 0, height);
  return createVector(sx, sy);
}

function updateDrips() {
  for (let i = drips.length - 1; i >= 0; i--) {
    drips[i].update();
    if (drips[i].dead) drips.splice(i, 1);
  }
}

function drawDrips() {
  for (let drip of drips) {
    drip.draw();
  }
}

function drawStatusHint() {
  noStroke();
  fill(255, 230);
  textAlign(LEFT, BOTTOM);
  textSize(16);
  let msg = isReady ? 'Wische mit deiner Hand den Spiegel frei' : 'Warte auf Handpose...';
  text(msg, 16, height - 18);
}

class DripParticle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-0.1, 0.1), random(1, 2.2));
    this.length = random(6, 16);
    this.alpha = 180;
  }

  update() {
    this.pos.add(this.vel);
    this.vel.y += 0.08;
    this.alpha -= 3;
  }

  draw() {
    push();
    stroke(255, 255, 255, this.alpha);
    strokeWeight(2);
    line(this.pos.x, this.pos.y, this.pos.x, this.pos.y + this.length);
    pop();
  }

  get dead() {
    return this.alpha <= 0 || this.pos.y > height + 10;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  fogLayer = createGraphics(windowWidth, windowHeight);
  fogLayer.pixelDensity(1);
  initFogTexture();
}
