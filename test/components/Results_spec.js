import {List, Map} from 'immutable';
import React from 'react';
import {renderIntoDocument, scryRenderedDOMComponentsWithClass} from 'react-addons-test-utils';
import Results from '../../src/components/Results';
import {expect} from 'chai';


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
});