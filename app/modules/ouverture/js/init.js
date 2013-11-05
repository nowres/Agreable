console.log('INIT de: ' + Agreable_Module.name + ' vue: ' + Agreable_Module.view.name);

var header = new Components.HeaderComponent('h1:first');

if (Agreable_Module.view.name == "view_1") {
    setTimeout(function() {
        //Agreable_Module.loadView('view_2.html');
    }, 5000);
} else {
    $('#back').on('click', function() {
        window.history.go(-1);
        //Agreable_Router.route();
    });
}

function cameraGetPicture() {
    navigator.camera.getPicture(imageReceived, cameraFail, {
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI,
        correctOrientation: true,
        targetWidth: 600
    });
}

function imageReceived(imageURI) {
    var image = document.querySelector('img#myImage');
    image.src = imageURI;
}

function cameraFail(message) {
    alert("Camera error: " + message);
}