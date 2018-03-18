import React from 'react';
import ReactDOM from 'react-dom';
import LoginIndex from './login/index';
import NotFound from './notfound/index';
//import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';
import 'semantic-ui-css/semantic.min.css';
import './flexbox.css';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path='/' render={() => ( loggedIn() ? (<Redirect to='/dashboard'/>) : (<LoginIndex/>) )}/>
            <Route exact path='/dashboard' component={NotFound}/>
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>,
    document.getElementById('root'));

//registerServiceWorker();

function loggedIn(){
    return new Cookies().get('gfip_token');
}