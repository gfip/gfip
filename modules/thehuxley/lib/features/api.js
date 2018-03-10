const axios = require("axios");
const config = require("../../../../config/constants.js");
const _ = require("lodash");
const moment = require("moment")
var authorization = null;
axios.defaults.baseURL = "https://www.thehuxley.com/api";

//obs: O JSON retornado pelas requisições estarão na variável .data da requisição do axios.
//ex: getSubmissionCode(1055140).then((response) => (console.log(response.data)))


async function getSubmissionCode(submissionID){
    try {
        await login();
        return axios.get(`https://www.thehuxley.com/api/v1/submissions/${submissionID}/sourcecode`);
    } catch(err){
        return Promise.reject(err);
    }
}

async function getStudentSubmissions(problemID, userID){
    try {
        await login();
        return axios.get(`v1/submissions?problem=${problemID}&user=${userID}`);
    } catch(err){
        return Promise.reject(err);
    }
}

//pega as listas e filtra, deixando apenas as listas do ano atual e que já fecharam.
async function getFilteredLists(){
    try {
        let lists = await getLists();
        lists = _.filter(lists.data, function(obj) {
            return moment().year() == moment(obj.endDate).year() && moment() >= moment(obj.endDate);
        }) 
        return Promise.resolve(lists);
    } catch(err){
        return Promise.reject(err);
    }
}

async function getListProblems(listID){
    try {
        await login();
        return axios.get(`/v1/quizzes/${listID}/problems?max=100&offset=0`);
    } catch (err){
        return Promise.reject(err);
    }
}

async function getLists() {
    try {
        await login();
        return axios.get("/v1/groups/194/quizzes?max=30&offset=0&order=desc&sort=startDate")
    } catch (err) {
        return Promise.reject(err);
    }
}

async function login() {
    return new Promise((resolve, reject) => {
        if(!authorization || authorization.created_at + authorization.expires_in <= new Date().getTime()){
            axios.post("/login", {
                username: config.thehuxley.username,
                password: config.thehuxley.password
            }).then((response) => {
                authorization = response.data;
                authorization.created_at = new Date().getTime();
                axios.defaults.headers.common['Authorization'] = "Bearer " + authorization.access_token;
                resolve();
            }).catch((err) => reject(err));
        } else {
            resolve();
        }
    })
}

module.exports = {
    getSubmissionCode,
    getStudentSubmissions,
    getFilteredLists,
    getListProblems
}
