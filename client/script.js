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

let socket = new WebSocket('ws://localhost:8080');

socket.onopen = function (e) {
    console.log("[open] Connection established");
    console.log("Sending to server");
    socket.send("My name is John");
};

socket.onmessage = function (event) {
    console.log(`[message] Data received from server: ${event.data}`);
};

socket.onclose = function (event) {
    if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        console.log('[close] Connection died');
    }
};

socket.onerror = function (error) {
    console.log(`[error]`);
};

function pickFromQueue() {

}

function clearQueue() {

}

async function getRandomArticle() {
    var url = Math.random() < 0.33 ? 'https://en.wikipedia.org/wiki/Special:RandomInCategory/Featured_articles' : 'https://en.wikipedia.org/wiki/Special:RandomInCategory/Good_articles';
    var response = await fetch(url, {
        method: 'GET',
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
    });
    console.log(response.headers);
    // iframe = document.getElementById("frame");
    // iframe.src = url;
}

function addArticleToQueue() {

}