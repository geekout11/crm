const UserModel = require('../models/UserModel')
const bcrypt = require('bcrypt');

module.exports = {

  index: (req, res, next) => {
    UserModel.find()
      .exec(function (err, result) {
        if (err) {
          return res.status(500).json({
            message: 'Error while fetching Users',
            error: err,
          })
        }

        // console.log(result)

        res.json(result);
      })
  },

  signup: (req, res, next) => {

    let user = {}

    UserModel.findOne(req.body, function (err, actions) {

      user = new UserModel({
        email: req.body.email,
        password: req.body.password
      })

      user.save((err, event) => {
        if (err) {
          return res.status(500).json({
            message: 'Error while creating User',
            error: err,
          })
        }

        return res.status(201).json(event) // http 201 == Created
      })
    })

  },

  login: (req, res) => {
    //email and password
    const email = req.body.email
    const password = req.body.password

    //find user exist or not
    UserModel.findOne({ email })
      .then(user => {
        //if user not exist than return status 400
        if (!user) return res.status(400).json({ msg: "User not exist" })

        //if user exist than compare password
        //password comes from the user
        //user.password comes from the database
        bcrypt.compare(password, user.password, (err, data) => {

          const token = user.generateAuthToken();
          
          //if error than throw error
          if (err) throw err

          //if both match than you can do anything
          if (data) {
            return res.status(200).json({
              msg: "Login success",
              jwt: token
            })
          } else {
            return res.status(401).json({ msg: "Invalid credencial" })
          }
        })
      })

  }

  // signup: (req, res, next) => {

  // }

}