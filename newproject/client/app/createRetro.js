import React from 'react';

var CreateRetroForm = React.createClass({
	render() {
		return (
			<div className="createRetroForm">
				<form>
					<h1>Create a new Retro</h1>
					<input type="text" placeholder="Tracker ID"/>
					<button type="button">Create!</button>
				</form>
			</div>
		);
	}
});

export default CreateRetroForm;