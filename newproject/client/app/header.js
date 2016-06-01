import React from 'react';
import { Link } from 'react-router';

var Header = React.createClass({
	getDefaultProps : function() {
		return {
		"showSignOut" : true,
		};
	},

 	render() {
	    return (
			<div className="header">
				<div className="left"> 
					<Link to="/dashboard">
						<img src="/RETROACTIVE.svg"/>
					</Link>
				</div>
				<div className="center header__text_box" >
					<h1>{this.props.title}</h1>
				</div>
				<div className="right header__text_box">
					<h1>
						{this.props.user_name} 
						{this.props.showSignOut ? <SignOutButton/> : null}
					</h1>
				</div>
			</div>
		);
	},

	
});

var SignOutButton = React.createClass( {
	render() {
		return (
			<button type="button" onClick={this.signOut}>Sign Out</button> 
		);
	},
	
	signOut: function(){
		signOut();
	},
});

export default Header;
