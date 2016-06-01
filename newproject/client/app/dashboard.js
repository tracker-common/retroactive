import React from 'react';
import TrackerTokenForm from './tracker_token_form';
import CreateRetroForm from './createRetro';
import { Link, browserHistory } from 'react-router'
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

  startNewRetro: function(newRetroId){
  	//console.log(this.state);
  	var vm = this;
  	var token = this.state.token;
  	var ajaxPromise = $.ajax({
  		 url: "https://www.pivotaltracker.com/services/v5/projects/" + newRetroId,
          beforeSend: function(xhr) {
            xhr.setRequestHeader('X-TrackerToken', token);
          }
  	});

  	ajaxPromise.then(function(data){
  		console.log(data);
  		var project = {};
  		project.name = data.name;
  		project.id = data.id;

  		vm.saveRetro(project);
/*
			this.setState({retroId: newRetroId});
			*/
  	});
  },

  saveRetro: function(project){
		var ajaxPromise = $.ajax({
			method: 'POST',
  		url: "/retros/new",
  		data: project
  	});

  	ajaxPromise.then(function(data){
  		console.log("FROM POST:");
  		console.log(data);

      //redirect to the retrospective
  		browserHistory.push('/show/' + data._id.$oid);
  	});
  },

  handleCreateRetro_: function(newRetroId) {
  	this.startNewRetro(newRetroId);
  }
});


export default RetroActive;
