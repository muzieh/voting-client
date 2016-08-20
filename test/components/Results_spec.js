import {List, Map} from 'immutable';
import React from 'react';
import {renderIntoDocument, scryRenderedDOMComponentsWithClass, Simulate} from 'react-addons-test-utils';
import Results from '../../src/components/Results';
import {expect} from 'chai';
import ReactDOM from 'react-dom';

describe('Results', () =>
{
	it('renders entries with vote counts or zero', () => {
		const pair = List.of('Trainspotting', 'Hot Fuzz');
		const tally = Map({'Hot Fuzz': 5});
		var component = renderIntoDocument(
			<Results pair={pair} tally={tally} />
		);

		const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
		const [train, hotFuzz] = entries.map(e => e.textContent);

		expect(entries.length).to.equal(2);
		expect(train).to.contain('Trainspotting');
		expect(train).to.contain('0');
		expect(hotFuzz).to.contain('Hot Fuzz');
		expect(hotFuzz).to.contain('5');
	});

	it('invokes callback when next button is clicked', () => {

		let nextInvoked = false;
		const next = () => nextInvoked = true;
		const pair = List.of('Trainspotting', 'Blade Runner');
		const component = renderIntoDocument(
			<Results
				pair={pair} 
				tally={Map()} 
				next={next} />
		);
		Simulate.click(ReactDOM.findDOMNode(component.refs.next));
		expect(nextInvoked).to.equal(true);
	});

	it('render winner when there is one', () => {
		const component = renderIntoDocument(
			<Results pair={["Trainspotting", "Blade Runner"]}
				winner={"Trainspotting"}
				tally={Map()} />
		);
		const winner = ReactDOM.findDOMNode(component.refs.winner);
		expect(winner).to.be.ok;
		expect(winner.textContent).to.contain("Trainspotting");
	});
});