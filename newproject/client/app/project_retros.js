import React from 'react';

import { Link } from 'react-router';

var ProjectRetros = React.createClass({


	//Props: ProjectName, ProjectId, Retros
	render() {
		
		return(
			<div className="project-retros">
				<div className="project-retros-header">
					<button onClick={this.showOrHide}>{this.props.showLinks? "V " : ">"}</button>
					{this.props.projectName} 
					<button type="button" onClick={this.newRetro}>+</button>
				</div>
				<div className="retroNames">
					*<table>
						<tr>
							<td>Date</td>
							<td>Happy</td>
							<td>Puzzler</td>
							<td>Sad</td>
							<td>Unscheduled</td>
							<td>Scheduled</td>
							<td>In Progress</td>
							<td>Rejected</td>
							<td>Accepted</td>
						</tr>
						{	
							this.props.showLinks && 
							this.props.retros.map(function(item, index) {
						      
								var date = new Date(item.created_on);
								date = new Date(date.getTime() + date.getTimezoneOffset()*60000);
								var dateString = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
							    var linkPath = "/show/" + item._id.$oid;
							    return (
							      	<tr>
							        	<td key={item._id.$oid}><Link to={linkPath}>{dateString}</Link></td>
							        	<td>0</td>
							        	<td>0</td>
							        	<td>0</td>
							        	<td>0</td>
							        	<td>0</td>
							        	<td>0</td>
							        	<td>0</td>
							        	<td>0</td> 	
							        </tr>
						    	);
						    })
						}
					</table>
				</div>
			</div>
		);
	},

	newRetro: function(){
		this.props.handleCreateRetro(this.props.projectId);
	},

	showOrHide: function(){
		//pass the current showLinks thing
		this.props.toggleShowHide(this.props.showLinks, this.props.projectId);
	}
});


export default ProjectRetros;
	