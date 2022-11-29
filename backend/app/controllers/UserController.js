const UserModel = require('../models/UserModel')
const bcrypt = require('bcrypt');

module.exports = {

  index: (req, res, next) => {
    UserModel.find()
      .exec(function (err, result) {
        if (err) {
          return res.status(500).json({
            message: 'Error while fetching Cities',
            error: err,
          })
        }

        // console.log(result)

        res.json(result);
      })
  },

  create: (req, res, next) => {

    let user = {}

    UserModel.findOne(req.body, function (err, actions) {

      user = new UserModel({
        email: req.body.email,
        password: req.body.password
      })

      user.save((err, event) => {
        if (err) {
          return res.status(500).json({
            message: 'Error while creating Event',
            error: err,
          })
        }

        return res.status(201).json(event) // http 201 == Created
      })
    })

  },

  login: (req, res, next) => {

    UserModel.findOne({ email: req.body.email }, function (err, user) {

    })
  }

}