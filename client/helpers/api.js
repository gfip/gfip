import axios from 'axios';

export function me(token){
    return axios.get('/api/me', {
        headers: {
            Authorization: 'Bearer ' + token 
        }
    })
}

export function login(username, password){
    return axios.post('/api/login', {
        username: username,
        password: password
    })
}