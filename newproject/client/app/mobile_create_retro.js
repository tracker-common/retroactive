import React from 'react';
import MobileProjectRetros from './mobile_project_retros';

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
			<div className="mobile_create_retro_form">
			<span>Select a Project:</span>
				<select className="dropdown" onChange={this.handleSelectRetro} name="retros">
				{
					vm.props.projectRetros.map(function(item, index) {
				      return (
				      	<option key={index} value={index}>{item.project_name}</option>
				      );
				    })
				}
				</select>

				<span style={{fontSize: "18px", marginTop: "10px"}}>{this.props.current_proj.project_name}</span>
				{
					vm.props.current_proj != null ? 
					<MobileProjectRetros 
				        projectName={vm.props.current_proj.project_name}
				        projectId={vm.props.current_proj.project_id}
				        key={vm.props.current_proj.project_id}  
				        retros={vm.props.current_proj.retros} 
				        handleCreateRetro={vm.props.handleCreateRetro}/>
				        :
				        null
			    }
			</div>
			);
		}
		else if(!this.props.loading){
			return (
			<div className="create_retro_form">
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