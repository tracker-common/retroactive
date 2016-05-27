import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import CreateRetroForm from './createRetro';
import RetroActive from './dashboard';
import Retro from './retro';
import SignIn from './sign_in';
import createHistory from 'history/lib/createHashHistory';

ReactDOM.render((
	  <Router history={browserHistory}>
	    <Route name="home" path="/" component={SignIn}/>
	    <Route name="Create Retro" path="/createRetro" component={CreateRetroForm}/>
	    <Route name="/show" path="/show/:retroId" component={Retro}/>
	    <Route name="Dashboard" path="/dashboard" component={RetroActive}/>
	  </Router>
), document.getElementById('app'));
