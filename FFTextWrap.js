//Parameters
var tags = 'p,li,a,h1,h2,h3,h4,h5,h6,tr,td,th';
var margin = 10; 

//Code Start

var init = function () {
    var styleNode = document.createElement('style');
    styleNode.type = "text/css";
    styleNode.id = "FFTW";
    document.getElementsByTagName('head')[0].appendChild(styleNode);
} 

var resize = function(ev) {
    if(ev.touches.length == 1) {
        document.getElementById('FFTW').innerHTML = tags + '{   max-width: ' + window.innerWidth + margin + 'px;  }';
    }
}

//Runtime

init();

document.addEventListener('touchend', function(event) {
    resize(event);
}, false);

//Debugging

//For debugging on desktop where there are no Touch Events. 
//    document.addEventListener('click', function(event) {
//      console.log("click")
//      document.getElementById('FFTW').innerHTML = 'p,li,a,h1,h2,h3,h4,h5,h6 {   max-width: ' + window.innerWidth +'px;  }';
//    }, false);