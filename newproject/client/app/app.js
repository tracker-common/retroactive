import React from 'react';
import TrackerTokenForm from './tracker_token_form';
import CreateRetroForm from './createRetro';
import { Link } from 'react-router'
import Header from './header';

var RetroActive = React.createClass({
  getInitialState() {
	    return {
	      token: window.context.user.token,
	      data: db_entry,
	      retroId: "",
	   	}
	},


	componentDidMount: function(){
		this.checkEmail();
	},

  render() {
    return (
    	<div className="dashboard">
    		<Header user = {window.context.user} />
			<TrackerTokenForm token={this.state.token} handleSaveToken={this.handleSaveToken_} handleChangeToken={this.handleChangeToken_}/>
			<CreateRetroForm handleCreateRetro={this.handleCreateRetro_}/>
			<div className="retro_dates">
				{this.state.data.item} | {this.state.data.name} | {this.state.retroId}
			</div>
			<button type="button" onClick={this.checkEmail}>Check Email</button>
			RetroID: {this.state.retroId}
		</div>
    );
  },

  handleChangeToken_: function(event) {
	this.setState({token: undefined});
  },
  
  handleSaveToken_: function(newToken) {
	$.get("/users/token/"+window.context.user.email+"/"+newToken, function( data ) {
		window.context.user.token = newToken;
		console.log( data );
	});
	this.setState({token: newToken});
  },
<<<<<<< HEAD

  checkEmail: function(){
  		var vm = this;
		$.get("/users/check/"+window.context.user.email, function( data ) {
			window.context.user.token = data.tracker_token;
			console.log(data);
			vm.setState({token: data.tracker_token});
		});
	}

=======
  handleCreateRetro_: function(newRetroId) {
	this.setState({retroId: newRetroId});
	window.location.replace('/show/' + newRetroId);
  }
>>>>>>> f93cc4da33491ef9024e0cb6962accae67ff3e5d
});

export default RetroActive;
