var express = require('express');
var app = express();

app.get('/*', function(req, res) {
  res.send('Olá do módulo de processos automotivos!');
});

app.listen(3005, function() {
  console.log('Módulo de processos automotivos escutando na porta 3005!');
});