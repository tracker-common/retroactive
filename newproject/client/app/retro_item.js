import React from 'react';
import Modal, {closeStyle} from 'simple-react-modal';

var RetroItem = React.createClass({
	render() {
		name = sessionStorage.getItem("user_name");
		return (
			<div className="retro-item">
				<div className="retro-item-description">
					{this.props.itemText} <button type="button" onClick={this.newTrackerChore}>PTT</button>
				</div>

				<a onClick={this.show}>Open Modal</a>
				<Modal
					closeOnOuterClick={true}
					show={this.props.modalShow}
					onClose={this.close}
					transitionSpeed={1000}>

					<a className="close" onClick={this.close}>X</a>
					<div>hey</div>

				</Modal>

			</div>
		)
	},
	show: function(){
		this.props.showModal();
	},
	close: function(){
		this.props.closeModal();
	},

	newTrackerChore: function(){
		this.props.postToTracker(this);
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