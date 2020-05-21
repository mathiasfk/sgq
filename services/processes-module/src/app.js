var express = require('express');
var app = express();
app.use(express.json());

const db = require('./db');

app.get('/', function(req, res) {
  res.send('Olá do módulo de processos automotivos!');
});

// API REST

// checklist_item
// GET
app.get('/checklist_item', function(req, res) {
  db.execSQLQuery('SELECT * FROM checklist_item;', res);
});
// GET
app.get('/checklist_item/:id', function(req, res) {
  db.execSQLQuery('SELECT * FROM checklist_item WHERE id =' + req.params.id, res);
});
// POST
app.post('/checklist_item', function(req, res) {
  db.execSQLQuery('INSERT INTO checklist_item (id, item_name) VALUES (NULL, "' + req.query.name + '");', res);
});
// PUT
app.put('/checklist_item/:id', function(req, res) {
  res.status(501).send('not implemented');
});
// DELETE
app.delete('/checklist_item/:id', function(req, res) {
  db.execSQLQuery('DELETE FROM checklist_item WHERE id =' + req.params.id, res);
});


// checklist_answer
// GET
app.get('/checklist_answer', function(req, res) {
  db.execSQLQuery('SELECT * FROM checklist_answer;', res);
});
// GET 
app.get('/checklist_answer/:id', function(req, res) {
  db.execSQLQuery(`
    SELECT item_id, answer FROM processes_db.checklist_answer_item
    WHERE answer_id = ${req.params.id};
  `, res);
});
// POST 
app.post('/checklist_answer', function(req, res) {

  let insertsItems = `
  SET @answer_id = LAST_INSERT_ID();`;
  req.body.forEach(item => {
    console.log(item);
    insertsItems += 
    `INSERT INTO processes_db.checklist_answer_item (id, answer_id, item_id, answer) VALUES (NULL,@answer_id,${item.item_id},${item.answer});
    `;
  });

  db.execMultipleStatements(`
  INSERT INTO processes_db.checklist_answer (id, answer_time) VALUES (NULL, now());
  ${insertsItems}
  `, res);
});
// PUT
app.put('/checklist_answer/:id', function(req, res) {
  res.status(501).send('not implemented');
});
// DELETE
app.delete('/checklist_answer/:id', function(req, res) {
  db.execSQLQuery('DELETE FROM checklist_answer WHERE id =' + req.params.id, res);
});

app.listen(3006, function() {
  console.log('Módulo de processos automotivos escutando na porta 3006!');
});