var express = require('express');
var app = express();

app.get('/*', function(req, res) {
  res.send('Olá do módulo de Business Inteligence!');
});

app.listen(3001, function() {
  console.log('Módulo de Business Inteligence escutando na porta 3001!');
});