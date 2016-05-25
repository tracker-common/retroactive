import React from 'react';

var CreateRetroForm = React.createClass({

	handleClickRetro: function(){
		console.log(this.refs.retroId.value);
		this.props.handleCreateRetro(this.refs.retroId.value);
	},
	render() {
		return (
			<div className="createRetroForm">
				<form>
					<h1>Create a new Retro</h1>
					<input type="text" placeholder="Tracker ID" ref="retroId" />
					<button type="button" onClick={this.handleClickRetro}>Create!</button>
				</form>
			</div>
		);
	}
});

export default CreateRetroForm;