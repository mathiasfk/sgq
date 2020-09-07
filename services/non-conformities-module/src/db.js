const mysql      = require('mysql');

function initConnection(multipleStatements = false){
  return mysql.createConnection({
    host     : 'non-conformities-db',
    port     : 3306,
    user     : 'sgq',
    password : 'super-secure-password',
    database : 'non_conformities_db',
    multipleStatements: multipleStatements,
    charset: "latin1_swedish_ci"
  });
}

// Connection arg is optional
function execSQLQuery(sql, res = null, conn = null){
  const connection = initConnection(false);
  execAndClose(sql, res, connection);
}

function execMultipleStatements(sql, res = null){
  const connection = initConnection(true);
  execAndClose(sql, res, connection);
}

function execAndClose(sql, res = null, conn = null){
  conn.query(sql, function(error, results, fields){
    console.log(sql);
    if(error){
      if (res)
        res.status(500).send(error);
      else
        return error;
      console.log(error);
    }
    else{
      if (res)
        res.json(results);
      else
        return results;
      console.log('ok');
    }
    conn.end();
  });
}

module.exports = {execSQLQuery, execMultipleStatements};