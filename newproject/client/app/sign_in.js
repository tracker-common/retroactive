import React from 'react';
import Header from './header';

var SignIn= React.createClass({

  	render() {
  		return (
	    	<div>
		    	<Header showSignOut={false}/>
		    	<div className="sign_in"> 
		    		<div className="sign_in_text">
		    			<span>Welcome to RetroActive!</span>
		    			<br/>
		    			<span>Please Sign-In</span>
		    		</div>
		    		<div className="g-signin2 sign_in_button" data-onsuccess="onSignIn"></div>
				</div>
			</div>
		);
  	}
});

export default SignIn;