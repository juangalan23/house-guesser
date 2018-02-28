const axios = require('axios');
const zillowApiKey = require('../zillowApiKey.js');
var convert = require('xml-js');
var db = require('../database-mysql')


let dataMethods = {};

dataMethods.zillowDeepSearch = function (address, city, state, zipid = null, callback) {
    
    var newAddress = address.replace(/ /gi, '+');
    var newCity = city.replace(/ /gi, '+');
    // console.log('new address ', newAddress);
    // console.log('new city ', newCity);
    var deepSearchUrl = `http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=${zillowApiKey}&address=${newAddress}&citystatezip=${newCity}%2C+${state}`;
    axios({
        method: 'get',
        url: deepSearchUrl
    })
    .then((data) => {
        callback(data);
    })
    .catch( (err) => {
        // console.log('err in deep search get req ', err);
    })
}

dataMethods.zillowGetCompsSearch = function(zipID, callback) {
    var getCompsUrl = `http://www.zillow.com/webservice/GetComps.htm?zws-id=${zillowApiKey}&zpid=${zipID}&count=25`;
    axios({
        method: 'get',
        url: getCompsUrl
    })
    .then( (data) => {
        callback(data);
    })
    .catch((err) => {
        console.log('err in gets comps search ', err);
    })
}

dataMethods.generateZipIdArray = function(data) {
    var jsonGetComps = JSON.parse(convert.xml2json(data.data, {compact: true, spaces: 4}));
    var similarHousesArray = jsonGetComps[Object.keys(jsonGetComps)[1]].response.properties.comparables.comp;
    var zipIdArray = [];
    similarHousesArray.forEach(house => {
        zipIdArray.push(house.zpid._text);
    })
    return zipIdArray; 
}

dataMethods.generateAddressDataArray = function(data) {
    var jsonGetComps = JSON.parse(convert.xml2json(data.data, {compact: true, spaces: 4}));
    var similarHousesArray = jsonGetComps[Object.keys(jsonGetComps)[1]].response.properties.comparables.comp;
    var addressArray = [];
    similarHousesArray.forEach(house => {
        // console.log('house in generate address array ', house)
        var houseObj = {};
        houseObj.zipid = house.zpid._text;
        houseObj.street = house.address.street._text;
        houseObj.city = house.address.city._text;
        houseObj.state = house.address.state._text;
        houseObj.zipcode = house.address.zipcode._text;
        addressArray.push(houseObj);
    })
    return addressArray
}

dataMethods.zillowGetUpdatedPropertyData =function(zipid, callback) {
    var houseDetailsUrl = `http://www.zillow.com/webservice/GetUpdatedPropertyDetails.htm?zws-id=${zillowApiKey}&zpid=${zipid}`;
    axios({
        method: 'get',
        url: houseDetailsUrl
    })
    .then( (data)=> {
        callback(data);
    })
    .catch((err) => {
        callback(err)
    })
}

dataMethods.retrieveAndSaveImages = function(array) {
    array.forEach(house => {
        this.zillowGetUpdatedPropertyData( house.zipid, (data) => {
            if(data.data ){
                var updatedPropData = JSON.parse(convert.xml2json(data.data, {compact: true, spaces: 4}));
                var imagesArray = updatedPropData[Object.keys(updatedPropData)[1]].response.images.image.url;
                if (imagesArray) {
                    imagesArray.forEach(image => {
                        db.saveImageToDb(image._text, house.zipid, function(err, res) {
                            // console.log('result of saving to db ',err, res)
                        })
                    })
                    // console.log('house passed into retrieve and save house data ', house)
                    this.retrieveAndSaveHouseData(house);
                } else {
                    console.log(' no images to save ');
                }
            }
        }) 
        
    });
}

dataMethods.retrieveAndSaveHouseData = function(house) {
    this.zillowDeepSearch(house.street, house.city, house.state, house.zipid, function(data) {
        var jsonDeepSearch = JSON.parse(convert.xml2json(data.data, {compact: true, spaces: 4}));
        // console.log('deepsearch house data', jsonDeepSearch);
        
        // console.log('address ', house.street, house.city, house.state, house.zipid)
        // console.log('house zipid ', house.zipid);
        // console.log('house value ', houseValue);
        var houseValue = jsonDeepSearch[Object.keys(jsonDeepSearch)[1]].response.results.result.zestimate.amount._text;
        var areaValue = jsonDeepSearch[Object.keys(jsonDeepSearch)[1]].response.results.result.localRealEstate.region.zindexValue._text.replace(/,/gi, '')
        var bedRooms = jsonDeepSearch[Object.keys(jsonDeepSearch)[1]].response.results.result.bedrooms._text;
        var bathRooms = jsonDeepSearch[Object.keys(jsonDeepSearch)[1]].response.results.result.bathrooms._text;
        var yearBuilt = jsonDeepSearch[Object.keys(jsonDeepSearch)[1]].response.results.result.yearBuilt._text;
        // console.log('house in save house ', house );
        db.saveHouseToDb(house.zipid, houseValue, areaValue, house.street, 
            house.state, house.city, house.zipcode, bedRooms, bathRooms, yearBuilt, function(err, res) {
                if (err) {
                    console.log('err in saving house to db ', err)  
                } else {
                    console.log('saved house to db ', res)
                }
            })
    })
}

dataMethods.getAllIds = function(callback) {
    db.connection.query(`SELECT zpid FROM houses`, function(err, res) {
        if (err) {
            console.log('err in querying db ', err)
        } else {
            // console.log('sucessful query from db ', res)
            callback(res)
        }
    })
}

dataMethods.getPicsById = function(id, callback) {
    db.connection.query(`SELECT link from pictures WHERE zpid = '${id}' `, function(err, res) {
        if (err) {
            console.log('err in getting pics by house id ', err)
        } else {
            // console.log('results from db query ', res)
            callback(res);
        }
    })
}

dataMethods.getHouseDataById = function(id, callback) {
    db.connection.query(`SELECT * FROM houses WHERE zpid = '${id}' `, function(err, res) {
        if (err) {
            console.log('err in getting house data in db ', err)
        } else {
            callback(res)
        }
    } )
}


module.exports = dataMethods;