var shp = require('shp');
var server = require('./server');
var port = process.env.PORT || 3000;
var fireJson = shp.readFileSync('./data/USA_contiguous_and_Hawaii_24h');

function serveData() {
  this.res.writeHead(200, { 'Content-Type': 'application/json' });
  this.res.end(JSON.stringify(fireJson));
}

server.router.get('/data', serveData);
server.start({ name: 'rim fire', port: port });