var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mysql');
var dataMethods = require('./dataretrievers.js');
var convert = require('xml-js');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));


app.get('/deepSearch', function (req, res) {
  dataMethods.zillowDeepSearch('746 Forest Ave', 'Larchmont', 'NY', function(data) {
    var jsonData = convert.xml2json(data.data, {compact: true, spaces: 4});
    // console.log('response ', JSON.parse(jsonData)[Object.keys(JSON.parse(jsonData))[1]].response.results.result.zpid._text);
    var zipID = JSON.parse(jsonData)[Object.keys(JSON.parse(jsonData))[1]].response.results.result.zpid._text;
    console.log('zipID ', zipID);
    res.sendStatus(201);
  })
});
// dataMethods.zillowDeepSearch('746 Forest Ave', 'Larchmont', 'NY');



app.listen(3000, function() {
  console.log('listening on port 3000!');
});

