import React from 'react';
import RetroItem from './retro_item'

var ActionColumn = React.createClass({
	//Props: Header Text, Items
	render() {

		var actionItems = this.props.items.map(function(item) {
	      return (
	        <ActionItem itemText={item} modalShow={this.props.modal_show}/>
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
});

export default ActionColumn;