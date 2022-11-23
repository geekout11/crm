const express = require('express')
const clientController = require('../controllers/ClientController')
const userController = require('../controllers/UserController')
const actionController = require('../controllers/ActionController')
const router = express.Router()

module.exports = () => {
  // GET /events
  router.get('/', clientController.index)

  // GET /client/all
  router.get('/client/all', actionController.index)

  // GET /user/all
  router.get('/user/all', userController.index)

  // POST /events/add
  router.post('/add', clientController.create)

  // DELETE /events/delete/:id
  router.delete('/delete/:id', clientController.delete)

  // PUT /events/update/:id
  router.put('/update/:id', clientController.update)

  return router
}