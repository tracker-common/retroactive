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
				<button type="button" onClick={this.newRetro}>+</button></div>
				<div className="retroNames">
					<ul>
					{	this.props.showLinks && 
						  this.props.retros.map(function(item, index) {
					      
							  var date = new Date(item.created_on);
							  date = new Date(date.getTime() + date.getTimezoneOffset()*60000)
							  var dateString = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
						      var linkPath = "/show/" + item._id.$oid;
						      return (
						        <li key={item._id.$oid}><Link to={linkPath}>{dateString}</Link></li>
					      );
					    })
					}
					</ul>
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
	