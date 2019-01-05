const cheerio = require('cheerio');
const axios = require('axios');

const URL = 'https://sites.google.com/a/cin.ufpe.br/if669/';
/** Check if user requesting to register is a monitor.
 * @param {string} username - User's CIn login
 */

// isMonitor('lbam').then((username) => console.log(username))
// .catch((err) => console.log(err.message))
module.exports = username => new Promise((resolve, reject) => {
  axios.get(URL).then(body => cheerio.load(body.data))
    .then(($) => {
      $('a').filter((i, elem) => {
        const link = $(elem).attr('href').split('.com')[0];
        return link === 'https://i.imgur' || link === 'http://i.imgur';
      }).each((i, elem) => {
        if ($(elem).text() === username) {
          resolve(elem.attribs.href);
        } else if (username === 'scbs' || username === 'rmfl') {
          resolve('https://ngstudentexpeditions.com/wp-content/uploads/2017/08/blank-profile-picture.jpg');
        }
      });
      reject(new Error("You're not not allowed to register to this service."));
    }).catch(err => reject(err));
});

