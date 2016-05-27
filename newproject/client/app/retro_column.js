import React from 'react';
import RetroItem from './retro_item'

var RetroColumn = React.createClass({
	//Props: Header Text, Items
	render() {

		var retroItems = this.props.items.map(function(item) {
	      return (
	        <RetroItem itemText={item}/>
	      );
	    });

		return(
			<div className="full-height">
				<h1 className="retro-columns__title">{this.props.HeaderText}</h1>
				<div className="retro-column">			
					<input type="text" placeholder="Type and hit enter to add..." onKeyPress={this.handleSubmit} ref="itemText"/>
					<div className="retro-column__items">
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
		}
});

export default RetroColumn;