var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'skate',
  database : 'housing'
});

var selectAll = function(callback) {
  connection.query('SELECT * FROM items', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var saveImageToDb = function(url, zpid, callback) {
  connection.query(`INSERT INTO pictures (link, zpid) VALUES( '${url}', ${zpid} )`, function(err, res) {
    if (err) {
      callback(err, res);
    } else {
      callback(err, res);
    }
  });
};



module.exports.selectAll = selectAll;
module.exports.connection = connection;
module.exports.saveImageToDb = saveImageToDb;
