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
								<div>
									<span className="alert_modal_title">Uh oh!</span>
									<div className="alert_modal_text"> 
										{this.props.text} 
									</div>
									<button type="button" className="alert_modal_button" onClick={this.handleClose}>OK</button>
								</div>
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