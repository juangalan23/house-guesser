var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mysql');
var dataMethods = require('./dataretrievers.js');
var convert = require('xml-js');
var hundredAddress = require('../database-mysql/addresses/addresses-us-100.json');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));


app.get('/addHousesToDB', function (req, res) {

  hundredAddress.addresses.forEach( address => {
    console.log('address searched ', address);
    var street = address.address1;
    var city = address.city;
    var state = address.state;
    // var street = hundredAddress.addresses[0].address1;
    // var city = hundredAddress.addresses[0].city;
    // var state = hundredAddress.addresses[0].state;
    // if(
      // street!== undefined && 
      // city!== undefined 
      // && state!== undefined
    // ) {
      // dataMethods.zillowDeepSearch('746 Forest Ave', 'Larchmont', 'NY', null, function(data) {
      dataMethods.zillowDeepSearch(street, city, state, null, function(data) {
        // console.log('data in zillow deep search ', data)
        if(data.data) {
          var jsonDeepSearch = convert.xml2json(data.data, {compact: true, spaces: 4});
          var zipID = JSON.parse(jsonDeepSearch)[Object.keys(JSON.parse(jsonDeepSearch))[1]].response.results.result.zpid._text;
          
          dataMethods.zillowGetCompsSearch(zipID , function(data) {
            // console.log('data passed in server ', data); 
            var zipIdArray = dataMethods.generateZipIdArray(data);
            var addressArray = dataMethods.generateAddressDataArray(data);
            // console.log('zipIdArray in server', zipIdArray)
              // console.log('address array in server', addressArray)
              // dataMethods.retrieveAndSaveImages(zipIdArray);
              // dataMethods.retrieveAndSaveHouseData(addressArray);

              dataMethods.retrieveAndSaveImages(addressArray);
              
              
          }) 
        }
      })
    // }
  })
  res.sendStatus(201);
});

app.get('/getAllIds', function(req, res) {
  dataMethods.getAllIds(function(id) {
  var justIdArray = id.map( id => {
    return id.zpid
  })
  // console.log('ids from data methods call in server ', justIdArray);
    res.send(justIdArray);
  })
})

app.get('/getPicsById'  , function( req, res) {
  var houseId = req.query.houseId;
  dataMethods.getPicsById(houseId, function(data) {
    var idArray = data.map(link => {
      return link.link
    })
    res.send(idArray)
    // console.log('pics links from db ', idArray)
  })
})

app.get('/getHouseDataById'  , function( req, res) {
  var houseId = req.query.houseId;
  dataMethods.getHouseDataById(houseId, function(data) {
    // res.send(idArray)
    // console.log('house data retrieved from from db ', data[0])
    res.send(data[0])
  })
})



app.listen(3000, function() {
  console.log('listening on port 3000!');
});

