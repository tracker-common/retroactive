import React from 'react';
import Header from './header';

var SignIn= React.createClass({

  	render() {
  		return (
	    	<div>
	    	<Header showSignOut={false}/>
	    	<div className="sign_in"> 
	    		<h1>Welcome to RetroActive!</h1>
	    		<p>Please Sign-In</p>
	    		<div className="g-signin2" data-onsuccess="onSignIn"></div>
			</div>
			</div>
		);
  	},    


});

export default SignIn;