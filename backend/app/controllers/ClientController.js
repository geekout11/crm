const ClientModel = require('../models/ClientModel')
const ActionModel = require('../models/ActionModel')
const UserModel = require('../models/UserModel')

module.exports = {

  index: (req, res, next) => {
    ClientModel.find()
      .populate('actions')
      .exec(function (err, result) {
        if (err) {
          return res.status(500).json({
            message: 'Error while fetching Clients',
            error: err,
          })
        }

        // console.log(result)

        res.json(result);
      })
  },

  fetchSingleClient: (req, res, next) => {
    ClientModel
      .findById(req.params.id, function (err, result) {
        if (err) {
          return res.status(500).json({
            message: 'Error while fetching Client',
            error: err,
          })
        }

        // console.log(result)

        res.json(result);
      })
      .populate('actions')
  },


  createClientAndAction: (req, res, next) => {

    const action = new ActionModel({
      dateAdded: req.body.dateAdded,
      visitDate: req.body.visitDate,
      phone: req.body.phone,
      textarea: req.body.textarea,
      // client: null
    })

    const client = new ClientModel({
      name: req.body.name,
      address: req.body.address,
      nip: req.body.nip,
      actions: [action]
    })

    action.client = client

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

  },

  create: (req, res, next) => {

    // let client = {}
    // let action = {}

    // ActionModel.findOne(req.body.actions, function (err, actions) {

    const client = new ClientModel({
      name: req.body.name,
      address: req.body.address,
      nip: req.body.nip,
      actions: []
    })

    // console.log(req.body.actions)
    // console.log(client)
    // console.log(req.body)
    // console.log(actions)


    client.save((err, event) => {
      if (err) {
        return res.status(500).json({
          message: 'Error while creating Client',
          error: err,
        })
      }

      return res.status(201).json(event) // http 201 == Created
    })

    // })

  },

  delete: (req, res, next) => {
    const id = req.params.id
    // console.log(id)
    ClientModel.findByIdAndRemove(id, (err, client) => {
      ActionModel.deleteMany((err, action) => {

        if (err) {
          // console.log(err)
          return res.status(500).json({
            message: 'Error while deleting Client or Action',
            error: err,
          })
        }

        return res.status(200).json({
          id: id,
          deleted: true
        }) // http 200 = OK & entity decribing status
        return res.status(204) // http 204 == No content ([No Content] if the action has been performed but the response does not include an entity.)  
      })
    })
  },

  deleteAction: (req, res, next) => {
    const id = req.params.id
    // console.log(id)
    ActionModel.findByIdAndRemove(id, (err, action) => {
      if (err) {
        // console.log(err)
        return res.status(500).json({
          message: 'Error while deleting Action',
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

    ClientModel.findByIdAndUpdate(req.params.id, req.body, (err, client) => {
      

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

    const action = new ActionModel({
      dateAdded: req.body.dateAdded,
      visitDate: req.body.visitDate,
      phone: req.body.phone,
      textarea: req.body.textarea,
      client: req.params.id
    })

    // console.log(action)
    // console.log(req.params.id)

    action.save((err, result) => {
      if (err) {
        return res.status(500).json({
          message: 'Error while adding Action',
          error: err,
        })
      }

      ClientModel.updateOne({ '_id': req.params.id }, { '$addToSet': { 'actions': action } }, (err, client) => {

        console.log(client)

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
    })
  }

}
