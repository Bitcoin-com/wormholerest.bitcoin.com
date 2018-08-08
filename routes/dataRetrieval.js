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
  dataRetrievalRateLimit1: undefined,
  dataRetrievalRateLimit2: undefined,
  dataRetrievalRateLimit3: undefined,
  dataRetrievalRateLimit4: undefined,
  dataRetrievalRateLimit5: undefined,
  dataRetrievalRateLimit6: undefined,
  dataRetrievalRateLimit7: undefined,
  dataRetrievalRateLimit8: undefined,
  dataRetrievalRateLimit9: undefined,
  dataRetrievalRateLimit10: undefined,
  dataRetrievalRateLimit11: undefined,
  dataRetrievalRateLimit12: undefined,
  dataRetrievalRateLimit13: undefined,
  dataRetrievalRateLimit14: undefined,
  dataRetrievalRateLimit15: undefined,
  dataRetrievalRateLimit16: undefined,
  dataRetrievalRateLimit17: undefined,
  dataRetrievalRateLimit18: undefined
};

let i = 1;
while(i < 19) {
  config[`dataRetrievalRateLimit${i}`] = new RateLimit({
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

router.get('/', config.dataRetrievalRateLimit1, (req, res, next) => {
  res.json({ status: 'dataRetrieval' });
});

router.get('/getAllBalancesForAddress/:address', config.dataRetrievalRateLimit2, (req, res, next) => {

  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_getallbalancesforaddress",
      method: "whc_getallbalancesforaddress",
      params: [
        req.params.address
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

router.get('/getAllBalancesForId/:propertyId', config.dataRetrievalRateLimit2, (req, res, next) => {

  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_getallbalancesforid",
      method: "whc_getallbalancesforid",
      params: [
        parseInt(req.params.propertyId)
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

router.get('/getBalance/:address/:propertyId', config.dataRetrievalRateLimit3, (req, res, next) => {

  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_getbalance",
      method: "whc_getbalance",
      params: [
        req.params.address,
        parseInt(req.params.propertyId)
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

router.get('/getBalancesHash/:propertyId', config.dataRetrievalRateLimit4, (req, res, next) => {

  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_getbalanceshash",
      method: "whc_getbalanceshash",
      params: [
        parseInt(req.params.propertyId)
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

router.get('/getCrowdSale/:propertyId', config.dataRetrievalRateLimit5, (req, res, next) => {
  let verbose = false;
  if(req.query.verbose && req.query.verbose === 'true') {
    verbose = true;
  }

  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_getcrowdsale",
      method: "whc_getcrowdsale",
      params: [
        parseInt(req.params.propertyId),
        verbose
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

router.get('/getCurrentConsensusHash', config.dataRetrievalRateLimit6, (req, res, next) => {

  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_getcurrentconsensushash",
      method: "whc_getcurrentconsensushash"
    }
  })
  .then((response) => {
    res.json(response.data.result);
  })
  .catch((error) => {
    res.send(error.response.data.error.message);
  });
});

router.get('/getFeeShare', config.dataRetrievalRateLimit7, (req, res, next) => {
  let params = [];
  if(req.query.address) {
    params.push(req.query.address);
  }

  if(req.query.ecosystem) {
    params.push(req.query.ecosystem);
  }

  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_getfeeshare",
      method: "whc_getfeeshare",
      params: params
    }
  })
  .then((response) => {
    res.json(response.data.result);
  })
  .catch((error) => {
    res.send(error.response.data.error.message);
  });
});

router.get('/getGrants/:propertyId', config.dataRetrievalRateLimit8, (req, res, next) => {

  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_getgrants",
      method: "whc_getgrants",
      params: [
        parseInt(req.params.propertyId),
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

router.get('/getinfo', config.dataRetrievalRateLimit9, (req, res, next) => {

  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_getinfo",
      method: "whc_getinfo"
    }
  })
  .then((response) => {
    res.json(response.data.result);
  })
  .catch((error) => {
    res.send(error.response.data.error.message);
  });
});

router.get('/getPayload/:txid', config.dataRetrievalRateLimit10, (req, res, next) => {

  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_getpayload",
      method: "whc_getpayload",
      params: [
        req.params.txid,
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

router.get('/getProperty/:propertyId', config.dataRetrievalRateLimit11, (req, res, next) => {

  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_getproperty",
      method: "whc_getproperty",
      params: [
        parseInt(req.params.propertyId)
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

router.get('/getSeedBlocks/:startBlock/:endBlock', config.dataRetrievalRateLimit12, (req, res, next) => {

  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_getseedblocks",
      method: "whc_getseedblocks",
      params: [
        parseInt(req.params.startBlock),
        parseInt(req.params.endBlock)
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

router.get('/getSTO/:txid/:recipientFilter', config.dataRetrievalRateLimit13, (req, res, next) => {

  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_getsto",
      method: "whc_getsto",
      params: [
        req.params.txid,
        req.params.recipientFilter
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

router.get('/getTransaction/:txid', config.dataRetrievalRateLimit14, (req, res, next) => {

  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_gettransaction",
      method: "whc_gettransaction",
      params: [
        req.params.txid
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

router.get('/listBlockTransactions/:index', config.dataRetrievalRateLimit15, (req, res, next) => {

  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_listblocktransactions",
      method: "whc_listblocktransactions",
      params: [
        parseInt(req.params.index)
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

router.get('/listPendingTransactions', config.dataRetrievalRateLimit16, (req, res, next) => {
  let params = [];
  if(req.query.address) {
    params.push(req.query.address);
  }
  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_listpendingtransactions",
      method: "whc_listpendingtransactions",
      params: params
    }
  })
  .then((response) => {
    res.json(response.data.result);
  })
  .catch((error) => {
    res.send(error.response.data.error.message);
  });
});

router.get('/listProperties', config.dataRetrievalRateLimit17, (req, res, next) => {

  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_listproperties",
      method: "whc_listproperties"
    }
  })
  .then((response) => {
    res.json(response.data.result);
  })
  .catch((error) => {
    res.send(error.response.data.error.message);
  });
});

router.get('/listTransactions', config.dataRetrievalRateLimit18, (req, res, next) => {
  let params = [];
  if(req.query.address) {
    params.push(req.query.address);
  }
  if(req.query.count) {
    params.push(req.query.count);
  }
  if(req.query.skip) {
    params.push(req.query.skip);
  }
  if(req.query.startBlock) {
    params.push(req.query.startBlock);
  }
  if(req.query.endBlock) {
    params.push(req.query.endBlock);
  }

  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_listtransactions",
      method: "whc_listtransactions",
      params: params
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
