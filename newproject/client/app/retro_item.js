import React from 'react';


var RetroItem = React.createClass({
	render() {
		name = sessionStorage.getItem("user_name");
		return (
			<div className="retro-item">
				<div className="retro-item-description">
					{this.props.itemText}
				</div>

				<a onClick={this.show}>Open Modal</a>
			</div>
		)
	},
	show: function(){
		this.props.handleShowModal();
	}
});

export default RetroItem;

/*<div className="retro-item-actions">
					<button id="editBtn" onClick={this.editOnClick}>Open Modal</button>

					<div id="modal-edit" className="modal-edit-item">
					  <div className="modal-edit-item-content">
					    <span className="close-modal" onClick={this.closeOnClick}>x</span>
					    <p>Some text in the Modal..</p>
					  </div>
					</div>

				</div>
				<div className="retro-item-status">
				</div>
*/