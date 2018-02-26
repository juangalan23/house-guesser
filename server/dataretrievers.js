const axios = require('axios');
const zillowApiKey = require('../zillowApiKey.js');

let dataMethods = {};

dataMethods.zillowDeepSearch = function (address, city, state, callback) {
    var newAddress = address.replace(/ /gi, '+');
    var newCity = city.replace(/ /gi, '+');
    var deepSearchURL = `http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=${zillowApiKey}&address=${newAddress}&citystatezip=${newCity}%2C+${state}`;
    // console.log('url ', typeof deepSearchURL);
    axios({
        method: 'get',
        url: deepSearchURL
    })
    .then((data) => {
        callback(data);
    })
    .catch( (err) => {
        console.log('err in deep search get req ', err);
    })
}



module.exports = dataMethods;