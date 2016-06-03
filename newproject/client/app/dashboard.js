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
        projectRetros: []
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
          toggleShowHide={this.toggleShowLinks}
          deleteRetro={this.deleteRetro}/>
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
      console.log("trackerData");
      console.log(data);   
      var projectIds= "";
      //extract Id's from each project and place them in a comma seperated string
      var projectNameMap = {};
      data.forEach(function (item, index){
        var projectid = item.id;
        projectIds += projectid + ",";
        projectNameMap[item.id] = item.name;
      })

      //ajax call to our rails server to get project retros
      $.get("/users/projects/" + projectIds, function( data ){
        

        data.forEach(function(project, index){
          project.project_name = projectNameMap[project.project_id];
        });

        console.log("New Data")
        //console.log(data);
        console.log(vm.state);
        if(vm.state.projectRetros && vm.state.projectRetros.length > 0){
            //Create map from project ID to boolean for showLinks
            alert("should be called after delete")
            var showLinksMap = {};

            vm.state.projectRetros.forEach(function(proj, index){
              showLinksMap[proj.project_id] = proj.showLinks;
            });

            //for each projectRetroGroup in data, if showLinks is true in the coresponding existing projectRetro
            //set that property to true in data's projectRetroGroup 
            data.forEach(function(item, index){
              item.showLinks = showLinksMap[item.project_id]
            });

            console.log(data);
        }

        //setState with projectRetros
        vm.setState({projectRetros: data});

      });
    });
  },

  deleteRetro: function(retro_id){
    var vm = this;

    var ajaxPromise = $.ajax({
      method: 'DELETE',
      url: "/retros/delete/" + retro_id,
      success: function(data){
        vm.getProjectsFromTracker();
      },
      error: function(data){
        vm.getProjectsFromTracker();
      },
    });

  },

  toggleShowLinks: function(ShowingNow, projectId){
    var rets = this.state.projectRetros;
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
