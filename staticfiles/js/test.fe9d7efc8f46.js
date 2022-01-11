let faceapi;
// let video;
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

const video = document.getElementById("video"),
  constraints = {
    video: true,
  };
video.style.display = "none";

navigator.mediaDevices
  .getUserMedia(constraints)
  .then(function (stream) {
    video.srcObject = stream;
    video.onloadedmetadata = function (e) {
      video.play();
    };
  })
  .catch(function (err) {
    console.log(err.name + ": " + err.message);
  });

let videoImage;

function setup() {
createCanvas(windowWidth, windowHeight);
// video = createCapture(video);
// video.size(width, height);
// video.hide();
videoImage = createGraphics(width, height);
faceapi = ml5.faceApi(videoImage, detectionOptions, onModelReady);
// faceapi = ml5.faceApi(video, detectionOptions, onModelReady);
}

function draw() {
  background(0);
  videoImage.drawingContext.drawImage(video, 0, 0);
  image(videoImage, 0, 0, width, height);

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