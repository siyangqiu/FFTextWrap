
//    //For debugging on desktop where there are no Touch Events. 
//    document.addEventListener('click', function(event) {
//      console.log("click")
//      document.getElementById('FFTW').innerHTML = 'p,li,a,h1,h2,h3,h4,h5,h6 {   max-width: ' + window.innerWidth +'px;  }';
//    }, false);

document.addEventListener('touchend', function(event) {
    resize(event);
  }, false);

var css = 'p,li,a,h1,h2,h3,h4,h5,h6 {   max-width: ' + window.innerWidth + 10 + 'px;  }';

var init = function () {
//  console.log("init ready");
    var styleNode = document.createElement('style');
    styleNode.type = "text/css";
    styleNode.id = "FFTW";
    styleNode.innerHTML = 'p,li,a,h1,h2,h3,h4,h5,h6 {   max-width: ' + window.innerWidth +'px;  }';
    document.getElementsByTagName('head')[0].appendChild(styleNode);
} 

var resize = function(ev) {

    if(ev.touches.length == 1) {
        console.log('resizing!')
        document.getElementById('FFTW').innerHTML = 'p,li,a,h1,h2,h3,h4,h5,h6 {   max-width: ' + window.innerWidth +'px;  }';
    }
}
init();