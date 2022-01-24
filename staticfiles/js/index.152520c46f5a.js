let net;
const classifier = knnClassifier.create();
const webcamElement = document.getElementById('webcam');
// const modelUrl = 'https://tfhub.dev/google/imagenet/mobilenet_v2_140_224/classification/2';

async function app() {
  console.log('Loading mobilenet..');

  // Load the model.
  net = await mobilenet.load();
  console.log('Successfully loaded model');

  // Create an object from Tensorflow.js data API which could capture image
  // from the web camera as Tensor.
  const webcam = await tf.data.webcam(webcamElement);

  // Reads an image from the webcam and associates it with a specific class
  // index.
  const addExample = async classId => {
    // Capture an image from the web camera.
    const img = await webcam.capture();

    // Get the intermediate activation of MobileNet 'conv_preds' and pass that
    // to the KNN classifier.
    const activation = net.infer(img, true);

    // Pass the intermediate activation to the classifier.
    classifier.addExample(activation, classId);

    // Dispose the tensor to release the memory.
    img.dispose();
  };

  // When clicking a button, add an example for that class.
  document.getElementById('class-a').addEventListener('click', () => addExample(0));
  document.getElementById('class-b').addEventListener('click', () => addExample(1));
  document.getElementById('class-c').addEventListener('click', () => addExample(2));
  document.getElementById('SAVE').addEventListener('click', () => save());
  document.getElementById('LOAD').addEventListener('click', () => load());

  while (true) {
    if (classifier.getNumClasses() > 0) {
      const img = await webcam.capture();

      // Get the activation from mobilenet from the webcam.
      const activation = net.infer(img, 'conv_preds');
      // Get the most likely class and confidence from the classifier module.
      const result = await classifier.predictClass(activation);

      const classes = ['A', 'B', 'C'];
      document.getElementById('console').innerText = `
        prediction: ${classes[result.label]}\n
        probability: ${result.confidences[result.label]}
      `;

      // Dispose the tensor to release the memory.
      img.dispose();
    }

    await tf.nextFrame();
    // await model.save('localstorage://my-model');
  }
};


//save and load function
async function save() {
  let dataset = classifier.getClassifierDataset()
  console.log(dataset);
  var datasetObj = {0:'A', 1:'B', 2:'C'}
  Object.keys(dataset).forEach((key) => {
    let data = dataset[key].dataSync();
    // use Array.from() so when JSON.stringify() it covert to an array string e.g [0.1,-0.2...] 
    // instead of object e.g {0:"0.1", 1:"-0.2"...}
    // console.log(data);
    datasetObj[key] = Array.from(data); 
  });
  console.log(datasetObj);
  let jsonStr = JSON.stringify(datasetObj)
  //can be change to other source
  // console.log(jsonStr);
  localStorage.setItem("myData", jsonStr);
}

async function load() {
  //can be change to other source
 let dataset = localStorage.getItem("myData")
//  console.log(dataset);
 let tensorObj = JSON.parse(dataset)
 //covert back to tensor
 Object.keys(tensorObj).forEach((key) => {
  //  tensorObj[key] = tf.tensor(tensorObj[key], [tensorObj[key].length / 1000, 1000])
  console.log(tensorObj[key]); 
  tensorObj[key] = tf.tensor(tensorObj[key], [3, 1024])
 })
 console.log(tensorObj);
 classifier.setClassifierDataset(tensorObj);
}

app();