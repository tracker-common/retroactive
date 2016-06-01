import React from 'react';


var RetroItem = React.createClass({
	render() {
		name = sessionStorage.getItem("user_name");
		return (
			<div className="retro-item">
				<div className="retro-item-description">
					{this.props.itemText} <button type="button" onClick={this.newTrackerChore}>PTT</button>
				</div>

				<a onClick={this.show}>Open Modal</a>
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
