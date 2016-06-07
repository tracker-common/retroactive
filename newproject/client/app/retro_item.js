import React from 'react';


var RetroItem = React.createClass({
	render() {
		return (
			<div className="retro-item">
				<div className="retro-item-description">
					{this.props.itemText}
				</div>
				<div className="vote" onClick={this.vote}>Vote! {this.props.votes ? this.props.votes.length : 0}</div>
				<div className="status-and-action-bar">
					<a className="edit-link link" onClick={this.show}>Edit</a>

					{ this.props.object_id ? 
						((this.props.action_item_id == null) ? 
							<a className="action-link link" onClick={this.showActionModal}>Action</a> : 
							<span className="item-info">Action Item Created</span>
						) : null}
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
	},
	vote: function(){
		this.props.handleVote(this);
	}
});

export default RetroItem;
