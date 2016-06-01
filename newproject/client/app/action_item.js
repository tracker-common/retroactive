import React from 'react';

var ActionItem = React.createClass({

	render() {
		name = sessionStorage.getItem("user_name");
		return (
			<div className="retro-item">
				<div className="item-description">
					{this.props.itemText}
				</div>
				<div className="item-actions">
					<div className="item-status">

					</div>
				</div>

			</div>
		)
	}
});

export default RetroItem;