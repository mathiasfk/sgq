const mysql      = require('mysql');

function execSQLQuery(sqlQry, res){
  const connection = mysql.createConnection({
    host     : 'non-conformities-db',
    port     : 3306,
    user     : 'sgq',
    password : 'super-secure-password',
    database : 'non_conformities_db'
  });

  connection.query(sqlQry, function(error, results, fields){
    console.log(sqlQry);
    if(error){
      res.status(500).send(error);
      console.log(error);
    }
    else{
      res.json(results);
      console.log('ok');
    }
    connection.end();
  });
}

module.exports = {execSQLQuery};