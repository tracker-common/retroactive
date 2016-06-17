import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header';
import MobileHeader from './mobile_header'
import RetroColumn from './retro_column';
import ActionColumn from './action_column';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import { browserHistory } from 'react-router'

//Imports for responsive media query
import { Component } from 'react';
import DesktopBreakpoint from './responsive_utilities/desktop_breakpoint';
//Used for Tablets, we have not made a tablet view yet
//import TabletBreakpoint from './responsive_utilities/tablet_breakpoint';
import MobileBreakpoint from './responsive_utilities/phone_breakpoint';
import Loader from 'react-loader-advanced';
import UsersDropdown from './project_users_dropdown';
import CustomModal from './custom_modal';
import ConfirmModal from './confirm_modal';
import AlertModal from './alert_modal';

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
	      projectUsers: {},
	      projectName: "",
	      retroDate: "",
	      currentItemId: "",
	      currentTrackerActionId: null,
	      currentItemText: "",
	      projectId: "",
	      addActionItem: false,
	      loading: true,
	      maxUserVotes: 15,
	      userCurrentVotes: 0,
	      refreshActionStatuses: true,
	      currentRetroVersion: -1,
	      currentSelectedPerson: -1,
	      modalShow: false,
	      confirmModalShow: false,
	      alertModalShow: false,
	      confirmHasAction: false,
	      alertModalText: ""
	   	}
	},
	componentWillMount: function(){
		if (localStorage.getItem("user_email")==null){
        localStorage.setItem("url_redirect", window.location);
        //need to set and then get it otherwise it doesnt persist
        localStorage.getItem("url_redirect");
        window.location.replace("/");
      }

    	if (localStorage.getItem("tracker_token") == null) {
    		console.log("Your token doesn't exist!");
    		browserHistory.push('/dashboard');
    	} else {
    		var ajaxPromise = this.checkTrackerStatus();

    		ajaxPromise.error(function(error) {
    			//console.log(error);
    			console.log("Your token is not valid for this retro");
    			browserHistory.push('/dashboard');
    		});
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

		if(localStorage.getItem("url_redirect") == null) {

			return (
				<div>
					<Loader show={this.state.loading} message={'loading...'} className="loader">
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
									handleClick = {this.handleClick}
									handleClose = {this.handleClose}
									showConfirmDeleteModal = {this.showConfirmDeleteModal}/>

								<ConfirmModal 
									modalShow = {this.state.confirmModalShow}
									handleDeleteItem = {this.handleDeleteItem}
									handleDeleteActionItem = {this.handleDeleteActionItem}
									handleClick = {this.handleClick}
									handleClose = {this.handleCloseConfirm}
									isActionItem = {this.state.addActionItem}
									itemId = {this.state.currentItemId}
									currentTrackerActionId = {this.state.currentTrackerActionId}
									hasActionItem = {this.state.confirmHasAction}/>

								<AlertModal 
									modalShow = {this.state.alertModalShow}
									handleClose = {this.handleCloseAlert}
									text = {this.state.alertModalText}/>

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
					</Loader>

					<Loader show={this.state.loading} message={'loading...'}>
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

								<ConfirmModal 
									modalShow = {this.state.confirmModalShow}
									handleDeleteItem = {this.handleDeleteItem}
									handleDeleteActionItem = {this.handleDeleteActionItem}
									handleClick = {this.handleClick}
									handleClose = {this.handleCloseConfirm}
									isActionItem = {this.state.addActionItem}
									itemId = {this.state.currentItemId}
									currentTrackerActionId = {this.state.currentTrackerActionId}
									hasActionItem = {this.state.confirmHasAction}/>

								<AlertModal 
									modalShow = {this.state.alertModalShow}
									handleClose = {this.handleCloseAlert}
									text = {this.state.alertModalText}/>

							    <div className="mobile_retro_columns">
									<Tabs onSelect={this.handleSelect}>
				        			 
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
						</Loader>
					</div>
				);
		}
		else {
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

		var token = localStorage.getItem("tracker_token");
		

		return  $.ajax({
			method: 'GET',
			url: "https://www.pivotaltracker.com/services/v5/projects/" + projectId + "/memberships",
			beforeSend: function(xhr) {
	            xhr.setRequestHeader('X-TrackerToken', token);
	        }
		});
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

	handleEditActionItem: function(actionItemText, oldOwner){

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
		var currentActionTrackerId = vm.state.currentTrackerActionId;

		if(personId != -1){
			//Post the data to tracker with the new owner
			dataToSend.owner_ids = [personId];
		}
		else{
			//delete the owner from tracker, and send the modified text

			var getPromise = $.ajax({
				 method: 'GET',
		  		 url: "https://www.pivotaltracker.com/services/v5/projects/"+ vm.state.projectId 
		  		 	+ "/stories/" + currentActionTrackerId + "/owners/" ,
		          beforeSend: function(xhr) {
		            xhr.setRequestHeader('X-TrackerToken', token);
		          }
		  	});

			
		  	getPromise.then(function(owners){
		  		
		  		if(owners.length > 0){
		  			var firstOwner = owners.pop().id;

			  		var deletePromise = vm.deleteOwnerFromActionItem(vm.state.projectId, currentActionTrackerId, firstOwner);
			  		var i = 0;

			  		while(i < owners.length){
			  			deletePromise = deletePromise.then(function(data){
							var ownerId = owners.pop().id;
		  					return vm.deleteOwnerFromActionItem(vm.state.projectId, currentActionTrackerId, ownerId);					
			  			});
			  			i++;
			  		}
				}
			});
		}
		//post to rails with the new text
		var postPromise = $.ajax({
				 method: 'PUT',
		  		 url: "https://www.pivotaltracker.com/services/v5/projects/"+ vm.state.projectId 
		  		 	+ "/stories/" + currentActionTrackerId,
		          beforeSend: function(xhr) {
		            xhr.setRequestHeader('X-TrackerToken', token);
		          },
		          data: dataToSend,
		});

		postPromise.then(function(data){
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

	deleteOwnerFromActionItem: function(projectId, trackerItemId, trackerOwnerId){
		var token = localStorage.getItem("tracker_token");
		return $.ajax({
			method: 'DELETE',
				url: "https://www.pivotaltracker.com/services/v5/projects/"+ projectId
					+ "/stories/" + trackerItemId + "/owners/" + trackerOwnerId,
    		beforeSend: function(xhr) {
    		  xhr.setRequestHeader('X-TrackerToken', token);
    		},
    		crossDomain: true
		});
	},

	handleChangePerson: function(personId, newText){
		this.setState({currentSelectedPerson: personId, currentItemText: newText});
	},

	checkRetroVersion: function(){
		var vm = this;
		var retroId = this.props.params.retroId;
		//console.log("Version: " + this.state.currentRetroVersion);
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

			//Items come from the server in one array, with each item knowing which 
			//	column it belongs in.
			//Parse items into their own columns, and count votes by current user.
			var itemSet = [[],[],[]]
			var userEmail = localStorage.getItem("user_email")
			var userVoteCount = 0;
			if(data.retro_items){
				data.retro_items.forEach(function(item, index){

					//unshift pushes an item to the front of the array
					itemSet[item.column].unshift(item);
					if(item.votes){
						item.votes.forEach(function(vote, index){
							if(vote.user_email == userEmail){
								if( userVoteCount < vm.state.maxUserVotes){
									userVoteCount ++;
								}
								else{
									vm.handleAlertModal();
								}
							}
						});
					}


				});
			}

			var actionSet = {};
			var actionIdList = [];
			var projectId = data.project_id;
        	var token = localStorage.getItem("tracker_token");
        		
    		//Get and store all of the project's users, not viewers from tracker
    		var projectUsers = {};
    		var usersPromise = vm.getProjectUsers(projectId);

    		usersPromise.then(function(members){

				members.forEach(function(member, index){
					if(member.role != 'viewer'){
						projectUsers[member.person.id] = member.person;
					}
				});

				//console.log(projectUsers);

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
					    	//console.log(trackerData);
					    	actionIdList.push(actionItem.tracker_action_id);


					    	actionItem.status = trackerData.current_state;
					    	if(trackerData.owner_ids.length > 0){
					    		actionItem.owner = trackerData.owner_ids[0];
					    	}

							actionSet[actionItem.tracker_action_id] = actionItem;
							countActionItems --;
							//wait for all of the action items to be in
							if(countActionItems == 0){
								//set the state after the syncing of the action item statuses

								//populate actionSet with all of the actionItems
								actionIdList.sort();
								actionIdList.reverse();
								var actionItemsSortedArray = [];
								actionIdList.forEach(function(id, index){
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
									currentRetroVersion: newRetroVersion,
									projectUsers: projectUsers
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
									currentRetroVersion: newRetroVersion,
									projectUsers: projectUsers
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
						projectUsers: projectUsers,
						actionItems: []
					});
				}
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

	handleCloseConfirm: function() {
		this.setState({confirmModalShow: false, currentItemText: "", confirmHasAction: false})
	},

	handleCloseAlert: function() {
		this.setState({alertModalShow: false, alertModalText: ""})
	},

	handleShowModal: function(id, trackerId, item_text, owner_id){
		//get the item id of the item being edited to get the text for that item
		this.setState(
			{
				currentItemId: id, 
				currentTrackerActionId: trackerId, 
				currentItemText: item_text, 
				modalShow: true, 
				addActionItem: false, 
				editingItem: true,
				currentSelectedPerson: -1
			}/*,
			this.createFocus*/
			);
	},

	handleShowActionEditModal: function(dbId, trackerId, item_text, userId){
		//get the item id of the item being edited to get the text for that item
		console.log(item_text + " " + userId);

		this.setState({currentItemId: dbId, 
			currentTrackerActionId: trackerId, 
			currentItemText: item_text, 
			modalShow: true, 
			addActionItem: true, 
			editingItem: true, 
			currentSelectedPerson: userId }
		);
	},

	handleActionModal: function(id, item_text){
		//get the item id of the item being added to get the text for that item
		this.setState({currentItemId: id, currentItemText: item_text,
		 modalShow: true, addActionItem: true, editingItem: false}/*,
			this.createFocus*/
			);
	},

	handleAlertModal: function(){
		//get the item id of the item being added to get the text for that item
		this.setState({
		    alertModalShow: true,
		    alertModalText: "You are out of votes!" 
		});
	},
	
	handleVote: function(item){
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
		  	this.handleAlertModal();
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

	showConfirmDeleteModal: function(){
		var retroItem = this.getItemById(this.state.currentItemId);
		if (retroItem && retroItem.action_item_id != null){
			this.setState({confirmModalShow: true, confirmHasAction: true});
		}
		else{
			this.setState({confirmModalShow: true, confirmHasAction: false});	
		}
    },

    checkTrackerStatus :function(){

       	var token = localStorage.getItem("tracker_token");

		return $.ajax({
			url: "https://www.pivotaltracker.com/services/v5/me",
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-TrackerToken', token);
			}
	    });
    },
});

export default Retro;
