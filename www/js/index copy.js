
 var firebaseConfig = {
    apiKey: "AIzaSyCt7aN8LyKb3sWyoGw8TH8kCUgBw-0LF1A",
    authDomain: "pruebacordova-a04a8.firebaseapp.com",
    databaseURL: "https://pruebacordova-a04a8.firebaseio.com",
    projectId: "pruebacordova-a04a8",
    storageBucket: "pruebacordova-a04a8.appspot.com",
    messagingSenderId: "22196666098",
    appId: "1:22196666098:web:27b7462132e3b04353da6b"
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

const video = document.getElementById('video')
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
init()