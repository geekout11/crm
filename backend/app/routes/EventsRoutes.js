const express = require('express')
const clientController = require('../controllers/ClientController')
const userController = require('../controllers/UserController')
const actionController = require('../controllers/ActionController')
const router = express.Router()

module.exports = () => {
  // GET /client
  router.get('/all/', clientController.index)

  // GET /client
  router.get('/fetchSingleClient/:id', clientController.fetchSingleClient)

  // GET /client/all
  router.get('/client/all', actionController.index)

  // GET /user/all
  router.get('/user/all', userController.index)

  // POST /user/signup
  router.post('/user/signup', userController.signup)

  // POST /user/login
  router.post('/user/login', userController.login)

  // POST /api/add
  router.post('/addClientAndAction', clientController.createClientAndAction)

  // POST /api/add
  router.post('/add', clientController.create)

  // POST /api/addAction
  router.put('/addAction/:id', clientController.updateClientsActions)

  // DELETE /client/delete/:id
  router.delete('/delete/:id', clientController.delete)

  // DELETE /client/delete/:id
  router.delete('/deleteAction/:id', clientController.deleteAction)

  // PUT /client/update/:id
  router.put('/update/:id', clientController.update)

  // PUT /client/update/:id
  router.put('/updateClientsAndActions/:id', clientController.updateClientsActions)

  // PUT /client/update/:id
  router.put('/action/update/:id', actionController.updateAction)

  return router
}