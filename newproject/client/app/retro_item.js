import React from 'react';
import ActionStatus from './action_item_status';

var RetroItem = React.createClass({


	render() {
		var voted = false;
		var vm = this;
		var userEmail = localStorage.getItem("user_email")
		if(this.props.votes){
			this.props.votes.forEach(function(vote, index){
				if(vote.user_email == userEmail){
					voted = true;
				}
			});
		}

		return (
			<div className="retro_item">
			{
				(this.props.action_item_id==null) ?
				<div className="retro_item_description">
					{this.props.itemText}
				</div>
				:
				<div className="retro_item_description retro_item__action_item_text">
					{this.props.itemText}
				</div>
			}
				<div className="voting_bar">
				{
					voted ? (
						<div onClick={this.unvote}>
							<img className="img__heart" src="/heart_red.svg"/>  
							<span style={{color: 'red'}}>
								{this.props.votes ? this.props.votes.length : 0}
							</span>
						</div>
					) : (
						<div onClick={this.vote}>
							<img className="img__heart" src="/heart_gray.svg"/> 
							<span style={{color: '#9B9B9B'}}>
								{this.props.votes ? this.props.votes.length : 0}
							</span>
						</div>
					)
				}

				<div onClick={this.show} className="action_and_edit_link edit_link">
					<img className="edit_img" src="/edit_blue.svg"/>
					<span>Edit</span>
				</div>
				
				{ 
					(this.props.object_id && this.props.action_item_id == null) ? 
					<div onClick={this.showActionModal} className="action_and_edit_link action_link">
						<img className="action_img" src="/add_icon.svg" />
						<span>Action</span> 
					</div> : 
					null
				}

				</div>
				
				{
					(this.props.action_item_id != null) ?
					<div className="status_bar">
						{(this.props.action_item_id == null || !this.props.actionItem ) ? null  : 
							(<span 
								className="item_info"> <span style={{fontWeight: "bold"}}>Action Item Status: </span> 
								<ActionStatus status={this.props.actionItem.status}/> </span>) }
					</div>
					:
					null
				}
			</div>
		)
	},
	show: function(){
		this.props.handleShowEditModal(this.props.object_id, this.props.action_item_id, this.props.itemText);
	},
	showActionModal: function(){
		this.props.handleShowActionModal(this.props.object_id, this.props.itemText);
	},
	vote: function(){
		this.props.handleVote(this);
	},
	unvote: function(){
		this.props.handleUnVote(this);
	}
});

export default RetroItem;
