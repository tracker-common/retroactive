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
				</div>

			</div>
		)
	}
});

export default ActionItem;