const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Player = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  discordName: {
    type: String
  },
  summoner: {
    type: String
  },
  rank: {
    type: String
  },
  primaryRole: {
    type: Date
  },
  primaryChamp1: {
    type: String
  },
  primaryChamp2: {
    type: String
  },
  primaryChamp3: {
    type: String
  },
  secondaryRole: {
    type: String
  },
  secondaryChamp1: {
    type: String
  },
  secondaryChamp2: {
    type: String
  },
  secondaryChamp3: {
    type: String
  },
  onlineStatus: {
    type: Boolean
  },
  captainStatus: {
    type: Boolean
  },
  pickStatus: {
    type: Boolean
  },
  verifiedStatus: {
    type: Boolean
  },
  emcRecord: {
    type: Array
  },
}, {
  collection: 'players'
})

module.exports = mongoose.model('Player', Player)