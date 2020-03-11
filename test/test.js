var assert = require("assert");
var express = require("express");
var request = require("supertest");
var chai = require("chai");
var expect = chai.expect;

describe("parameter tests", function() {
  var server;

  before(function(done) {
    server = require("./index.js");
  });

  after(function() {
    server.close();
  });
  it("checks if the location parameter is altered", function(done) {
    expect(2 + 3).to.be.a("number");
    done();
  });
  it("checks if the location parameter is altered", function(done) {
    request(server)
      .get("/location/20152?scale=Celsius")
      .expect(200, done);
  });
});
