const cheerio = require("cheerio");
const axios = require("axios");
const URL = "https://sites.google.com/a/cin.ufpe.br/if669/"
/** Check if user requesting to register is a monitor.
 * @param {string} username - User's CIn login
 */ 

//isMonitor('lbam').then((username) => console.log(username)).catch((err) => console.log(err.message))
function isMonitor(username) {
    return new Promise((resolve, reject) => {
        axios.get(URL).then((body) => {
            return cheerio.load(body.data);
        })
        .then(($) => {
            //console.log($('.sites-layout-tile').children().first().children().last().children().last().children().last().children().first().children('b').text())
            $('a').filter(function(i, elem) {
                let link = $(elem).attr('href').split('.com')[0];
                return link == 'https://i.imgur' || link == 'http://i.imgur';
              }).each((function(i, elem){
                  if($(elem).text() == username)
                    resolve(elem.attribs.href);
              }))

              reject(new Error(`You're not not allowed to register to this service.`));
        })
        .catch((err) => reject(err));
    })
}

module.exports = isMonitor;
