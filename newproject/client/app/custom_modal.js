import React from 'react';
import ReactDOM from 'react-dom';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import UsersDropdown from './project_users_dropdown'

var CustomModal = React.createClass({

	getDefaultProps: function() {
		return ({
			"isActionItem" : false,
			"editing" : true,
			"item" : null,
			"modalShow": false
		});
	},

	componentDidMount: function() {
		this.needsFocus = true;
	},

	render() {

		var action = "";
		var name = "";
		var buttonText = "";

		if(this.props.isActionItem) {
			name = "Action Item";
		}
		else{
			name = "Retro Item";
		}

		if(this.props.editing) {
			action = "Edit";
			buttonText = "Update";
		}
		else{
			action = "New";
			buttonText = "Save";
		}
		return (
			<div onClick={this.props.handleClick}>
		        { this.props.modalShow && (
			        <ModalContainer onClose={this.props.handleClose}>
						<ModalDialog onClose={this.props.handleClose}>
							<div> 
								<form className="modal" onSubmit={this.handleClick} >
									<span className="custom_modal_title">{action + " " + name}</span>
									<label className="custom_modal_description">Description:</label>
									<textarea className="custom_modal_textbox" ref="newText"/>
									
									{
										this.props.isActionItem ? 
										(
											<div>
												<label className="custom_modal_owner">Owner:</label>
												<br/>
												<UsersDropdown people={this.props.projectUsers} 
													currentPerson={this.props.currentPerson || -1} 
													handleChangePerson={this.handleChangePerson}/>
											</div>
											
										) : 
										null
									}

									<div className="custom_modal_buttons">
										<button type="button" className="update_button" onClick={this.handleClick}>{buttonText}</button>
										

										{
											this.props.editing ? 
											(
									    		<button type="button" className="delete_button" onClick={this.handleDeleteItem}>Delete</button>
											) : 
											null 
										}
									</div>
								</form>
				        	</div>
			        	</ModalDialog>
			        </ModalContainer>
				)}
		    </div>
		);
	},

	handleClick: function(e){
		e.preventDefault();
		
		if(this.props.isActionItem && !this.props.editing){
			this.handleAddActionItem();
		}
		else if (this.props.isActionItem){
			this.handleEditActionItem();
		}
		else{
			this.handleEditItem();
		}

		this.props.handleClose();
	},

	componentDidUpdate: function(){
		
		if(this.props.modalShow && this.refs.newText && this.props.editing){
			this.refs.newText.value = this.props.itemText;
		}

		if(this.needsFocus && ReactDOM.findDOMNode(this.refs.newText) != null){
			this.createFocus();	
			this.needsFocus = false;
		}
		

		else if (!this.props.modalShow){
			this.needsFocus = true;
		}

	},

	handleEditItem: function(){
		this.props.handleEditItem(this.props.itemId, this.refs.newText.value);
	},

	handleAddActionItem: function(){
		this.props.handleAddActionItem(this.props.itemId, this.refs.newText.value);
	},

	handleEditActionItem: function(){
		this.props.handleEditActionItem(this.refs.newText.value, this.props.currentPerson);
	},
	
	handleDeleteItem: function(e){
		//show confirm modal
		e.preventDefault();
		this.props.showConfirmDeleteModal();
		this.props.handleClose()
	},

	handleChangePerson: function(newPerson){
		this.props.handleChangePerson(newPerson, this.refs.newText.value);
	},

	createFocus: function(){
		if(ReactDOM.findDOMNode(this.refs.newText) != null){
				var input = ReactDOM.findDOMNode(this.refs.newText);
				input.focus();
				var current = input.value;
				input.value = '';
				input.value = current;
		}
	},

});

export default CustomModal;