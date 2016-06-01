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
				</div>
			</div>
		)
	},
	show: function(){
		this.props.handleShowModal();
	},
	newTrackerChore: function(){
		this.props.postToTracker(this);
	}
});

export default RetroItem;
