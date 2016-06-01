import React from 'react';
import Header from './header';
import RetroColumn from './retro_column';

var Retro = React.createClass({
	
	getInitialState() {
	    return {
	      retroItems: [[],[],[]],
	      actionItems: [],
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
				{/*<div id="retro-columns__titles"> 
				</div>*/}
				<br/>	

				<div className="retro-columns">
					<RetroColumn HeaderText="Happy :)" handleAdd={this.addRetroItem} columnId={0} items={this.state.retroItems[0]}/>
					<RetroColumn HeaderText="Puzzler :|"  handleAdd={this.addRetroItem} columnId={1} items={this.state.retroItems[1]}/>
					<RetroColumn HeaderText="Sad :(" handleAdd={this.addRetroItem} columnId={2} items={this.state.retroItems[2]}/>
					<RetroColumn HeaderText="Action Items" handleAdd={this.addRetroItem} columnId={3} items={this.state.actionItems}/>
				</div>
			</div>
		);
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

			//parse items into their own columns
			var itemSet = [[],[],[]]
			data.retro_items.forEach(function(item, index){
				itemSet[item.column].unshift(item);
			});

			vm.setState({project_name: data.project_name, retro_date: dateString, retroItems: itemSet});
		});
	},

	addRetroItem: function(column, text){
		
		if(column < 3){
			var items = this.state.retroItems;

			
			var newItem = {};
			newItem.text = text;
			newItem.id = null;
			newItem.colum = column;

			//Ajax call to add the item
			var postPromise = $.ajax({
			
				method: 'POST',
		  		url: "/retros/additem/" + this.props.params.retroId + "/" + column,
		  		data: newItem
		  	});


			//add the item to the array of items
			items[column].unshift(newItem);

			this.setState({retroItems: items});
		}
		else if (column == 3){
			var items = this.state.actionItems;
			items.unshift(text);
			this.setState({actionItems: items});
		}
	}



});

export default Retro;