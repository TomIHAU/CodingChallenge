let assert = require("assert");
let app = require("../server");
const sequelize = require("../config/connection");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
const { doesNotMatch } = require("assert");
let should = chai.should();

chai.use(chaiHttp);

describe("Testing Routes and logic", function () {
  it("db connection connect should ...", (done) => {
    sequelize.sync(function (err, result) {
      if (err) {
        done(err);
        return;
      }
      expect(result).to.equal("Now listening");
      done();
    });
  });
  describe("#GET products", function () {
    it("get all products", (done) => {
      chai
        .request(server)
        .get("/api/products")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
        });
      done();
    });
  });
  describe("#POST products", function () {
    it("successfully creates a new product", (done) => {
      let newProduct = {
        name: "This is a new product",
        code: "NP",
        price: 3200,
      };
      chai
        .request(server)
        .post("/api/products")
        .send(newProduct)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
        });
      done();
    });
  });
  describe("#POST products", function () {
    it("UNsuccessfully creates a new product", (done) => {
      let newProduct = {
        name: "This is a new product",
        price: 3200,
      };
      chai
        .request(server)
        .post("/api/products")
        .send(newProduct)
        .end((err, res) => {
          res.should.have.status(400);
        });
      done();
    });
  });
  describe("#PUT products", function () {
    it("successfully alters a product", (done) => {
      let newProduct = {
        name: "This is an altered product",
        code: "DE",
        price: 1400,
      };
      chai
        .request(server)
        .put("/api/products/1")
        .send(newProduct)
        .end((err, res) => {
          res.should.have.status(200);
        });
      done();
    });
  });
  describe("#PUT products", function () {
    it("UNsuccessfully alters a product", (done) => {
      let newProduct = {
        name: "This is an altered product",
        price: 1400,
      };
      chai
        .request(server)
        .put("/api/products/1")
        .send(newProduct)
        .end((err, res) => {
          res.should.have.status(400);
        });
      done();
    });
  });
  describe("#GET packaging", function () {
    it("successfully gets packaging", (done) => {
      chai
        .request(server)
        .get("/api/packaging")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
        });
      done();
    });
  });
  describe("#Post packaging", function () {
    it("creating a new option for the packaging", (done) => {
      let newOption = { quantity: 10, price: 9000 };
      chai
        .request(server)
        .post("/api/packaging/1")
        .send(newOption)
        .end((err, res) => {
          res.should.have.status(200);
        });
      done();
    });
  });
  // describe("", function () {
  //   it("", function () {});
  // });
});

let userRequest = { CE: 10, HM: 8 };
