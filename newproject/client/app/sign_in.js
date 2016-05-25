import React from 'react';

var SignIn= React.createClass({

  	render() {
  		return (
    	<div className="sign-in" > 
			 <div className="g-signin2" data-onsuccess="this.onSignIn"></div>
		</div>

		);
  	},
	
    onSignIn: function(googleUser) {
		var profile = googleUser.getBasicProfile();
		console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
		console.log('Name: ' + profile.getName());
		console.log('Image URL: ' + profile.getImageUrl());
		console.log('Email: ' + profile.getEmail());
	},

});

export default SignIn;