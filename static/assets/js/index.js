window.addEventListener('load', function(){
    var theHeight = Math.max(document.getElementById('index-alert-info').offsetHeight, document.getElementById('index-download-button').offsetHeight) + 'px';
    document.getElementById('index-alert-info').style.height = theHeight;
    document.getElementById('index-download-button').style.height = theHeight;
});
