import React from 'react';

export default React.createClass({
	getPair: function() {
		return this.props.pair || []; 
	},
	render: function() {
		console.log(this.getPair());
		return <div className="voting">
			{this.getPair().map( entry => 
				<button key={entry}>
					<h1>{entry}</h1>
				</button>
			)}
			</div>;
	}
});