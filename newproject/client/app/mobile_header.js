import React from 'react';
import { Link } from 'react-router';

var MobileHeader = React.createClass({
	getDefaultProps : function() {
		return {
		"showSignOut" : true,
		};
	},

 	render() {
	    return (
			<div className="mobile_header">
				<div className="left"> 
					<Link to="/dashboard">
						<img src="/RETROACTIVE.svg"/>
					</Link><br/>
					<span>Mobile</span>
				</div>
				<div className="right">
					<h1>
						{this.props.user_name} 
					</h1>
					{this.props.showSignOut ? <SignOutButton/> : null}
					{(this.props.maxVotes && this.props.userVotes) ? ( <span>{this.props.maxVotes - this.props.userVotes} / {this.props.maxVotes} </span>) : null}
				</div>
			</div>
		);
	},

	
});

var SignOutButton = React.createClass( {
	render() {
		return (
			<button onClick={this.signOut}>Sign Out</button> 
		);
	},
	
	signOut: function(){
		signOut();
	},
});

export default MobileHeader;
