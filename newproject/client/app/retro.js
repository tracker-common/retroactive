import React from 'react';
import Header from './header';

var Retro = React.createClass({
	
	getInitialState() {
	    return {
	      project_name: "",
	      retro_date: ""
	   	}
	},

	componentDidMount: function(){
		this.buildRetro();
	},

	render() {
		name = sessionStorage.getItem("user_name");
		return (
			<div id="retro-body">
				<Header user_name={sessionStorage.getItem("user_name")} title={this.state.project_name + " - " + this.state.retro_date} />
				<div id="retro-columns__titles"> 
					<h1 className="retro-columns__title">Happy :)</h1>
					<h1 className="retro-columns__title">Puzzler :|</h1>
					<h1 className="retro-columns__title">Sad :( </h1>
					<h1 className="retro-columns__title">Action Items</h1>
				</div>

				<div className="retro-columns">

					<div className="retro-column">
						
						<div className="retro-column__items">
						</div>
					</div>

					<div className="retro-column">
						
						<div className="retro-column__items">
						</div>
					</div>

					<div className="retro-column">
						
						<div className="retro-column__items">
						</div>
					</div>

					<div className="retro-column">
						
						<div className="retro-column__items">
						</div>
					</div>
				</div>
			</div>
		);
	},

	buildRetro(){
		var retroId = this.props.params.retroId;
		var vm = this;
		$.get("/retros/" + retroId, function(data){
			console.log(data);

			//Date Magic from stack overflow
			var date = new Date(data.created_on);
			date = new Date(date.getTime() + date.getTimezoneOffset()*60000)
			console.log(date);
			var dateString = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
			//end date magic

			vm.setState({project_name: data.project_name, retro_date: dateString});
		});
	}

});

export default Retro;