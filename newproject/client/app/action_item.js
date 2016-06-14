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

			</div>
		)
	},
	show: function(){
		this.props.handleShowEditModal(this.props.object_id, this.props.tracker_id, this.props.itemText);
	},
});

export default ActionItem;