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
			
					<span className="center__text">{this.props.title}</span>
					{
						this.props.showToggleItemOrder ? 
						<div className="center__slider">
							<span className="switch_label"><img src="/heart_white.svg"/></span>
								<label className="switch">
								  <input className="retro__sort_slider" type="checkbox" onChange={this.props.toggleItemOrder}/>
								  <div className="slider round"></div>
								</label>
							<span className="switch_label"><img src="/clock-with-white-face.svg"/></span>
						</div>
						:
						null
					}
				</div>
				
				<div className="right header__text_box">
					<span>
						{this.props.user_name} 
						{this.props.showSignOut ? <SignOutButton/> : null}
					</span>
					{
					(this.props.maxVotes && !this.props.isDashboard) ?
						( 
							<div id="vote_status">
								<img className="img__heart" src="/heart_red.svg"/>
								<span>
									{this.props.maxVotes - this.props.userVotes} / {this.props.maxVotes} 
								</span>
							</div>
						) : null
					}
				</div>
			</div>
		);
	},

	
});

var SignOutButton = React.createClass( {
	render() {
		return (
			<button className="sign_out_button" onClick={this.signOut}>Sign Out</button> 
		);
	},
	
	signOut: function(){
		signOut();
	},
});

export default Header;
