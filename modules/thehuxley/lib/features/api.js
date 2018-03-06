const axios = require("axios");
var authorization;

async function login(config) {
    axios.post("https://www.thehuxley.com/api/login", {
        username: config.thehuxley.username,
        password: config.thehuxley.password
    }).then((response) => {
        authorization = response.data;
    }).catch((err) => console.log(err.message));
}
