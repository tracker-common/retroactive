import React from 'react';

var Header = React.createClass({

 	render() {
	    return (
			<div className="header">
				<div className="left"> 
					<img src="/RETROACTIVE.svg"/>
				</div>
				<div className="center header__text_box" >
					<h1>{this.props.title}</h1>
				</div>
				<div className="right header__text_box">
					<h1>{this.props.user_name}</h1>
				</div>
			</div>
		);
	}

});


export default Header;