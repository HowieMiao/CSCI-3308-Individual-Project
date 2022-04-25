const server = require ("../server");
const chai = require("chai");
const chaiHttp = require ("chai-http");
chai.should();
chai.use(chaiHttp);
const { assert, expect } = chai;

describe("Server!", () => {
	it("Saving Locations", (done) => {
		chai
			.request(server)
			.post("/homepage_results/save")
			.send({brewery1: ["test1,test1,test1,test1,test1"], brewery2: ["test2,test2,test2,test2,test2"]})
			.end((err, res) => {
				done();
			});
	});
	it("Pass Search Term", (done) => {
		chai
			.request(server)
			.post("/homepage_results")
			.send({items: "Boulder"})
			.end((err, res) => {
                done();
			});
	});
});
