import React from 'react';

var TrackerTokenForm = React.createClass({

	getInitialState() {
	    return {
	      token: this.props.token,
	    }
	  },
  	render() {

	  	if(this.state.token){
	  		return (
	    	<div className="dashboard-form" > 
				<div>Woo! We have an API token for you! Everything is cool unless you need to <span className="link" onClick={this.handleChangeToken_}>change it</span>
				</div>
				TOKEN: {this.state.token}
			</div>
			);
	  	}
	  	else{
	  		return (
	    	<div className="dashboard-form" > 
				<div>:) Hey there! It looks like you haven't provided your tracker token yet. RetroActive won't really work until you do. Please go get it from <a href="https://www.pivotaltracker.com/profile">https://www.pivotaltracker.com/profile</a></div>
				<br/>
				<form>
					<label>Tracker API Token: </label><input type="text" ref="tokenText"/>
					<button type="button" onClick={this.handleSaveToken_}>Save</button>
				</form>
			</div>
			);
	  	}
	}, 

	handleChangeToken_: function(event) {
    	this.setState({token: undefined});
  	},
  	handleSaveToken_: function(event) {
    	this.setState({token: React.findDOMNode(this.refs.tokenText).value});
  	}

});


export default TrackerTokenForm;