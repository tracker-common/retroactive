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
	      current_item_text: "",
	      project_id: ""
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
			            	<h1>Description</h1>
			            	<input type="text" onChange={this.handleChangeText} value={this.state.current_item_text} ref="editRetroItem"/>
			            	<button type="button"  onClick={this.handleEditItem}>Submit</button>
			            </form>
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
						trackerTest={this.addActionItemToTracker}/>
					<RetroColumn 
						HeaderText="Puzzler :|"  
						handleAdd={this.addRetroItem} 
						columnId={1} 
						items={this.state.retroItems[1]} 
						showModal={this.state.modal_show}
						handleShowModal={this.handleShowModal} 
						trackerTest={this.addActionItemToTracker}/>
					<RetroColumn 
						HeaderText="Sad :(" 
						handleAdd={this.addRetroItem} 
						columnId={2} items={this.state.retroItems[2]} 
						showModal={this.state.modal_show} 
						handleShowModal={this.handleShowModal} 
						trackerTest={this.addActionItemToTracker}/>
					<ActionColumn 
						HeaderText="Action Items" 
						columnId={3} 
						items={this.state.actionItems} 
						showModal={this.state.modal_show} 
						handleShowModal={this.handleShowModal} 
						trackerTest={this.addActionItemToTracker}/>
				</div>
			</div>
		);
	},
	handleChangeText: function(){
		this.setState({current_item_text: this.refs.editRetroItem.value});
	},

	handleEditItem: function(){
		this.setState({current_item_text: this.refs.editRetroItem.value});
		this.handleClose();
		//make ajax call to update database entry 
		//we have the item id

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

			//parse items into their own columns
			var itemSet = [[],[],[]]
			if(data.retro_items){
				data.retro_items.forEach(function(item, index){
					itemSet[item.column].unshift(item);
				});
			}

			vm.setState({project_name: data.project_name, retro_date: dateString, retroItems: itemSet, project_id: data.project_id});
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
		console.log(actionItem);
        var token = sessionStorage.getItem("tracker_token");
		var ajaxPromise = $.ajax({
			 method: 'POST',
	  		 url: "https://www.pivotaltracker.com/services/v5/projects/"+ this.state.project_id +"/stories",
	          beforeSend: function(xhr) {
	            xhr.setRequestHeader('X-TrackerToken', token);
	          },
	          data: {
	          	"name": "RetroActive Action Item",
	          	"description": actionItem.props.itemText,
	          	"project_id": this.state.project_id,
	          	"story_type": "chore"
	          }
	  	});
	},
	handleShowModal: function(id, item_text){
		//get the item id of the item being edited to get the text for that item
		this.setState({current_item_id: id});
		this.setState({current_item_text: item_text});
		this.setState({modal_show: true});

	},
});

export default Retro;
