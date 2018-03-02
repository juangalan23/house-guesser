var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : process.env.DB_URL || 'house-guesser.cw0klusijyxh.us-east-2.rds.amazonaws.com',
  user     : 'juangalan23',
  password : 'juangalan',
  database : 'housing'
});

connection.connect((err) => {
  if(err) {
    console.log('err connecting to the db')
  } else {
    console.log('connected to the db')
  }
})

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
  connection.query(`INSERT INTO pictures (link, zpid) VALUES( '${url}', '${zpid}' )`, function(err, res) {
    if (err) {
      callback(err, res);
    } else {
      callback(err, res);
    }
  });
};

var saveHouseToDb = function(zpid, housevalue, areavalue, street, state, city, zipcode, bedroom, bathrooms, year, callback) {
  connection.query(`INSERT INTO 
  houses (zpid, housevalue, areavalue, street, stateInitials, 
    city, zipcode, bedrooms, bathrooms, year)
    VALUES ('${zpid}', '${housevalue}', '${areavalue}', '${street}', '${state}', 
    '${city}', '${zipcode}', '${bedroom}', '${bathrooms}', '${year}')`, 
    function(err, res) {
      if (err) {
        callback(err, res);
      } else {
        callback (err, res);
      }
    })
}

module.exports.saveHouseToDb = saveHouseToDb;
module.exports.selectAll = selectAll;
module.exports.connection = connection;
module.exports.saveImageToDb = saveImageToDb;
