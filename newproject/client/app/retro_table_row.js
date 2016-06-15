import React from 'react';
import { Link } from 'react-router';

var RetroTableRow = React.createClass({
	render() {

		//happy, puzzler, sad
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

		if(this.props.retro.action_items) {
			this.props.retro.action_items.forEach(function(item, index) {
				switch (item.status) {
					case "unscheduled":
						unscheduled++;
						break;
					case "unstarted":
						scheduled++;
						break;
					case "scheduled":
						scheduled++;
						break;
					case "started":
						started++;
						break;
					case "accepted":
						accepted++;
						break;
				}
			});
		}

		return(
			<tr>
	        	<td ><Link to={this.props.linkPath}>{this.props.dateString}</Link></td>
	        	<td>{emotesCountArray[0]}</td>
	        	<td>{emotesCountArray[1]}</td>
	        	<td>{emotesCountArray[2]}</td>
	        	<td>{unscheduled}</td>
	        	<td>{scheduled}</td>
	        	<td>{started}</td>
	        	<td>{accepted}</td>
	        	<td className="link" onClick={this.deleteRetro}>X</td> 	
	        </tr>
		);
	},

	deleteRetro: function(){
		this.props.deleteRetro(this.props.retro._id.$oid);
	}
});


export default RetroTableRow;