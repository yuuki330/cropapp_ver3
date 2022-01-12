// let faceapi;
// // let video;
// let box;
// let parts;

// const isEmpty = (o) => o == undefined;

// const detectionOptions = {
//   withLandmarks: true,
//   withDescriptors: false,
// };

// function gotResult(err, result) {
//   if (err) {
//     box = null;
//     parts = null;
//     faceapi.detectSingle(gotResult);
//     return;
//   }

//   if (!result || result.length === 0) {
//     box = null;
//     parts = null;
//     return;
//   }

//   const { x, y, height, width } = result.detection.box;
//   box = {
//     x,
//     y,
//     width,
//     height,
//   };
//   parts = result.parts;
//   faceapi.detectSingle(gotResult);
// }

// const onModelReady = () => {
//   console.log("model ready");
//   faceapi.detectSingle(gotResult);
// };

// const drawVertices = (vertices) => {
//   vertices.forEach((t) => {
//     curveVertex(t._x, t._y);
//   });
// };

// // const video = document.getElementById("input_video"),
// //   constraints = {
// //     audio: false,
// //     video: {
// //       facingMode: {
// //         exact: "environment"
// //       }
// //     }
// //   };
// const video = document.getElementById("input_video"),
//   constraints = {
//     audio: false,
//     video: true,
//   };
// video.style.display = "none";

// navigator.mediaDevices
//   .getUserMedia(constraints)
//   .then(function (stream) {
//     video.srcObject = stream;
//     video.onloadedmetadata = function (e) {
//       video.play();
//     };
//   })
//   .catch(function (err) {
//     console.log(err.name + ": " + err.message);
//   });

// let videoImage;

// function setup() {
//   // createCanvas(windowWidth, windowHeight);
//   createCanvas(500, 400);
//   // video = createCapture(video);
//   // video.size(width, height);
//   // video.hide();
//   videoImage = createGraphics(width, height);
//   videoImage.drawingContext.drawImage(video, 0, 0);
//   videoImage2 = 
//   faceapi = ml5.faceApi(videoImage, detectionOptions, onModelReady);
//   // faceapi = ml5.faceApi(video, detectionOptions, onModelReady);
// }

// function draw() {
//   background(0);
//   videoImage.drawingContext.drawImage(video, 0, 0);
//   // videoImage.drawingContext.drawImage(video, 0, 0);
//   image(videoImage, 0, 0, width, height);

//   if (isEmpty(box) || isEmpty(parts)) {
//     return;
//   }

//   ellipse(
//     box.x + box.width / 2,
//     box.y + box.height / 2,
//     box.width * 1.2,
//     box.height * 1.2
//   );
//   const { leftEye, rightEye, mouth, nose } = parts;

//   strokeWeight(3);
//   stroke(50);
//   strokeCap(ROUND);
//   strokeJoin(ROUND);

//   beginShape();
//   drawVertices(leftEye);
//   endShape(CLOSE);

//   beginShape();
//   drawVertices(nose);
//   endShape(CLOSE);

//   beginShape();
//   drawVertices(mouth);
//   endShape(CLOSE);

//   beginShape();
//   drawVertices(rightEye);
//   endShape(CLOSE);
// }

/*ここから*/

// // const video = document.getElementById("input_video"),
// let video = document.getElementById("input_video"),
// constraints = {
//   audio: false,
//   video: {
//     facingMode: {
//       exact: "environment"
//     }
//   }
// };
// // constraints = {
// //   audio: false,
// //   video: true,
// // };
// video.style.display = "none";

// navigator.mediaDevices
//   .getUserMedia(constraints)
//   .then(function (stream) {
//     video.srcObject = stream;
//     video.onloadedmetadata = function (e) {
//       video.play();
//     };
//   })
//   .catch(function (err) {
//     console.log(err.name + ": " + err.message);
//   });

// let videoImage;

// function setup() {
//   createCanvas(500, 400);
//   // videoImage = createGraphics(width, height);
//   // video = createCapture(VIDEO);
// }

// function draw() {
//   background(0);

//   // videoImage.drawingContext.drawImage(video, 0, 0);
//   image(video, 0, 0);
// }

/*モバイルネット*/
let classifier;
let video;
let resultsP;

function setup() {
  noCanvas();
  // Create a camera input
  video = createCapture(VIDEO);
  // Initialize the Image Classifier method with MobileNet and the video as the second argument
  classifier = ml5.imageClassifier('MobileNet', video, modelReady);
  resultsP = createP('Loading model and video...');
}

function modelReady() {
  console.log('Model Ready');
  classifyVideo();
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.classify(gotResult);
}

// When we get a result
function gotResult(err, results) {
  // The results are in an array ordered by confidence.
  resultsP.html(`${results[0].label  } ${nf(results[0].confidence, 0, 2)}`);
  classifyVideo();
}