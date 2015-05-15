var express = require('express');
var fs = require('fs');
var app = express();

var stripe = require('stripe')(
  require('./config.js').STRIPE_SK
);

app.get('/', function(req, res) {
  serveFile('home.html', res);
});

app.get('/order', function(req, res) {
  serveFile('order.html', res);
});

app.get('/transparency', function(req, res) {
  serveFile('transparency.html', res);
});

app.get('/pay', function (req, res) {
  stripe.charges.create({
    amount: req.query.amount,
    currency: 'usd',
    source: req.query.tok,
    description: 'Charge for micro carbon offset - ' + req.query.email,
  }, function(err, charge) {
    if (err) {
      console.log(err, charge);
      res.send('error');
      return;
    }
    res.send('ok');
  });
});

function serveFile(path, res) {
  fs.readFile(path, function (err, data){
    res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
    res.write(data);
    res.end();
  });
}

var server = app.listen(4111, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
