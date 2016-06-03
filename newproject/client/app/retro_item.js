import React from 'react';


var RetroItem = React.createClass({
	render() {
		name = sessionStorage.getItem("user_name");
		return (
			<div className="retro-item">
				<div className="retro-item-description">
					{this.props.itemText} <button type="button" onClick={this.newTrackerChore}>PTT</button>
				</div>
				<div className="status-and-action-bar">
					<a className="edit-link" onClick={this.show}>Edit</a>
					<a className="action-link" onClick={this.showActionModal}>Action</a>
				</div>
			</div>
		)
	},
	show: function(){
		alert("retro_item: " + this.props.object_id);
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
