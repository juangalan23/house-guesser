const mysql = require('mysql');
const config = require('../config.js')

const connection = mysql.createConnection({
  host     : process.env.host || config.dbConfig.host,
  user     : process.env.user || config.dbConfig.user,
  password : process.env.password || config.dbConfig.password,
  database : process.env.database || config.dbConfig.database,
  port: process.env.port || config.dbConfig.port,
  extra: {
    ssl: true
  }
});

connection.connect((err) => {
  if(err) {
    console.log('err connecting to  db ',err )
  } else {
    console.log('connected to the db')
  }
})

const selectAll = function(callback) {
  connection.query('SELECT * FROM items', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const saveImageToDb = function(url, zpid, callback) {
  connection.query(`INSERT INTO pictures (link, zpid) VALUES( '${url}', '${zpid}' )`, function(err, res) {
    if (err) {
      callback(err, res);
    } else {
      callback(err, res);
    }
  });
};

const saveHouseToDb = function(zpid, housevalue, areavalue, street, state, city, zipcode, bedroom, bathrooms, year, callback) {
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
