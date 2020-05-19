var express = require('express');
var app = express();

const db = require('./db');

app.get('/', function(req, res) {
  res.send('Olá do módulo de não conformidades!');
});

// API REST

// non_conformity_type
// GET
app.get('/non_conformity_type', function(req, res) {
  db.execSQLQuery('SELECT * FROM non_conformity_type;', res);
});
// GET
app.get('/non_conformity_type/:id', function(req, res) {
  db.execSQLQuery('SELECT * FROM non_conformity_type WHERE id =' + req.params.id, res);
});
// POST
app.post('/non_conformity_type', function(req, res) {
  db.execSQLQuery('INSERT INTO non_conformity_type (id, non_conformity_name) VALUES (NULL, "' + req.query.name + '");', res);
});
// PUT
app.put('/non_conformity_name/:id', function(req, res) {
  res.status(501).send('not implemented');
});
// DELETE
app.delete('/non_conformity_name/:id', function(req, res) {
  db.execSQLQuery('DELETE FROM non_conformity_name WHERE id =' + req.params.id, res);
});


// non_conformity
// GET
app.get('/non_conformity', function(req, res) {
  db.execSQLQuery('SELECT * FROM non_conformity;', res);
});
// GET 
app.get('/non_conformity/:id', function(req, res) {
  db.execSQLQuery('SELECT * FROM non_conformity WHERE id =' + req.params.id, res);
});
// POST 
app.post('/non_conformity', function(req, res) {
  db.execSQLQuery('INSERT INTO non_conformity (id, non_conformity_type, non_conformity_time, item_id, comments) VALUES (NULL, ' + req.query.type + ',NOW(),"' + req.query.item + '","' + req.query.comments + '");', res);
});
// PUT
app.put('/non_conformity/:id', function(req, res) {
  res.status(501).send('not implemented');
});
// DELETE
app.delete('/non_conformity/:id', function(req, res) {
  db.execSQLQuery('DELETE FROM non_conformity WHERE id =' + req.params.id, res);
});

// Start server
app.listen(3005, function() {
  console.log('Módulo de não conformidades escutando na porta 3005!');
});