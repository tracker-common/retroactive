import React from 'react';
import { Link } from 'react-router';

var MobileRetroTable = React.createClass({
	render() {
		var emotesCountArray = [0,0,0];
		if(this.props.retro.retro_items){
			this.props.retro.retro_items.forEach(function(item, index){
				emotesCountArray[item.column] += 1;
			});
		}


		var unscheduled = 0;
		var scheduled = 0;
		var started = 0;
		var accepted = 0;

		if(this.props.retro.action_items){
			this.props.retro.action_items.forEach(function(item, index){
				switch(item.status){
					case "unscheduled":
						unscheduled ++;
						break;
					case "unstarted":
						scheduled++;
						break;
					case "scheduled":
						scheduled ++;
						break;
					case "started":
						started ++;
						break;
					case "accepted":
						accepted++;
						break;
				}
			});
		}
		
	    return(
		    	<div className="mobile_retro_table">
					<span style={{fontSize: '16px', fontWeight: 'bold'}}>
						<Link to={this.props.linkPath}>{this.props.dateString}</Link>
					</span>

			    	<span style={{fontWeight: 'bold'}}>Items</span>

			    	<div className="mobile_retro_table__tabbed">
						<span>Happy: {emotesCountArray[0]}</span>
						<span>Puzzler: {emotesCountArray[1]}</span>
						<span>Sad: {emotesCountArray[2]}</span>
					</div>

					<span style={{fontWeight: 'bold'}}>Actions</span>

					<div className="mobile_retro_table__tabbed">
						<span style={{color: '#88C1DE', fontWeight: 'bold'}}>Unscheduled: {unscheduled}</span>
						<span style={{color: '#A7A7A7', fontWeight: 'bold'}}>Scheduled: {scheduled}</span>
						<span style={{color: '#DCD003', fontWeight: 'bold'}}>In Progress: {started}</span>
						<span style={{color: '#72BF02', fontWeight: 'bold'}}>Accepted: {accepted}</span>
					</div>
				</div>
	    )
	},

	deleteRetro: function(){
		this.props.deleteRetro(this.props.retro._id.$oid);
	}
});


export default MobileRetroTable;
								