import React from 'react';
import ReactDOM from 'react-dom';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';

var AlertModal = React.createClass({
	getDefaultProps: function(){
		return ({
			"modalShow": false,
			"text" : "Default Modal Text"
		});
	},


	render() {

		return(
			<div className="modal">
		        {
		        	this.props.modalShow &&
		        	(
				        <ModalContainer onClose={this.props.handleClose}>
				          <ModalDialog onClose={this.props.handleClose}>
					          <div className="modal_margin"> 
					          	{this.props.text} 
					          </div>
								<button type="button" 
									onClick={this.handleClose} 
									className="update_button">
									OK
								</button>
				          </ModalDialog>
				        </ModalContainer>
		      		)
		        }
		    </div>
		);
	},

	handleClose: function(e){
		e.preventDefault();
		this.props.handleClose();
	},

});

export default AlertModal;