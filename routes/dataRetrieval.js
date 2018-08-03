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
  dataRetrievalRateLimit12: undefined
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

router.get('/whcGetAllBalancesForAddress/:address', config.dataRetrievalRateLimit2, (req, res, next) => {

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

router.get('/whcGetAllBalancesForId/:propertyId', config.dataRetrievalRateLimit2, (req, res, next) => {

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
        req.params.propertyid
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

router.get('/whcGetBalance/:address/:propertyId', config.dataRetrievalRateLimit2, (req, res, next) => {

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

router.get('/whcGetBalancesHash/:propertyId', config.dataRetrievalRateLimit2, (req, res, next) => {

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

router.get('/whcGetCrowdSale/:propertyId', config.dataRetrievalRateLimit2, (req, res, next) => {
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
        req.params.propertyId,
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

router.get('/whcGetCurrentConsensusHash', config.dataRetrievalRateLimit2, (req, res, next) => {

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

router.get('/whcGetFeeShare', config.dataRetrievalRateLimit2, (req, res, next) => {
  let address = false;
  if(req.query.address && req.query.address === 'true') {
    address = true;
  }

  let ecosystem = false;
  if(req.query.ecosystem && req.query.ecosystem === 'true') {
    ecosystem = true;
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
      params: [
        address,
        ecosystem
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

router.get('/whcGetGrants/:propertyId', config.dataRetrievalRateLimit2, (req, res, next) => {
  let address = false;
  if(req.query.address && req.query.address === 'true') {
    address = true;
  }

  let ecosystem = false;
  if(req.query.ecosystem && req.query.ecosystem === 'true') {
    ecosystem = true;
  }

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
        req.params.propertyId,
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

router.get('/whcGetinfo', config.dataRetrievalRateLimit2, (req, res, next) => {

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

router.get('/whcGetPayload/:txid', config.dataRetrievalRateLimit2, (req, res, next) => {

  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_getpayload",
      method: "whc_getpayload"
    }
  })
  .then((response) => {
    res.json(response.data.result);
  })
  .catch((error) => {
    res.send(error.response.data.error.message);
  });
});

router.get('/whcGetProperty/:propertyId', config.dataRetrievalRateLimit2, (req, res, next) => {

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

router.get('/whcGetSeedBlocks/:startblock/:endblock', config.dataRetrievalRateLimit2, (req, res, next) => {

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
        req.params.startblock,
        req.params.endblock
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

router.get('/whcGetSto/:txid/:recipientFilter', config.dataRetrievalRateLimit2, (req, res, next) => {

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

router.get('/whcGetTransaction/:txid', config.dataRetrievalRateLimit2, (req, res, next) => {

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

router.get('/whcListBlockTransactions/:index', config.dataRetrievalRateLimit2, (req, res, next) => {

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
        req.params.index
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

router.get('/whcListPendingTransactions/:address', config.dataRetrievalRateLimit2, (req, res, next) => {

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

router.get('/whc_listproperties', config.dataRetrievalRateLimit2, (req, res, next) => {

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

router.get('/whcListTransactions', config.dataRetrievalRateLimit2, (req, res, next) => {

  BitboxHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_listtransactions",
      method: "whc_listtransactions"
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
