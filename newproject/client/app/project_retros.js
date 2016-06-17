import React from 'react';
import RetroTableRow from './retro_table_row'
import { Link } from 'react-router';

var ProjectRetros = React.createClass({

	getDefaultProps: function(){
		return {
			"showLinks" : true,
		};
	},
	//Props: ProjectName, ProjectId, Retros
	render() {
		var vm = this;
		return(
			<div className="project_retros">
				<div className="project_retros_header">
					{/*{this.props.retros.length > 0  &&(<button onClick={this.showOrHide}>{this.props.showLinks ? "V " : ">"}</button>)}*/}
					
					<div className="project_retros_title">
						{this.props.projectName} 
					</div>

					<div onClick={this.newRetro} className="project_retros_new">
						<img className="new_retro_img" src="/add_icon.svg" />
						<span>New Retro</span>
					</div>
				</div>

				
					{
						this.props.showLinks && this.props.retros.length > 0  &&(
						<div className="retro_table">
							<table>
								<thead>
									<tr>
										<td style={{fontWeight: 'bold'}}>Date</td>
										<td style={{fontWeight: 'bold'}}>Happy</td>
										<td style={{fontWeight: 'bold'}}>Puzzler</td>
										<td style={{fontWeight: 'bold'}}>Sad</td>
										<td style={{color: '#88C1DE', fontWeight: 'bold'}}>Unscheduled</td>
										<td style={{color: '#A7A7A7', fontWeight: 'bold'}}>Scheduled</td>
										<td style={{color: '#DCD003', fontWeight: 'bold'}}>In Progress</td>
										<td style={{color: '#72BF02', fontWeight: 'bold'}}>Accepted</td>
										<td >Delete?</td>
									</tr>
								</thead>
								<tbody>
								{	
									this.props.retros.map(function(item, index) {
								      
								      	var date = new Date(item.created_on);
								      	date = new Date(date.getTime());
										var dateString = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + " " + (date.getHours()) + ":" + date.getMinutes() + ":" + date.getSeconds();
									    return(
									    	<RetroTableRow 
									      	key={item._id.$oid}
									      	retro = {item}
									      	linkPath ={"/show/" + item._id.$oid}
									      	dateString = {dateString}
									      	deleteRetro = {vm.deleteRetro}/>);    
									    })
									}
								</tbody>
							</table>
						</div>
					)}
				
			</div>
		);
	},

	deleteRetro: function(retroId){
		this.props.deleteRetro(retroId)
	},

	newRetro: function(){
		this.props.handleCreateRetro(this.props.projectId);
	},

	showOrHide: function(){
		//pass the current showLinks boolean
		this.props.toggleShowHide(this.props.showLinks, this.props.projectId);
	}
});


export default ProjectRetros;
	