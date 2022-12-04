const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClientSchema = new Schema({
  name: { type: String, required: true },
  address: {
    city: {
      type: String
    },

    street: {
      type: String
    },

    apartmentNumber: {
      type: String
    },

    zipcode: {
      type: String
    }
  },
  nip: Number,
  
  actions: [{
    type: Schema.Types.ObjectId,
    ref: 'Actions'
  }]
})

module.exports = mongoose.model('Client', ClientSchema)