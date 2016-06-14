import React from 'react';
import ActionStatus from './action_item_status';

var ActionItem = React.createClass({

	getDefaultProps: function(){
		return{ 
			"status": "Unscheduled",
		};
	},

	render() {
		var statusHtml = "";
		return (
			<div className="retro_item">
				<div className="retro_item_description">
					{this.props.itemText}
				</div>
<<<<<<< HEAD
				<div onClick={this.show} className="voting_bar action_and_edit_link edit_link action_item_edit">
					<img className="action_item__edit_img" src="/edit_blue.svg"/>
					<a>Edit</a>
				</div>
				<div className="status_bar status_bar__rows">
					<span>
					{
						this.props.owner ? 
						(<div className="action_item__owner">
							<img src="/person.svg" />
							<span style={{fontWeight: "bold"}}>{this.props.owner.name}</span>
						 </div>)
						 : null
					}</span>
					<span className="item_info"><span style={{fontWeight: "bold"}}>Status:</span> <ActionStatus status={this.props.status}/> </span>
				</div>
=======

				<div className="status_and_action_bar">
					<div className="project_retro_owner">
						{this.props.owner? (<b>{this.props.owner.name}</b>) : null}
					</div>
>>>>>>> b7c4521eba23831b3057bd7e9f2deb755994be61

					<div className="row">
						<span className="item_info">Action Item Status: <ActionStatus status={this.props.status}/> </span>
						<a className="edit_link link" onClick={this.show}>Edit</a>
					</div>
				</div>
			</div>
		)
	},

	show: function(){
		var owner =  this.props.owner ? this.props.owner.id  : null;
		this.props.handleShowActionEditModal(this.props.object_id, this.props.tracker_id, this.props.itemText, owner);
	},
});

export default ActionItem;