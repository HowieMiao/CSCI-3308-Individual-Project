const server = require ("../server");
const chai = require("chai");
const chaiHttp = require ("chai-http");
chai.should();
chai.use(chaiHttp);
const { assert, expect } = chai;

// Note due to change in how places is handled, tests involving places have been removed

// describe("Server!", () => {
// 	it("Create a New User", (done) => {
// 		chai
// 			.request(server)
// 			.post("/create_account/submit")
// 			.send({inputEmail: "test@test.test", inputPassword: "password"})
// 			.end((err, res) => {
// 				done();
// 			});
// 	});
// 	it("Get User Information", (done) => { 
// 		chai
// 			.request(server)
// 			.get("/profile_info")
// 			.send({email: "test@test.test"})
// 			.end((err, res) => {
// 				expect(res.body.username).to.equal("test@test.test");
// 				expect(res.body.password).to.equal("XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=");
// 				done();
// 			});
// 	});
// 	it("Delete User", (done) => {
// 		// Cleanup While deleting users is not a functionality of the website, this allows the test to be run again.
// 		chai
// 			.request(server)
// 			.post("/delete")
// 			.send({email: "test@test.test"})
// 			.end((err, res) => {
// 				expect(res.body.message).to.equal("success");
// 				done();
// 			});
// 	});
// });
