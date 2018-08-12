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
  walletRateLimit1: undefined,
  walletRateLimit2: undefined,
  walletRateLimit3: undefined
};

let i = 1;
while(i < 4) {
  config[`walletRateLimit${i}`] = new RateLimit({
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

router.get('/', config.walletRateLimit1, (req, res, next) => {
  res.json({ status: 'configuration' });
});

router.get('/newAddress', config.walletRateLimit2, (req, res, next) => {

  WormholeHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"getnewaddress",
      method: "getnewaddress"
    }
  })
  .then((response) => {
    res.json(response.data.result);
  })
  .catch((error) => {
    res.send(error.response.data.error.message);
  });
});

router.post('/sendToAddress/:address/:amount', config.walletRateLimit3, (req, res, next) => {

  WormholeHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"sendtoaddress",
      method: "sendtoaddress",
      params: [
        req.params.address,
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

module.exports = router;
