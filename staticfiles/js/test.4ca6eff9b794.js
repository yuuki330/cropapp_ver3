// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Real time Object Detection using YOLO and p5.js
=== */

let video;
let player;
let yolo;
let status_;
let objects = [];

function setup() {
  createCanvas(320, 240);
  const video = document.querySelector( "#video" );
  if( navigator.mediaDevices.getUserMedia ){
    navigator.mediaDevices.getUserMedia( { video: true } )
    .then( ( stream ) => {
        video.srcObject = stream;
    } );
  }
  player = createCapture(video);
  player.size(320, 240);

  // Create a YOLO method
  yolo = ml5.YOLO(player, startDetecting);

  // Hide the original video
  video.hide();
  status_ = select('#status_');
}

function draw() {
  image(player, 0, 0, width, height);
  for (let i = 0; i < objects.length; i++) {
    noStroke();
    fill(0, 255, 0);
    text(objects[i].label, objects[i].x * width, objects[i].y * height - 5);
    noFill();
    strokeWeight(4);
    stroke(0, 255, 0);
    rect(objects[i].x * width, objects[i].y * height, objects[i].w * width, objects[i].h * height);
  }
}

function startDetecting() {
  status_.html('Model loaded!');
  detect();
}

function detect() {
  yolo.detect(function(err, results) {
    objects = results;
    detect();
  });
}