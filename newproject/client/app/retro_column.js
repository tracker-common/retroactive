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
			<div className="full_height">
				<span className="retro_columns__title">{this.props.HeaderText}</span>
				<div className="retro_column">			
					<input type="text" placeholder="Type and hit enter to add..." onKeyPress={this.handleSubmit} ref="itemText"/>
					<div className="retro_column_items">
						{
 							this.props.items.map(function(item, index) {
								var actionItem_input= null;
								//console.log(self.props.actionItems);
								self.props.actionItems.forEach(function(actionItem, index){
									if(actionItem._id.$oid == item.action_item_id){
										actionItem_input = actionItem;
									}
								});
								
							    return (
							        <RetroItem itemText={item.text} 
							        object_id={item._id ? item._id.$oid : null} 
							        showModal={self.props.showModal}
							        handleShowEditModal={self.handleShowEditModal}
							        key={index}
							        handleShowActionModal={self.handleShowActionModal}
							        action_item_id={item.action_item_id}
							        actionItem = {actionItem_input}
							        handleVote={self.props.handleVote}
							        handleUnVote={self.props.handleUnVote}
							        votes={item.votes}/>
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
	
	handleShowEditModal: function(dbId, trackerId, text){
		this.props.handleShowModal(dbId, trackerId, text);
	},
	handleShowActionModal: function(id, text){
		this.props.handleActionModal(id, text);
	},

});

export default RetroColumn;