let express = require("express");
let router = express.Router();
let axios = require("axios");
let RateLimit = require("express-rate-limit");

let WormholeHTTP = axios.create({
  baseURL: process.env.RPC_BASEURL
});
let username = process.env.RPC_USERNAME;
let password = process.env.RPC_PASSWORD;

let config = {
  payloadCreationRateLimit1: undefined,
  payloadCreationRateLimit2: undefined,
  payloadCreationRateLimit3: undefined,
  payloadCreationRateLimit4: undefined,
  payloadCreationRateLimit5: undefined,
  payloadCreationRateLimit6: undefined,
  payloadCreationRateLimit7: undefined,
  payloadCreationRateLimit8: undefined,
  payloadCreationRateLimit9: undefined,
  payloadCreationRateLimit10: undefined,
  payloadCreationRateLimit11: undefined,
  payloadCreationRateLimit12: undefined,
  payloadCreationRateLimit13: undefined
};

let i = 1;
while (i < 14) {
  config[`payloadCreationRateLimit${i}`] = new RateLimit({
    windowMs: 60000, // 1 hour window
    delayMs: 0, // disable delaying - full speed until the max limit is reached
    max: 60, // start blocking after 60 requests
    handler: function(req, res /*next*/) {
      res.format({
        json: function() {
          res.status(500).json({
            error: "Too many requests. Limits are 60 requests per minute."
          });
        }
      });
    }
  });
  i++;
}

let requestConfig = {
  method: "post",
  auth: {
    username: username,
    password: password
  },
  data: {
    jsonrpc: "1.0"
  }
};

router.get("/", config.payloadCreationRateLimit1, async (req, res, next) => {
  res.json({ status: "payloadCreation" });
});

router.get(
  "/burnBCH",
  config.payloadCreationRateLimit2,
  async (req, res, next) => {
    requestConfig.data.id = "whc_createpayload_burnbch";
    requestConfig.data.method = "whc_createpayload_burnbch";
    requestConfig.data.params = [];

    try {
      let response = await WormholeHTTP(requestConfig);
      res.json(response.data.result);
    } catch (error) {
      res.status(500).send(error.response.data.error);
    }
  }
);

router.post(
  "/changeIssuer/:propertyId",
  config.payloadCreationRateLimit2,
  async (req, res, next) => {
    requestConfig.data.id = "whc_createpayload_changeissuer";
    requestConfig.data.method = "whc_createpayload_changeissuer";
    requestConfig.data.params = [parseInt(req.params.propertyId)];

    try {
      let response = await WormholeHTTP(requestConfig);
      res.json(response.data.result);
    } catch (error) {
      res.status(500).send(error.response.data.error);
    }
  }
);

router.post(
  "/closeCrowdSale/:propertyId",
  config.payloadCreationRateLimit3,
  async (req, res, next) => {
    requestConfig.data.id = "whc_createpayload_closecrowdsale";
    requestConfig.data.method = "whc_createpayload_closecrowdsale";
    requestConfig.data.params = [parseInt(req.params.propertyId)];

    try {
      let response = await WormholeHTTP(requestConfig);
      res.json(response.data.result);
    } catch (error) {
      res.status(500).send(error.response.data.error);
    }
  }
);

router.post(
  "/grant/:propertyId/:amount",
  config.payloadCreationRateLimit4,
  async (req, res, next) => {
    let params = [parseInt(req.params.propertyId), req.params.amount];
    if (req.query.memo) {
      params.push(req.query.memo);
    }

    requestConfig.data.id = "whc_createpayload_grant";
    requestConfig.data.method = "whc_createpayload_grant";
    requestConfig.data.params = params;

    try {
      let response = await WormholeHTTP(requestConfig);
      res.json(response.data.result);
    } catch (error) {
      res.status(500).send(error.response.data.error);
    }
  }
);

router.post(
  "/crowdsale/:ecosystem/:propertyPrecision/:previousId/:category/:subcategory/:name/:url/:data/:propertyIdDesired/:tokensPerUnit/:deadline/:earlyBonus/:undefine/:totalNumber",
  config.payloadCreationRateLimit6,
  async (req, res, next) => {
    requestConfig.data.id = "whc_createpayload_issuancecrowdsale";
    requestConfig.data.method = "whc_createpayload_issuancecrowdsale";
    requestConfig.data.params = [
      parseInt(req.params.ecosystem),
      parseInt(req.params.propertyPrecision),
      parseInt(req.params.previousId),
      req.params.category,
      req.params.subcategory,
      req.params.name,
      req.params.url,
      req.params.data,
      parseInt(req.params.propertyIdDesired),
      req.params.tokensPerUnit,
      parseInt(req.params.deadline),
      parseInt(req.params.earlyBonus),
      parseInt(req.params.undefine),
      req.params.totalNumber
    ];

    try {
      let response = await WormholeHTTP(requestConfig);
      res.json(response.data.result);
    } catch (error) {
      res.status(500).send(error.response.data.error);
    }
  }
);

