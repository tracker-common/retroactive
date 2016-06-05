import React from 'react';
import { Link } from 'react-router';

var RetroTableRow = React.createClass({
	render() {

		//happy, puzzler, sad
		var emotesCountArray = [0,0,0];
		this.props.retro.retroItems.forEach(function(item, index){
			emotesCountArray[item.column] += 1;
		});

		return(
			<tr>
	        	<td ><Link to={this.props.linkPath}>{this.props.dateString}</Link></td>
	        	<td>{emotesCountArray[0]}</td>
	        	<td>{emotesCountArray[1]}</td>
	        	<td>{emotesCountArray[2]}</td>
	        	<td>0</td>
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