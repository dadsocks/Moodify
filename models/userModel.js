
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  screen_name: {
    type: String,
    required: true,
    unique: true
  },
  twitterId: {
    type: String,
    required: true
  },
  location: {type: String, default: ''},
  profile_image_url: {type: String, default: ''},
  name: {type: String, default: ''}
});


const User = mongoose.model('User', UserSchema);

module.exports = {User};
