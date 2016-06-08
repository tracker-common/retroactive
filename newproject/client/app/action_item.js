import React from 'react';
import ActionStatus from './action_item_status';

var ActionItem = React.createClass({

	getDefaultProps: function(){
		return{ 
			"status": "Unscheduled",
		};
	},

	render() {
		var statusHtml = ""
		
		return (
			<div className="retro-item">
				<div className="retro-item-description">
					{this.props.itemText}
				</div>
				<div className="status-and-action-bar">
					<span className="item-info">Action Item Status: <ActionStatus status={this.props.status}/> </span>
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