const { WebSocket } = require('ws');

const wss = new WebSocket.Server({ port: 8771 });
var possible_articles = []
var picked_articles = []
const separator = "$"
var clients = []
var queue = []

function add_articles(num) {
  for (i = 0; i < num; i++) {
    let url = Math.random() < 0.33 ? 'https://en.wikipedia.org/wiki/Special:RandomInCategory/Featured_articles' : 'https://en.wikipedia.org/wiki/Special:RandomInCategory/Good_articles';
    fetch(url).then(response => {
      if (possible_articles.includes(response.url) || picked_articles.includes(response.url)) {
        // console.log("Get: article already in possible_articles or picked_articles, getting new article");
        add_articles(1);
      } else {
        possible_articles.push(response.url);
        // console.log(`Get: ${possible_articles.length} ${response.url}`);
      }
    });
  }
}

function update_queue() {
  clients.forEach(client => {
    client.send(`queue${separator}${queue.length}`);
    // console.log(`Send: queue${separator}${queue.length}`);
  });
}

function get(ws) {
  let article = possible_articles.pop();
  ws.send(`get${separator}${article}`);
  picked_articles.push(article);
  // console.log(`Send: get${separator}${article}`);
  if (possible_articles.length < 25)
    add_articles(25);
}

add_articles(50);

wss.on('connection', (ws) => {
  clients.push(ws);
  // console.log(`New client ${clients.length}`);
  ws.send(`queue${separator}${queue.length}`);
  // console.log(`Send: queue${separator}${queue.length}`);
  get(ws);

  ws.on('message', (message) => {
    parts = String(message).split(separator)
    if (parts[0] == 'get') {
      get(ws);
    } else if (parts[0] == 'add') {
      if (!queue.includes(parts[1])) {
        queue.push(parts[1]);
        // console.log(`Added to queue: ${parts[1]}`);
        update_queue();
      }
      // else console.log(`Already in queue: ${parts[1]}`);
    } else if (parts[0] == 'pick') {
      let article = queue.length > 0 ? queue.splice(Math.floor(Math.random() * queue.length), 1)[0] : "Queue is empty!";
      // console.log(`Send: pick${separator}${article}`);
      ws.send(`pick${separator}${article}`);
      update_queue();
    } else if (parts[0] == 'clear') {
      // console.log("Queue cleared!");
      queue = [];
      update_queue();
    }
  });

  ws.on('close', () => {
    // console.log("Client disconnected!");
    clients.splice(clients.indexOf(ws), 1);
    setTimeout(() => {
      if (clients < 1) {
        possible_articles = [];
        // console.log("Cleared possible articles!");
        add_articles(50);
      }
    }, 1000 * 60 * 60 * 5);
  });
});

