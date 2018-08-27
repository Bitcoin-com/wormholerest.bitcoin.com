let express = require('express');
let router = express.Router();
let axios = require('axios');
let RateLimit = require('express-rate-limit');

let WormholeHTTP = axios.create({
  baseURL: process.env.RPC_BASEURL
});
let username = process.env.RPC_USERNAME;
let password = process.env.RPC_PASSWORD;

let config = {
  rawTransactionsRateLimit1: undefined,
  rawTransactionsRateLimit2: undefined,
  rawTransactionsRateLimit3: undefined,
  rawTransactionsRateLimit4: undefined,
  rawTransactionsRateLimit5: undefined,
  rawTransactionsRateLimit6: undefined,
  rawTransactionsRateLimit7: undefined
};

let i = 1;
while(i < 8) {
  config[`rawTransactionsRateLimit${i}`] = new RateLimit({
    windowMs: 60000, // 1 hour window
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

let requestConfig = {
  method: 'post',
  auth: {
    username: username,
    password: password
  },
  data: {
    jsonrpc: "1.0"
  }
};

router.get('/', config.rawTransactionsRateLimit1, async (req, res, next) => {
  res.json({ status: 'dataRetrieval' });
});

router.post('/change/:rawtx/:prevTxs/:destination/:fee', config.rawTransactionsRateLimit2, async (req, res, next) => {
  let params = [
    req.params.rawtx,
    JSON.parse(req.params.prevTxs),
    req.params.destination,
    parseFloat(req.params.fee)
  ];
  if(req.query.position) {
    params.push(parseInt(req.query.position));
  }

  WormholeHTTP()
  .then((response) => {
    res.json(response.data.result);
  })
  .catch((error) => {
    res.send(error.response.data.error.message);
  });
  requestConfig.data.id = "whc_createpayload_burnbch";
  requestConfig.data.method = "whc_createpayload_burnbch";
  requestConfig.data.params = [ ];

  try {
    let response = await WormholeHTTP(requestConfig);
    res.json(response.data.result);
  } catch (error) {
    res.status(500).send(error.response.data.error.message);
  }
});

router.post('/input/:rawTx/:txid/:n', config.rawTransactionsRateLimit3, async (req, res, next) => {

  WormholeHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_createrawtx_input",
      method: "whc_createrawtx_input",
      params: [
        req.params.rawTx,
        req.params.txid,
        parseInt(req.params.n)
      ]
    }
  })
  .then((response) => {
    res.json(response.data.result);
  })
  .catch((error) => {
    res.send(error.response.data.error.message);
  });
  requestConfig.data.id = "whc_createpayload_burnbch";
  requestConfig.data.method = "whc_createpayload_burnbch";
  requestConfig.data.params = [ ];

  try {
    let response = await WormholeHTTP(requestConfig);
    res.json(response.data.result);
  } catch (error) {
    res.status(500).send(error.response.data.error.message);
  }
});

router.post('/opReturn/:rawTx/:payload', config.rawTransactionsRateLimit4, async (req, res, next) => {

  WormholeHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_createrawtx_opreturn",
      method: "whc_createrawtx_opreturn",
      params: [
        req.params.rawTx,
        req.params.payload
      ]
    }
  })
  .then((response) => {
    res.json(response.data.result);
  })
  .catch((error) => {
    res.send(error.response.data.error.message);
  });
  requestConfig.data.id = "whc_createpayload_burnbch";
  requestConfig.data.method = "whc_createpayload_burnbch";
  requestConfig.data.params = [ ];

  try {
    let response = await WormholeHTTP(requestConfig);
    res.json(response.data.result);
  } catch (error) {
    res.status(500).send(error.response.data.error.message);
  }
});

router.post('/reference/:rawTx/:destination', config.rawTransactionsRateLimit5, async (req, res, next) => {
  let params = [
    req.params.rawTx,
    req.params.destination
  ];
  if(req.query.amount) {
    params.push(req.query.amount);
  }

  requestConfig.data.id = "whc_createrawtx_reference";
  requestConfig.data.method = "whc_createrawtx_reference";
  requestConfig.data.params = params;

  try {
    let response = await WormholeHTTP(requestConfig);
    res.json(response.data.result);
  } catch (error) {
    res.status(500).send(error.response.data.error.message);
  }
});

router.get('/decodeTransaction/:rawTx', config.rawTransactionsRateLimit6, async (req, res, next) => {
  let params = [
    req.params.rawTx
  ];
  if(req.query.prevTxs) {
    params.push(JSON.parse(req.query.prevTxs));
  }
  if(req.query.height) {
    params.push(req.query.height);
  }

  requestConfig.data.id = "whc_decodetransaction";
  requestConfig.data.method = "whc_decodetransaction";
  requestConfig.data.params = params;

  try {
    let response = await WormholeHTTP(requestConfig);
    res.json(response.data.result);
  } catch (error) {
    res.status(500).send(error.response.data.error.message);
  }
});

router.post('/create/:inputs/:outputs', config.rawTransactionsRateLimit7, async (req, res, next) => {
  let params = [
    JSON.parse(req.params.inputs),
    JSON.parse(req.params.outputs)
  ];
  if(req.query.locktime) {
    params.push(req.query.locktime);
  }

  requestConfig.data.id = "createrawtransaction";
  requestConfig.data.method = "createrawtransaction";
  requestConfig.data.params = params;

  try {
    let response = await WormholeHTTP(requestConfig);
    res.json(response.data.result);
  } catch (error) {
    res.status(500).send(error.response.data.error.message);
  }
});

module.exports = router;
