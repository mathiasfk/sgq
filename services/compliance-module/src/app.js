var express = require('express');
var app = express();

app.get('/*', function(req, res) {
  res.send('Olá do módulo de compliance!');
});

app.listen(3002, function() {
  console.log('Módulo de compliance escutando na porta 3002!');
});