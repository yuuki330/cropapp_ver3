const streamButton = document.getElementById("stream");
const video = document.getElementById("player");
let canvasStream = null;


navigator.mediaDevices
  .getUserMedia({video: {
      facingMode: {
        exact: "environment"
      }
    }})
  .then(stream => {
    video.srcObject = stream;
    drawCanvasFromVideo()
  })
  .catch(e => alert("error" + e.message));


function drawCanvasFromVideo()  {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext('2d');
  setInterval(() => {
    var canvas_width = video.videoWidth ;
		var canvas_height = video.videoHeight ;
    if (canvas && ctx){
        ctx.drawImage(video, 0, 0, canvas_width, canvas_height);
    }
  }, 10000/60);
  canvasStream = canvas.captureStream();
  const videoCanvas = document.getElementById("player-canvas");
  videoCanvas.srcObject = canvasStream;
}