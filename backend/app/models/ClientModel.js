const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClientSchema = new Schema({
  // name: {
  //   type: String,
  //   required: true,
  // },
  // course: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Course'
  // },
  // city: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Cities'
  // },
  name: { type: String, required: true },
  address: {
    city: {
      type: String
    },

    street: {
      type: String
    },

    nr: {
      type: String
    },

    zipcode: {
      type: String
    }
  },
  nip: Number,
  actions: {
    type: Schema.Types.ObjectId,
    ref: 'Client'
  }
})

module.exports = mongoose.model('Client', ClientSchema)