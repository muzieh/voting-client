import React from 'react';
import {List, Map} from 'immutable';


const pair = List.of('Trainspotting', 'Hot Fuzz');
const tally = Map({'Trainspotting': 4, 'Hot Fuzz': 5});

export default React.createClass({
	render: function() {
		return React.cloneElement(this.props.children, {
			pair: pair,
			tally: tally
		});
	}
});