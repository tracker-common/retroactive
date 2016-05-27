import React from 'react';

var RetroItem = React.createClass({
	
	getInitialState() {
	    return {
	      
	   	}
	},

	componentDidMount: function(){
		
	},

	render() {
		name = sessionStorage.getItem("user_name");
		return (
			<div className="retro-item">
				{this.props.itemText}
			</div>
		)
	}
});

export default RetroItem;