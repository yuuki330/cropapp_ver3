// const CLASSES = {0:'zero', 1:'one', 2:'two', 3:'three', 4:'four',5:'five', 6:'six', 7:'seven', 8:'eight', 9:'nine'}
const CLASSES = {0:'level_1', 1:'level_2', 2:'level_3', 3:'level_4', 4:'level_5'}
var MODEL_HEIGHT = 1;
var MODEL_WIDTH = 1;
//-----------------------
// start button event
//-----------------------

$("#start-button").click(function(){
	loadModel() ;
	startWebcam();
});

//-----------------------
// load model
//-----------------------

let model;
async function loadModel() {
	console.log("model loading..");
	$("#console").html(`<li>model loading...</li>`);
	model=await tf.loadGraphModel(`https://raw.githubusercontent.com/yuuki330/tomato_model/master/model.json`);
	console.log("model loaded.");
  console.log(model.inputs[0])
  MODEL_HEIGHT  = model.inputs[0].shape[1];
  MODEL_WIDTH  = model.inputs[0].shape[2];
	$("#console").html(`<li>tomato_color trained model loaded.</li>`);
  console.log(MODEL_HEIGHT, MODEL_WIDTH);
};

// var image = document.createElement( 'img' );
// image.src = '../images/1.jpg';
var image_val = document.getElementById("val_image");

//-----------------------
// start webcam 
//-----------------------

var video;
function startWebcam() {
	console.log("video streaming start.");
	$("#console").html(`<li>video streaming start.</li>`);
	video = $('#main-stream-video').get(0);
	vendorUrl = window.URL || window.webkitURL;

	navigator.getMedia = navigator.getUserMedia ||
						 navigator.webkitGetUserMedia ||
						 navigator.mozGetUserMedia ||
						 navigator.msGetUserMedia;

	navigator.getMedia({
		// video: {
    //   facingMode: {
    //     // exact: "environment"
    //     exact: "user"
    //   }
    // }
    video:true
		// audio: false
	}, function(stream) {
		localStream = stream;
		video.srcObject = stream;
		video.play();
	}, function(error) {
		alert("Something wrong with webcam!");
	});
}

//-----------------------
// predict button event
//-----------------------

$("#predict-button").click(function(){
	setInterval(predict, 1000/10);
});

//-----------------------
// TensorFlow.js method
// predict tensor
//-----------------------

async function predict(){
	let tensor = captureWebcam();
  // console.log(tensor)
  // const zeros = tf.zeros([1, 640, 640, 3]);
	// let prediction = await model.predict(tensor).data();
  // let boxes = prediction[0].dataSync();
  // let scores = prediction[1].arraySync();
  // let classes = prediction[2].dataSync();

  // let detectionObjects = [];
  // scores.forEach((score, i) => {
  //   if(score > 0.4){
  //     let bbox = [];
  //     const minY = boxes[i * 4] * image_val.height;
  //     const minX = boxes[i * 4 + 1] * image_val.width;
  //     const maxY = boxes[i * 4 + 2] * image_val.height;
  //     const maxX = boxes[i * 4 + 3] * image_val.width;
  //     bbox[0] = minX;
  //     bbox[1] = minY;
  //     bbox[2] = maxX - minX;
  //     bbox[3] = maxY - minY;

  //     detectionObjects.push({
  //       class: classes[i],
  //       label: classesDir[classes[i]].name,
  //       score: score.toFixed(4),
  //       bbox: bbox
  //     })
  //   }
  // })

  // console.log(detectionObjects);


	// let results = Array.from(prediction)
	// 			.map(function(p,i){
	// return {
	// 	probability: p,
	// 	className: CLASSES[i]
	// };
	// }).sort(function(a,b){
	// 	return b.probability-a.probability;
	// }).slice(0,5);

  // // console.log(results);

	// $("#console").empty();

	// results.forEach(function(p){
	// 	$("#console").append(`<li>${p.className} : ${p.probability.toFixed(6)}</li>`);
	// 	console.log(p.className,p.probability.toFixed(6))
	// });
  // // console.log(results)

  var output = model.executeAsync(imageTensor).then(output=>{
    const o0 = output[0].arraySync();

    const OBJECT_TH = 0.5;
    const IOU_TH = 0.5;
    const bairitu_w = image_val.width/640;
    const bairitu_h = image_val.height/640;

    let a=0;
    var list = new Array();
    console.log(o0[0].length);

    for (let i = 0; i < o0[0].length; i++) {
        if((o0[0][i][4]*o0[0][i][5])>OBJECT_TH){
            console.log("aaaaaa");
            a = a+1;
            const dx = o0[0][i][2]*bairitu_w/2;
            const dy = o0[0][i][2]*bairitu_h/2;

            var ary = new Array();
            ary.push(o0[0][i][0]*bairitu_w - dx);
            ary.push(o0[0][i][1]*bairitu_h - dy);
            ary.push(o0[0][i][2]*bairitu_w);
            ary.push(o0[0][i][3]*bairitu_h);
            ary.push(o0[0][i][4]*o0[0][i][5]);

            list.push(ary);
        }
     }
    //  console.log(list)
  })
};

//------------------------------
// capture streaming video 
// to a canvas object
//------------------------------

function captureWebcam() {
	var canvas    = document.createElement("canvas");
	var context   = canvas.getContext('2d');
	canvas.width  = video.width;
	canvas.height = video.height;

	// context.drawImage(video, 0, 0, video.width, video.height);
  context.drawImage(image_val, 0, 0, image_val.width, image_val.height);
	tensor_image = preprocessImage(canvas);

	return tensor_image;
}

//-----------------------
// TensorFlow.js method
// image to tensor
//-----------------------

function preprocessImage(image){
	// let tensor = tf.browser.fromPixels(image).resizeNearestNeighbor([100,100]).toFloat();
  // let tensor = tf.browser.fromPixels(image).resizeNearestNeighbor([640,640]).toFloat();	
	let tensor = tf.browser.fromPixels(image, 3).resizeBilinear([MODEL_HEIGHT,MODEL_WIDTH]).toFloat();	
  let offset = tf.scalar(255);
  imageTensor = tensor.div(offset).expandDims(0);
  // imageTensor = imageTensor.transpose([0, 3, 1, 2]);
  return imageTensor;
}

//-----------------------
// clear button event
//-----------------------

$("#clear-button").click(function clear() {
	location.reload();
});