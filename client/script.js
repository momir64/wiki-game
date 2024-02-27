var socket = new WebSocket('ws://localhost:8771');
const separator = "$"
var article = "";

window.onpopstate = function () {
    alert("clicked back button");
};
history.pushState({}, '');

socket.onmessage = function (event) {
    parts = event.data.split(separator)
    if (parts[0] == 'get') {
        article = parts[1];
        document.getElementById("frame").contentWindow.location.replace(article);
        document.getElementById("articleName").value = decodeURI(article.split('/').pop()).replaceAll('_', ' ');


    } else if (parts[0] == 'add') {


    } else if (parts[0] == 'pick') {


    } else if (parts[0] == 'queue') {
        document.getElementById("articleCount").textContent = parts[1];
    }
};

function pickFromQueue() {
    socket.send("pick");
}

function clearQueue() {
    socket.send("clear");
}

function getRandomArticle() {
    socket.send("get");
}

function addArticleToQueue() {
    socket.send(`add${separator}${article}`);
}

function changeColor(id, color) {
    document.getElementById(id).style.backgroundColor = color;
}

function showFirstPage(show) {
    document.getElementById("pickerPage").style.display = show ? "inherit" : "none";
    document.getElementById("addPage").style.display = !show ? "inherit" : "none";
    document.getElementById("counter").style.display = show ? "inherit" : "none";
    document.getElementById("pickPageSvg").style.fill = show ? "white" : "#999";
    document.getElementById("addPageSvg").style.fill = !show ? "white" : "#999";
}