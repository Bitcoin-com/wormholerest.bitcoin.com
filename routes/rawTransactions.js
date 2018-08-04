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
  rawTransactionsRateLimit1: undefined,
  rawTransactionsRateLimit2: undefined,
  rawTransactionsRateLimit3: undefined,
  rawTransactionsRateLimit4: undefined,
  rawTransactionsRateLimit5: undefined,
  rawTransactionsRateLimit6: undefined,
};

let i = 1;
while(i < 7) {
  config[`rawTransactionsRateLimit${i}`] = new RateLimit({
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

router.get('/', config.rawTransactionsRateLimit1, (req, res, next) => {
  res.json({ status: 'dataRetrieval' });
});

router.post('/whcCreateRawTxChange/:rawtx/:prevTxs/:destination/:fee', config.rawTransactionsRateLimit2, (req, res, next) => {
  let query;

  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_createrawtx_change",
      method: "whc_createrawtx_change",
      params: [
        req.paams.rawtx,
        req.paams.prevTxs,
        req.paams.destination,
        req.paams.fee,
        query
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

router.post('/whcCreateRawTxInput/:rawTx/:txid/:n', config.rawTransactionsRateLimit3, (req, res, next) => {

  BitboxHTTP({
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
        req.paams.rawTx,
        req.paams.txid,
        req.paams.n
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

router.post('/whcCreateRawTxOpReturn/:rawTx/:payload', config.rawTransactionsRateLimit4, (req, res, next) => {

  BitboxHTTP({
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
        req.paams.rawTx,
        req.paams.payload
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

router.post('/whcCreateRawTxReference/:rawTx/:destination/:amount', config.rawTransactionsRateLimit5, (req, res, next) => {

  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_createrawtx_reference",
      method: "whc_createrawtx_reference",
      params: [
        req.paams.rawTx,
        req.paams.destination,
        req.paams.amount
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

router.post('/whcDecodeTransaction/:rawTx', config.rawTransactionsRateLimit6, (req, res, next) => {
  let prevTxs;
  let height;

  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_decodetransaction",
      method: "whc_decodetransaction",
      params: [
        req.paams.rawTx,
        prevTxs,
        height
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
