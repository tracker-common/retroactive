import React from 'react';
import RetroItem from './retro_item'


var RetroColumn = React.createClass({

	//Props: Header Text, Items
	render() {
		var self = this;		
		var trackerTest = this.props.trackerTest;
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
						        object_id={item.id} 
						        showModal={self.props.showModal}
						        handleShowEditModal={self.handleShowEditModal}
						        key={index}
						        postToTracker = {trackerTest}/>
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
	}
});

export default RetroColumn;