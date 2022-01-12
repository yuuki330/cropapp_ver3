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

// /*モバイルネット*/
// let classifier;
// let video;
// let resultsP;

// function setup() {
//   noCanvas();
//   // Create a camera input
//   video = createCapture(VIDEO);
//   // Initialize the Image Classifier method with MobileNet and the video as the second argument
//   classifier = ml5.imageClassifier('MobileNet', video, modelReady);
//   resultsP = createP('Loading model and video...');
// }

// function modelReady() {
//   console.log('Model Ready');
//   classifyVideo();
// }

// // Get a prediction for the current video frame
// function classifyVideo() {
//   classifier.classify(gotResult);
// }

// // When we get a result
// function gotResult(err, results) {
//   // The results are in an array ordered by confidence.
//   resultsP.html(`${results[0].label  } ${nf(results[0].confidence, 0, 2)}`);
//   classifyVideo();
// }

/*COCO*/
// Copyright (c) 2020 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Object Detection using COCOSSD
This example uses a callback pattern to create the classifier
=== */

// let video;
// let detector;
// let detections = [];

// function setup() {
//   createCanvas(640, 480);
//   video = createCapture(VIDEO, videoReady);
//   video.size(640, 480);
//   video.hide();
// }

// function videoReady() {
//   // Models available are 'cocossd', 'yolo'
//   // detector = ml5.objectDetector('yolo', modelReady);
//   detector = ml5.objectDetector('../best_web_model/model.json', modelReady);
// }

// function gotDetections(error, results) {
//   if (error) {
//     console.error(error);
//   }
//   detections = results;
//   detector.detect(video, gotDetections);
// }

// function modelReady() {
//   detector.detect(video, gotDetections);
// }

// function draw() {
//   image(video, 0, 0);

//   for (let i = 0; i < detections.length; i += 1) {
//     const object = detections[i];
//     stroke(0, 255, 0);
//     strokeWeight(4);
//     noFill();
//     rect(object.x, object.y, object.width, object.height);
//     noStroke();
//     fill(255);
//     textSize(24);
//     text(object.label, object.x + 10, object.y + 24);
//   }
// }

// import React from "react";
// import ReactDOM from "react-dom";
import * as tf from '@tensorflow/tfjs';
import {loadGraphModel} from '@tensorflow/tfjs-converter';
import "../css/test.css";
tf.setBackend('webgl');

const threshold = 0.75;

async function load_model() {
    // It's possible to load the model locally or from a repo
    // You can choose whatever IP and PORT you want in the "http://127.0.0.1:8080/model.json" just set it before in your https server
    //const model = await loadGraphModel("http://127.0.0.1:8080/model.json");
    const model = await loadGraphModel("https://raw.githubusercontent.com/hugozanini/TFJS-object-detection/master/models/kangaroo-detector/model.json");
    return model;
  }

let classesDir = {
    1: {
        name: 'Kangaroo',
        id: 1,
    },
    2: {
        name: 'Other',
        id: 2,
    }
}

class App extends React.Component {
  videoRef = React.createRef();
  canvasRef = React.createRef();


  componentDidMount() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const webCamPromise = navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            facingMode: "user"
          }
        })
        .then(stream => {
          window.stream = stream;
          this.videoRef.current.srcObject = stream;
          return new Promise((resolve, reject) => {
            this.videoRef.current.onloadedmetadata = () => {
              resolve();
            };
          });
        });

      const modelPromise = load_model();

      Promise.all([modelPromise, webCamPromise])
        .then(values => {
          this.detectFrame(this.videoRef.current, values[0]);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

    detectFrame = (video, model) => {
        tf.engine().startScope();
        model.executeAsync(this.process_input(video)).then(predictions => {
        this.renderPredictions(predictions, video);
        requestAnimationFrame(() => {
          this.detectFrame(video, model);
        });
        tf.engine().endScope();
      });
  };

  process_input(video_frame){
    const tfimg = tf.browser.fromPixels(video_frame).toInt();
    const expandedimg = tfimg.transpose([0,1,2]).expandDims();
    return expandedimg;
  };

  buildDetectedObjects(scores, threshold, boxes, classes, classesDir) {
    const detectionObjects = []
    var video_frame = document.getElementById('frame');

    scores[0].forEach((score, i) => {
      if (score > threshold) {
        const bbox = [];
        const minY = boxes[0][i][0] * video_frame.offsetHeight;
        const minX = boxes[0][i][1] * video_frame.offsetWidth;
        const maxY = boxes[0][i][2] * video_frame.offsetHeight;
        const maxX = boxes[0][i][3] * video_frame.offsetWidth;
        bbox[0] = minX;
        bbox[1] = minY;
        bbox[2] = maxX - minX;
        bbox[3] = maxY - minY;
        detectionObjects.push({
          class: classes[i],
          label: classesDir[classes[i]].name,
          score: score.toFixed(4),
          bbox: bbox
        })
      }
    })
    return detectionObjects
  }

  renderPredictions = predictions => {
    const ctx = this.canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Font options.
    const font = "16px sans-serif";
    ctx.font = font;
    ctx.textBaseline = "top";

    //Getting predictions
    const boxes = predictions[4].arraySync();
    const scores = predictions[5].arraySync();
    const classes = predictions[6].dataSync();
    const detections = this.buildDetectedObjects(scores, threshold,
                                    boxes, classes, classesDir);

    detections.forEach(item => {
      const x = item['bbox'][0];
      const y = item['bbox'][1];
      const width = item['bbox'][2];
      const height = item['bbox'][3];

      // Draw the bounding box.
      ctx.strokeStyle = "#00FFFF";
      ctx.lineWidth = 4;
      ctx.strokeRect(x, y, width, height);

      // Draw the label background.
      ctx.fillStyle = "#00FFFF";
      const textWidth = ctx.measureText(item["label"] + " " + (100 * item["score"]).toFixed(2) + "%").width;
      const textHeight = parseInt(font, 10); // base 10
      ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
    });

    detections.forEach(item => {
      const x = item['bbox'][0];
      const y = item['bbox'][1];

      // Draw the text last to ensure it's on top.
      ctx.fillStyle = "#000000";
      ctx.fillText(item["label"] + " " + (100*item["score"]).toFixed(2) + "%", x, y);
    });
  };

  render() {
    return (
      <div>
        <h1>Real-Time Object Detection: Kangaroo</h1>
        <h3>MobileNetV2</h3>
        <video
          style={{height: '600px', width: "500px"}}
          className="size"
          autoPlay
          playsInline
          muted
          ref={this.videoRef}
          width="600"
          height="500"
          id="frame"
        />
        <canvas
          className="size"
          ref={this.canvasRef}
          width="600"
          height="500"
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);