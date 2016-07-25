import React from 'react';
import ReactDOM from 'react-dom';
import {
	renderIntoDocument,
	scryRenderedDOMComponentsWithTag,
	Simulate
} from 'react-addons-test-utils';
import {expect} from 'chai';
import Voting from '../../src/components/Voting';
import {List} from 'immutable';

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

	it('should render as pure component', () => {
		const pair = ['Trainspotting', 'Blade Runner'];
		const container = document.createElement('div');
		let component = ReactDOM.render(
			<Voting pair={pair} />,
			container
		);

		let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
		expect(firstButton.textContent).to.contain('Trainspotting');
		pair[0] = 'Sexmisja';

		component = ReactDOM.render(
			<Voting pair={pair} />,
			container
		);

		let secondButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
		expect(secondButton.textContent).to.contain('Trainspotting');

	});

	it('should render again if prop is changed', () => {
		const firstPair = List.of('Trainspotting', 'Blade Runner');
		const container = document.createElement('div');
		let component = ReactDOM.render(
			<Voting pair={firstPair} />,
			container
		);

		let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
		expect(firstButton.textContent).to.contain('Trainspotting');

		const secondPair = firstPair.set(0, 'Sexmisja');

		component = ReactDOM.render(
			<Voting pair={secondPair} />,
			container
		);

		let secondButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
		expect(secondButton.textContent).to.contain('Sexmisja');

	});
});
