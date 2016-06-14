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
import UsersDropdown from './project_users_dropdown';
import CustomModal from './custom_modal';


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
	      projectName: "",
	      retroDate: "",
	      modalShow: false,
	      currentItemId: "",
	      currentTrackerActionId: null,
	      currentItemText: "",
	      projectId: "",
	      addActionItem: false,
	      loading: true,
	      maxUserVotes: 100,
	      userCurrentVotes: 0,
	      refreshActionStatuses: true,
	      projectUsers: {},
	      currentRetroVersion: -1
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
			vm.checkRetroVersion();
			//vm.buildRetro();
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
				<div id="retro_body">
					<Header 
					user_name={localStorage.getItem("user_name")} 
					title={this.state.projectName + " - " + this.state.retroDate} 
					maxVotes={this.state.maxUserVotes}
					userVotes={this.state.userCurrentVotes}/>
					
					<CustomModal 
					editing={this.state.editingItem} 
					itemText={this.state.currentItemText}
					itemId = {this.state.currentItemId}
					isActionItem = {this.state.addActionItem}
					currentTrackerActionId = {this.state.currentTrackerActionId}
					projectUsers = {this.state.projectUsers}
					modalShow = {this.state.modalShow}
					handleEditItem = {this.handleEditItem}
					handleAddActionItem = {this.handleAddActionItem}
					currentPerson = {this.state.currentSelectedPerson}
					handleChangePerson={this.handleChangePerson}
					handleEditActionItem = {this.handleEditActionItem}
					handleDeleteItem = {this.handleDeleteItem}
					handleDeleteActionItem = {this.handleDeleteActionItem}
					handleClick = {this.handleClick}
					handleClose = {this.handleClose}/>

					<div className="desktop_retro_columns">
						<RetroColumn HeaderText="Happy :)" 
							handleAdd={this.addRetroItem} 
							columnId={0} 
							items={this.state.retroItems[0]} 
							showModal={this.state.modalShow}
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
							showModal={this.state.modalShow}
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
							showModal={this.state.modalShow} 
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
							showModal={this.state.modalShow} 
							handleShowActionEditModal={this.handleShowActionEditModal} 
							trackerTest={this.addActionItemToTracker}
							handleActionModal={this.handleActionModal}
							projectUsers = {this.state.projectUsers}/>
					</div>
				</div>
			</DesktopBreakpoint>

			<MobileBreakpoint>
				<div id="mobile-retro-body">
					<MobileHeader 
					user_name={localStorage.getItem("user_name")} 
					title={this.state.projectName + " - " + this.state.retroDate} 
					maxVotes={this.state.maxUserVotes}
					userVotes={this.state.userCurrentVotes}/>

					
					<CustomModal 
						editing={this.state.editingItem} 
						itemText={this.state.currentItemText}
						itemId = {this.state.currentItemId}
						isActionItem = {this.state.addActionItem}
						currentTrackerActionId = {this.state.currentTrackerActionId}
						projectUsers = {this.state.projectUsers}
						modalShow = {this.state.modalShow}
						handleEditItem = {this.handleEditItem}
						handleAddActionItem = {this.handleAddActionItem}
						currentPerson = {this.state.currentSelectedPerson}
						handleChangePerson={this.handleChangePerson}
						handleEditActionItem = {this.handleEditActionItem}
						handleDeleteItem = {this.handleDeleteItem}
						handleDeleteActionItem = {this.handleDeleteActionItem}
						handleClick = {this.handleClick}
						handleClose = {this.handleClose}/>
					
				    <div className="mobile_retro_columns">
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
								showModal={this.state.modalShow}
								handleShowModal={this.handleShowModal}
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
								showModal={this.state.modalShow}
								handleShowModal={this.handleShowModal} 
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
								showModal={this.state.modalShow} 
								handleShowModal={this.handleShowModal} 
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
								showModal={this.state.modalShow} 
								handleShowActionEditModal={this.handleShowActionEditModal} 
								handleActionModal={this.handleActionModal}
								projectUsers = {this.state.projectUsers}/>
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
		this.setState({currentItemText: this.refs.editRetroItem.value});
	},

	getProjectUsers: function(projectId){
		var projectUsers = {};
		var token = localStorage.getItem("tracker_token");
		var usersPromise = $.ajax({
			method: 'GET',
			url: "https://www.pivotaltracker.com/services/v5/projects/" + projectId + "/memberships",
			beforeSend: function(xhr) {
	            xhr.setRequestHeader('X-TrackerToken', token);
	        }
		});

		usersPromise.then(function(data){
			// console.log("Users Data");
			// console.log(data);

			data.forEach(function(member, index){
				if(member.role != 'viewer'){
					projectUsers[member.person.id] = member.person;
				}
			});

			// console.log("Our Array");
			// console.log(projectUsers);
		});

		usersPromise.error(function(data){
			console.log("Error with Users data");
			console.log(data);
		});

		this.setState({projectUsers: projectUsers, refreshActionStatuses: false});
	},

	handleEditItem: function(itemId, text){

		
		this.setState({currentItemText: text});
		this.handleClose();
		//make ajax call to update database entry 
		//we have the item id
		var retroId = this.props.params.retroId;

		var postPromise = $.ajax({
			method: 'POST',
	  		url: "/retros/editItemText/" + retroId + "/" + itemId,
	  		data: {text : text}
	  	});
		
	},

	getItemById: function(itemId){
		var returnItem = null;
		this.state.retroItems.forEach(function(itemSet, index){
			itemSet.forEach(function(item, index){
				if(item._id.$oid == itemId){ returnItem = item;}
			});
		});

		return returnItem;
	},

	getActionItemById: function(actionItemId){
		var returnItem = null;
		this.state.actionItems.forEach(function(item, index){
			if(item._id.$oid == actionItemId){ returnItem = item;}
		});

		return returnItem;
	},

	handleDeleteActionItem: function(trackerActionId, itemId){
			//delete item from our Mongo DB
			this.deleteActionItem(itemId);
			
			//delete item from Tracker
			this.deleteTrackerStory(trackerActionId);
	},

	handleDeleteItem: function( itemId) {
		//e.preventDefault();
		console.log("Retro Handle Delete");
		console.log(itemId);
		this.handleClose();
		//get the item.
		var item = this.getItemById(itemId);

		if(item.action_item_id){
			//get the action item variables to be able to delete it
			var actionItem = this.getActionItemById(item.action_item_id);
			//delete the action item
			if(actionItem != null){
				this.handleDeleteActionItem(actionItem.tracker_action_id, item.action_item_id);
			}
		}

		//Delete the item
		var retroId = this.props.params.retroId;

		//Make the call to delete our item
		var postPromise = $.ajax({
			method: 'DELETE',
	  		url: "/retros/deleteItem/" + retroId + "/" + this.state.currentItemId,
	  	});

	  	postPromise.then(function(data){
	  		console.log("deleted!");
	  	});
	},
	handleAddActionItem: function(itemId, itemText){
		//e.preventDefault();

		console.log("AddingAnActionItem");
		var vm = this;
		this.setState({addActionItem: false});
		this.handleClose();
		//make ajax call to update database entry 
		//we have the item id
		var retroId = this.props.params.retroId;

		console.log("handleAddActionItem called");

		var token = localStorage.getItem("tracker_token");
		var actionItemText = itemText;
		

		var personId = vm.state.currentSelectedPerson;

		var data =  {
	          	"name": "RetroActive Action: " + actionItemText.substring(0,20),
	          	"description": actionItemText,
	          	"project_id": vm.state.projectId,
	          	"story_type": "chore"
	          }

	    if(personId != -1){
	    	data.owner_ids = [personId];
	    }
	    else{
	    	data.owner_ids = [];
	    }

		var postPromise = $.ajax({
			 method: 'POST',
	  		 url: "https://www.pivotaltracker.com/services/v5/projects/"+ vm.state.projectId +"/stories",
	          beforeSend: function(xhr) {
	            xhr.setRequestHeader('X-TrackerToken', token);
	          },
	          data: data
	  	});

	  	postPromise.error(function(data){
	  		console.log("ERROR creating New Item In Tracker");
	  		console.log(data);
	  	});

		postPromise.then(function(data){
			// console.log("New Item In Tracker");
	  // 		console.log(data);
			var postPromise = $.ajax({
				method: 'POST',
		  		url: "/retros/addActionItem/" + retroId + "/" + itemId,
		  		data: {
		  			"tracker_action_id": data.id,
		  			"text": actionItemText
		  		}
	  		});
		});
	},
	handleEditActionItem: function(actionItemText){

		var vm = this;
		this.setState({addActionItem: false});
		this.handleClose();
		//make ajax call to update database entry 
		//we have the item id
		var retroId = this.props.params.retroId;

		var token = localStorage.getItem("tracker_token");

		var dataToSend = {};
		dataToSend.name = "RetroActive Action: " + actionItemText.substring(0,20);
		dataToSend.description = actionItemText;
		
		var personId = vm.state.currentSelectedPerson;

		if(personId != -1){
			dataToSend.owner_ids = [personId];
		}

		else{
			dataToSend.owner_ids = [];
		}

		var postPromise = $.ajax({
			 method: 'PUT',
	  		 url: "https://www.pivotaltracker.com/services/v5/projects/"+ vm.state.projectId 
	  		 	+ "/stories/" + vm.state.currentTrackerActionId,
	          beforeSend: function(xhr) {
	            xhr.setRequestHeader('X-TrackerToken', token);
	          },
	          data: dataToSend,
	  	});

		postPromise.then(function(data){
			console.log('Edit Post Promise');
			var postPromise = $.ajax({
				method: 'POST',
		  		url: "/retros/editActionText/" + retroId + "/" + vm.state.currentItemId,
		  		data: {text : actionItemText}
	  		});
	  		//Update text in retro actions column
	  		var oldActionItems = vm.state.actionItems;
	  		oldActionItems.forEach(function(actionItem, index){
	  			if(actionItem._id.$oid == vm.state.currentItemId){
	  				actionItem.text = actionItemText;
	  				if(data.owner_ids.length > 0){
			    		actionItem.owner = data.owner_ids[0];
			    	}
	  			}
	  		});
	  		
	  		vm.setState({currentTrackerActionId: null, actionItems: oldActionItems});
		});
	},

	handleChangePerson: function(personId, newText){
		this.setState({currentSelectedPerson: personId, currentItemText: newText});
	},

	checkRetroVersion: function(){
		var vm = this;
		var retroId = this.props.params.retroId;
		console.log("Version: " + this.state.currentRetroVersion);
		$.get("/retros/version/" + retroId, function(data){
			if(vm.state.currentRetroVersion < data.version){
				vm.buildRetro();
			}
		});
	},
	
	buildRetro: function(){

		//dont refresh if we're in the modal
		if(this.state.modalShow){
			return;
		}

		var retroId = this.props.params.retroId;
		var vm = this;

		$.get("/retros/" + retroId, function(data){

			//Date Magic from stack overflow
			var date = new Date(data.created_on);
			date = new Date(date.getTime() + date.getTimezoneOffset()*60000)
			var dateString = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
			//end date magic


			var newRetroVersion = data.version;

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

			var actionSet = {};
			var actionIdSet = [];

			var projectId = data.project_id;
        	var token = localStorage.getItem("tracker_token");

        	//if(vm.state.refreshActionStatuses == true){
        		
        		//Get and store all of the project's users, not viewers from tracker
        		vm.getProjectUsers(projectId);

	 			//Re-Sync the action item statuses with the tracker API
				if(data.action_items && data.action_items.length > 0 ){
					
					var countActionItems = data.action_items.length;
					data.action_items.forEach(function(actionItem, index){
						//Sync the status of the action items from tracker

						var ajaxPromise = $.ajax({
							url: "https://www.pivotaltracker.com/services/v5/projects/"+ projectId + "/stories/" + actionItem.tracker_action_id,
							beforeSend: function(xhr) {
								xhr.setRequestHeader('X-TrackerToken', token);
							}
					    });

					    ajaxPromise.then(function(trackerData){
					    	// console.log(trackerData);
					    	actionIdSet.push(actionItem.tracker_action_id);

					    	actionItem.status = trackerData.current_state;
					    	if(trackerData.owner_ids.length > 0){
					    		actionItem.owner = trackerData.owner_ids[0];
					    	}

							actionSet[actionItem.tracker_action_id] = actionItem;
							countActionItems --;
							//wait for all of the action items to be in
							//console.log("Count: " + countActionItems);
							if(countActionItems == 0){
								//set the state after the syncing of the action item statuses

								//populate actionSet with all of the actionItems
								actionIdSet.sort();
								actionIdSet.reverse();
								var actionItemsSortedArray = [];
								actionIdSet.forEach(function(id, index){
									actionItemsSortedArray.push(actionSet[id]);
								});

								document.title = "RetroActive - " + data.project_name  + dateString;
								vm.setState({projectName: data.project_name, 
									retroDate: dateString, 
									retroItems: itemSet, 
									projectId: data.project_id, 
									actionItems: actionItemsSortedArray,
									loading: false,
									userCurrentVotes: userVoteCount,
									refreshActionStatuses: false,
									currentRetroVersion: newRetroVersion
								});
							}
					    });
					    
					    ajaxPromise.error(function(error){
					    	countActionItems --;
							//wait for all of the action items to be in
							console.log("Deleting");
							console.log(error);
							vm.deleteActionItem(actionItem._id.$oid);
							if(countActionItems == 0){
								//set the state after the syncing of the action item statuses

								document.title = "RetroActive - " + data.project_name  + dateString;
								vm.setState({projectName: data.project_name, 
									retroDate: dateString, 
									retroItems: itemSet, 
									projectId: data.project_id, 
									actionItems: actionSet,
									loading: false,
									userCurrentVotes: userVoteCount,
									refreshActionStatuses: false,
									currentRetroVersion: newRetroVersion
								});
							}
					    });

					});
				} 	

				//case no action items
				else{
					document.title = "RetroActive - " + data.project_name  + dateString;
					vm.setState({projectName: data.project_name, 
						retroDate: dateString, 
						retroItems: itemSet, 
						projectId: data.project_id,
						loading: false,
						userCurrentVotes: userVoteCount,
						refreshActionStatuses: false,
						currentRetroVersion: newRetroVersion,
						actionItems: []
					});
				}
			/* else {
				//getting back new action items, may not be complete in tracker yet. Don't check status until page reload
				document.title = "RetroActive - " + data.project_name  + dateString;
				var actionItemsInput = data.action_items || [];
				
				//actionItemsInput.forEach(function (actionItem, index){
				//	actionItem.status="unscheduled";
				//});
				var oldActionItemsIdList = [];

				vm.state.actionItems.forEach(function(item, index){
					oldActionItemsIdList.push(item._id.$oid);
				});

				var newActionItems = vm.state.actionItems;

				if(data.action_items){
					data.action_items.forEach(function(item, index){
						if(oldActionItemsIdList.indexOf(item._id.$oid) <= -1){
							item.owner = vm.state.currentSelectedPerson;
							item.status = "unscheduled";
							newActionItems.push(item);
						}
					});
				}
				
				vm.setState({projectName: data.project_name, 
					retroDate: dateString, 
					retroItems: itemSet, 
					projectId: data.project_id, 
					loading: false,
					actionItems: newActionItems,
					userCurrentVotes: userVoteCount,
					refreshActionStatuses: false,
				});				
			}	*/

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

	deleteActionItem: function(actionItemId) {
		//Ajax call to delete the item
		//This deletes the action item from MongoDB ONLY

		var vm = this;
		this.handleClose();

		console.log("deleting Action Item");
		var postPromise = $.ajax({
			method: 'DELETE',
	  		url: "/retros/deleteActionItem/" + this.props.params.retroId + "/" + actionItemId,
	  	});

	  	postPromise.then(function(data){
	  		//console.log("After Delete Call");
	  		//console.log(data);
	  	});

	  	postPromise.error(function(data){
	  		// console.log("error with Delete Call");
	  		// console.log(data);
	  	});

	  	var oldActionItems = vm.state.actionItems;
	  	var indexOfItemToDelete = -1;
	  	oldActionItems.forEach(function(actionItem, index){
  			if(actionItem._id.$oid == vm.state.currentItemId){
  				indexOfItemToDelete = index;
  			}
	  	});
	  	oldActionItems.splice(indexOfItemToDelete,1);

	  	vm.setState({currentTrackerActionId: null, actionItems: oldActionItems});
	},
	deleteTrackerStory: function(trackerItemId){
		//this deletes the Tracker Story in Tracker ONLY, not from our Mongo DB
		var token = localStorage.getItem("tracker_token");

		var ajaxPromise = $.ajax({
			 method: 'DELETE',
	  		 url: "https://www.pivotaltracker.com/services/v5/projects/"+ this.state.projectId +"/stories/" + trackerItemId,
	          beforeSend: function(xhr) {
	            xhr.setRequestHeader('X-TrackerToken', token);
	          }
	  	});

	  	ajaxPromise.then(function(data){
	  		console.log("After Delete From Tracker Call");
	  		console.log(data);
	  	});
	},
	handleClick: function() 
	{ 
		this.setState({modalShow: true, editingItem: true});
	},
	handleClose: function() { 
		this.setState({modalShow: false, currentItemText: ""})
	},
	handleShowModal: function(id, trackerId, item_text, owner_id){
		//get the item id of the item being edited to get the text for that item
		console.log(item_text);
		this.setState(
			{
				currentItemId: id, 
				currentTrackerActionId: trackerId, 
				currentItemText: item_text, 
				modalShow: true, 
				addActionItem: false, 
				editingItem: true,
				currentSelectedPerson: owner_id 
			},
			this.createFocus
			);
	},

	handleShowActionEditModal: function(dbId, trackerId, item_text, userId){
		//get the item id of the item being edited to get the text for that item
		this.setState({currentItemId: dbId, currentTrackerActionId: trackerId, 
			currentItemText: item_text, modalShow: true, addActionItem: true, editingItem: true, currentSelectedPerson: userId}
		);
	},

	handleActionModal: function(id, item_text){
		//get the item id of the item being added to get the text for that item
		this.setState({currentItemId: id, currentItemText: item_text,
		 modalShow: true, addActionItem: true, editingItem: false},
			this.createFocus
			);
	},
	
	handleVote: function(item){
		//console.log(item);
		if(this.state.maxUserVotes > this.state.userCurrentVotes)
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
