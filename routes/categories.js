const express = require('express');
const router = express.Router();
const axios = require('axios');
const {twitterAccess, twitterConfig} = require('../config');


router.get('/', (req,res) => {
  axios.get('https://api.twitter.com/1.1/users/suggestions.json', {
    headers: twitterConfig.headers
  })
  .then((categories) => {
    console.log("categories",categories.data);
    console.log("SUCCESS");
    res.send(categories.data);
  })
  .catch((error) => {
    res.status(400).send(error);
  });
})

module.exports = router;
