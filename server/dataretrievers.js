const axios = require('axios');
const zillowApiKey = require('../zillowApiKey.js');
var convert = require('xml-js');
var db = require('../database-mysql')

let dataMethods = {};

dataMethods.zillowDeepSearch = function (address, city, state, zipid = null, callback) {
    var newAddress = address.replace(/ /gi, '+');
    var newCity = city.replace(/ /gi, '+');
    var deepSearchUrl = `http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=${zillowApiKey}&address=${newAddress}&citystatezip=${newCity}%2C+${state}`;
    axios({
        method: 'get',
        url: deepSearchUrl
    })
    .then((data) => {
        callback(data);
    })
    .catch( (err) => {
        console.log('err in deep search get req ', err);
    })
}

dataMethods.zillowGetCompsSearch = function(zipID, callback) {
    var getCompsUrl = `http://www.zillow.com/webservice/GetComps.htm?zws-id=${zillowApiKey}&zpid=${zipID}&count=10`;
    axios({
        method: 'get',
        url: getCompsUrl
    })
    .then( (data) => {

        // ALL THIS CODE UNTIL THE CALLBACK IS CALLED SHOULD NOT BE NECESSARY
        // AS YOU TESTED YESTERDAY THAT BY CALLING OUR HELPER FUNCTIONS BELOW, WE CONFIRMED THAT WE'RE 
        // GETTING THE SAME ARRAYS IN THE SERVER THAN THE ONES THAT ARE CREATED HERE
        // var jsonGetComps = JSON.parse(convert.xml2json(data.data, {compact: true, spaces: 4}));
        // var similarHousesArray = jsonGetComps[Object.keys(jsonGetComps)[1]].response.properties.comparables.comp;
        // var zipIdArray = [];
        // var addressArray = [];
        // // console.log('similar houses array ', similarHousesArray[0].address.street._text)
        // similarHousesArray.forEach(house => {
        //     zipIdArray.push(house.zpid._text);
        // })
        // similarHousesArray.forEach(house => {
        //     var houseObj = {};
        //     houseObj.zipid = house.zpid._text;
        //     houseObj.street = house.address.street._text;
        //     houseObj.city = house.address.city._text;
        //     houseObj.state = house.address.state._text;
        //     addressArray.push(houseObj);
        // })
        // console.log('zipIdArray in data methods', zipIdArray)
        // console.log('address array in data methods', addressArray)
        // dataMethods.getUpdatedPropertyData(zipIdArray[0]);
        // callback(zipIdArray);
        // HERE WE SHOULD INVOKE THE CALL BACK WITH DATA, SO THAT THE DATA GOES BACK TO THE SERVER
        // THEN IN THE SERVER, WE WILL TAKE THAT DATA, AND INVOKE OUR ARRAY GENERATOR FUNCTIONS
        // WITH THE NEW ARRAYS, WE WILL ITERATE THROUGH THEM AND CONTINUE MAKING OUR API CALLS
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
        var houseObj = {};
        houseObj.zipid = house.zpid._text;
        houseObj.street = house.address.street._text;
        houseObj.city = house.address.city._text;
        houseObj.state = house.address.state._text;
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
    array.forEach(zipid => {
        this.zillowGetUpdatedPropertyData( zipid, (data) => {
            // ERROR TO NOTE: NOT ALL PROPERTIES HAVE UPDATED PROPERTY INFO
            // DECISION TO TAKE: SHOULD WE STORE ALL THE INFO ANYWAY? AND FILTER RESULTS BY IF IMAGES
            // WHEN DECIDING TO UPLOAD TO CLIENT? 
            // OR SHOULD WE RUN THE IF NO IMAGES, THEN DON'T SAVE TO DB NOW
            if(data.data ){
                var updatedPropData = JSON.parse(convert.xml2json(data.data, {compact: true, spaces: 4}));
                var imagesArray = updatedPropData[Object.keys(updatedPropData)[1]].response.images.image.url;
                if (imagesArray) {
                    imagesArray.forEach(image => {
                        db.saveImageToDb(image._text, zipid, function(res) {
                            console.log('result of saving to db ', res)
                        })
                    })
                } else {
                    console.log(' no images to save ');
                }
            }
        }) 
        
    });
}

dataMethods.retrieveAndSaveHouseData = function(array) {
    this.zillowDeepSearch(array[0].street, array[0].city, array[0].state, array[0].zipid, function(data) {
        var jsonDeepSearch = convert.xml2json(data.data, {compact: true, spaces: 4});
        // console.log('deepsearch house data ', jsonDeepSearch);
    })
}


module.exports = dataMethods;