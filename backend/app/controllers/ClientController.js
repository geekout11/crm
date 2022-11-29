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

    // let client = {}
    // let action = {}

    // ActionModel.findOne(req.body.actions, function (err, actions) {

    const action = new ActionModel({
      date: req.body.date,
      phone: req.body.phone,
      textarea: req.body.textarea
    })

    const client = new ClientModel({
      name: req.body.name,
      address: req.body.address,
      nip: req.body.nip,
      actions: [action]
    })

    // console.log(req.body.actions)
    // console.log(client)
    // console.log(req.body)
    // console.log(actions)
    action.save((err) => {
      if (err) {
        return res.status(500).json({
          message: 'Error while creating Action',
          error: err,
        })
      }

      client.save((err, event) => {
        if (err) {
          return res.status(500).json({
            message: 'Error while creating Client',
            error: err,
          })
        }

        return res.status(201).json(event) // http 201 == Created
      })
    })
    // })

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

    ClientModel.updateOne(req.body, (err, event) => {

      // console.log(req.body)
      // console.log(course)
      // console.log(city)
      // console.log(event)

      if (err) {
        res.status(500).json({
          message: 'Error while updating Client',
          error: err
        })
      } else {
        res.status(200).json({
          message: 'Client has been updated'
        })
      }

      // console.log(course)

    })
  },

  updateClientsActions: (req, res, next) => {

    ActionModel.updateOne(req.body, (err, actions) => {

      const action = new ActionModel({
        date: req.body.date,
        phone: req.body.phone,
        textarea: req.body.textarea
      })

      // console.log(action)
      // console.log(req.body)

      action.updateOne((err) => {
        if (err) {
          // return res.status(500).json({
          //   message: 'Error while adding Action',
          //   error: err,
          // })
        }
      })
    })

    ClientModel.updateOne(req.body, (err, event) => {

      if (err) {
        res.status(500).json({
          message: 'Error while updating Client',
          error: err
        })
      } else {
        res.status(200).json({
          message: 'Client has been updated'
        })
      }
    })
  }

}
