const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ActionsSchema = new Schema({
  date: {
    type: Date, default: ''
  },
  phone: {
    type: String, default: ''
  },
  textarea: {
    type: String, default: ''
  }
  // actions: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Client'
  // }
})

module.exports = mongoose.model('Actions', ActionsSchema)