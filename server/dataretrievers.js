const axios = require('axios');
const zillowApiKey = require('../zillowApiKey.js');
var convert = require('xml-js');

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
    var getCompsUrl = `http://www.zillow.com/webservice/GetComps.htm?zws-id=${zillowApiKey}&zpid=${zipID}&count=2`;
    axios({
        method: 'get',
        url: getCompsUrl
    })
    .then( (data) => {
        var jsonGetComps = JSON.parse(convert.xml2json(data.data, {compact: true, spaces: 4}));
        var similarHousesArray = jsonGetComps[Object.keys(jsonGetComps)[1]].response.properties.comparables.comp;
        var zipIdArray = [];
        var addressArray = [];
        // console.log('similar houses array ', similarHousesArray[0].address.street._text)
        similarHousesArray.forEach(house => {
            zipIdArray.push(house.zpid._text);
        })
        similarHousesArray.forEach(house => {
            var houseObj = {};
            houseObj.zipid = house.zpid._text;
            houseObj.street = house.address.street._text;
            houseObj.city = house.address.city._text;
            houseObj.state = house.address.state._text;
            addressArray.push(houseObj);
        })
        console.log('address array ', addressArray)
        console.log('zipid array ', zipIdArray);
        // zipIdArray.forEach(zipid => {
        //     dataMethods.getUpdatedPropertyData(zipid);
        // })
        // dataMethods.getUpdatedPropertyData(zipIdArray[0]);
        callback(zipIdArray);
    })
    .catch((err) => {
        console.log('err in gets comps search ', err);
    })
}

dataMethods.getUpdatedPropertyData =function(zipid) {
    var houseDetailsUrl = `http://www.zillow.com/webservice/GetUpdatedPropertyDetails.htm?zws-id=${zillowApiKey}&zpid=${zipid}`;
    axios({
        method: 'get',
        url: getUpdatedPropertyDataUrl
    })
    .then( (data)=> {
        console.log('updated prop data ', convert.xml2json(data.data, {compact: true, spaces: 4}))
    })
    .catch((err) => {
        console.log('err in getting updated prop data ', err)
    })
}






module.exports = dataMethods;