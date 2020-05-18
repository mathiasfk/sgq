var express = require('express');
var app = express();

const db = require('./db');

app.get('/', function(req, res) {
  res.send('Olá do módulo de incedentes e problemas!');
});

// API REST

// incident_type
// GET
app.get('/incident_type', function(req, res) {
  db.execSQLQuery('SELECT * FROM incident_type;', res);
});
// GET
app.get('/incident_type/:id', function(req, res) {
  db.execSQLQuery('SELECT * FROM incident_type WHERE id =' + req.params.id, res);
});
// POST
app.post('/incident_type', function(req, res) {
  db.execSQLQuery('INSERT INTO incident_type (id, incident_name) VALUES (NULL, "' + req.query.name + '");', res);
});
// PUT
app.put('/incident_type/:id', function(req, res) {
  res.status(501).send('not implemented');
});
// DELETE
app.delete('/incident_type/:id', function(req, res) {
  db.execSQLQuery('DELETE FROM incident_type WHERE id =' + req.params.id, res);
});


// incident
// GET
app.get('/incident', function(req, res) {
  db.execSQLQuery('SELECT * FROM incident;', res);
});
// GET 
app.get('/incident/:id', function(req, res) {
  db.execSQLQuery('SELECT * FROM incident WHERE id =' + req.params.id, res);
});
// POST 
app.post('/incident', function(req, res) {
  db.execSQLQuery('INSERT INTO incident (id, incident_type, incident_time, comments) VALUES (NULL, ' + req.query.type + ',NOW(),"' + req.query.comments + '");', res);
});
// PUT
app.put('/incident/:id', function(req, res) {
  res.status(501).send('not implemented');
});
// DELETE
app.delete('/incident/:id', function(req, res) {
  db.execSQLQuery('DELETE FROM incident WHERE id =' + req.params.id, res);
});

// incident_conseq_type
// GET
app.get('/incident_conseq_type', function(req, res) {
  db.execSQLQuery('SELECT * FROM incident_conseq_type;', res);
});
// GET 
app.get('/incident_conseq_type/:id', function(req, res) {
  db.execSQLQuery('SELECT * FROM incident_conseq_type WHERE id =' + req.params.id, res);
});
// POST 
app.post('/incident_conseq_type', function(req, res) {
  db.execSQLQuery('INSERT INTO incident_conseq_type (id, consequence_name) VALUES (NULL, ' + req.query.type + ',NOW(),"' + req.query.name + '");', res);
});
// PUT
app.put('/incident_conseq_type/:id', function(req, res) {
  res.status(501).send('not implemented');
});
// DELETE
app.delete('/incident_conseq_type/:id', function(req, res) {
  db.execSQLQuery('DELETE FROM incident_conseq_type WHERE id =' + req.params.id, res);
});

// incident_conseq
// GET
app.get('/incident_conseq', function(req, res) {
  db.execSQLQuery('SELECT * FROM incident_conseq;', res);
});
// GET 
app.get('/incident_conseq/:id', function(req, res) {
  db.execSQLQuery('SELECT * FROM incident_conseq WHERE id =' + req.params.id, res);
});
// POST 
app.post('/incident_conseq', function(req, res) {
  db.execSQLQuery('INSERT INTO incident_conseq (id, incident_id, consequence_type) VALUES (NULL, ' + req.query.incident_id + ',"' + req.query.consequence_type + '");', res);
});
// PUT
app.put('/incident_conseq/:id', function(req, res) {
  res.status(501).send('not implemented');
});
// DELETE
app.delete('/incident_conseq/:id', function(req, res) {
  db.execSQLQuery('DELETE FROM incident_conseq WHERE id =' + req.params.id, res);
});


// Start server
app.listen(3004, function() {
  console.log('Módulo de incidentes e problemas escutando na porta 3004!');
});