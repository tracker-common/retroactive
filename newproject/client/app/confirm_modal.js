import React from 'react';
import ReactDOM from 'react-dom';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';

var ConfirmModal = React.createClass({
	getDefaultProps: function(){
		return ({
			"isActionItem" : false,
			"editing" : true,
			"item" : null,
			"modalShow": false
		});
	},

	componentDidMount: function(){
		this.needsFocus = true;
	},

	render() {
		var text = null;
		var title = "Action Item";

		if (this.props.isActionItem) {
			text = (<p>Are you sure you want to delete this action item? <br/>
				This will also delete the corresponding chore in Pivotal Tracker.</p>);
		}
		else if (this.props.hasActionItem) {
			title="Retro Item";
			text = (<p>Are you sure you want to delete this retro item?<br/>
				This will also delete the corresponding action item and the chore in Pivotal Tracker.</p>);
		}

		else {
			title="Retro Item";
			text = (<p>Are you sure you want to delete this retro item?</p>);
		}

		return(
			<div className="modal" onClick={this.props.handleClick}>
		        {
		        	this.props.modalShow &&
		        	(
			        <ModalContainer onClose={this.props.handleClose}>
						<ModalDialog onClose={this.props.handleClose}>
							<div>
								<span className="confirm_modal_title">{title}</span>
								<div className="confirm_modal_text"> 
									{text}
								</div>
							
								<form>
									<div className="confirm_modal_buttons">
										<button type="button" 
											onClick={this.handleDeleteItem} 
											className="delete_button">
											Delete
										</button>

										<button type="button" 
											onClick={this.handleCancel} 
											className="update_button">
											Cancel
										</button>
									</div>
								</form>
							</div>
						</ModalDialog>
			        </ModalContainer>
		      )}
		    </div>
		);
	},

	handleDeleteItem: function(e){
		e.preventDefault();
		if(this.props.isActionItem){
			this.props.handleDeleteActionItem(this.props.currentTrackerActionId, this.props.itemId);
		}
		else{
			this.props.handleDeleteItem(this.props.itemId);	
		}
		this.props.handleClose();
	},

	handleCancel: function(e){
		e.preventDefault();
		this.props.handleClose();
	},

});

export default ConfirmModal;