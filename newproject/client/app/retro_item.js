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
				<div className="retro_item_description">
					{this.props.itemText}
				</div>

				<div className="row" style={{padding: "5px"}}>
				{
					voted ? (
						<div className="vote" onClick={this.unvote}><img src="/heart_red.svg"/>  <span style={{color: 'red'}}>{this.props.votes ? this.props.votes.length : 0}</span></div>
					) : (
						<div className="vote" onClick={this.vote}><img src="/heart_gray.svg"/> <span style={{color: 'gray'}}>{this.props.votes ? this.props.votes.length : 0}</span></div>
					)
				}
				<a className="action_link link" onClick={this.show}>Edit</a>

					{ 
						this.props.object_id ? 
						(
							(this.props.action_item_id == null) ? 
							<a className="action_link link" onClick={this.showActionModal}>+Action</a> : 
							null
						) : null
					}

				</div>
				
				
				<div className="status_and_action_bar">
					{(this.props.action_item_id == null || !this.props.actionItem ) ? null  : (<span className="item_info"> Action Item Status: <ActionStatus status={this.props.actionItem.status}/> </span>) }
				</div>
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
