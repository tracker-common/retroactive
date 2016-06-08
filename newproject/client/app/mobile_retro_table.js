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

		var action_items_count = 0;
		if(this.props.retro.action_items){
			action_items_count = this.props.retro.action_items.length;
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
						<span style={{color: '#88C1DE', fontWeight: 'bold'}}>Unscheduled: 0</span>
						<span style={{color: '#A7A7A7', fontWeight: 'bold'}}>Scheduled: 0</span>
						<span style={{color: '#DCD003', fontWeight: 'bold'}}>In Progress: 0</span>
						<span style={{color: '#F26373', fontWeight: 'bold'}}>Rejected: 0</span>
						<span style={{color: '#72BF02', fontWeight: 'bold'}}>Accepted: 0</span>
					</div>
				</div>
	    )
	},

	deleteRetro: function(){
		this.props.deleteRetro(this.props.retro._id.$oid);
	}
});


export default MobileRetroTable;
								