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
								<span> 
									{this.props.text} 
								</span>
								<button type="button" className="update_button" onClick={this.handleClose}>OK</button>
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