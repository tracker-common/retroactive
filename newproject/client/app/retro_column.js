import React from 'react';
import RetroItem from './retro_item'


var RetroColumn = React.createClass({

	//Props: Header Text, Items
	render() {
		var self = this;		
		var trackerTest = this.props.trackerTest;
		// console.log("Items");
		// console.log(this.props.items);

		return(
			<div className="full-height">
				<h1 className="retro-columns__title">{this.props.HeaderText}</h1>
				<div className="retro-column">			
					<input type="text" placeholder="Type and hit enter to add..." onKeyPress={this.handleSubmit} ref="itemText"/>
					<div className="retro-column-items">
						{
							this.props.items.map(function(item, index) {
						      return (
						        <RetroItem itemText={item.text} 
						        object_id={item._id ? item._id.$oid : null} 
						        showModal={self.props.showModal}
						        handleShowEditModal={self.handleShowEditModal}
						        key={index}
						        postToTracker = {trackerTest}
						        handleShowActionModal = {self.handleShowActionModal}
						        action_item_id = {item.action_item_id}
						        handleVote = {self.props.handleVote}
						        handleUnVote = {self.props.handleUnVote}
						        votes = {item.votes}/>
						      );
						    })
						}
					</div>
				</div>
			</div>
		);
	},

	handleSubmit: function(e){
		if (e.key === 'Enter') {
			if(this.refs.itemText.value){
  				this.props.handleAdd(this.props.columnId, this.refs.itemText.value);
				this.refs.itemText.value = "";
  			}
		}
	},
	handleShowEditModal: function(id, text){
		this.props.handleShowModal(id, text);
	},
	handleShowActionModal: function(id, text){
		this.props.handleActionModal(id, text);
	},

});

export default RetroColumn;