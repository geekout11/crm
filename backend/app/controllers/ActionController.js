const ActionModel = require('../models/ActionModel')

module.exports = {

  index: (req, res, next) => {
    ActionModel.find()
      .exec(function (err, result) {
        if (err) {
          return res.status(500).json({
            message: 'Error while fetching Actions',
            error: err,
          })
        }

        // console.log(result)

        res.json(result);
      })
  },


  updateAction: (req, res, next) => {

    ActionModel.findByIdAndUpdate(req.params.id, req.body, (err, action) => {


      // console.log(req.body)
      // console.log(course)
      // console.log(city)
      // console.log(event)

      if (err) {
        res.status(500).json({
          message: 'Error while updating Action',
          error: err
        })
      } else {
        res.status(200).json({
          message: 'Action has been updated'
        })
      }

      // console.log(course)

    })
  },

}