import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import CreateRetroForm from './create_retro';
import RetroActive from './dashboard';
import Retro from './retro';
import SignIn from './sign_in';
import createHistory from 'history/lib/createHashHistory';

ReactDOM.render((
	  <Router history={browserHistory}>
	    <Route name="home" path="/" component={SignIn}/>
	    <Route name="Show Retro" path="/show/:retroId" component={Retro}/>
	    <Route name="Dashboard" path="/dashboard" component={RetroActive}/>
	  </Router>
), document.getElementById('app'));
