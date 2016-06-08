import React from 'react';

var ActionStatus = React.createClass({
	render(){
		var statusHtml = "";
		switch(this.props.status){
			case "unscheduled":
				statusHtml = (<span style={{color: '#88C1DE', fontWeight: 'bold'}}> Unscheduled </span>)
				break;
			case "unstarted":
				statusHtml = (<span style={{color: '#88C1DE', fontWeight: 'bold'}}> Unstarted </span>)
				break;
			case "scheduled":
				statusHtml = (<span style={{color: '#A7A7A7', fontWeight: 'bold'}}>Scheduled</span>)
				break;
			case "started":			
				statusHtml = (<span style={{color: '#DCD003', fontWeight: 'bold'}}>In Progress</span>)
				break;
			case "rejected":			
				statusHtml = (<span style={{color: '#F26373', fontWeight: 'bold'}}>Rejected</span>)
				break;
			case "accepted":
				statusHtml = (<span style={{color: '#72BF02', fontWeight: 'bold'}}>Accepted</span>)
				break;
		}

		return statusHtml;
	}
});



export default ActionStatus;