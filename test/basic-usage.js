"use strict";

const RecordJar = require("../record-jar.js");
const Chai      = require("chai");
const assert    = Chai.assert;
Chai.should();


const fixture   = `
Planet: Mercury
Orbital-Radius: 57,910,000 km
Diameter: 4,880 km
Mass: 3.30e23 kg
%%
Planet: Venus
Orbital-Radius: 108,200,000 km
Diameter: 12,103.6 km
Mass: 4.869e24 kg
%%
Planet: Earth
Orbital-Radius: 149,600,000 km
Diameter: 12,756.3 km
Mass: 5.972e24 kg
Moons: Luna
	`;


const expectation = [{
	Planet: "Mercury",
	"Orbital-Radius": "57,910,000 km",
	Diameter: "4,880 km",
	Mass: "3.30e23 kg"
}, {
	Planet: "Venus",
	"Orbital-Radius": "108,200,000 km",
	Diameter: "12,103.6 km",
	Mass: "4.869e24 kg"
}, {
	Planet: "Earth",
	"Orbital-Radius": "149,600,000 km",
	Diameter: "12,756.3 km",
	Mass: "5.972e24 kg",
	Moons: "Luna"
}];


describe("Basic usage", () => {
	const result = new RecordJar(fixture);
	
	it("Parses jar properties correctly", () => {
		assert.deepEqual(result.records, expectation);
	});
	
	it("Calculates the correct length", () => {
		assert.lengthOf(result, expectation.length);
	});
	
	it("Creates instances without \"new\" keyword", () => {
		assert.deepEqual(result, RecordJar(fixture));
	});
});
