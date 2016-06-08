import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header';
import MobileHeader from './mobile_header'
import RetroColumn from './retro_column';
import ActionColumn from './action_column';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';

//Imports for responsive media query
import { Component } from 'react';
import DesktopBreakpoint from './responsive_utilities/desktop_breakpoint';
//Used for Tablets, we have not made a tablet view yet
//import TabletBreakpoint from './responsive_utilities/tablet_breakpoint';
import MobileBreakpoint from './responsive_utilities/phone_breakpoint';
import Loader from 'react-loader-advanced';


//Imports for react tabs for mobile view
var ReactTabs = require('react-tabs');
var Tab = ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList = ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;

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
	      AddActionItem: false,
	      loading: true,
	      MaxUserVotes: 100,
	      UserCurrentVotes: 0
	   	}
	},
	componentWillMount: function(){
		if(localStorage.getItem("user_email")==null){
        localStorage.setItem("url_redirect", window.location);
        //need to set and then get it otherwise it doesnt persist
        localStorage.getItem("url_redirect");
        window.location.replace("/");
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

		name = localStorage.getItem("user_name");

		if(localStorage.getItem("url_redirect") == null){
		return (
			<Loader show={this.state.loading}  message={'loading...'}>
			<DesktopBreakpoint>
				<div id="retro-body">
					<Header 
					user_name={localStorage.getItem("user_name")} 
					title={this.state.project_name + " - " + this.state.retro_date} 
					maxVotes={this.state.MaxUserVotes}
					userVotes={this.state.UserCurrentVotes}/>

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
				            	<input type="text"  ref="actionItem"/>
				            	<button type="submit">Submit</button>
				            </form>
				            :
				            <form onSubmit={this.handleEditItem} >
				            	<h1>Description</h1>
				            	<input type="text" onChange={this.handleChangeText} value={this.state.current_item_text}  ref="editRetroItem"/>
				            	<button type="submit">Submit</button>
				            </form>
				          }
				        </div>
				          </ModalDialog>
				        </ModalContainer>
				      }
				    </div>
					<div className="desktop-retro-columns">
						<RetroColumn HeaderText="Happy :)" 
							handleAdd={this.addRetroItem} 
							columnId={0} 
							items={this.state.retroItems[0]} 
							showModal={this.state.modal_show}
							handleShowModal={this.handleShowModal}
							trackerTest={this.addActionItemToTracker}
							handleActionModal={this.handleActionModal}
							handleUnVote={this.handleUnVote}
							handleVote={this.handleVote}
							actionItems={this.state.actionItems} />
						<RetroColumn 
							HeaderText="Puzzler :|"  
							handleAdd={this.addRetroItem} 
							columnId={1} 
							items={this.state.retroItems[1]} 
							showModal={this.state.modal_show}
							handleShowModal={this.handleShowModal} 
							trackerTest={this.addActionItemToTracker}
							handleActionModal={this.handleActionModal}
							handleUnVote={this.handleUnVote}					
							handleVote={this.handleVote}
							actionItems={this.state.actionItems}/>
						<RetroColumn 
							HeaderText="Sad :(" 
							handleAdd={this.addRetroItem} 
							columnId={2} 
							items={this.state.retroItems[2]} 
							showModal={this.state.modal_show} 
							handleShowModal={this.handleShowModal} 
							trackerTest={this.addActionItemToTracker}
							handleActionModal={this.handleActionModal}
							handleVote={this.handleVote}
							handleUnVote={this.handleUnVote}
							actionItems={this.state.actionItems}/>
						<ActionColumn 
							HeaderText="Action Items" 
							columnId={3} 
							items={this.state.actionItems} 
							showModal={this.state.modal_show} 
							handleShowActionEditModal={this.handleShowActionEditModal} 
							trackerTest={this.addActionItemToTracker}
							handleActionModal={this.handleActionModal}/>
					</div>
				</div>
			</DesktopBreakpoint>

			<MobileBreakpoint>
			
				<div id="mobile-retro-body">
					<MobileHeader 
					user_name={localStorage.getItem("user_name")} 
					title={this.state.project_name + " - " + this.state.retro_date} 
					maxVotes={this.state.MaxUserVotes}
					userVotes={this.state.UserCurrentVotes}/>

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
				            	<input type="text"  ref="actionItem"/>
				            	<button type="submit">Submit</button>
				            </form>
				            :
				            <form onSubmit={this.handleEditItem} >
				            	<h1>Description</h1>
				            	<input type="text" onChange={this.handleChangeText} value={this.state.current_item_text}  ref="editRetroItem"/>
				            	<button type="submit">Submit</button>
				            </form>
				          }
				        </div>
				          </ModalDialog>
				        </ModalContainer>
				      }
				    </div>
				    <div className="mobile-retro-columns">
					<Tabs
					 onSelect={this.handleSelect}
        			 >
        			 
        			 	<TabList>
        			 		<Tab>:)</Tab>
        			 		<Tab>:|</Tab>
        			 		<Tab>:(</Tab>
        			 		<Tab>A</Tab>
        			 	</TabList>
        			 	<TabPanel>
							<RetroColumn HeaderText="Happy" 
								handleAdd={this.addRetroItem} 
								columnId={0} 
								items={this.state.retroItems[0]} 
								showModal={this.state.modal_show}
								handleShowModal={this.handleShowModal}
								trackerTest={this.addActionItemToTracker}
								handleActionModal={this.handleActionModal}
								handleUnVote={this.handleUnVote}
								handleVote={this.handleVote}
								actionItems={this.state.actionItems} />
						</TabPanel>
						<TabPanel>
							<RetroColumn 
								HeaderText="Puzzler"  
								handleAdd={this.addRetroItem} 
								columnId={1} 
								items={this.state.retroItems[1]} 
								showModal={this.state.modal_show}
								handleShowModal={this.handleShowModal} 
								trackerTest={this.addActionItemToTracker}
								handleActionModal={this.handleActionModal}
								handleUnVote={this.handleUnVote}					
								handleVote={this.handleVote}
								actionItems={this.state.actionItems}/>
						</TabPanel>
						<TabPanel>		
							<RetroColumn 
								HeaderText="Sad" 
								handleAdd={this.addRetroItem} 
								columnId={2} 
								items={this.state.retroItems[2]} 
								showModal={this.state.modal_show} 
								handleShowModal={this.handleShowModal} 
								trackerTest={this.addActionItemToTracker}
								handleActionModal={this.handleActionModal}
								handleVote={this.handleVote}
								handleUnVote={this.handleUnVote}
								actionItems={this.state.actionItems}/>
						</TabPanel>
						<TabPanel>		
							<ActionColumn 
								HeaderText="Action Items" 
								columnId={3} 
								items={this.state.actionItems} 
								showModal={this.state.modal_show} 
								handleShowActionEditModal={this.handleShowActionEditModal} 
								trackerTest={this.addActionItemToTracker}
								handleActionModal={this.handleActionModal}/>
						</TabPanel>	
							
					</Tabs>
					</div>
				</div>

			</MobileBreakpoint> 
			</Loader>);
		}else{
			return(<div></div>);
		}
	},
	
	handleSelect: function (index, last) {
    	console.log('Selected tab: ' + index + ', Last tab: ' + last);
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

		var token = localStorage.getItem("tracker_token");
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

		var token = localStorage.getItem("tracker_token");

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

			//parse items into their own columns, and count votes by current user
			var itemSet = [[],[],[]]
			var userEmail = localStorage.getItem("user_email")
			var userVoteCount = 0;
			if(data.retro_items){
				data.retro_items.forEach(function(item, index){
					itemSet[item.column].unshift(item);
					if(item.votes){
						item.votes.forEach(function(vote, index){
							if(vote.user_email == userEmail){
								userVoteCount ++;
							}
						});
					}
				});
			}

			var actionSet = []

			if(data.action_items){
				data.action_items.forEach(function(item, index){
					actionSet.unshift(item);
				});
			}


			document.title = "RetroActive - " + data.project_name  + dateString;

			vm.setState({project_name: data.project_name, 
				retro_date: dateString, 
				retroItems: itemSet, 
				project_id: data.project_id, 
				actionItems: actionSet,
				loading: false,
				UserCurrentVotes: userVoteCount,
			});

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
	handleClick: function() 
	{ 
		this.setState({modal_show: true});
	},
	handleClose: function() { this.setState({modal_show: false})},

	addActionItemToTracker: function(actionItem){
        var token = localStorage.getItem("tracker_token");

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
		this.setState({current_item_id: id, current_item_text: item_text, modal_show: true, AddActionItem: false},
			this.createFocus
			);
	},
	handleShowActionEditModal: function(dbId, trackerId, item_text){
		//get the item id of the item being edited to get the text for that item
		this.setState({current_item_id: dbId, current_tracker_action_id: trackerId, 
			current_item_text: item_text, modal_show: true, AddActionItem: false},
			this.createFocus
			);
	},
	handleActionModal: function(id, item_text){
		//get the item id of the item being added to get the text for that item
		this.setState({current_item_id: id, current_item_text: item_text,
		 modal_show: true, AddActionItem: true},
			this.createFocus
			);
	},
	createFocus: function(){
		if(ReactDOM.findDOMNode(this.refs.actionItem) != null){
				var input = ReactDOM.findDOMNode(this.refs.actionItem);
				input.focus();
				var current = input.value;
				input.value = '';
				input.value = current;
		}
		if(ReactDOM.findDOMNode(this.refs.editRetroItem) != null){
				var input = ReactDOM.findDOMNode(this.refs.editRetroItem);
				input.focus();
				var current = input.value;
				input.value = '';
				input.value = current;
		}
	},
	handleVote: function(item){
		//console.log(item);
		if(this.state.MaxUserVotes > this.state.UserCurrentVotes)
		{
			var self = this;
			var postPromise = $.ajax({
				method: 'POST',
		  		url: "/retros/vote/",
		  		data: {
		  			item : item.props.object_id,
		  			retroId : this.props.params.retroId,
		  			email : localStorage.getItem("user_email")
		  		}
	  		});
	
	  		postPromise.then(function(data){
	  			var itemSet = [[],[],[]];
				var userEmail = localStorage.getItem("user_email");
				
				data.forEach(function(item, index){
					itemSet[item.column].unshift(item);
				});
				
	  			self.setState({retroItems: itemSet});
	  		});
		  }
		  else{
		  	alert("Max Votes Reached!");
		  }
	},

	handleUnVote: function(item){
		
		var self = this;
		var postPromise = $.ajax({
			method: 'POST',
	  		url: "/retros/unvote/",
	  		data: {
	  			item : item.props.object_id,
	  			retroId : this.props.params.retroId,
	  			email : localStorage.getItem("user_email")
	  		}
  		});

  		postPromise.then(function(data){
  			//console.log(data);

			//parse items into their own columns, and count votes by current user
			var itemSet = [[],[],[]];
			var userEmail = localStorage.getItem("user_email");
			
			data.forEach(function(item, index){
				itemSet[item.column].unshift(item);
			});
			
  			self.setState({retroItems: itemSet});
  		});
	},
});

export default Retro;
