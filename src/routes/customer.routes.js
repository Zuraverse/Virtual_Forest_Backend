const express = require('express');
const {getAllCustomers, saveCustomer, saveUser, findUser, manure, age, saveSeed, die, dieHealth } = require('../controllers/customer.controller');
const router = express.Router();

router
    .route('/')
    .get(getAllCustomers)
    .post(saveCustomer)

router
    .route('/users/:id')
    .get(findUser)
    .post(manure)
    
router
    .route('/users')
    .post(saveUser)

router
    .route('/seeds')
    .post(saveSeed)

router
    .route('/seeds/:id')
    .post(age)

router
    .route('/seeds/die/:id')
    .post(dieHealth)
    .put(die)

module.exports = router;