import React from 'react';

var ActionItem = React.createClass({

	getDefaultProps: function(){
		return{ 
			"status": "Unscheduled",
		};
	},

	render() {
		var statusHtml = ""
		switch(this.props.status){
			case "Unscheduled":
				statusHtml = (<span style={{color: '#88C1DE', fontWeight: 'bold'}}> Unscheduled </span>)
				break;
			case "Scheduled":
				statusHtml = (<span style={{color: '#A7A7A7', fontWeight: 'bold'}}>Scheduled</span>)
				break;
			case "In Progress":			
				statusHtml = (<span style={{color: '#DCD003', fontWeight: 'bold'}}>In Progress</span>)
				break;
			case "Rejected":			
				statusHtml = (<span style={{color: '#F26373', fontWeight: 'bold'}}>Rejected</span>)
				break;
			case "Accepted":
				statusHtml = (<span style={{color: '#72BF02', fontWeight: 'bold'}}>Accepted</span>)
				break;
		}
		return (
			<div className="retro-item">
				<div className="retro-item-description">
					{this.props.itemText}
				</div>
				<div className="status-and-action-bar">
					<span className="item-info">Action Item Status: {statusHtml}</span>
					<a className="edit-link link" onClick={this.show}>Edit</a>
				</div>

			</div>
		)
	},
	show: function(){
		this.props.handleShowEditModal(this.props.object_id, this.props.tracker_id, this.props.itemText);
	},
});

export default ActionItem;