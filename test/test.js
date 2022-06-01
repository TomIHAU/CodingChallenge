let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

describe("Testing Routes and logic", function () {
  describe("#GET order CE: 10, HM: 14, SS:3", function () {
    it("creating a new option for the packaging", (done) => {
      let order = { CE: 10, HM: 14, SS: 3 };
      chai
        .request(server)
        .get("/api/order")
        .send(order)
        .end((err, res) => {
          res.body.totalPackages.should.be.eql(8);
          res.body.totalCost.should.be.eql((156.6).toFixed(2));
          res.should.have.status(200);
          done();
        });
    });
  });
  describe("#GET order", function () {
    it("creating a new option for the packaging", (done) => {
      let order = { CE: 10, HM: 8 };
      chai
        .request(server)
        .get("/api/order")
        .send(order)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
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
          done();
        });
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
          done();
        });
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
          done();
        });
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
          done();
        });
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
          done();
        });
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
          done();
        });
    });
  });
  describe("#POST packaging", function () {
    it("creating a new option for the packaging", (done) => {
      let newOption = { quantity: 10, price: 9000 };
      chai
        .request(server)
        .post("/api/packaging/1")
        .send(newOption)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
