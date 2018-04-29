"use strict";

//Default values - Not applicable if values are available in storage;
var tags = 'p,li,ul,a,h1,h2,h3,h4,h5,h6,tr,td,th';
var margin = 10;
var enableTrack = true; 
var focus = 'top';

//Code Start

var init = function () {    //Setup: 1. create style tag for later CSS injection. 2. Read values from storage if available. Otherwise
    var styleNode = document.createElement('style');
    styleNode.type = "text/css";
    styleNode.id = "FFTW";
    document.getElementsByTagName('head')[0].appendChild(styleNode);

    var getSettings = browser.storage.local.get("settings");
    getSettings.then(onGetSettings, onError);
};

var resize = function() {   //Call this function to reflow page. 
    if(enableTrack === true && lastDistance > startDistance) {  //if enableTrack (whether View Tracking is enabled), we need to 1. grab current view 2.Inject CSS 3. Scroll to "current view"
        getCurrentView();
        document.getElementById('FFTW').innerHTML = tags + '{   max-width: ' + ( window.innerWidth - margin ) + 'px;  }';
        topElement.scrollIntoView();
    } else { //otherwise, just inject CSS
        document.getElementById('FFTW').innerHTML = tags + '{   max-width: ' + ( window.innerWidth - margin ) + 'px;  }';
    }
};

function onGetSettings(item) { //After getting settings, override default parameters
    if (item != null){
        enableTrack = item.settings[0];
        
        focus = item.settings[1];
        
        if (typeof item.settings[2] === "number") {
            margin = item.settings[2];
        }
        console.log(typeof item.settings[2]);

        var tagNames = ['p','li','ul','a','h1','h2','h3','h4','h5','h6','tr','td','th']; //this list of tags needs to match list in options
        tags = '';
        for (var i = 0; i < tagNames.length; i++) {
            if (item.settings[i+3] === true) {
                tags += tagNames[i] + ',';
            }
        }
        tags = tags.substring(0, tags.length - 1);
        console.log(margin);
    }
}

function onError(error) {
    console.log(`Error: ${error}`);
}

//Runtime

init(); //call initial setup code

document.addEventListener('touchend', function(event) { //add listener for when the user ends the pinch to zoom (i.e. when the user drops down to 1 finger on the screen). Fire resize event
    if(event.touches.length == 1) {
        resize();
    }
}, false);

if(enableTrack === true) {  //if enableTrack (whether View Tracking is enabled), additional code is needed: 1. function for getting the element to track. 2. whether the user zoomed in or out via start distance and end distance
    var topElement;
    var startDistance;
    var lastDistance;

    var getCurrentView = function() {   //function for determining the element to track after zoom
        if(focus == 'center') {
            topElement = document.elementFromPoint(window.innerWidth/2,window.innerHeight/2);
        } else if (focus == 'natural'){
            topElement = document.elementFromPoint(20,20);
        } else {
            topElement = document.elementFromPoint(0,0);
        }
    };

    document.addEventListener('touchstart', function(event) {   //add listener to determine start distance
        if(event.touches.length == 2) {
            startDistance = Math.hypot(event.touches[0].pageX-event.touches[1].pageX,event.touches[0].pageY-event.touches[1].pageY);
        }
    }, false);

    document.addEventListener('touchmove', function(event) {    //add listener to determine end distance
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
