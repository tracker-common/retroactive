import React from 'react';
import ProjectRetros from './project_retros';

var CreateRetroForm = React.createClass({

	getDefaultProps : function() {
		return {
			"projectRetros" : [],

		};
	},
	handleClickRetro: function(){
		this.props.handleCreateRetro(this.refs.retroId.value);
	},
	render() {
		var vm = this;
		return (
		
			<div className="createRetroForm">
				{
					this.props.projectRetros.map(function(item, index) {
				      return (
				        <ProjectRetros 
				        projectName={item.project_name}
				        projectId={item.project_id}
				        key={item.project_id}  
				        retros={item.retros} 
				        showLinks = {item.showLinks}
				        handleCreateRetro = {vm.props.handleCreateRetro}
				        toggleShowHide = {vm.props.toggleShowHide}
				        deleteRetro = {vm.props.deleteRetro}/>
				      );
				    })
				}
			</div>
		);
	}
});

export default CreateRetroForm;