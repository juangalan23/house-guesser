var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mysql');
var dataMethods = require('./dataretrievers.js');
var convert = require('xml-js');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));


app.get('/deepSearch', function (req, res) {
  dataMethods.zillowDeepSearch('746 Forest Ave', 'Larchmont', 'NY', null, function(data) {
    var jsonDeepSearch = convert.xml2json(data.data, {compact: true, spaces: 4});
    var zipID = JSON.parse(jsonDeepSearch)[Object.keys(JSON.parse(jsonDeepSearch))[1]].response.results.result.zpid._text;
    res.sendStatus(201);
    dataMethods.zillowGetCompsSearch(zipID , function(data) {
      // console.log('data passed in server ', data);
    }) 
  })
});



app.listen(3000, function() {
  console.log('listening on port 3000!');
});

