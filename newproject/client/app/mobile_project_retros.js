import React from 'react';
import MobileRetroTable from './mobile_retro_table'
import { Link } from 'react-router';

var MobileProjectRetros = React.createClass({

	//Props: ProjectName, ProjectId, Retros
	render() {
		var vm = this;
 		return(
			<div>
				<button className="mobile_project_retros_new_button" type="button" onClick={this.newRetro}>+</button>
				<span style={{color: "gray"}}>Create New Retro</span><br/>
				
				<div>
					{
						this.props.retros.length > 0  &&( 
							<div>
							{ 
								this.props.retros.map(function(item, index) {
									var date = new Date(item.created_on);
							      	date = new Date(date.getTime());
									var dateString = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()
									     + " " + (date.getHours()) + ":" + date.getMinutes() + ":" + date.getSeconds();
									return(
									<MobileRetroTable 
										key={item._id.$oid}
								      	retro = {item}
								      	linkPath ={"/show/" + item._id.$oid}
								      	dateString = {dateString} />
								      	);
								})
							}
							</div>
					)}
				</div>
			</div>
		);
	},
	newRetro: function(){
		this.props.handleCreateRetro(this.props.projectId);
	}
});


export default MobileProjectRetros;
	