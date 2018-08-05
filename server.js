const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const passport = require('passport');
const mongoose = require('mongoose');
const {DATABASE_URL, PORT} = require('./config');
const app = express();

const tweetRouter = require('./routes/tweetRouter');
const authRouter = require('./routes/auth');

const path = require('path');

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('common'));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('./public/landingPage.html');
});

app.use('/tweet-mood',tweetRouter);
app.use('/auth',authRouter);



// app.listen(process.env.PORT || 8080);
//
//
// module.exports = app;

let server;

function runServer() {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, { useMongoClient: true }, err => {
      if (err) {
        return reject(err);
      }
      server = app
        .listen(PORT, () => {
          console.log(`Your app is listening on port ${PORT}`);
          resolve();
        })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };
