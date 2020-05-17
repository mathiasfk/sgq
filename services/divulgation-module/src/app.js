var express = require('express');
var app = express();

app.get('/*', function(req, res) {
  res.send('Olá do módulo de divulgação e transparência!');
});

app.listen(3003, function() {
  console.log('Módulo de divulgação e transparência escutando na porta 3003!');
});