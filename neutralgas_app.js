var express = require('express');
var app = express();

var stripe = require('stripe')(
  require('./config.js').STRIPE_SK
);

app.get('/pay', function (req, res) {
  stripe.charges.create({
    amount: req.query.amount,
    currency: 'usd',
    source: req.query.tok,
    email: req.query.email,
    description: 'Charge for micro carbon offset - ' + req.query.email,
  }, function(err, charge) {
    // asynchronously called
    if (err) {
      res.send('error');
      return;
    }
    res.send('ok');
  });
});

var server = app.listen(4111, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
