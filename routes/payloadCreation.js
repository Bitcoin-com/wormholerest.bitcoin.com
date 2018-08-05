let express = require('express');
let router = express.Router();
let axios = require('axios');
let RateLimit = require('express-rate-limit');

let BITBOXCli = require('bitbox-cli/lib/bitbox-cli').default;
let BITBOX = new BITBOXCli();

let BitboxHTTP = axios.create({
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
while(i < 14) {
  config[`payloadCreationRateLimit${i}`] = new RateLimit({
    windowMs: 60*60*1000, // 1 hour window
    delayMs: 0, // disable delaying - full speed until the max limit is reached
    max: 60, // start blocking after 60 requests
    handler: function (req, res, /*next*/) {
      res.format({
        json: function () {
          res.status(500).json({ error: 'Too many requests. Limits are 60 requests per minute.' });
        }
      });
    }
  });
  i++;
}

router.get('/', config.payloadCreationRateLimit1, (req, res, next) => {
  res.json({ status: 'payloadCreation' });
});

router.get('/whcCreatePayloadBurnBCH', config.payloadCreationRateLimit2, (req, res, next) => {

  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_createpayload_burnbch",
      method: "whc_createpayload_burnbch"
    }
  })
  .then((response) => {
    res.json(response.data.result);
  })
  .catch((error) => {
    res.send(error.response.data.error.message);
  });
});

router.post('/whcCreatePayloadChangeIssuer/:propertyId', config.payloadCreationRateLimit2, (req, res, next) => {

  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_createpayload_changeissuer",
      method: "whc_createpayload_changeissuer",
      params: [
        req.params.propertyId
      ]
    }
  })
  .then((response) => {
    res.json(response.data.result);
  })
  .catch((error) => {
    res.send(error.response.data.error.message);
  });
});

router.post('/whcCreatePayloadCloseCrowdSale/:propertyId', config.payloadCreationRateLimit3, (req, res, next) => {

  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_createpayload_closecrowdsale",
      method: "whc_createpayload_closecrowdsale",
      params: [
        req.params.propertyId
      ]
    }
  })
  .then((response) => {
    res.json(response.data.result);
  })
  .catch((error) => {
    res.send(error.response.data.error.message);
  });
});

router.post('/whcCreatePayloadGrant/:propertyId', config.payloadCreationRateLimit4, (req, res, next) => {

  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_createpayload_grant",
      method: "whc_createpayload_grant",
      params: [
        req.params.propertyId
      ]
    }
  })
  .then((response) => {
    res.json(response.data.result);
  })
  .catch((error) => {
    res.send(error.response.data.error.message);
  });
});

router.post('/whcCreatePayloadIssuanceCrowdsale/:ecosystem/:propertyPricision/:previousId/:category/:subcategory/:name/:url/:data/:propertyIdDesired/:tokensPerUnit/:deadline/:earlyBonus/:undefine/:totalNumber', config.payloadCreationRateLimit6, (req, res, next) => {

  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_createpayload_issuancecrowdsale",
      method: "whc_createpayload_issuancecrowdsale",
      params: [
        req.params.ecosystem,
        req.params.propertyPricision,
        req.params.previousId,
        req.params.category,
        req.params.subcategory,
        req.params.name,
        req.params.url,
        req.params.data,
        req.params.propertyIdDesired,
        req.params.tokensPerUnit,
        req.params.deadline,
        req.params.earlyBonus,
        req.params.undefine,
        req.params.totalNumber
      ]
    }
  })
  .then((response) => {
    res.json(response.data.result);
  })
  .catch((error) => {
    res.send(error.response.data.error.message);
  });
});

router.post('/whcCreatePayloadIssuanceFixed/:ecosystem/:propertyPricision/:previousId/:category/:subcategory/:name/:url/:data/:amount', config.payloadCreationRateLimit7, (req, res, next) => {

  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_createpayload_issuancefixed",
      method: "whc_createpayload_issuancefixed",
      params: [
        req.params.ecosystem,
        req.params.propertyPricision,
        req.params.previousId,
        req.params.category,
        req.params.subcategory,
        req.params.name,
        req.params.url,
        req.params.data,
        req.params.amount
      ]
    }
  })
  .then((response) => {
    res.json(response.data.result);
  })
  .catch((error) => {
    res.send(error.response.data.error.message);
  });
});

router.post('/whcCreatePayloadIssuanceManaged/:ecosystem/:propertyPricision/:previousId/:category/:subcategory/:name/:url/:data', config.payloadCreationRateLimit8, (req, res, next) => {

  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_createpayload_issuancemanaged",
      method: "whc_createpayload_issuancemanaged",
      params: [
        req.params.ecosystem,
        req.params.propertyPricision,
        req.params.previousId,
        req.params.category,
        req.params.subcategory,
        req.params.name,
        req.params.url,
        req.params.data
      ]
    }
  })
  .then((response) => {
    res.json(response.data.result);
  })
  .catch((error) => {
    res.send(error.response.data.error.message);
  });
});

router.get('/whcCreatePayloadPartiCrwoSale/:amount', config.payloadCreationRateLimit9, (req, res, next) => {

  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_createpayload_particrwosale",
      method: "whc_createpayload_particrwosale",
      params: [
        req.params.amount
      ]
    }
  })
  .then((response) => {
    res.json(response.data.result);
  })
  .catch((error) => {
    res.send(error.response.data.error.message);
  });
});

router.post('/whcCreatePayloadRevoke/:propertyId/:amount', config.payloadCreationRateLimit10, (req, res, next) => {
  let memo;

  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_createpayload_revoke",
      method: "whc_createpayload_revoke",
      params: [
        req.params.propertyId,
        req.params.amount,
        memo
      ]
    }
  })
  .then((response) => {
    res.json(response.data.result);
  })
  .catch((error) => {
    res.send(error.response.data.error.message);
  });
});

router.post('/whcCreatePayloadSendAll/:ecosystem', config.payloadCreationRateLimit11, (req, res, next) => {

  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_createpayload_sendall",
      method: "whc_createpayload_sendall",
      params: [
        req.params.ecosystem
      ]
    }
  })
  .then((response) => {
    res.json(response.data.result);
  })
  .catch((error) => {
    res.send(error.response.data.error.message);
  });
});

router.post('/whcCreatePayloadSimpleSend/:propertyId/:amount', config.payloadCreationRateLimit12, (req, res, next) => {

  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_createpayload_simplesend",
      method: "whc_createpayload_simplesend",
      params: [
        req.params.propertyId,
        req.params.amount
      ]
    }
  })
  .then((response) => {
    res.json(response.data.result);
  })
  .catch((error) => {
    res.send(error.response.data.error.message);
  });
});

router.post('/whcCreatePayloadSTO/:propertyId/:amount', config.payloadCreationRateLimit13, (req, res, next) => {
  let distributionProperty;

  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_createpayload_sto",
      method: "whc_createpayload_sto",
      params: [
        req.params.propertyId,
        req.params.amount,
        distributionProperty
      ]
    }
  })
  .then((response) => {
    res.json(response.data.result);
  })
  .catch((error) => {
    res.send(error.response.data.error.message);
  });
});

module.exports = router;
