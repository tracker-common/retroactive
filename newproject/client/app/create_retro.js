import React from 'react';
import ProjectRetros from './project_retros';

var CreateRetroForm = React.createClass({

	getDefaultProps : function() {
		return {
			"projectRetros" : [],

		};
	},
	
	render() {
		var vm = this;
		return (
		
			<div className="create_retro_form">
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
	},

	handleClickRetro: function(){
		this.props.handleCreateRetro(this.refs.retroId.value);
	}
});

export default CreateRetroForm;