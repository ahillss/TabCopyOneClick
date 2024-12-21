async function addToClipboard(value) {
    await chrome.offscreen.createDocument({
        url:'offscreen.html',
        reasons:[chrome.offscreen.Reason.CLIPBOARD],
        justification:'Write text to the clipboard.'
    });
    
    chrome.runtime.sendMessage({ 
        type: 'copy-data-to-clipboard', 
        target: 'offscreen-doc', 
        data: value 
    });
}

function get_tabs(ts) {
    try {
        var eol = (navigator.platform.indexOf('Win') !== -1)?'\r\n' : '\n';
        var str = '';
        for(var i=0;i<ts.length;i++) { str += ts[i].url + eol; }
        
        //navigator.clipboard.writeText(str);
        addToClipboard(str);
        
        chrome.action.setIcon({path: {'64': '/icon/icon64b.png'}});        
        setTimeout(function(){ chrome.action.setIcon({path: {'64': '/icon/icon64a.png'}}); }, 125);
    } catch (ex) {
        console.error(ex);
    }
}

chrome.action.onClicked.addListener(function(tab) {
    chrome.tabs.query({windowId:tab.windowId,highlighted:true}, function(ts) {
        if(ts.length==1) {
            chrome.tabs.query({windowId:tab.windowId}, get_tabs);
        } else {
            get_tabs(ts);
        }            
    });
});