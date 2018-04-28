"use strict";

//Parameters
var tags = 'p,li,a,h1,h2,h3,h4,h5,h6,tr,td,th';
var margin = 10;
var enableTrack = true; //experimental feature to prevent jumping after reflowing text
var focus = 'top'; //which element to track after zoom (center, top, natural). DEFAULT is top

//Code Start

var init = function () {
    var styleNode = document.createElement('style');
    styleNode.type = "text/css";
    styleNode.id = "FFTW";
    document.getElementsByTagName('head')[0].appendChild(styleNode);
};

var resize = function() {
    if(enableTrack === true && lastDistance > startDistance) {
        trackPage();
        document.getElementById('FFTW').innerHTML = tags + '{   max-width: ' + ( window.innerWidth - margin ) + 'px;  }';
        topElement.scrollIntoView();
    } else {
        document.getElementById('FFTW').innerHTML = tags + '{   max-width: ' + ( window.innerWidth - margin ) + 'px;  }';
    }
};

//Runtime

init();

document.addEventListener('touchend', function(event) {
    if(event.touches.length == 1) {
        resize();
    }
}, false);

//Optional features

if(enableTrack === true) {
    var topElement;
    var startDistance;
    var lastDistance;

    var trackPage = function() {
        if(focus == 'center') {
            topElement = document.elementFromPoint(window.innerWidth/2,window.innerHeight/2);
        } else if (focus == 'natural'){
            topElement = document.elementFromPoint(20,20);
        } else {
            topElement = document.elementFromPoint(0,0);
        }
    };

    document.addEventListener('touchstart', function(event) {
        if(event.touches.length == 2) {
            startDistance = Math.hypot(event.touches[0].pageX-event.touches[1].pageX,event.touches[0].pageY-event.touches[1].pageY);
        }
    }, false);

    document.addEventListener('touchmove', function(event) {
        if(event.touches.length == 2) {
            lastDistance = Math.hypot(event.touches[0].pageX-event.touches[1].pageX,event.touches[0].pageY-event.touches[1].pageY);
        }
        
    }, false);
}

//Debugging

//For debugging on desktop where there are no Touch Events. 
// document.addEventListener('click', function (event) {
//     console.log("click");
//     resize();
// }, false);
