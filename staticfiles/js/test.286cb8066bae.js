let faceapi;
let video;
let box;
let parts;

const isEmpty = (o) => o == undefined;

const detectionOptions = {
  withLandmarks: true,
  withDescriptors: false,
};

function gotResult(err, result) {
  if (err) {
    box = null;
    parts = null;
    faceapi.detectSingle(gotResult);
    return;
  }

  if (!result || result.length === 0) {
    box = null;
    parts = null;
    return;
  }

  const { x, y, height, width } = result.detection.box;
  box = {
    x,
    y,
    width,
    height,
  };
  parts = result.parts;
  faceapi.detectSingle(gotResult);
}

const onModelReady = () => {
  console.log("model ready");
  faceapi.detectSingle(gotResult);
};

const drawVertices = (vertices) => {
  vertices.forEach((t) => {
    curveVertex(t._x, t._y);
  });
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  faceapi = ml5.faceApi(video, detectionOptions, onModelReady);
}

function draw() {
  background(0);
  image(video, 0, 0, width, height);

  if (isEmpty(box) || isEmpty(parts)) {
    return;
  }

  ellipse(
    box.x + box.width / 2,
    box.y + box.height / 2,
    box.width * 1.2,
    box.height * 1.2
  );
  const { leftEye, rightEye, mouth, nose } = parts;

  strokeWeight(3);
  stroke(50);
  strokeCap(ROUND);
  strokeJoin(ROUND);

  beginShape();
  drawVertices(leftEye);
  endShape(CLOSE);

  beginShape();
  drawVertices(nose);
  endShape(CLOSE);

  beginShape();
  drawVertices(mouth);
  endShape(CLOSE);

  beginShape();
  drawVertices(rightEye);
  endShape(CLOSE);
}

setup();