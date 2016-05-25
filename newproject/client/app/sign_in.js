import React from 'react';
import Header from './header';

var SignIn= React.createClass({

	

  	render() {
  		return (
	    	<div>
	    	<Header user = "" />
	    	<div className="sign-in"> 
	    		<h1>Welcome to RetroActive!</h1>
	    		<p>Please Sign-In</p>
	    		<div className="g-signin2" data-onsuccess="onSignIn"></div>
				<div onClick={this.signOut}>Sign Out</div>
			</div>
			</div>
		);
  	},    

	signOut: function() {
	    var auth2 = gapi.auth2.getAuthInstance();
		var profile = auth2.currentUser.get().getBasicProfile();
		console.log('ID: ' + profile.getId());
		console.log('Full Name: ' + profile.getName());
		console.log('Given Name: ' + profile.getGivenName());
		console.log('Family Name: ' + profile.getFamilyName());
		console.log('Image URL: ' + profile.getImageUrl());
		console.log('Email: ' + profile.getEmail());
		sessionStorage.removeItem("user_email");
		sessionStorage.removeItem("user_name");
	    auth2.signOut().then(function () {
	      console.log('User signed out.');
	    });
  }


});

export default SignIn;