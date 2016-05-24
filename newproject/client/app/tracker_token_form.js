import React from 'react';

var TrackerTokenForm = React.createClass({
  render() {
    return (
    	<div className="dashboard-form"> 
			<div>:) Hey there! It looks like you haven't provided your tracker token yet. RetroActive won't really work until you do. Please go get it from <a href="https://www.pivotaltracker.com/profile">https://www.pivotaltracker.com/profile</a></div>
			<br/>
			<form>
				<label>Tracker API Token: </label><input type="text"/>
				<button type="button">Save</button>
			</form>
		</div>
		);
	}
});

export default TrackerTokenForm;