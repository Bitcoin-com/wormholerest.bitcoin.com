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
  transactionRateLimit1: undefined,
  transactionRateLimit2: undefined
};

let i = 1;
while(i < 6) {
  config[`transactionRateLimit${i}`] = new RateLimit({
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

router.get('/', config.transactionRateLimit1, (req, res, next) => {
  res.json({ status: 'transaction' });
});

router.get('/whcBurnBCHGetWHC/:amount', config.transactionRateLimit1, (req, res, next) => {
  let redeemaddress;
  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_burnbchgetwhc",
      method: "whc_burnbchgetwhc",
      params: [
        req.paams.amount,
        redeemaddress
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

router.get('/whcPartiCrowSale/:fromAddress/:toAddress/:fromAddress/:amount"', config.transactionRateLimit1, (req, res, next) => {
  let redeemAddress;
  let referenceAmount;

  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_particrowsale",
      method: "whc_particrowsale",
      params: [
        req.paams.fromAddress,
        req.paams.toAddress,
        req.paams.amount,
        redeemAddress,
        referenceAmount
      ]
    }
  })
  .then((response) => {
    res.json(response.data.result);
  })
  .catch((error) => {
    res.send(error.response.data.error.message);
  });

router.get('/whcSend/:fromAddress/:toAddress/:propertyId/:amount', config.transactionRateLimit1, (req, res, next) => {
  let redeemAddress;
  let referenceAmount;
  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_send",
      method: "whc_send",
      params: [
        req.paams.fromAddress,
        req.paams.toAddress,
        req.paams.propertyId,
        req.paams.amount,
        redeemAddress,
        referenceAmount
      ]
    }
  })
  .then((response) => {
    res.json(response.data.result);
  })
  .catch((error) => {
    res.send(error.response.data.error.message);
  });

router.get('/whcSendAll/:fromAddress/:toAddress/:ecosystem', config.transactionRateLimit1, (req, res, next) => {
  let redeemAddress;
  let referenceAmount;
  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_sendall",
      method: "whc_sendall",
      params: [
        req.paams.fromAddress,
        req.paams.toAddress,
        req.paams.ecosystem,
        redeemAddress,
        referenceAmount
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

router.get('/whcSendChangeIssuer/:fromAddress/:toAddress/:propertyId', config.transactionRateLimit1, (req, res, next) => {
  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_sendchangeissuer",
      method: "whc_sendchangeissuer",
      params: [
        req.paams.fromAddress,
        req.paams.toAddress,
        req.paams.propertyId
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

router.get('/whcSendCloseCrowdSale/:fromAddress/:propertyId', config.transactionRateLimit1, (req, res, next) => {
  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_sendclosecrowdsale",
      method: "whc_sendclosecrowdsale",
      params: [
        req.paams.fromAddress,
        req.paams.propertyId
      ]
    }
  })
  .then((response) => {
    res.json(response.data.result);
  })
  .catch((error) => {
    res.send(error.response.data.error.message);
  });

router.get('/whcSendGrant/{fromAddress}/{toAddress}/{propertyId}/{amount}', config.transactionRateLimit1, (req, res, next) => {
  let memo;
  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_sendgrant",
      method: "whc_sendgrant",
      params: [
        req.paams.fromAddress,
        req.paams.toAddress,
        req.paams.propertyId,
        req.paams.amount,
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

router.get('/whcSendIssuanceCrowdSale/:fromAddress/:ecosystem/:propertyPricision/:previousId/:category/:subcategory/:name/:url/:data/:propertyIdDesired/:tokensPerUnit/:deadline/:earlyBonus/:undefine/:totalNumber', config.transactionRateLimit1, (req, res, next) => {
  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_sendissuancecrowdsale",
      method: "whc_sendissuancecrowdsale",
      params: [
        req.paams.fromAddress,
        req.paams.ecosystem,
        req.paams.propertyPricision,
        req.paams.previousId,
        req.paams.category,
        req.paams.subcategory,
        req.paams.name,
        req.paams.url,
        req.paams.data,
        req.paams.propertyIdDesired,
        req.paams.tokensPerUnit,
        req.paams.deadline,
        req.paams.earlyBonus,
        req.paams.undefine,
        req.paams.totalNumber
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

router.get('/whcSendIssuanceFixed/:fromAddress/:ecosystem/:propertyPricision/:previousId/:category/:subcategory/:name/:url/:data/:totalNumber', config.transactionRateLimit1, (req, res, next) => {
  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_sendissuancefixed",
      method: "whc_sendissuancefixed",
      params: [
        req.paams.fromAddress,
        req.paams.ecosystem,
        req.paams.propertyPricision,
        req.paams.previousId,
        req.paams.category,
        req.paams.subcategory,
        req.paams.name,
        req.paams.url,
        req.paams.data,
        req.paams.totalNumber
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

router.get('/whcSendIssuanceManaged/:fromAddress/:ecosystem/:propertyPricision/:previousId/:category/:subcategory/:name/:url/:data', config.transactionRateLimit1, (req, res, next) => {
  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_sendissuancemanaged",
      method: "whc_sendissuancemanaged",
      params: [
        req.paams.fromAddress,
        req.paams.ecosystem,
        req.paams.propertyPricision,
        req.paams.previousId,
        req.paams.category,
        req.paams.subcategory,
        req.paams.name,
        req.paams.url,
        req.paams.data
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

router.get('/whcSendRawTx/{fromAddress}/{rawTransaction}', config.transactionRateLimit1, (req, res, next) => {
  let referenceAddress;
  let redeemAddress;
  let referenceAmount;
  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_sendrawtx",
      method: "whc_sendrawtx",
      params: [
        req.paams.fromAddress,
        req.paams.rawTransaction,
        referenceAddress,
        redeemAddress,
        referenceAmount
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

router.get('/whcSendRevoke/:fromAddress/:propertyId/:amount', config.transactionRateLimit1, (req, res, next) => {
  let memo;
  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_sendrevoke",
      method: "whc_sendrevoke",
      params: [
        req.paams.fromAddress,
        req.paams.propertyId,
        req.paams.amount,
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

router.get('/whcSendSTO/:fromAddress/:propertyId/:amount', config.transactionRateLimit1, (req, res, next) => {
  let redeemAddress;
  let distributionProperty;
  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_sendsto",
      method: "whc_sendsto",
      params: [
        req.paams.fromAddress,
        req.paams.propertyId,
        req.paams.amount,
        redeemAddress,
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
