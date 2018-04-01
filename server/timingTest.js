// var express = require('express');
// var bodyParser = require('body-parser');
// var items = require('../database-mysql');
var dataMethods = require('./dataretrievers.js');
var convert = require('xml-js');
const axios = require('axios');
if (!process.env.host) {
    var config = require('../config');
  }
const zillowApiKey = process.env.zillowApiKey || config.zillowApiKey

// var app = express();
// app.use(express.static(__dirname + '/../react-client/dist'));



const timingTestMethods = {}

// app.get('/nestedApiTiming', function(req, res) {
timingTestMethods.nestedApiCalls = function(callback) {
    const nestedApiCallsTiming = [];
    for (var i = 0; i <= 10; i++) {
        let start = new Date().getTime();
        dataMethods.zillowDeepSearch('746 Forest Ave', 'Larchmont', 'NY', null, function(data) {
            if(data.data) {
                var jsonDeepSearch = convert.xml2json(data.data, {compact: true, spaces: 4});
                var zipID = JSON.parse(jsonDeepSearch)[Object.keys(JSON.parse(jsonDeepSearch))[1]].response.results.result.zpid._text;
                dataMethods.zillowGetCompsSearch(zipID , function(data) {
                    var zipIdArray = dataMethods.generateZipIdArray(data);
                    var addressArray = dataMethods.generateAddressDataArray(data);
                    let house = addressArray[0]
                    dataMethods.zillowGetUpdatedPropertyData(house.zipid, (data) => {
                    if(data.data ){
                        var updatedPropData = JSON.parse(convert.xml2json(data.data, {compact: true, spaces: 4}));
                        var imagesArray = updatedPropData[Object.keys(updatedPropData)[1]].response.images.image.url;
                            if (imagesArray) { 
                                axios({
                                    method: 'get',
                                    url: `http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=${zillowApiKey}&address=19+Blossom+Ter&citystatezip=LARCHMONT%2C+NY`
                                })
                                .then((data) => {
                                    console.log('made it to second deep search ', nestedApiCallsTiming);
                                    var jsonDeepSearch = JSON.parse(convert.xml2json(data.data, {compact: true, spaces: 4}));
                                    var houseValue = jsonDeepSearch[Object.keys(jsonDeepSearch)[1]].response.results.result.zestimate.amount._text;
                                    var areaValue = jsonDeepSearch[Object.keys(jsonDeepSearch)[1]].response.results.result.localRealEstate.region.zindexValue._text.replace(/,/gi, '')
                                    var bedRooms = jsonDeepSearch[Object.keys(jsonDeepSearch)[1]].response.results.result.bedrooms._text;
                                    var bathRooms = jsonDeepSearch[Object.keys(jsonDeepSearch)[1]].response.results.result.bathrooms._text;
                                    var yearBuilt = jsonDeepSearch[Object.keys(jsonDeepSearch)[1]].response.results.result.yearBuilt._text;
                                    if(houseValue){
                                        let end = new Date().getTime();
                                        let processTime = end - start;
                                        nestedApiCallsTiming.push(processTime);
                                        if (i === 10) {
                                            callback(nestedApiCallsTiming);
                                        }
                                    }
                                })
                                .catch( (err) => {
                                    console.log('err in deep search get req ', err);
                                })
                            } 
                        }
                    })  
                })   
            }
        })
    }
}
// })

timingTestMethods.retrievalFromDb = function (callback) {
    let dbRetrievalTiming = [];
    for (var i = 0; i <= 10; i++) {
    var start = new Date().getTime();
    dataMethods.getHouseDataById(13993423, function(data) {
        if(data) {
            let end = new Date().getTime();
            let processTime = end - start;
            console.log('process time ', processTime);
            dbRetrievalTiming.push(processTime);
            // if ( i === 11) {
            //     console.log('db retrieval timing ', dbRetrievalTiming);
            //     callback(dbRetrievalTiming);
            // }
        }
      })
    }
   
}



module.exports = timingTestMethods

