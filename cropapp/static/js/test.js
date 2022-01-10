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
const startStreamingVideo = () => {
  const video = document.querySelector( "#video" );
  if( navigator.mediaDevices.getUserMedia ){
    navigator.mediaDevices.getUserMedia( { video: true } )
    .then( ( stream ) => {
        video.srcObject = stream;
    } );
  }
}
startStreamingVideo();