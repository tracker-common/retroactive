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

		var action_items_count = 0;
		if(this.props.retro.action_items){
			action_items_count = this.props.retro.action_items.length;
		}

		return(
			<tr>
	        	<td ><Link to={this.props.linkPath}>{this.props.dateString}</Link></td>
	        	<td>{emotesCountArray[0]}</td>
	        	<td>{emotesCountArray[1]}</td>
	        	<td>{emotesCountArray[2]}</td>
	        	<td>{action_items_count}</td>
	        	<td>0</td>
	        	<td>0</td>
	        	<td>0</td>
	        	<td>0</td>
	        	<td className="link" onClick={this.deleteRetro}>X</td> 	
	        </tr>
		);
	},

	deleteRetro: function(){
		this.props.deleteRetro(this.props.retro._id.$oid);
	}
});


export default RetroTableRow;