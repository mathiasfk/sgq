// Dependencies
const express = require('express');
const httpProxy = require('express-http-proxy');
const helmet = require('helmet');
const logger = require('morgan');

const app = express();
app.use(logger('dev')); // log HTTP requests
app.use(helmet()); // some security

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Proxy configurations
const biProxy = httpProxy('http://bi-module:3001');
const complianceProxy = httpProxy('http://compliance-module:3002');
const divulgationProxy = httpProxy('http://divulgation-module:3003');
const incidentsProxy = httpProxy('http://incidents-module:3004');
const nonConformitiesProxy = httpProxy('http://non-conformities-module:3005');
const processesProxy = httpProxy('http://processes-module:3006');


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
  
// Incidents and Problems Module
app.all('/incident*', (req, res, next) => {
  incidentsProxy(req, res, next);
});

// Non-Conformities Module
app.all('/non_conformity*', (req, res, next) => {
  nonConformitiesProxy(req, res, next);
});

// Automotive Processes Module
app.all('/checklist*', (req, res, next) => {
  processesProxy(req, res, next);
});


app.get('/', function(req, res) {
  res.send('Olá do API Gateway!');
});

// Start server
app.listen(3000, function() {
  console.log('API Gateway escutando na porta 3000!');
});