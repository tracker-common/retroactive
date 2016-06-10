import React from 'react';

var UsersDropdown = React.createClass({
	
	render() {

		console.log(this.props.people);
		var vm = this;
		var peopleItems = Object.keys(vm.props.people).map(function(key, index){
			return(
				<option key={index} value={vm.props.people[key].id}>{vm.props.people[key].name}</option>
			);
	    });
		return(
			<select ref="userDropdown" onChange={this.changePerson}> <option value={null}>No Owner</option> {peopleItems} </select>
		);
	},

	changePerson: function(){
		this.props.handleChangePerson(this.refs.userDropdown.value);
	},

});
export default UsersDropdown; 