import React from 'react';


var RetroItem = React.createClass({
	render() {
		return (
			<div className="retro-item">
				<div className="retro-item-description">
					{this.props.itemText} <button type="button" onClick={this.newTrackerChore}>PTT</button>
				</div>
				<div className="status-and-action-bar">
					<a className="edit-link" onClick={this.show}>Edit</a>
					{ (this.props.action_item_id == null) ? <a className="action-link" onClick={this.showActionModal}>Action</a> : 
					<span className="item-info">Action Item Created</span>}
				</div>
			</div>
		)
	},
	show: function(){
		this.props.handleShowEditModal(this.props.object_id, this.props.itemText);
	},
	showActionModal: function(){

		this.props.handleShowActionModal(this.props.object_id, this.props.itemText);
	},
	newTrackerChore: function(){
		this.props.postToTracker(this);
	}
});

export default RetroItem;
