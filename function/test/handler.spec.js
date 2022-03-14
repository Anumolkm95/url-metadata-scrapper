const {urlMetadataScrapper} = require("../handler");
const chai = require("chai");
const sinonChai = require("sinon-chai");
const request = require('request');
const Sinon = require("sinon");
const expect = chai.expect;
// chai.use(sinonChai);

describe("Url metadata scrapper", () => {
    it("should return the metadata of the given url", (done) => {
        // const getStub = Sinon.stub(request, 'get').resolves({url: "", body: ``})
        urlMetadataScrapper({body: JSON.stringify({url: "https://zonehaven.com"})})
        .then ((result) => {
            expect(result).to.be.a("object");
            expect(result).to.has.property("body");
            let obj = JSON.parse(result.body);
            expect(obj).to.has.property("title");
            expect(obj).to.has.property("description");
            done();
        }).catch(done);
    });

    it("should return the bad request error", (done) => {
        // const getStub = Sinon.stub(request, 'get').resolves({url: "", body: ``})
        urlMetadataScrapper({body: JSON.stringify({data: "https://zonehaven.com"})})
        .then ((result) => {
            expect(result).to.be.a("object");
            expect(result).to.has.property("body");
            let obj = JSON.parse(result.body);
            expect(obj).to.has.property("message");
            expect(obj.message).eqls("Bad Request!")
            done();
        }).catch(done);
    });

    it("should handle the failed cases", (done) => {
        // const getStub = Sinon.stub(request, 'get').resolves({url: "", body: ``})
        urlMetadataScrapper({body: JSON.stringify({url: "https://zonehsfefaven.com"})})
        .then ((result) => {
            expect(result).to.be.a("object");
            expect(result).to.has.property("body");
            let obj = JSON.parse(result.body);
            expect(obj).to.has.property("message");
            expect(obj.message).eqls("Can't retrieve data!")
            done();
        }).catch(done);
    });
});