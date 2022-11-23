const UserModel = require('../models/UserModel')

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

}