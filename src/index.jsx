import React from 'react';
import ReactDOM from 'react-dom';
import {Voting} from './components/Voting';


const pair = ['Trainspotting', 'Blade Runner'];

ReactDOM.render(
	<Voting pair={pair} hasVoted="Trainspotting" />,
	document.getElementById('app')
);