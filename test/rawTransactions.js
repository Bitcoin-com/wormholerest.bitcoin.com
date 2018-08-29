let chai = require('chai');
let assert = require('assert');
let httpMocks = require("node-mocks-http");
let rawTransactions = require('../routes/rawTransactions');

describe("#rawTransactionsRouter", () => {
  describe("#root", () => {
    it("should return 'rawTransactions' for GET /", () => {
      let mockRequest = httpMocks.createRequest({
        method: "GET",
        url: "/"
      });
      let mockResponse = httpMocks.createResponse();
      rawTransactions(mockRequest, mockResponse);
      let actualResponseBody = mockResponse._getData();
      let expectedResponseBody = {
        status: 'rawTransactions'
      };
      assert.deepEqual(JSON.parse(actualResponseBody), expectedResponseBody);
    });
  });

  describe("#change", () => {
    it("should POST /change/:rawtx/:prevTxs/:destination/:fee", (done) => {
      let mockRequest = httpMocks.createRequest({
        method: "POST",
        url: '/change/0100000001b15ee60431ef57ec682790dec5a3c0d83a0c360633ea8308fbf6d5fc10a779670400000000ffffffff025c0d00000000000047512102f3e471222bb57a7d416c82bf81c627bfcd2bdc47f36e763ae69935bba4601ece21021580b888ff56feb27f17f08802ebed26258c23697d6a462d43fc13b565fda2dd52aeaa0a0000000000001976a914946cb2e08075bcbaf157e47bcb67eb2b2339d24288ac00000000/[{"txid":"6779a710fcd5f6fb0883ea3306360c3ad8c0a3c5de902768ec57ef3104e65eb1","vout":4,"scriptPubKey":"76a9147b25205fd98d462880a3e5b0541235831ae959e588ac","value":0.00068257}]/bchtest:qq2j9gp97gm9a6lwvhxc4zu28qvqm0x4j5e72v7ejg/0.00003500'
      });
      let mockResponse = httpMocks.createResponse({
        eventEmitter: require('events').EventEmitter
      });
      rawTransactions(mockRequest, mockResponse);

      mockResponse.on('end', () => {
        let actualResponseBody = JSON.parse(mockResponse._getData());
        assert.equal(actualResponseBody, '0100000001b15ee60431ef57ec682790dec5a3c0d83a0c360633ea8308fbf6d5fc10a779670400000000ffffffff03efe40000000000001976a9141522a025f2365eebee65cd8a8b8a38180dbcd59588ac5c0d00000000000047512102f3e471222bb57a7d416c82bf81c627bfcd2bdc47f36e763ae69935bba4601ece21021580b888ff56feb27f17f08802ebed26258c23697d6a462d43fc13b565fda2dd52aeaa0a0000000000001976a914946cb2e08075bcbaf157e47bcb67eb2b2339d24288ac00000000');
        done();
      });
    });
  });

  describe("#input", () => {
    it("should POST /input/:rawTx/:txid/:n", (done) => {
      let mockRequest = httpMocks.createRequest({
        method: "POST",
        url: '/input/01000000000000000000/b006729017df05eda586df9ad3f8ccfee5be340aadf88155b784d1fc0e8342ee/0'
      });
      let mockResponse = httpMocks.createResponse({
        eventEmitter: require('events').EventEmitter
      });
      rawTransactions(mockRequest, mockResponse);

      mockResponse.on('end', () => {
        let actualResponseBody = JSON.parse(mockResponse._getData());
        assert.equal(actualResponseBody, '0100000001ee42830efcd184b75581f8ad0a34bee5feccf8d39adf86a5ed05df17907206b00000000000ffffffff0000000000');
        done();
      });
    });
  });

  describe("#opReturn", () => {
    it("should POST /opReturn/:rawTx/:payload", (done) => {
      let mockRequest = httpMocks.createRequest({
        method: "POST",
        url: '/opReturn/01000000000000000000/00000000000000020000000006dac2c0'
      });
      let mockResponse = httpMocks.createResponse({
        eventEmitter: require('events').EventEmitter
      });
      rawTransactions(mockRequest, mockResponse);

      mockResponse.on('end', () => {
        let actualResponseBody = JSON.parse(mockResponse._getData());
        assert.equal(actualResponseBody, '0100000000010000000000000000166a140877686300000000000000020000000006dac2c000000000');
        done();
      });
    });
  });

  describe("#reference", () => {
    it("should POST /reference/:rawTx/:destination", (done) => {
      let mockRequest = httpMocks.createRequest({
        method: "POST",
        url: '/reference/0100000001a7a9402ecd77f3c9f745793c9ec805bfa2e14b89877581c734c774864247e6f50400000000ffffffff03aa0a0000000000001976a9146d18edfe073d53f84dd491dae1379f8fb0dfe5d488ac5c0d0000000000004751210252ce4bdd3ce38b4ebbc5a6e1343608230da508ff12d23d85b58c964204c4cef3210294cc195fc096f87d0f813a337ae7e5f961b1c8a18f1f8604a909b3a5121f065b52aeaa0a0000000000001976a914946cb2e08075bcbaf157e47bcb67eb2b2339d24288ac00000000/bchtest:qq2j9gp97gm9a6lwvhxc4zu28qvqm0x4j5e72v7ejg?amount=0.005'
      });
      let mockResponse = httpMocks.createResponse({
        eventEmitter: require('events').EventEmitter
      });
      rawTransactions(mockRequest, mockResponse);

      mockResponse.on('end', () => {
        let actualResponseBody = JSON.parse(mockResponse._getData());
        assert.equal(actualResponseBody, '0100000001a7a9402ecd77f3c9f745793c9ec805bfa2e14b89877581c734c774864247e6f50400000000ffffffff04aa0a0000000000001976a9146d18edfe073d53f84dd491dae1379f8fb0dfe5d488ac5c0d0000000000004751210252ce4bdd3ce38b4ebbc5a6e1343608230da508ff12d23d85b58c964204c4cef3210294cc195fc096f87d0f813a337ae7e5f961b1c8a18f1f8604a909b3a5121f065b52aeaa0a0000000000001976a914946cb2e08075bcbaf157e47bcb67eb2b2339d24288ac20a10700000000001976a9141522a025f2365eebee65cd8a8b8a38180dbcd59588ac00000000');
        done();
      });
    });
  });

  describe("#decodeTransaction", () => {
    it("should POST /decodeTransaction/:rawTx", (done) => {
      let mockRequest = httpMocks.createRequest({
        method: "POST",
        url: '/decodeTransaction/010000000163af14ce6d477e1c793507e32a5b7696288fa89705c0d02a3f66beb3c5b8afee0100000000ffffffff02ac020000000000004751210261ea979f6a06f9dafe00fb1263ea0aca959875a7073556a088cdfadcd494b3752102a3fd0a8a067e06941e066f78d930bfc47746f097fcd3f7ab27db8ddf37168b6b52ae22020000000000001976a914946cb2e08075bcbaf157e47bcb67eb2b2339d24288ac00000000?prevTxs=[{"txid":"eeafb8c5b3be663f2ad0c00597a88f2896765b2ae30735791c7e476dce14af63","vout":1,"scriptPubKey":"76a9149084c0bd89289bc025d0264f7f23148fb683d56c88ac","value":0.0001123}]'
      });
      let mockResponse = httpMocks.createResponse({
        eventEmitter: require('events').EventEmitter
      });
      rawTransactions(mockRequest, mockResponse);

      mockResponse.on('end', () => {
        let actualResponseBody = mockResponse._getData();
        assert.equal(actualResponseBody.message, 'Not a Master Protocol transaction');
        done();
      });
    });
  });

  describe("#create", () => {
    it("should POST /create/:inputs/:outputs", (done) => {
      let mockRequest = httpMocks.createRequest({
        method: "POST",
        url: '/create/ [{"txid":"eeafb8c5b3be663f2ad0c00597a88f2896765b2ae30735791c7e476dce14af63","vout":1}]/{}'
      });
      let mockResponse = httpMocks.createResponse({
        eventEmitter: require('events').EventEmitter
      });
      rawTransactions(mockRequest, mockResponse);

      mockResponse.on('end', () => {
        let actualResponseBody = JSON.parse(mockResponse._getData());
        assert.equal(actualResponseBody, '020000000163af14ce6d477e1c793507e32a5b7696288fa89705c0d02a3f66beb3c5b8afee0100000000ffffffff0000000000');
        done();
      });
    });
  });
});
