let net;
const classifier = knnClassifier.create();
const webcamElement = document.getElementById('webcam');
// const modelUrl = 'https://tfhub.dev/google/imagenet/mobilenet_v2_140_224/classification/2';

async function app() {
  console.log('Loading mobilenet..');

  // Load the model.
  net = await mobilenet.load();
  net1 = net.model;
  console.log(net1);
  // const model = await tf.loadGraphModel(modelUrl, {fromTFHub: true}
  console.log('Successfully loaded model');
  console.log(net);
  // await net1.save('indexeddb://my-model');

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
  document.getElementById('SAVE').addEventListener('click', () => net1.save('indexeddb://my-model'));
  document.getElementById('LOAD').addEventListener('click', () => net.model=tf.loadGraphModel('indexeddb://my-model'));

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
}

app();