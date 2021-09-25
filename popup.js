document.addEventListener('DOMContentLoaded', function () {
    var checkPageButton = document.getElementById('btnGetDate');
    checkPageButton.addEventListener('click', clicked);
}, false);

function clicked(){
    var dateControl = document.querySelector('input[type="date"]');
    console.log(dateControl.value);
    let parms = {
        active:true, 
        currentWindow: true
    }
    chrome.tabs.query(parms, gotTabs);

    function gotTabs(tabs){
        let message = dateControl.value;
        chrome.tabs.sendMessage(tabs[0].id, message);
    }
}
