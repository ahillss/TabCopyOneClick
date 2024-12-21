
var eol = (navigator.platform.indexOf("Win") !== -1)?'\r\n' : '\n';

async function addToClipboard(value) {
    await chrome.offscreen.createDocument({url:'offscreen.html',reasons:[chrome.offscreen.Reason.CLIPBOARD],justification:'Write text to the clipboard.'});
    chrome.runtime.sendMessage({ type: 'copy-data-to-clipboard', target: 'offscreen-doc', data: value });
}

//async function addToClipboardV2(value) {  navigator.clipboard.writeText(value); }

function get_tabs(ts) {
    try {
        var str = '';

        for (var i = 0; i < ts.length; i++) {
            if (str.length) {
                str += eol;
            }

            str += ts[i].url;
        }
        
        addToClipboard(str);
                
        chrome.action.setIcon({ path: {"64": "/icon/icon64b.png"} });
        
        setTimeout(function(){
            chrome.action.setIcon({ path: {"64": "/icon/icon64a.png"} });
        }, 150);
    } catch (ex) {
        console.error(ex);
    }
}
chrome.action.onClicked.addListener(function(tab) {
    try {
        chrome.tabs.query({windowId:tab.windowId,highlighted:true}, get_tabs);
    } catch (ex) {
        console.error(ex);
    }
});