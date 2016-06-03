import React from 'react';
import ActionItem from './action_item'

var ActionColumn = React.createClass({
	//Props: Header Text, Items
	render() {
		var vm = this;
		var actionItems = this.props.items.map(function(item, index) {
	      return (
	        <ActionItem itemText={item.text} 
	        modalShow={vm.props.modal_show} 
	        key={index}
	        status= {item.status ? item.status : undefined }
	        tracker_id={item.tracker_action_id}
	        handleShowEditModal={vm.handleShowEditModal}
	        object_id={item._id ? item._id.$oid : null} />
	      );
	    });

		return(
			<div className="full-height">
				<h1 className="retro-columns__title">{this.props.HeaderText}</h1>
				<div className="retro-column">			
					<div className="action-column-items">
						{actionItems}
					</div>
				</div>
			</div>
			);
	},
	handleShowEditModal: function(dbId, trackerId, text){
		this.props.handleShowActionEditModal(dbId, trackerId, text);
	},
});

export default ActionColumn;