import React from 'react';
import { Link } from 'react-router';

var RetroTableRow = React.createClass({
	render() {
		return(
			<tr>
	        	<td ><Link to={this.props.linkPath}>{this.props.dateString}</Link></td>
	        	<td>0</td>
	        	<td>0</td>
	        	<td>0</td>
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
		this.props.deleteRetro(this.props.item._id.$oid);
	}
});


export default RetroTableRow;