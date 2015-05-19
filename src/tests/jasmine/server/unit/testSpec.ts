/// <reference path="../../../../../typescript/tests/jasmine.d.ts" />

describe('Test', () => {
	it('will fail', () => {
		expect(true).toBe(false);	
	});
	
	it('will pass', () => {
		expect(true).toBe(true);	
	});
})