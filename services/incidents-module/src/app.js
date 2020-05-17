var express = require('express');
var app = express();

app.get('/*', function(req, res) {
  res.send('Olá do módulo de incedentes e problemas!');
});

app.listen(3004, function() {
  console.log('Módulo de incidentes e problemas escutando na porta 3004!');
});