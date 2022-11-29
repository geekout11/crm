const express = require('express')
const clientController = require('../controllers/ClientController')
const userController = require('../controllers/UserController')
const actionController = require('../controllers/ActionController')
const router = express.Router()

module.exports = () => {
  // GET /client
  router.get('/', clientController.index)

  // GET /client/all
  router.get('/client/all', actionController.index)

  // GET /user/all
  router.get('/user/all', userController.index)

  // POST /user/signup
  router.post('/user/signup', userController.signup)

  // POST /user/login
  router.post('/user/login', userController.login)

  // POST /api/add
  router.post('/add', clientController.create)

  // POST /api/addAction
  router.put('/addAction/:id', clientController.updateClientsActions)

  // DELETE /client/delete/:id
  router.delete('/delete/:id', clientController.delete)

  // PUT /client/update/:id
  router.put('/update/:id', clientController.update)

  return router
}