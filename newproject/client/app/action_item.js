import React from 'react';

var ActionItem = React.createClass({

	getDefaultProps: function(){
		return{ 
			"status": "new",
		};
	},

	render() {
		return (
			<div className="retro-item">
				<div className="retro-item-description">
					{this.props.itemText}
				</div>
				<div className="status-and-action-bar">
					<span className="item-info">Action Item Status: {this.props.status}</span>
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