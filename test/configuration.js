let chai = require('chai');
let assert = require('assert');
let httpMocks = require("node-mocks-http");
let configuration = require('../routes/configuration');

describe("#ConfigurationRouter", () => {
  describe("#root", () => {
    it("should return 'configuration' for GET /", () => {
      let mockRequest = httpMocks.createRequest({
        method: "GET",
        url: "/"
      });
      let mockResponse = httpMocks.createResponse();
      configuration(mockRequest, mockResponse);
      let actualResponseBody = mockResponse._getData();
      let expectedResponseBody = {
        status: 'configuration'
      };
      assert.deepEqual(JSON.parse(actualResponseBody), expectedResponseBody);
    });
  });

  describe("#autoCommit", () => {
    it("should POST /autoCommit/:flag", (done) => {
      let mockRequest = httpMocks.createRequest({
        method: "POST",
        url: "/autoCommit/true"
      });
      let mockResponse = httpMocks.createResponse({
        eventEmitter: require('events').EventEmitter
      });
      configuration(mockRequest, mockResponse);

      mockResponse.on('end', () => {
        let actualResponseBody = JSON.parse(mockResponse._getData());
        assert.deepEqual(actualResponseBody, true);
        done();
      });
    });
  });
});
