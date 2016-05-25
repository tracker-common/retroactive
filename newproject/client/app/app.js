import React from 'react';
import Skill from './skill';
import Chart from './chart';
import Data from './data';
import Summary from './Summary';
import TrackerTokenForm from './tracker_token_form';

var RetroActive = React.createClass({
  getInitialState() {
	    return {
	      token: "aa",
	    }
	},

  render() {
    return (
    	<div>
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
			<div className="retro_dates">
				{this.props.data.item} | {this.props.data.name}
			</div>
		</div>
    );
  },

  handleChangeToken_: function(event) {
	this.setState({token: undefined});
  },
  handleSaveToken_: function(event, newToken) {
	this.setState({token: newToken});
  },

});

export default RetroActive;
