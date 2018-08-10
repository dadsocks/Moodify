const express = require('express');
const router = express.Router();
const axios = require('axios');
const {twitterAccess, twitterConfig} = require('../config');


router.get('/', (req,res) => {
  axios.get('https://api.twitter.com/1.1/users/suggestions.json', {
    headers: twitterConfig.headers
  })
  .then((categories) => {
    res.send(categories.data);
  })
  .catch((error) => {
    res.status(400).send(error);
  });
})

router.get('/:category', (req,res) => {
  const categoryURL = `https://api.twitter.com/1.1/users/suggestions/${req.params.category}.json`;
  console.log(categoryURL);

  axios.get(categoryURL, {
    headers: twitterConfig.headers
  })
  .then((suggestions) => {
    console.log('SUGGEST',suggestions);
    res.send(suggestions.data);
  })
  .catch((error) => {
    console.log(error.response.data);
    res.status(400).send(error);
  });
})

module.exports = router;
