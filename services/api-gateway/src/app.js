// Dependencies
const express = require('express');
const httpProxy = require('express-http-proxy');
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');

const app = express();
app.use(cors()); // cross origin resource sharing
app.use(logger('dev')); // log HTTP requests
app.use(helmet()); // some security
app.options('*', cors()); // include before other routes


// Proxy configurations
const authProxy = httpProxy('http://auth-service.sgq:4000');
const biProxy = httpProxy('http://bi-module.sgq:3001');
const complianceProxy = httpProxy('http://compliance-module.sgq:3002');
const divulgationProxy = httpProxy('http://divulgation-module.sgq:3003');
const incidentsProxy = httpProxy('http://incidents-module.sgq:3004');
const nonConformitiesProxy = httpProxy('http://non-conformities-module.sgq:3005');
const processesProxy = httpProxy('http://processes-module.sgq:3006');


// Authentication
app.all('/users*', (req, res, next) => {
  authProxy(req, res, next);
});

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
app.all('/*incident*', (req, res, next) => {
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
const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`API Gateway escutando na porta ${port}!`);
});