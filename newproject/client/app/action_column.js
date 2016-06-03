import React from 'react';
import ActionItem from './action_item'

var ActionColumn = React.createClass({
	//Props: Header Text, Items
	render() {
		var vm = this;
		var actionItems = this.props.items.map(function(item, index) {
	      return (
	        <ActionItem itemText={item.text} modalShow={vm.props.modal_show} key={index}/>
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