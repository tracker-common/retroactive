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
	      current_item_id: "",
	      current_tracker_action_id: null,
	      current_item_text: "",
	      project_id: "",
	      AddActionItem: false
	   	}
	},

	componentDidMount: function(){
		var vm = this;
		this.buildRetro();
		this.refreshIntervalId = setInterval(function(){
			vm.buildRetro();
			console.log("refreshed");
		}, 1000);
	},

	componentWillUnmount: function(){
		clearInterval(this.refreshIntervalId);
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
			          <div> 
			          {
			          	this.state.AddActionItem ?
			            <form onSubmit={this.handleAddActionItem} >
			            	<h1>Add Action Item</h1>
			            	<input type="text" ref="actionItem"/>
			            	<button type="submit">Submit</button>
			            </form>
			            :
			            <form onSubmit={this.handleEditItem} >
			            	<h1>Description</h1>
			            	<input type="text" onChange={this.handleChangeText} value={this.state.current_item_text} ref="editRetroItem"/>
			            	<button type="submit">Submit</button>
			            </form>
			          }
			        </div>
			          </ModalDialog>
			        </ModalContainer>
			      }
			    </div>
				<div className="retro-columns">
					<RetroColumn HeaderText="Happy :)" 
						handleAdd={this.addRetroItem} 
						columnId={0} 
						items={this.state.retroItems[0]} 
						showModal={this.state.modal_show}
						handleShowModal={this.handleShowModal}
						trackerTest={this.addActionItemToTracker}
						handleActionModal = {this.handleActionModal}/>
					<RetroColumn 
						HeaderText="Puzzler :|"  
						handleAdd={this.addRetroItem} 
						columnId={1} 
						items={this.state.retroItems[1]} 
						showModal={this.state.modal_show}
						handleShowModal={this.handleShowModal} 
						trackerTest={this.addActionItemToTracker}
						handleActionModal = {this.handleActionModal}/>
					<RetroColumn 
						HeaderText="Sad :(" 
						handleAdd={this.addRetroItem} 
						columnId={2} items={this.state.retroItems[2]} 
						showModal={this.state.modal_show} 
						handleShowModal={this.handleShowModal} 
						trackerTest={this.addActionItemToTracker}
						handleActionModal = {this.handleActionModal}/>
					<ActionColumn 
						HeaderText="Action Items" 
						columnId={3} 
						items={this.state.actionItems} 
						showModal={this.state.modal_show} 
						handleShowActionEditModal={this.handleShowActionEditModal} 
						trackerTest={this.addActionItemToTracker}
						handleActionModal = {this.handleActionModal}/>
				</div>
			</div>
		);
	},
	handleChangeText: function(){
		this.setState({current_item_text: this.refs.editRetroItem.value});
	},
	handleEditItem: function(e){
		e.preventDefault();
		if(this.state.current_tracker_action_id != null){
			this.handleEditActionItem(e, this.refs.editRetroItem.value);
		}
		else{
			this.setState({current_item_text: this.refs.editRetroItem.value});
			this.handleClose();
			//make ajax call to update database entry 
			//we have the item id
			var retroId = this.props.params.retroId;

			var postPromise = $.ajax({
				method: 'POST',
		  		url: "/retros/editItemText/" + retroId + "/" + this.state.current_item_id,
		  		data: {text : this.refs.editRetroItem.value}
		  	});
		}	

	},
	handleAddActionItem: function(e){
		e.preventDefault();
		var vm = this;
		this.setState({AddActionItem: false});
		this.handleClose();
		//make ajax call to update database entry 
		//we have the item id
		var retroId = this.props.params.retroId;

		var token = sessionStorage.getItem("tracker_token");
		var actionItemText = vm.refs.actionItem.value;

		var postPromise = $.ajax({
			 method: 'POST',
	  		 url: "https://www.pivotaltracker.com/services/v5/projects/"+ vm.state.project_id +"/stories",
	          beforeSend: function(xhr) {
	            xhr.setRequestHeader('X-TrackerToken', token);
	          },
	          data: {
	          	"name": "RetroActive Action Item",
	          	"description": actionItemText,
	          	"project_id": vm.state.project_id,
	          	"story_type": "chore"
	          }
	  	});

		postPromise.then(function(data){
			var postPromise = $.ajax({
				method: 'POST',
		  		url: "/retros/addActionItem/" + retroId + "/" + vm.state.current_item_id,
		  		data: {
		  			"tracker_action_id": data.id,
		  			"text": actionItemText
		  			
		  		}
	  		});
		});
	},
	handleEditActionItem: function(e, actionItemText){
		e.preventDefault();
		var vm = this;
		this.setState({AddActionItem: false});
		this.handleClose();
		//make ajax call to update database entry 
		//we have the item id
		var retroId = this.props.params.retroId;

		var token = sessionStorage.getItem("tracker_token");

		var postPromise = $.ajax({
			 method: 'PUT',
	  		 url: "https://www.pivotaltracker.com/services/v5/projects/"+ vm.state.project_id 
	  		 	+ "/stories/" + vm.state.current_tracker_action_id,
	          beforeSend: function(xhr) {
	            xhr.setRequestHeader('X-TrackerToken', token);
	          },
	          data: {
	          	"description": actionItemText
	          }
	  	});

		postPromise.then(function(data){
			var postPromise = $.ajax({
				method: 'POST',
		  		url: "/retros/editActionText/" + retroId + "/" + vm.state.current_item_id,
		  		data: {text : actionItemText}
	  		});
	  		vm.setState({current_tracker_action_id: null});
		});
	},
	buildRetro: function(){
		var retroId = this.props.params.retroId;
		var vm = this;

		$.get("/retros/" + retroId, function(data){

			//Date Magic from stack overflow
			var date = new Date(data.created_on);
			date = new Date(date.getTime() + date.getTimezoneOffset()*60000)
			var dateString = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
			//end date magic

			//parse items into their own columns
			var itemSet = [[],[],[]]
			if(data.retro_items){
				data.retro_items.forEach(function(item, index){
					itemSet[item.column].unshift(item);
				});
			}

			var actionSet = []

			if(data.action_items){
				data.action_items.forEach(function(item, index){
					actionSet.unshift(item);
				});
			}


			vm.setState({project_name: data.project_name, 
				retro_date: dateString, 
				retroItems: itemSet, 
				project_id: data.project_id, 
				actionItems: actionSet});
		});
	},
	addRetroItem: function(column, text){
		
		if(column < 3){
			var items = this.state.retroItems;

			
			var newItem = {};
			newItem.text = text;
			newItem.id = null;
			newItem.colum = column;

			//Ajax call to add the item
			var postPromise = $.ajax({
			
				method: 'POST',
		  		url: "/retros/additem/" + this.props.params.retroId + "/" + column,
		  		data: newItem
		  	});
			//add the item to the array of items
			items[column].unshift(newItem);

			this.setState({retroItems: items});
		}
		else if (column == 3){
			var items = this.state.actionItems;
			items.unshift(text);
			this.setState({actionItems: items});
		}
	},
	handleClick: function() {this.setState({modal_show: true})},
	handleClose: function() { this.setState({modal_show: false})},

	addActionItemToTracker: function(actionItem){
        var token = sessionStorage.getItem("tracker_token");

		var ajaxPromise = $.ajax({
			 method: 'POST',
	  		 url: "https://www.pivotaltracker.com/services/v5/projects/"+ this.state.project_id +"/stories",
	          beforeSend: function(xhr) {
	            xhr.setRequestHeader('X-TrackerToken', token);
	          },
	          data: {
	          	"name": "RetroActive Action Item",
	          	"description": actionItem.text,
	          	"project_id": this.state.project_id,
	          	"story_type": "chore"
	          }
	  	});

	},
	handleShowModal: function(id, item_text){
		//get the item id of the item being edited to get the text for that item
		this.setState({current_item_id: id, current_item_text: item_text, modal_show: true, AddActionItem: false});
	},
	handleShowActionEditModal: function(dbId, trackerId, item_text){
		//get the item id of the item being edited to get the text for that item
		this.setState({current_item_id: dbId, current_tracker_action_id: trackerId, current_item_text: item_text, modal_show: true, AddActionItem: false});
	},
	handleActionModal: function(id, item_text){
		//get the item id of the item being edited to get the text for that item
		this.setState({current_item_id: id, current_item_text: item_text, modal_show: true, AddActionItem: true});
	},
});

export default Retro;
