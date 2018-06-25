function saveOptions(e) {
    e.preventDefault();
    browser.storage.local.set({
        viewTracking: document.querySelector("#ViewTracking").checked,
        trackElement: document.querySelector("#TrackElement").value,
        tapZoom: document.querySelector("#TapZoom").checked,
        margin: parseInt(document.querySelector("#Margin").value),
        p: document.querySelector("#p").checked,
        li: document.querySelector("#li").checked,
        ul: document.querySelector("#ul").checked,
        a: document.querySelector("#a").checked,
        h1: document.querySelector("#h1").checked,
        h2: document.querySelector("#h2").checked,
        h3: document.querySelector("#h3").checked,
        h4: document.querySelector("#h4").checked,
        h5: document.querySelector("#h5").checked,
        h6: document.querySelector("#h6").checked,
        tr: document.querySelector("#tr").checked,
        td: document.querySelector("#td").checked,
        th: document.querySelector("#th").checked
    });
    document.querySelector("#saved").style = 'text-align: center; border: 1px solid #c3e6cb; background-color: #d4edda; border-radius: .25rem; opacity:100;';
    setTimeout(function () {
        document.querySelector("#saved").style = 'text-align: center; border: 1px solid #c3e6cb; background-color: #d4edda; border-radius: .25rem; opacity:0;-moz-transition: opacity 2s ease-in-out;';
    }, 1);
}

function restoreOptions() {
    var gettingItem = browser.storage.local.get(['viewTracking', 'trackElement', 'tapZoom', 'margin', 'p', 'li', 'ul', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'tr', 'td', 'th']);
    gettingItem.then(onGetSettings, onError);

    function onGetSettings(res) {
        if (res.viewTracking === undefined) {
            document.querySelector("#ViewTracking").checked = true;
            document.querySelector("#TrackElement").value = 'center';
            document.querySelector("#TapZoom").checked = true;
            document.querySelector("#Margin").value = 10;
            document.querySelector("#p").checked = true;
            document.querySelector("#li").checked = true;
            document.querySelector("#ul").checked = true;
            document.querySelector("#a").checked = true;
            document.querySelector("#h1").checked = true;
            document.querySelector("#h2").checked = true;
            document.querySelector("#h3").checked = true;
            document.querySelector("#h4").checked = true;
            document.querySelector("#h5").checked = true;
            document.querySelector("#h6").checked = true;
            document.querySelector("#tr").checked = true;
            document.querySelector("#td").checked = true;
            document.querySelector("#th").checked = true;
        } else {
            document.querySelector("#ViewTracking").checked = res.viewTracking;
            document.querySelector("#TrackElement").value = res.trackElement;
            document.querySelector("#TapZoom").checked = res.tapZoom;
            document.querySelector("#Margin").value = res.margin;
            document.querySelector("#p").checked = res.p;
            document.querySelector("#li").checked = res.li;
            document.querySelector("#ul").checked = res.ul;
            document.querySelector("#a").checked = res.a;
            document.querySelector("#h1").checked = res.h1;
            document.querySelector("#h2").checked = res.h2;
            document.querySelector("#h3").checked = res.h3;
            document.querySelector("#h4").checked = res.h4;
            document.querySelector("#h5").checked = res.h5;
            document.querySelector("#h6").checked = res.h6;
            document.querySelector("#tr").checked = res.tr;
            document.querySelector("#td").checked = res.td;
            document.querySelector("#th").checked = res.th;
        }
    };

    function onError(res) {
        console.log(res);
    }
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("change", saveOptions);