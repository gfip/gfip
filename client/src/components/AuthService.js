import axios from 'axios';
import {me} from '../helpers/api';

axios.defaults.baseURL = process.env.REACT_APP_API_ADDRESS || 'https://localhost:5000';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default class AuthService {
    // Initializing important variables
    constructor() { // React binding stuff
        this.login = this
            .login
            .bind(this);
        this.getToken = this
            .getToken
            .bind(this);
    }

    login(auth) {
        // Get a token from api server
        return axios
            .post('/api/login', auth)
            .then(res => {
                this.setToken(res.data.token) // Setting the token in localStorage
                return Promise.resolve(res);
            })
    }

    loggedIn() {
        if (!this.getToken()) {
            return Promise.reject(new Error('No Token'));
        } else {
            return me(this.getToken()).then((response) => {
                if (response.data.code) {
                    this.logout();
                    throw new Error('Invalid token');
                }
                return Promise.resolve(response);
            });
        }
    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
    }
}
