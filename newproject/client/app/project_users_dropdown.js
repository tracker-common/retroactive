import React from 'react';

var UsersDropdown = React.createClass({
	
	render() {

		var vm = this;
		var peopleItems = Object.keys(vm.props.people).map(function(key, index) {
			return (
				<option key={index} value={vm.props.people[key].id}>{vm.props.people[key].name}</option>
			);
	    });

		return (
			<select className="custom_modal_dropdown" ref="userDropdown" value={this.props.currentPerson} onChange={this.changePerson}> 
				<option value={-1}>No Owner</option> 
				{peopleItems} 
			</select>
		);
	},

	changePerson: function(){
		this.props.handleChangePerson(this.refs.userDropdown.value);
	},

});
export default UsersDropdown; 