// const medias = {
//     audio: false,
//     video: {
//       facingMode: {
//         exact: "environment"
//       }
//     }
//   };
//   const video = document.getElementById("video");
//   const promise = navigator.mediaDevices.getUserMedia(medias);
  
//   promise.then(successCallback)
//          .catch(errorCallback);
  
//   function successCallback(stream) {
//     video.srcObject = stream;
//   }
  
//   function errorCallback(err) {
//     alert(err);
//   }

// On Streaming

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// const startStreamingVideo = () => {
//   const video = document.getElementById("video");
//   if( navigator.mediaDevices.getUserMedia ){
//     navigator.mediaDevices.getUserMedia( { video: {
//       facingMode: {
//         exact: "environment"
//       }
//     } } )
//     .then( ( stream ) => {
//         video.srcObject = stream;
//     } );
//   }
// }
// startStreamingVideo();

const video = document.getElementById("video");
if( navigator.mediaDevices.getUserMedia ){
navigator.mediaDevices.getUserMedia( { video: {
  facingMode: {
    exact: "environment"
  }
} } )
.then( ( stream ) => {
    video.srcObject = stream;
    requestAnimationFrame(draw);
} );
}

// function setup(){
//   createCanvas(640, 480);

//   // ビデオのキャプチャ
//   video = createCapture(video);
//   video.size(width, height);
//   video.hide();

// }

function draw() {
  video_image = createCapture(video);
  video_image.size(width, height);
  // video.hide();
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.drawImage(video_image, 0, 0);

  requestAnimationFrame(draw);
}