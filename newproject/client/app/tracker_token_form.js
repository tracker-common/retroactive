import React from 'react';

var TrackerTokenForm = React.createClass({

	changeToken: function(){
		this.props.handleSaveToken(this.refs.tokenText.value);
	},

  	render() {
	  	if(this.props.token){
	  		return (
	    	<div className="dashboard_form" >
	    	{
	    		this.props.showErrorText && 
	    		<span className="error_text">Your token is invalid.  Please verify it and try again.</span>
	    	} 
				<div>Woo! We have an API token for you! Everything is cool unless you need to <span className="link" onClick={this.props.handleChangeToken}>change it</span>
				</div>
				<span className = "row token_label">TOKEN: &nbsp; {this.props.token}</span>
			</div>
			);
	  	}
	  	else{
	  		return (
	    	<div className="dashboard_form"> 
				<div>:) Hey there! It looks like you haven't provided your tracker token yet. RetroActive won't really work until you do. Please go get it from <a href="https://www.pivotaltracker.com/profile">https://www.pivotaltracker.com/profile</a></div>
				<br/>
				<form>
					<label>Tracker API Token: </label><input type="text" ref="tokenText"/>
					<button type="submit" onClick={this.changeToken}>Save</button>
				</form>

			</div>
			);
	  	}
	},
});

export default TrackerTokenForm;