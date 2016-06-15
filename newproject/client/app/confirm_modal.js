import React from 'react';
import ReactDOM from 'react-dom';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import UsersDropdown from './project_users_dropdown'

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

		var action = "";
		var name = "";
		var buttonText = "";
		var text = "";

		if(this.props.isActionItem){
			text = "Are you sure you want to delete this action item? \
				This will also delete the corresponding chore in Pivotal Tracker.";
		}
		else if (this.props.hasActionItem){
			text = "Are you sure you want to delete this retro item? \
				This will also delete the corresponding action item and the chore in Pivotal Tracker.";
		}

		else{
			text = "Are you sure you want to delete this retro item?";
		}

		return(
			<div className="modal" onClick={this.props.handleClick}>
		        {
		        	this.props.modalShow &&
		        	(
			        <ModalContainer onClose={this.props.handleClose}>
			          <ModalDialog onClose={this.props.handleClose}>
			          <div> 
			          {text}
			          {
			            <form>
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
			            </form>
			          }
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