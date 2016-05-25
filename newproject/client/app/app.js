import React from 'react';
import TrackerTokenForm from './tracker_token_form';
import CreateRetroForm from './createRetro';
import { Link } from 'react-router'
import Header from './header';

var RetroActive = React.createClass({
  getInitialState() {
	    return {
	      token: "aa",
	      data: db_entry,
	      retroId: "",
	      user_name: sessionStorage.getItem("user_name"),
	      user_email: sessionStorage.getItem("user_email"),
	   	}
	},

  render() {
    return (
    	<div className="dashboard">
    		<Header user_name={this.state.user_name} />
			<TrackerTokenForm token={this.state.token} handleSaveToken={this.handleSaveToken_} handleChangeToken={this.handleChangeToken_}/>
			<CreateRetroForm handleCreateRetro={this.handleCreateRetro_}/>
			<div className="retro_dates">
				{this.state.data.item} | {this.state.data.name} | {this.state.retroId}
			</div>
			USER_DATA: {this.state.user_name}
		</div>
    );
  },

  handleChangeToken_: function(event) {
	this.setState({token: undefined});
  },
  
  handleSaveToken_: function(newToken) {
	this.setState({token: newToken});
  },
  handleCreateRetro_: function(newRetroId) {
	this.setState({retroId: newRetroId});
	window.location.replace('/show/' + newRetroId);
  }
});


export default RetroActive;
