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
        project_retros: []
	   	}
	},


	componentDidMount: function(){
		this.checkEmail();
	},

  render() {
    return (
    	<div className="dashboard">
      	<Header user_name={this.state.user_name} />
  			<TrackerTokenForm 
        token={this.state.token} 
        handleSaveToken={this.handleSaveToken_} 
        handleChangeToken={this.handleChangeToken_}/>
        <CreateRetroForm 
          projectRetros={this.state.projectRetros} 
          handleCreateRetro={this.handleCreateRetro_}
          toggleShowHide={this.toggleShowLinks}/>
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
			//console.log(data);
			vm.setState({token: data.tracker_token});
      vm.getProjectsFromTracker();
		});
	},

  getProjectsFromTracker:function(){
        //console.log(this.state);
    var vm = this;
    var token = this.state.token;
    var ajaxPromise = $.ajax({
       url: "https://www.pivotaltracker.com/services/v5/projects/",
          beforeSend: function(xhr) {
            xhr.setRequestHeader('X-TrackerToken', token);
          }
    });

    ajaxPromise.then(function(data){
      //console.log("newData");
      //console.log(data);   
      var projectIds= "";
      //extract Id's from each project and place them in a comma seperated string
      data.forEach(function (item, index){
        var projectid = item.id;
        projectIds += projectid + ",";
      })

      //ajax call to our rails server to get project retros
      $.get("/users/projects/" + projectIds, function( data ){
        console.log("New Data")
        //console.log(data);
        //setState with projectRetros
        vm.setState({projectRetros: data});

      });
    });
  },

  toggleShowLinks: function(ShowingNow, projectId){
    var rets =this.state.projectRetros;
    rets.forEach(function (item, index){
      if(item.project_id == projectId){
        item.showLinks = !ShowingNow;
      }
    });
    this.setState({projectRetros: rets});
  },

  startNewRetro: function(projectId){
  	//console.log(this.state);
  	var vm = this;
  	var token = this.state.token;
  	var ajaxPromise = $.ajax({
  		 url: "https://www.pivotaltracker.com/services/v5/projects/" + projectId,
          beforeSend: function(xhr) {
            xhr.setRequestHeader('X-TrackerToken', token);
          }
  	});

  	ajaxPromise.then(function(data){
  		//console.log(data);
  		var project = {};
  		project.name = data.name;
  		project.id = data.id;

  		vm.saveRetro(project);

  	});
  },

  saveRetro: function(project){
		var ajaxPromise = $.ajax({
			method: 'POST',
  		url: "/retros/new",
  		data: project
  	});

  	ajaxPromise.then(function(data){
  		//console.log("FROM POST:");
  		//console.log(data);

      //redirect to the retrospective
  		browserHistory.push('/show/' + data._id.$oid);
  	});
  },

  handleCreateRetro_: function(newRetroId) {
  	this.startNewRetro(newRetroId);
  }
});


export default RetroActive;
