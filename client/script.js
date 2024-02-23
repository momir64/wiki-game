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

function resize() {
    document.getElementById("footer").style.display = window.innerHeight > 550 ? "inherit" : "none";
}

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