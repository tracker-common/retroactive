import React from 'react';
import RetroItem from './retro_item'


var RetroColumn = React.createClass({


	//Props: Header Text, Items
	render() {
		var self = this;
		var retroItems = this.props.items.map(function(item) {
	      return (
	        <RetroItem itemText={item} modalShow={self.modalShow} closeModal={self.closeModal} showModal={self.showModal}/>
	      );
	    });

		return(
			<div className="full-height">
				<h1 className="retro-columns__title">{this.props.HeaderText}</h1>
				<div className="retro-column">			
					<input type="text" placeholder="Type and hit enter to add..." onKeyPress={this.handleSubmit} ref="itemText"/>
					<div className="retro-column-items">
						{retroItems}
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
	showModal: function(){
		this.props.updateModalState(true);
	},
	closeModal: function(){
		this.props.updateModalState(false);
	}
});

export default RetroColumn;