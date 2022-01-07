const streamButton = document.getElementById("stream");
const video = document.getElementById("player");
let canvasStream = null;

streamButton.addEventListener("click", () => {
  navigator.mediaDevices
    .getUserMedia({video: true})
    .then(stream => {
      video.srcObject = stream;
      drawCanvasFromVideo()
    })
    .catch(e => alert("error" + e.message));
});


function drawCanvasFromVideo()  {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext('2d');
  setInterval(() => {
    if (canvas && ctx){
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    }
  }, 10000/30);
  canvasStream = canvas.captureStream(30);
  const videoCanvas = document.getElementById("player-canvas");
  videoCanvas.srcObject = canvasStream;
}