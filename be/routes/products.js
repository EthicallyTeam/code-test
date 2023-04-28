const express = require('express');
const productUtil = require('../util/productUtil')
const router = express.Router();
const _ = require("lodash")

router.get('/', function(req, res, next) {
  console.log(req.query)
  let data;


  try {
    if (_.isEmpty(req.query)) {
      data = productUtil.getAllProductsData() 
    } else {
      data = productUtil.getProductDataByParams(req.query)
    }
    return res.send(data)

  } catch (error) {
    console.error(error)
    return res.status(400).send({ error: error.message })
  }
});

router.get('/characteristics-score', function(req, res, next) {
  // this functionality is also included as a queryParam in the /products GET

  try {
    const data = productUtil.getProductsWithCharacteristicScore(productUtil.getAllProductsData())
    // Not wild about this ^^ way of doing this if this is at scale
    // this "score" seems like something that would be computed on insert to a datastore instead of on retrieval
    return res.send(data)
  } catch (error) {
    console.error(error)
    return res.status(400).send({ error: error.message })
  }
});

// *future state consideration*
// thinking about this more, besides it being precomputed on insert, 
// I could see the  `scores` api functioning well if it took a bunch of productIds and return 
// the scores for them. If this score concept was one that was going to be extended to a whole
// bunch of different properties, perhaps a separate API which took in the Id and pivot(s) could be
// be used to return the score in that way. If there were a lot of products then it would be nice to 
// precomputed in some sort of 0(1) accessible store. This all comes down to how it'll be used.

module.exports = router;


  // TODO: how to model/validate params in node/express