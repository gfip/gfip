import React from 'react';
import ReactDOM from 'react-dom';

import AuthService from './components/AuthService';
import PrivateRoute from './components/PrivateRoute';
import * as Pages from './containers';
//import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './assets/flexbox.css';

this.AuthService = new AuthService();

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path='/' render={() => ( this.AuthService.getToken() ? (<Redirect to='/dashboard'/>) : (<Pages.Login/>))}/>
            <PrivateRoute exact path='/dashboard' component={Pages.NotFound}/>
            <Route component={Pages.NotFound} />
        </Switch>
    </BrowserRouter>,
    document.getElementById('root'));
