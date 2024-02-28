var socket = new WebSocket('ws://192.168.0.10:8771');
var firstTimeQueue = true;
var firstTimeGet = true;
const separator = '$'
var article = '';

function getNameFromUrl(url) {
    return decodeURI(url.split('/').pop()).replaceAll('_', ' ');
}

function setArticle() {
    document.getElementById('frame').contentWindow.location.replace(article);
    document.getElementById('articleName').value = getNameFromUrl(article);
}

window.onpopstate = function () {
    article = history.state;
    setArticle();
};

socket.onmessage = function (event) {
    parts = event.data.split(separator)
    if (parts[0] == 'get') {
        article = parts[1];
        setArticle();
        if (firstTimeGet) {
            history.replaceState(article, '');
            firstTimeGet = false;
        } else
            history.pushState(article, '');
    } else if (parts[0] == 'pick') {
        document.getElementById('pickedArticle').textContent = getNameFromUrl(parts[1]);
    } else if (parts[0] == 'queue') {
        document.getElementById('articleCount').textContent = parts[1];
        if (firstTimeQueue && parts[1] !== '0') {
            document.getElementById('pickedArticle').textContent = 'Pick article from the queue';
            firstTimeQueue = false;
        }
    }
};

function pickFromQueue() {
    socket.send('pick');
}

function clearQueue() {
    socket.send('clear');
}

function getRandomArticle() {
    socket.send('get');
}

function addArticleToQueue() {
    socket.send(`add${separator}${article}`);
}

function changeColor(id, color) {
    document.getElementById(id).style.backgroundColor = color;
}

function showFirstPage(show) {
    document.getElementById('pickerPage').style.display = show ? 'inherit' : 'none';
    document.getElementById('addPage').style.display = !show ? 'inherit' : 'none';
    document.getElementById('counter').style.display = show ? 'inherit' : 'none';
    document.getElementById('pickPageSvg').style.fill = show ? 'white' : '#999';
    document.getElementById('addPageSvg').style.fill = !show ? 'white' : '#999';
}