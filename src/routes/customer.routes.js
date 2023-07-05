const express = require('express');
const {saveUser, findUser, manure, age, saveSeed, die, Health } = require('../controllers/customer.controller');
const router = express.Router();

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
    .post(Health)
    .put(die)

module.exports = router;