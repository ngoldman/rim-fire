var shp = require('shp');
var server = require('./server');
var port = process.env.PORT || 3000;
var douglasCountyTaxLots = shp.readFileSync('./data/UBE_Douglas_County_Taxlots/UBE_Douglas_County_Taxlots');

function serveData() {
  this.res.writeHead(200, { 'Content-Type': 'application/json' });
  this.res.end(JSON.stringify(douglasCountyTaxLots));
}

server.router.get('/data', serveData);
server.start({ name: 'rim fire', port: port });