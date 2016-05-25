import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router'
import CreateRetroForm from './createRetro';
import RetroActive from './app';
import SignIn from './sign_in';
import createHistory from 'history/lib/createHashHistory'

// Opt-out of persistent state, not recommended.
let history = createHistory({
  queryKey: false
})

//ReactDOM.render(<RetroActive data= {data} />, document.getElementById('app'));

ReactDOM.render((
  <div>
	<div className="header">
		<div className="left"> 
			<img src="RETROACTIVE.svg"/>
		</div>
		<div className="center header__text_box" >
			<h1></h1>
		</div>
		<div className="right header__text_box">
			<h1 >Name</h1>
		</div>
	</div>
	  <Router history={history}>
	    <Route name="home" path="/" component={RetroActive}/>
	    <Route name="Create Retro" path="/createRetro" component={CreateRetroForm}/>
	    <Route name="Sign-in" path="/signin" component={SignIn}/>
	  </Router>
  </div>
), document.getElementById('app'));
