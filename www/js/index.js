var app = {
   
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    
    receivedEvent: function(id) {
        document.getElementById("Tomar_foto").onclick=Tomar_foto;
        console.log('Received Event: ' + id);
        document.getElementById("videoCapture").onclick=videoCapture;
        console.log('Received Event: ' + id);
    }
};

function Tomar_foto(){
    navigator.camera.getPicture(onSuccess, onFail, { 
        quality: 90,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        mediaType: Camera.MediaType.PICTURE,
        encodingType: Camera.EncodingType.JPEG,
        cameraDirection: Camera.Direction.FRONT,
        saveToPhotoAlbum: true
        }
    );

    function onSuccess(ruta_de_la_foto) {
        document.getElementById("fotos").innerHTML+=
        "<div class='foto'><img src='"+ruta_de_la_foto+"'></div>"
    }
        function onFail(error) {
       navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    }
}

function videoCapture() {
    var options = {
       limit: 1,
       duration: 10
    };
    navigator.device.capture.captureVideo(onSuccess, onError, options);
 
    function onSuccess(mediaFiles) {
       var i, path, len;
       for (i = 0, len = mediaFiles.length; i < len; i += 1) {
          path = mediaFiles[i].fullPath;
          console.log(mediaFiles);
          document.getElementById("videos").innerHTML+=
        "<div class='video'><video src='"+path+"'></video></div>"
       }
       
    }
 
    function onError(error) {
       navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    }
 }
 app.initialize();
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAi8_3eSHcYq_2zRV4mYztbrkFcg8Suxr4",
    authDomain: "camarawebservice.firebaseapp.com",
    databaseURL: "https://camarawebservice.firebaseio.com",
    projectId: "camarawebservice",
    storageBucket: "camarawebservice.appspot.com",
    messagingSenderId: "995399421069",
    appId: "1:995399421069:web:594cf62f574add7853e6c4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  console.log(firebase)

 function upload(){
        const ref = firebase.storage().ref()
        const file = document.querySelector("#photo").files[0]
        const name = new Date() + '-' + file.name
        const metadata = {
            contentType:file.type
        }
        const task = ref.child(name).put(file,metadata)
        task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            console.log(url)
            alert("UPLOAD SUCCESSFULL")
            //const imageelement = document.createElement('image')
            //imageelement.src 
            const image = document.querySelector('#image')
            image.src = url
        })
 }

/*const video = document.getElementById('video')
const canvas = document.getElementById('canvas')
const snap = document.getElementById('snap')
const constraints = {
    audio: false,
    video: {
        width:400, height:400
    }
}

async function init(){
    try{
        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        handlestream(stream)
    }catch(error){

    }
}
function handlestream(stream){
    window.stream = stream
    video.srcObject = stream
}

var context = canvas.getContext('2d')
snap.addEventListener('click',function(){
    context.drawImage(video,0,0,640,480)
    var image = new Image()
    image.id = 'pic'
    image.src = canvas.toDataURL('image/png')
    console.log(image.src)

    var button = document.createElement('button')

    button.textContent = 'Upload Image'

    document.body.appendChild(button)

    button.onclick = function(){
        const ref = firebase.storage().ref()

        ref.child(new Date() + '-' + 'base64').putString(image.src,'data_url')
        .then(function(snapshot){
            console.log("Image Uploaded")
            alert("IMAGE UPLOADED")
        })
    }
})
init()*/