router.post(
  "/fixed/:ecosystem/:propertyPrecision/:previousId/:category/:subcategory/:name/:url/:data/:amount",
  config.payloadCreationRateLimit7,
  async (req, res, next) => {
    requestConfig.data.id = "whc_createpayload_issuancefixed";
    requestConfig.data.method = "whc_createpayload_issuancefixed";
    requestConfig.data.params = [
      parseInt(req.params.ecosystem),
      parseInt(req.params.propertyPrecision),
      parseInt(req.params.previousId),
      req.params.category,
      req.params.subcategory,
      req.params.name,
      req.params.url,
      req.params.data,
      req.params.amount
    ];

    try {
      let response = await WormholeHTTP(requestConfig);
      res.json(response.data.result);
    } catch (error) {
      res.status(500).send(error.response.data.error);
    }
  }
);

router.post(
  "/managed/:ecosystem/:propertyPrecision/:previousId/:category/:subcategory/:name/:url/:data",
  config.payloadCreationRateLimit8,
  async (req, res, next) => {
    requestConfig.data.id = "whc_createpayload_issuancemanaged";
    requestConfig.data.method = "whc_createpayload_issuancemanaged";
    requestConfig.data.params = [
      parseInt(req.params.ecosystem),
      parseInt(req.params.propertyPrecision),
      parseInt(req.params.previousId),
      req.params.category,
      req.params.subcategory,
      req.params.name,
      req.params.url,
      req.params.data
    ];

    try {
      let response = await WormholeHTTP(requestConfig);
      res.json(response.data.result);
    } catch (error) {
      res.status(500).send(error.response.data.error);
    }
  }
);

router.post(
  "/participateCrowdSale/:amount",
  config.payloadCreationRateLimit9,
  async (req, res, next) => {
    requestConfig.data.id = "whc_createpayload_particrwosale";
    requestConfig.data.method = "whc_createpayload_particrwosale";
    requestConfig.data.params = [req.params.amount];

    try {
      let response = await WormholeHTTP(requestConfig);
      res.json(response.data.result);
    } catch (error) {
      res.status(500).send(error.response.data.error);
    }
  }
);

router.post(
  "/revoke/:propertyId/:amount",
  config.payloadCreationRateLimit10,
  async (req, res, next) => {
    let params = [parseInt(req.params.propertyId), req.params.amount];
    if (req.query.memo) {
      params.push(req.query.memo);
    }

    requestConfig.data.id = "whc_createpayload_revoke";
    requestConfig.data.method = "whc_createpayload_revoke";
    requestConfig.data.params = params;

    try {
      let response = await WormholeHTTP(requestConfig);
      res.json(response.data.result);
    } catch (error) {
      res.status(500).send(error.response.data.error);
    }
  }
);

router.post(
  "/sendAll/:from/:to/:ecosystem",
  config.payloadCreationRateLimit11,
  async (req, res, next) => {
    requestConfig.data.id = "whc_createpayload_sendall";
    requestConfig.data.method = "whc_createpayload_sendall";
    requestConfig.data.params = [
      req.params.from,
      req.params.to,
      parseInt(req.params.ecosystem)
    ];

    try {
      let response = await WormholeHTTP(requestConfig);
      res.json(response.data.result);
    } catch (error) {
      res.status(500).send(error.response.data.error);
    }
  }
);

router.post(
  "/simpleSend/:propertyId/:amount",
  config.payloadCreationRateLimit12,
  async (req, res, next) => {
    requestConfig.data.id = "whc_createpayload_simplesend";
    requestConfig.data.method = "whc_createpayload_simplesend";
    requestConfig.data.params = [
      parseInt(req.params.propertyId),
      req.params.amount
    ];

    try {
      let response = await WormholeHTTP(requestConfig);
      res.json(response.data.result);
    } catch (error) {
      res.status(500).send(error.response.data.error);
    }
  }
);

router.post(
  "/STO/:propertyId/:amount",
  config.payloadCreationRateLimit13,
  async (req, res, next) => {
    let params = [parseInt(req.params.propertyId), req.params.amount];
    if (req.query.distributionProperty) {
      params.push(parseInt(req.query.distributionProperty));
    }

    requestConfig.data.id = "whc_createpayload_sto";
    requestConfig.data.method = "whc_createpayload_sto";
    requestConfig.data.params = params;

    try {
      let response = await WormholeHTTP(requestConfig);
      res.json(response.data.result);
    } catch (error) {
      res.status(500).send(error.response.data.error);
    }
  }
);

module.exports = router;
