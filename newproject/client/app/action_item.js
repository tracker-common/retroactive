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
		var linkToTracker = "https://pivotaltracker.com/stories/show/" + this.props.tracker_id
		return (
			<div className="retro_item">
				<div className="retro_item_description">
					{this.props.itemText}
				</div>
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
					<span className="item_info">
						<span style={{fontWeight: "bold"}}>Status:</span> <a className="not_link" href={linkToTracker} target="_blank"><ActionStatus status={this.props.status}/> </a>
					</span>
 				</div>
			</div>
		)
	},

	show: function(){
		var owner =  this.props.owner ? this.props.owner.id  : -1;
		this.props.handleShowActionEditModal(this.props.object_id, this.props.tracker_id, this.props.itemText, owner);
	},
});

export default ActionItem;