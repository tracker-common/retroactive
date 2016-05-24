import React from 'react';
import Skill from './skill';
import Chart from './chart';
import Data from './data';
import Summary from './Summary';
import TrackerTokenForm from './tracker_token_form';

var RetroActive = React.createClass({
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
			<div className="retro_dates">
				{this.props.data.item} | {this.props.data.name}
			</div>
		</div>

    );
  }

});

export default RetroActive;
