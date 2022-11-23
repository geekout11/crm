const ClientModel = require('../models/ClientModel')
const ActionModel = require('../models/ActionModel')
const UserModel = require('../models/UserModel')

module.exports = {

  index: (req, res, next) => {
    ClientModel.find()
      .populate('user')
      .populate('action')
      .exec(function (err, result) {
        if (err) {
          return res.status(500).json({
            message: 'Error while fetching Events',
            error: err,
          })
        }

        // console.log(result)

        res.json(result);
      })
  },

  create: (req, res, next) => {

    let client = {}
    let action = {}

    ActionModel.findOne({ key: req.body }, function (err, actions) {

      client = new ClientModel({
        name: req.body.name,
        address: req.body.address,
        nip: req.body.nip,
        actions
      })

      action = new ActionModel({
        actions
      })

      // console.log(req.body)
      // console.log(actions)

      client.save((err, event) => {
        action.save((err) => {
          if (err) {
            return res.status(500).json({
              message: 'Error while creating Event',
              error: err,
            })
          }

          return res.status(201).json(event) // http 201 == Created
        })
      })
    })

  },

  delete: (req, res, next) => {
    const id = req.params.id
    // console.log(id)

    ClientModel.findByIdAndRemove(id, (err, event) => {
      if (err) {
        return res.status(500).json({
          message: 'Error while creating Event',
          error: err,
        })
      }

      return res.status(200).json({
        id: id,
        deleted: true
      }) // http 200 = OK & entity decribing status
      return res.status(204) // http 204 == No content ([No Content] if the action has been performed but the response does not include an entity.)  
    })
  },

  update: (req, res, next) => {

    UserModel.findOne({ key: req.body.course.key }, function (err, course) {
      ActionModel.findOne({ key: req.body.city.key }, function (err, city) {
        ClientModel.updateOne({ _id: req.params.id }, { course, city }, (err, event) => {


          // console.log(req.body)
          // console.log(course)
          // console.log(city)
          // console.log(event)

          if (err) {
            res.status(500).json({
              message: 'Error while updating Event',
              error: err
            })
          } else {
            res.status(200).json({
              message: 'Event has been updated'
            })
          }

          // console.log(course)

        })
      })
    })
  }

}
