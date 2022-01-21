async function main() {
    let model;
    console.log("model loading..");
	$("#console").html(`<li>model loading...</li>`);
	model=await tf.loadGraphModel(`https://raw.githubusercontent.com/yuuki330/tomato_model/master/tfjs/model.json`);
	console.log("model loaded.");
    MODEL_HEIGHT  = model.inputs[0].shape[2];
    MODEL_WIDTH  = model.inputs[0].shape[3];
	$("#console").html(`<li>tomato_color trained model loaded.</li>`);

    // 表示用のCanvas
    const canvas = document.getElementById("main-stream-canvas");
    const ctx = canvas.getContext("2d");
    // 画像処理用のオフスクリーンCanvas
    const offscreen = document.createElement("canvas");
    const offscreenCtx = offscreen.getContext("2d");
    // カメラから映像を取得するためのvideo要素
    const video = document.createElement("video");
    video.setAttribute('playsinline', "");
  
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true
    });
  
    video.srcObject = stream;
    // streamの読み込み完了
    video.onloadedmetadata = () => {
      video.play();
  
      // Canvasのサイズを映像に合わせる
      canvas.width = offscreen.width = video.videoWidth;
      canvas.height = offscreen.height = video.videoHeight;
      console.log(video.videoWidth);
      console.log(video.videoHeight);
      cut_x = (video.videoWidth/2)-320;
      cut_y = (video.videoHeight/2)-320;
  
      tick();
    };
  
    // 1フレームごとに呼び出される処理
    function tick() {
      // カメラの映像をCanvasに描画する
      offscreenCtx.drawImage(video, 0, 0);

    //   predict();
  
      // イメージデータを取得する（[r,g,b,a,r,g,b,a,...]のように1次元配列で取得できる）
      const imageData = offscreenCtx.getImageData(0, 0, offscreen.width, offscreen.height);
      // imageData.dataはreadonlyなのでfilterメソッドで直接書き換える
      filter(imageData.data);
  
      // オフスクリーンCanvasを更新する
      offscreenCtx.putImageData(imageData, 0, 0);
  
      // 表示用Canvasに描画する
      ctx.drawImage(offscreen, 0, 0);
      ctx.strokeRect(cut_x, cut_y, 640, 640);
  
      // 次フレームを処理する
      window.requestAnimationFrame(tick);
    }
  
    function filter(data) {
      // 画像処理を行う
    }
  }
  
  function captureWebcam() {
    ctx.drawImage(video, 0, 0, 640, 640);
	tensor_image = preprocessImage(canvas);

	return tensor_image;
}

  main();