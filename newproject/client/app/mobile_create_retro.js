import React from 'react';
import ProjectRetros from './project_retros';

var MobileCreateRetro = React.createClass({

	getDefaultProps : function() {
		return {
			"projectRetros" : [],
		};
	},
	handleClickRetro: function(){
		this.props.handleCreateRetro(this.refs.retroId.value);
	},
	handleSelectRetro: function(){
		var retroIndex = $( ".dropdown option:selected").val();
		this.props.handleChangeProject(this.props.projectRetros[retroIndex]);
	},
	render() {
		var vm = this;
		if(this.props.projectRetros.length > 0){
			return (
			<div className="createRetroForm">
			<span>Select a Project:</span><br/>
				<select className="dropdown" onChange={this.handleSelectRetro} name="retros">
				{
					vm.props.projectRetros.map(function(item, index) {
				      return (
				      	<option key={index} value={index}>{item.project_name}</option>
				      );
				    })
				}
				</select>
				{
					vm.props.current_proj != null ? 
					<ProjectRetros 
				        projectName={vm.props.current_proj.project_name}
				        projectId={vm.props.current_proj.project_id}
				        key={vm.props.current_proj.project_id}  
				        retros={vm.props.current_proj.retros} 
				        showLinks={vm.props.current_proj.showLinks || false}
				        handleCreateRetro={vm.props.handleCreateRetro}
				        toggleShowHide={vm.props.toggleShowHide}
				        deleteRetro={vm.props.deleteRetro}/>
				        :
				        null
			    }
			</div>
			);
		}
		else if(!this.props.loading){
			return (
			<div className="createRetroForm">
				<span>You are not a member of any Projects!</span><br/>
			</div>
			);	
		}
		else{
			return (
				null
				);
		}
	}
});

export default MobileCreateRetro;