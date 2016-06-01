import React from 'react';
import Header from './header';
import RetroColumn from './retro_column';
import ActionColumn from './action_column';

var Retro = React.createClass({
	
	getInitialState() {
	    return {
	      retroItems: [[],[],[]],
	      actionItems: [],
	      project_name: "",
	      retro_date: "",
	      modal_show: false
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
				{/*<div id="retro-columns__titles"> 
				</div>*/}
				<br/>	

				<div className="retro-columns">
					<RetroColumn HeaderText="Happy :)" handleAdd={this.addRetroItem} columnId={0} items={this.state.retroItems[0]} modalShow={this.state.modalShow} updateModalState={this.updateModalState}/>
					<RetroColumn HeaderText="Puzzler :|"  handleAdd={this.addRetroItem} columnId={1} items={this.state.retroItems[1]} modalShow={this.state.modalShow} updateModalState={this.updateModalState}/>
					<RetroColumn HeaderText="Sad :(" handleAdd={this.addRetroItem} columnId={2} items={this.state.retroItems[2]} modalShow={this.state.modalShow} updateModalState={this.updateModalState}/>
					<ActionColumn HeaderText="Action Items" columnId={3} items={this.state.actionItems} modalShow={this.state.modalShow} updateModalState={this.updateModalState}/>
				</div>
			</div>
		);a
	},

	buildRetro: function(){
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
	},

	addRetroItem: function(column, text){
		
		if(column < 3){
			var items = this.state.retroItems;
			items[column].unshift(text);
			this.setState({retroItems: items});
		}
		else if (column == 3){
			var items = this.state.actionItems;
			items.unshift(text);
			this.setState({actionItems: items});
		}
	},
	updateModalState: function(showOrHide){
		this.setState({modal_show: showOrHide})
	}



});

export default Retro;