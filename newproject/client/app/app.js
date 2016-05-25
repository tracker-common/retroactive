import React from 'react';
import TrackerTokenForm from './tracker_token_form';
import CreateRetroForm from './createRetro';
import { Link } from 'react-router'

var RetroActive = React.createClass({
  getInitialState() {
	    return {
	      token: "aa",
	      data: db_entry,
	   	}
	},

	componentDidMount: function() {
		
	},


  render() {
    return (
    	<div>
			<TrackerTokenForm token={this.state.token} handleSaveToken={this.handleSaveToken_} handleChangeToken={this.handleChangeToken_}/>
			<Link to="/createRetro">Create Retro Test</Link>
			<div className="retro_dates">
				{this.state.data.item} | {this.state.data.name}
			</div>
		</div>
    );
  },

  handleChangeToken_: function(event) {
	this.setState({token: undefined});
  },
  
  handleSaveToken_: function(newToken) {
	this.setState({token: newToken});
  },

});

export default RetroActive;
