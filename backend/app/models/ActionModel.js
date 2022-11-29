const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ActionsSchema = new Schema({
  date: {
    type: String
  },
  phone: {
    type: String
  },
  textarea: {
    type: String
  }
  // actions: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Client'
  // }
})

module.exports = mongoose.model('Actions', ActionsSchema)