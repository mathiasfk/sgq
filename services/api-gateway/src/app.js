// Dependencies
const express = require('express');
const httpProxy = require('express-http-proxy');
const helmet = require('helmet');
const logger = require('morgan');

const app = express();
app.use(logger('dev')); // log HTTP requests
app.use(helmet()); // some security

// Proxy configurations
const biProxy = httpProxy('http://bi-module:3001');
const complianceProxy = httpProxy('http://compliance-module:3002');
const divulgationProxy = httpProxy('http://divulgation-module:3003');
const incidentsProxy = httpProxy('http://incidents-module:3004');
const processesProxy = httpProxy('http://processes-module:3005');


// Business Intelligence Module
app.all('/bi*', (req, res, next) => {
  biProxy(req, res, next);
});

// Compliance Module
app.all('/compliance*', (req, res, next) => {
    complianceProxy(req, res, next);
});

// Divulgation Module
app.all('/divulgation*', (req, res, next) => {
  divulgationProxy(req, res, next);
});
  
// Incidents Module
app.all('/incident*', (req, res, next) => {
  incidentsProxy(req, res, next);
});
app.all('/incident_type*', (req, res, next) => {
  incidentsProxy(req, res, next);
});
app.all('/incident_conseq*', (req, res, next) => {
  incidentsProxy(req, res, next);
});
app.all('/incident_conseq_type*', (req, res, next) => {
  incidentsProxy(req, res, next);
});

// Processes Module
app.all('/processes*', (req, res, next) => {
  processesProxy(req, res, next);
});


app.get('/', function(req, res) {
  res.send('Olá do API Gateway!');
});

// Start server
app.listen(3000, function() {
  console.log('API Gateway escutando na porta 3000!');
});