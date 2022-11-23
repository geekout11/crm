const ActionModel = require('../models/ActionModel')

module.exports = {

    index: (req, res, next) => {
      ActionModel.find()
          .exec(function (err, result) {
            if (err) {
              return res.status(500).json({
                message: 'Error while fetching Courses',
                error: err,
              })
            }
    
            // console.log(result)
    
            res.json(result);
          })
      },

}