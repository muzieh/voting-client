import React from 'react';
import ReactDOM from 'react-dom';
import {
	renderIntoDocument,
	scryRenderedDOMComponentsWithTag,
	Simulate
} from 'react-addons-test-utils';
import {expect} from 'chai';
import Voting from '../../src/components/Voting';


describe('Voting',  () => {

	it('render a pair of buttons', () => {
		const component = renderIntoDocument(
				<Voting pair={['Trainspotting', 'Blade Runner']}/>
		) ;

		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		expect(buttons.length).to.equal(2);
		expect(buttons[0].textContent).to.equal('Trainspotting');
		expect(buttons[1].textContent).to.equal('Blade Runner');
	});

	it('invoke the callback when button is clicked', () => {
		let votedWith;
		const vote  = (entry) => votedWith = entry;

		const component = renderIntoDocument(
			<Voting pair={['Trainspotting', 'Blade Runner']}
				vote={vote} />
		);

		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		Simulate.click(buttons[0]);

		expect(votedWith).to.equal('Trainspotting');
	});

	it('buttons should be disabled if voted already', () => {
		const component = renderIntoDocument(
			<Voting pair={['Trainspotting', 'Blade Runner']}
				hasVoted="Blade Runner" />
		);

		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

		expect(buttons.length).to.equal(2);
		expect(buttons[0].hasAttribute('disabled')).to.equal(true);
		expect(buttons[1].hasAttribute('disabled')).to.equal(true);

	});

	it('add label to the voted entry', () => {
		const component = renderIntoDocument(
			<Voting pair={['Trainspotting', 'Blade Runner']}
				hasVoted="Blade Runner" />
		);
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		expect(buttons[1].textContent).to.contain("Voted");
	});

	it('renders just a winner if there is one', () => {
		const component = renderIntoDocument(
			<Voting winner="Blade Runner" />
		);
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		expect(buttons.length).to.equal(0);
		const winner = ReactDOM.findDOMNode(component.refs.winner);
		expect(winner).to.be.ok;
		expect(winner.textContent).to.contain('Blade Runner');


	});
});
