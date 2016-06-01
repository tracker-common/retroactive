import React from 'react';
import Header from './header';
import RetroColumn from './retro_column';
import ActionColumn from './action_column';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';

var Retro = React.createClass({
	
	getInitialState() {
	    return {
	      retroItems: [[],[],[]],
	      actionItems: [],
	      project_name: "",
	      retro_date: "",
	      modal_show: false,
	      text: ""
	   	}
	},

	componentDidMount: function(){
		this.buildRetro();
	},

	render() {
		name = sessionStorage.getItem("user_name");
		
		return (
			<div id="retro-body">
				<Header user_name={sessionStorage.getItem("user_name")} title={this.state.project_name + " - " + this.state.retro_date} />
				{}

				<br/>	
				<div className="modal" onClick={this.handleClick}>
			      {
			        this.state.modal_show &&
			        <ModalContainer onClose={this.handleClose}>
			          <ModalDialog onClose={this.handleClose}>
			            <form>
			            	<input type="text" ref="editRetroItem"/>
			            	<button type="button"  onClick={this.handleEditItem}>Submit</button>
			            </form>
			          </ModalDialog>
			        </ModalContainer>
			      }
			    </div>
			    {this.state.text}
				<div className="retro-columns">
					
					<RetroColumn HeaderText="Happy :)" handleAdd={this.addRetroItem} columnId={0} items={this.state.retroItems[0]} showModal={this.state.modal_show} updateModalState={this.updateModalState}/>
					<RetroColumn HeaderText="Puzzler :|"  handleAdd={this.addRetroItem} columnId={1} items={this.state.retroItems[1]} showModal={this.state.modal_show} updateModalState={this.updateModalState}/>
					<RetroColumn HeaderText="Sad :(" handleAdd={this.addRetroItem} columnId={2} items={this.state.retroItems[2]} showModal={this.state.modal_show} updateModalState={this.updateModalState}/>
					<ActionColumn HeaderText="Action Items" columnId={3} items={this.state.actionItems} showModal={this.state.modal_show} updateModalState={this.updateModalState}/>
				</div>
			</div>
		);
	},

	handleEditItem: function(){
		this.setState({text: this.refs.editRetroItem.value});
		this.handleClose();
	},
	buildRetro: function(){
		var retroId = this.props.params.retroId;
		var vm = this;
		$.get("/retros/" + retroId, function(data){
			console.log(data);

			//Date Magic from stack overflow
			var date = new Date(data.created_on);
			date = new Date(date.getTime() + date.getTimezoneOffset()*60000)
			console.log(date);
			var dateString = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
			//end date magic

			vm.setState({project_name: data.project_name, retro_date: dateString});
		});
	},

	addRetroItem: function(column, text){
		
		if(column < 3){
			var items = this.state.retroItems;
			items[column].unshift(text);
			this.setState({retroItems: items});
		}
		else if (column == 3){
			var items = this.state.actionItems;
			items.unshift(text);
			this.setState({actionItems: items});
		}
	},
	handleClick: function() {this.setState({modal_show: true})},
	handleClose: function() {this.setState({modal_show: false})},
	updateModalState: function(showOrHide){
		console.log("level 3 show");
		this.setState({modal_show: showOrHide});
	},
	handleCloseModal: function(){
		console.log("level 3 close");
		this.setState({modal_show: false});
	}
});

export default Retro;
