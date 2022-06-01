let assert = require("assert");
const sequelize = require("../config/connection");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
const { doesNotMatch } = require("assert");
let should = chai.should();

chai.use(chaiHttp);

describe("Testing Routes and logic", function () {
  describe("#get products", function () {
    it("get all products", function () {
      chai
        .request(server)
        .get("/api/products")
        .end((err, res) => {
          console.log(res);
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });
  // describe("", function () {
  //   it("", function () {});
  // });
});
// it("db.connection.connect should ...", function (done) {
//   db.connection.connect(function (err, result) {
//     if (err) {
//       done(err);
//       return;
//     }
//     expect(result).to.equal("SQL CONNECT SUCCESSFUL.");
//     done();
//   });
// });

let userRequest = { CE: 10, HM: 8 };
