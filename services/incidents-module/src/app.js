var express = require('express');
var app = express();
var amqp = require('amqplib/callback_api');

const db = require('./db');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());

app.get('/', function(req, res) {
  res.send('Olá do módulo de incedentes e problemas!!!!!!');
});

// API REST
// incident
// GET
app.get('/incident', function(req, res) {
  db.execSQLQuery('SELECT id, incident_type, DATE_FORMAT(incident_time, "%d/%m/%Y") as incident_time, `status`, comments  FROM incident;', res);
});
// GET 
app.get('/incident/:id', function(req, res) {
  db.execSQLQuery('SELECT * FROM incident WHERE id =' + req.params.id, res);
});
// POST 
app.post('/incident', function(req, res) {
  let insertIncident = 'INSERT INTO incident (id, incident_type, incident_time, comments, `status`) VALUES (NULL, ' + req.body.type + ',NOW(),"' + req.body.comments + '","' + req.body.status + '");'
  let insertsItems = ``
  req.body.consequence_type.forEach(item => {
    console.log(item);
    insertsItems += 
    `INSERT INTO incident_conseq (id, incident_id, consequence_type) VALUES (NULL,@incident_id,${item});
    `;
  });

  db.execMultipleStatements(`
  ${insertIncident}
  SET @incident_id = LAST_INSERT_ID();
  ${insertsItems}
  `, res);  

  amqp.connect('amqp://guest:guest@rabbitmq:5672', function (err, conn) {
    console.log(err);
    conn.createChannel(function (err, ch) {
        var q = 'incidents';
        var msg = 'Novo incidente criado!';
        ch.assertQueue(q, { durable: false });     
        ch.sendToQueue(q, new Buffer(msg));
        console.log(" [x] Sent %s", msg);
    });
    setTimeout(function () { conn.close(); process.exit(0) }, 500);
  });
});
// PUT
app.put('/incident/:id', function(req, res) {
  db.execSQLQuery('UPDATE incident SET incident_type = "' + req.body.type + '", ' +
  'comments = "' + req.body.comments + '",' +
  '`status` = "' + req.body.status + '" WHERE id =' + req.params.id, res);
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
  db.execSQLQuery('INSERT INTO incident_conseq_type (id, consequence_name) VALUES (NULL,"' + req.query.name + '");', res);
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
  db.execSQLQuery('DELETE FROM incident_conseq WHERE incident_id =' + req.params.id, res);
});

//Get the last incident
app.get('/last_incident', function(req, res) {
  db.execSQLQuery('SELECT * FROM incident ORDER BY incident_time DESC limit 1', res);
});

//Get the number of open incidents
app.get('/incidents_number', function(req, res) {
  db.execSQLQuery('SELECT COUNT(*) as total FROM incident WHERE `status` <> "Finalizado";', res);
});

app.get('/incidents_per_month', function(req, res) {
  db.execSQLQuery('SELECT COUNT(*) as total, MONTH(incident_time) as mes FROM incident WHERE YEAR(incident_time) = YEAR(NOW()) GROUP BY MONTH(incident_time);', res);
});

// Start server
app.listen(3004, function() {
  console.log('Módulo de incidentes e problemas escutando na porta 3004!');
});