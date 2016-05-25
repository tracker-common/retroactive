import React from 'react';

var Retro = React.createClass({
	render() {
		return (
			<div id="retro-body">
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
	}
});

export default Retro;