import React from 'react';
import TrackerTokenForm from './tracker_token_form';
import CreateRetroForm from './createRetro';
import { Link } from 'react-router'
import Header from './header';

var RetroActive = React.createClass({
  getInitialState() {
	    return {
	      token: sessionStorage.getItem("tracker_token"),
	      data: db_entry,
	      retroId: "",
	      user_name: sessionStorage.getItem("user_name"),
	      user_email: sessionStorage.getItem("user_email"),
	   	}
	},


	componentDidMount: function(){
		this.checkEmail();
	},


  render() {
    return (
    	<div className="dashboard">
    		<Header user_name={this.state.user_name} />
			<TrackerTokenForm token={this.state.token} handleSaveToken={this.handleSaveToken_} handleChangeToken={this.handleChangeToken_}/>
			<CreateRetroForm handleCreateRetro={this.handleCreateRetro_}/>
		</div>
    );
  },

  handleChangeToken_: function(event) {
	this.setState({token: undefined});
  },
  
  handleSaveToken_: function(newToken) {
	$.get("/users/token/"+sessionStorage.getItem("user_email")+"/"+newToken, function( data ) {
		sessionStorage.setItem("tracker_token", newToken);
		console.log( data );
	});
	this.setState({token: newToken});
  },

  checkEmail: function(){
  		var vm = this;
		$.get("/users/check/"+sessionStorage.getItem("user_email"), function( data ) {
			sessionStorage.setItem("tracker_token", data.tracker_token);
			console.log(data);
			vm.setState({token: data.tracker_token});
		});
	},

  handleCreateRetro_: function(newRetroId) {
	this.setState({retroId: newRetroId});
	window.location.replace('/show/' + newRetroId);
  }
});


export default RetroActive;
