import axios from 'axios';

export function me(token){
    return axios.get('/api/me', {
        headers: {
            Authorization: 'Bearer ' + token 
        }
    })
}

export function register(auth){
    return axios.post('api/register', {
        username: auth.username,
        password: auth.password
    })
}