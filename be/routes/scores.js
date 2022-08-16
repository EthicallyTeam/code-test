const express = require('express');
const data = require('../data/products');
const router = express.Router();

let scores = {
    'Plastic-Free': 2,
    'Humane': 1,
    'Locally Produced': 1,
    'Healthy': 1,
    'Unhealthy': -1,
    'Wasteful' : -1,
}

function accumScore(array) {
    let score = 0;
    for (i in array) {
        scores[array[i]] ? score += scores[array[i]] : null;
    }
    return score;
}

router.get('/', function(req, res, next) {
  let prodScores = [];
  if (data && data != []) {
      for (let i in data) {
        data[i].characteristics ? prodScores.push({
            name: data[i].name,
            charecteristics: data[i].characteristics,
            score: accumScore(data[i].characteristics),
        }) : null;     
      }
  }
  res.send(prodScores);
});

module.exports = router;