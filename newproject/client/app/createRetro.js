import React from 'react';
import ReactDOM from 'react-dom';

var CreateRetroForm = React.createClass({
	render() {
		return (
			<div className="createRetroForm">
				<div className="header">
					<div className="left"> 
						<img src="RETROACTIVE.svg"/>
					</div>
					<div className="center header__text_box" >
						<h1>Create A Retro</h1>
					</div>
					<div className="right header__text_box">
						<h1 >Name</h1>
					</div>
				</div>

				<form>
					<h1>Create a new Retro</h1>
					<input type="text" placeholder="Tracker ID" onChange={this.props.handleUpdateRetroId}/>
					<button type="button" onClick={this.props.handleCreateRetro}>Create!</button>
				</form>
				ID: {this.props.retroId}
			</div>
		);
	}
});

export default CreateRetroForm;