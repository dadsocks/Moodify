const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();
const {twitterAccess, twitterConfig, watsonUserName, watsonPassword} = require('../config');

const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

const toneAnalyzer = new ToneAnalyzerV3({
  version: '2017-09-21',
  username: watsonUserName,
  password: watsonPassword
});

router.get('/', (req,res) => {

  let tweetText;
  let tweetHTML;

  axios.get('https://api.twitter.com/1.1/statuses/user_timeline.json', {
    params: {
      screen_name: 'alyankovic',
      count: 10,
      include_rts: false,
      tweet_mode: 'extended'
    },
    headers: twitterConfig.headers
  })
  .then((tweets) => {
    console.log("TWEEEEET",tweets.data[0]);
    const tweetURL = `https://twitter.com/Interior/status/${tweets.data[0].id_str}`;

    tweetText = tweets.data[0].full_text;

    return axios.get('https://publish.twitter.com/oembed', {
      params: {
        url: tweetURL,
        maxwidth: 325
      }
    });
  })
  .then((tweet) => {
    console.log("TweetHTML", tweet);
    tweetHTML = tweet.data.html;

    const toneParams = {
      tone_input: { text: tweetText },
      content_type: 'application/json',
      sentences: false
    };

    return new Promise((resolve, reject) => {

      toneAnalyzer.tone(toneParams, (error, analysis) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log(JSON.stringify(analysis, null, 2));
          resolve(analysis);
        }
      });

    });
  })
  .then((tones) => {

    const strongestTone = tones.document_tone.tones.sort( (a,b) => {
      return b.score - a.score;
    });

    return strongestTone[0].tone_name;

  })
  .then((tweetMood) => {

    const tweetData = {
      tweetHTML,
      tweetMood
    };

    console.log("SUCCESS");
    res.send(tweetData);
  })
  .catch((error) => {
    res.status(400);
  });
})



module.exports = router;
