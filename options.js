function saveOptions(e) {
    e.preventDefault();
    browser.storage.local.set({
        viewTracking: document.querySelector("#ViewTracking").checked,
        trackElement: document.querySelector("#TrackElement").value,
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
    setTimeout(function(){
        document.querySelector("#saved").style = 'text-align: center; border: 1px solid #c3e6cb; background-color: #d4edda; border-radius: .25rem; opacity:0;-moz-transition: opacity 2s ease-in-out;';
    }, 1);
}
  
function restoreOptions() {
    var gettingItem = browser.storage.local.get(['viewTracking','trackElement','margin','p','li','ul','a','h1','h2','h3','h4','h5','h6','tr','td','th']);
    gettingItem.then(onGetSettings,onError);
    function onGetSettings(res) {
        document.querySelector("#ViewTracking").checked = res.viewTracking || true;
        document.querySelector("#TrackElement").value = res.trackElement || 'center';
        document.querySelector("#Margin").value = res.margin || 10;
        document.querySelector("#p").checked = res.p || true;
        document.querySelector("#li").checked = res.li || true;
        document.querySelector("#ul").checked = res.ul || true;
        document.querySelector("#a").checked = res.a || true;
        document.querySelector("#h1").checked = res.h1 || true;
        document.querySelector("#h2").checked = res.h2 || true;
        document.querySelector("#h3").checked = res.h3 || true;
        document.querySelector("#h4").checked = res.h4 || true;
        document.querySelector("#h5").checked = res.h5 || true;
        document.querySelector("#h6").checked = res.h6 || true;
        document.querySelector("#tr").checked = res.tr || true;
        document.querySelector("#td").checked = res.td || true;
        document.querySelector("#th").checked = res.th || true;
    };
    function onError(res){
        console.log(res);
    }
}
  
  document.addEventListener("DOMContentLoaded", restoreOptions);
  document.querySelector("form").addEventListener("change", saveOptions); 