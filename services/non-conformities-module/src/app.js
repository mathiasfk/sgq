var express = require('express');
var app = express();

const db = require('./db');
const cors = require('cors');
app.use(cors()); // cross origin resource sharing
app.use(express.json());
app.options('*', cors()); // include before other routes


app.get('/', function(req, res) {
  res.send('Olá do módulo de não conformidades!');
});

// API REST

// non_conformity_type
// GET
app.get('/non_conformity_consequences', function(req, res) {
  db.execSQLQuery('SELECT * FROM non_conformity_consequences;', res);
});
// GET
app.get('/non_conformity_consequences/:id', function(req, res) {
  db.execSQLQuery('SELECT * FROM non_conformity_consequences WHERE non_conformity_id =' + req.params.id, res);
});
// POST
app.post('/non_conformity_consequences', function(req, res) {
  db.execSQLQuery('INSERT INTO non_conformity_consequences (id, non_conformity_name) VALUES (NULL, "' + req.query.name + '");', res);
});
// PUT
app.put('/non_conformity_consequences/:id', function(req, res) {
  let insertsConsequenceItem = '';
  req.body.consequences.forEach(consequence => {
    insertsConsequenceItem += 
    `INSERT INTO non_conformity_consequences (id, non_conformity_id, consequence_description) VALUES (NULL,${req.params.id},'${consequence}');
    `;
  });

  db.execMultipleStatements(`
  DELETE FROM non_conformity_consequences WHERE non_conformity_id ='${req.params.id}';
  ${insertsConsequenceItem}
  `, res);
});
// DELETE
app.delete('/non_conformity_consequences/:id', function(req, res) {
  db.execSQLQuery('DELETE FROM non_conformity_name WHERE non_conformity_id =' + req.params.id, res);
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
  let insertsConsequenceItem = '';
  req.body.consequences.forEach(consequence => {
    insertsConsequenceItem += 
    `INSERT INTO non_conformity_consequences (id, non_conformity_id, consequence_description) VALUES (NULL,@non_conformity,'${consequence}');
    `;
  });
  //TODO: verificar se o usuário está autenticado
  db.execMultipleStatements(`
  INSERT INTO non_conformity (id, non_conformity_name, non_conformity_time, comments, resource) VALUES (NULL,'${req.body.non_conformity_name}',NOW(),'${req.body.description}','${req.body.resource}');
  SET @non_conformity = LAST_INSERT_ID();
  ${insertsConsequenceItem}
  `, res);
});
// PUT
app.put('/non_conformity/:id', function(req, res) {
  db.execSQLQuery('UPDATE non_conformity SET non_conformity_name = "' + req.body.non_conformity_name + '", ' +
  'comments = "' + req.body.description + '",' +
  '`resource` = "' + req.body.resource + '" WHERE id =' + req.params.id, res);
});
// DELETE
app.delete('/non_conformity/:id', function(req, res) {
  db.execSQLQuery('DELETE FROM non_conformity WHERE id =' + req.params.id, res);
});

// Start server
app.listen(3005, function() {
  console.log('Módulo de não conformidades escutando na porta 3005!');
});