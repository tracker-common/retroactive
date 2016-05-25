import React from 'react';
import TrackerTokenForm from './tracker_token_form';
import CreateRetroForm from './createRetro';
import { Link } from 'react-router'

var RetroActive = React.createClass({
  getInitialState() {
	    return {
	      token: "aa",
	      data: db_entry,
	      retroId: "",
	   	}
	},

  render() {
    return (
    	<div className="dashboard">
	    	<div className="header">
				<div className="left"> 
					<img src="RETROACTIVE.svg"/>
				</div>
				<div className="center header__text_box" >
					<h1>Dashboard</h1>
				</div>
				<div className="right header__text_box">
					<h1 >Name</h1>
				</div>
			</div>
			<TrackerTokenForm token={this.state.token} handleSaveToken={this.handleSaveToken_} handleChangeToken={this.handleChangeToken_}/>
			<Link to="/createRetro" handleCreateRetro={this.handleCreateRetro_} handleUpdateRetroId={this.handleUpdateRetroId_}>Create Retro</Link>
			<div className="retro_dates">
				{this.state.data.item} | {this.state.data.name} | {this.state.retroId}
			</div>
			RetroID: {this.state.retroId}
		</div>
    );
  },

  handleChangeToken_: function(event) {
	this.setState({token: undefined});
  },
  handleSaveToken_: function(event, newToken) {
	this.setState({token: newToken});
  },
  handleCreateRetro_: function() {
	this.setState({retroId: "AAAAA"});
	console.log(retroId);
	window.location.replace("/");
  },
  handleUpdateRetroId_: function(event) {
	this.setState({retroId: event.target.value});
	console.log(retroId);
  }
});

export default RetroActive;
