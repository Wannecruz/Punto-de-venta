const { it, describe } = require("mocha");
const expect = require('chai').expect;
let archivovalidator = require("./validator.js");

describe("prueba de suma", function(){ 
    it("el resultado de la suma debe de ser ='> 6", function() { 
  
        const result = archivovalidator.suma(3,3);
        expect(result).to.be.equal(6);
  })
)