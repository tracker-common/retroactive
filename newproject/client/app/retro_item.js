import React from 'react';


var RetroItem = React.createClass({


	render() {
		var voted = false;
		var vm = this;
		var userEmail = sessionStorage.getItem("user_email")
		if(this.props.votes){
			this.props.votes.forEach(function(vote, index){
				if(vote.user_email == userEmail){
					voted = true;
				}
			});
		}
		return (
			<div className="retro-item">
				<div className="retro-item-description">
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
				<a className="action-link link" onClick={this.show}>Edit</a>
				</div>
				
				
				<div className="status-and-action-bar">
					{ this.props.object_id ? 
						((this.props.action_item_id == null) ? 
							<a className="action-link link" onClick={this.showActionModal}>+Action</a> : 
							<span className="item-info">{this.props.actionItem.status}</span>
						) : null
					}
				</div>
			</div>
		)
	},
	show: function(){
		this.props.handleShowEditModal(this.props.object_id, this.props.itemText);
	},
	showActionModal: function(){

		this.props.handleShowActionModal(this.props.object_id, this.props.itemText);
	},
	newTrackerChore: function(){
		this.props.postToTracker(this);
	},
	vote: function(){
		this.props.handleVote(this);
	},
	unvote: function(){
		this.props.handleUnVote(this);
	}
});

export default RetroItem;
