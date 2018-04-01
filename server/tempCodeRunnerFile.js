// var express = require('express');
// var bodyParser = require('body-parser');
// var items = require('../database-mysql');
var dataMethods = require('./dataretrievers.js');
var convert = require('xml-js');

const nestedApiCallsTiming = [];

let nestedApiCalls = function() {
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
                            dataMethods.zillowDeepSearch(house.street, house.city, house.state, house.zipid, function(data) {
                                var jsonDeepSearch = JSON.parse(convert.xml2json(data.data, {compact: true, spaces: 4}));
                                var houseValue = jsonDeepSearch[Object.keys(jsonDeepSearch)[1]].response.results.result.zestimate.amount._text;
                                var areaValue = jsonDeepSearch[Object.keys(jsonDeepSearch)[1]].response.results.result.localRealEstate.region.zindexValue._text.replace(/,/gi, '')
                                var bedRooms = jsonDeepSearch[Object.keys(jsonDeepSearch)[1]].response.results.result.bedrooms._text;
                                var bathRooms = jsonDeepSearch[Object.keys(jsonDeepSearch)[1]].response.results.result.bathrooms._text;
                                var yearBuilt = jsonDeepSearch[Object.keys(jsonDeepSearch)[1]].response.results.result.yearBuilt._text;
                                if(houseValue){
                                    let end = new Date().getTime();
                                    let processTime = end - start;
                                    console.log('process time ', processTime)
                                }
                            })
                        } 
                    }
                })  
            })   
        }
    })
}
nestedApiCalls();