var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mysql');
var dataMethods = require('./dataretrievers.js');
var convert = require('xml-js');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));


app.get('/deepSearch', function (req, res) {
  // NEED TO CREATE A FUNCTION THAT CALLS THIS ENPOINT, AS IT ITERATES THROUGH ADDRESS DATA
  // WE WILL PASS IN SOMETHING LIKE: REQ.BODY.ADDRESS, REQ.BODY. CITY, REQ.BODY.STATE
    // DO WE NEED BODY PARSER? 
  dataMethods.zillowDeepSearch('746 Forest Ave', 'Larchmont', 'NY', null, function(data) {
    var jsonDeepSearch = convert.xml2json(data.data, {compact: true, spaces: 4});
    var zipID = JSON.parse(jsonDeepSearch)[Object.keys(JSON.parse(jsonDeepSearch))[1]].response.results.result.zpid._text;
    res.sendStatus(201);
    dataMethods.zillowGetCompsSearch(zipID , function(data) {
      // console.log('data passed in server ', data); 
      var zipIdArray = dataMethods.generateZipIdArray(data);
      var addressArray = dataMethods.generateAddressDataArray(data);
      // console.log('zipIdArray in server', zipIdArray)
        // console.log('address array in server', addressArray)
        dataMethods.retrieveAndSaveImages(zipIdArray);
        dataMethods.retrieveAndSaveHouseData(addressArray);
      // FROM HERE, CREATE 2 HELPER FUNCTIONS
        // 1 -> QUERIES ZILLOW WITH THE ZIPID DATA, RECEIVES AND CLEANS THAT DATA TO GET IMAGE URLS AND PUTS THEM INTO AN ARRAY
          // THEN, ITERATE THROUGH THAT ARRAY, AND SAVE IT TO OUR IMAGES TABLE, ALONG WITH THE ZIPID
          // DON'T MAKE THE ZILLOW GET REQUEST PART OF THE HELPER FUNCTION. THE HELPER FUNCTION SHOULD CALL THE GET REQUEST
        // 2 -> QUERIES ZILLOW WITH ADDRESS DATA, RECEIVES AND CLEANS VALUATION + HOUSE DETAILS
          // THEN, SAVE THAT INFO INTO THE DB ACCORDING TO THE SCHEMA WE CREATED
      // NOTE: IS IT ZPID OR ZIPID??
    }) 
  })
});



app.listen(3000, function() {
  console.log('listening on port 3000!');
});

