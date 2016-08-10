import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import Voting from './components/Voting';
import App from './components/App';


const pair = ['Trainspotting', 'Blade Runner'];

const routes = 

ReactDOM.render(
	<Voting pair={pair} />,

	document.getElementById('app')
);