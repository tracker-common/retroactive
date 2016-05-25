import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router'
import CreateRetroForm from './createRetro';
import RetroActive from './app';

import Retro from './retro';
//import createHistory from 'history/lib/createHashHistory'
import { browserHistory } from 'react-router'
import SignIn from './sign_in';
import createHistory from 'history/lib/createHashHistory'


// Opt-out of persistent state, not recommended.
/*let history = createHistory({
  queryKey: false
})*/

//ReactDOM.render(<RetroActive data= {data} />, document.getElementById('app'));

ReactDOM.render((

  <div>
	  <Router history={browserHistory}>
	    <Route name="home" path="/" component={SignIn}/>
	    <Route name="Create Retro" path="/createRetro" component={CreateRetroForm}/>
	    <Route name = "/show" path="/show/:retroId" component={Retro}/>
	    <Route name="Dashboard" path="/dashboard" component={RetroActive}/>
	  </Router>
  </div>
), document.getElementById('app'));
