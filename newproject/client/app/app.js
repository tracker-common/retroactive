import React from 'react';
import TrackerTokenForm from './tracker_token_form';
import CreateRetroForm from './createRetro';
import { Link } from 'react-router'

var RetroActive = React.createClass({
	getInitialState() {
		return {
			data: data
		};
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
			<TrackerTokenForm/>
			<Link to="/createRetro">Create Retro Test</Link>
			<div className="retro_dates">
				{this.state.data.item} | {this.state.data.name}
			</div>
		</div>
    );
  }
});

export default RetroActive;
