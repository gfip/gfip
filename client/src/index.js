import React from 'react';
import ReactDOM from 'react-dom';
import LoginIndex from './login/index';
import NotFound from './notfound/index';
//import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './flexbox.css';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={LoginIndex} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>,
    document.getElementById('root'));

//registerServiceWorker();
