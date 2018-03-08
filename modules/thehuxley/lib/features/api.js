const axios = require("axios");
const config = require("../../../../config/constants.js");
var authorization;

async function getListas() {
    await login();
    // [{"id":2142,
    // "title":"Lista 1 - 2018.1 (Pokémon)",
    // "description":null,"score":15.0,
    // "startDate":"2018-03-07T10:00:00-03:00",
    // "endDate":"2018-03-14T23:59:00-03:00",
    // "serverTime":"2018-03-08T15:51:25-03:00",
    // "dateCreated":"2017-08-16T16:52:58-03:00",
    // "lastUpdated":"2018-03-01T14:10:34-03:00",
    // "group":{
    //     "id":194,
    //     "name":"IP-CC-CIn-UFPE",
    //     "url":"ipcc-cin-ufpe",
    //     "description":"Introdução à Programação - Ciência da Computação - Universidade Federal de Pernambuco",
    //     "startDate":"2017-08-07T00:00:00-03:00",
    //     "endDate":"2017-11-30T00:00:00-03:00",
    //     "dateCreated":"2015-09-01T11:21:50-03:00",
    //     "lastUpdated":"2018-03-01T11:20:36-03:00",
    //     "institution":{
    //         "id":48,"name":"Universidade Federal de Pernambuco",
    //         "acronym":"UFPE",
    //         "logo":"https://www.thehuxley.com/api/v1/institutions/logo/default.png",
    //         "status":"APPROVED"
    //     }
    // },
    // "partialScore":false
    // }
}

async function login() {
    return new Promise((resolve, reject) => {
        if(!authorization || authorization.created_at + authorization.expires_in <= new Date().getTime()){
            axios.post("https://www.thehuxley.com/api/login", {
                username: config.thehuxley.username,
                password: config.thehuxley.password
            }).then((response) => {
                authorization = response.data;
                authorization.created_at = new Date().getTime();
                resolve();
            }).catch((err) => reject(err));
        }
    })
}
