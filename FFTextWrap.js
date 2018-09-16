'use strict';

//Default values - Not applicable if values are available in storage;
var tags = 'p,li,ul,a,h1,h2,h3,h4,h5,h6,tr,td,th,label';
var margin = 10;
var enableTrack = true;
var focus = 'center';
var doubleTapZoom = true;

//Parameters
const delay = 3;

//Variable Declarations
var topElement;
var startDistance;
var lastDistance;

//Functions "Library"

//Setup: 1. create style tag for later CSS injection. 2. Read values from storage if available.
var init = function () {
    var styleNode = document.createElement('style');
    styleNode.type = 'text/css';
    styleNode.id = 'FFTW';
    document.getElementsByTagName('head')[0].appendChild(styleNode);

    var getSettings = browser.storage.local.get(['viewTracking', 'trackElement', 'tapZoom', 'margin', 'p', 'li', 'ul', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'tr', 'td', 'th']);
    getSettings.then(onGetSettings, onError);

};

//Call this function to reflow page.
var reflow = function () {
    //Give browser chance to recompute window.innerWidth before resizing 
    if (enableTrack === true && lastDistance > startDistance) {
        if (focus === 'center') {
            topElement = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
        } else if (focus === 'natural') {
            topElement = document.elementFromPoint(20, 20);
        } else {
            topElement = document.elementFromPoint(0, 0);
        }
        setTimeout(function () {
            document.getElementById('FFTW').innerHTML = tags + '{   max-width: ' + (window.innerWidth - margin) + 'px;  }';
            topElement.scrollIntoView();
        }, delay);
    } else {
        setTimeout(function () {
            document.getElementById('FFTW').innerHTML = tags + '{   max-width: ' + (window.innerWidth - margin) + 'px;  }';
        }, delay);
    }
};

//After getting settings, override default parameters
var onGetSettings = function (settings) {
    if (Object.keys(settings).length !== 0) {
        enableTrack = settings.viewTracking;

        focus = settings.trackElement;

        doubleTapZoom = settings.tapZoom;

        if (typeof settings.margin === 'number') {
            margin = settings.margin;
        }
        tags = '';
        for (var key in settings) {
            if (key != 'margin' && key != 'trackElement' && key != 'viewTracking' && key != 'tapZoom' && settings[key] === true) {
                tags += key + ',';
            }
        }
        tags = tags.substring(0, tags.length - 1);
    }
    if (doubleTapZoom === true) {
        tapZoom();
    }
}

var onError = function (error) {
    console.log(`Error: ${error}`);
}

//"Main"/Runtime start

//call initial setup code
init();

//add listener for when the user ends the pinch to zoom (i.e. when the user drops down to 1 finger on the screen). Fire reflow event
document.addEventListener('touchend', function (event) {
    if (event.touches.length == 1) {
        reflow();
    }
}, {
    passive: true,
    capture: false
});

//add listener to determine start distance
document.addEventListener('touchstart', function (event) {
    if (event.touches.length === 2) {
        startDistance = Math.hypot(event.touches[0].pageX - event.touches[1].pageX, event.touches[0].pageY - event.touches[1].pageY);
    }
}, {
    passive: true,
    capture: false
});

//add listener to determine end distance
document.addEventListener('touchmove', function (event) {
    if (event.touches.length === 2) {
        lastDistance = Math.hypot(event.touches[0].pageX - event.touches[1].pageX, event.touches[0].pageY - event.touches[1].pageY);
    }
}, {
    passive: true,
    capture: false
});

function tapZoom() {
    var lastTap = 0;
    var doubleTap = false;
    document.addEventListener('touchend', function (event) {
        if (event.touches.length == 0) {
            lastTap = new Date().getTime();
        }
        if (event.touches.length == 0 && doubleTap == true) {
            doubleTap = false;
            reflow();
        }
    }, {
        passive: true,
        capture: false
    });

    document.addEventListener('touchstart', function (event) {
        if ((new Date().getTime() - lastTap) < 300) {
            doubleTap = true;
        }
    }, {
        passive: true,
        capture: false
    });
}

//Debugging

//For debugging on desktop where there are no Touch Events. 
// document.addEventListener('click', function (event) {
//     console.log('click');
//     reflow();
// }, false);