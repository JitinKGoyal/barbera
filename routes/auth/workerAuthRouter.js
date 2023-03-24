const express = require('express');
const { roles } = require('../../constants/constants');
const router = express.Router();
const { workerSignUp, workerlogin, udpateWorkerDetail, workerDetail, deleteWorker } = require('../../controller/authControllers/workerAuthController');
const { jwtAuthenticator } = require('../../middlerware/jwtAuthenticator');
const { RuleVerifier, workerSignUpRules, workerLoginRules } = require('../../middlerware/reqDataVerifier');
const { roleVerifier } = require('../../middlerware/roleVerifier');

// For Sign Up
router.post('/signup', workerSignUpRules, RuleVerifier, workerSignUp);

// For login
router.post('/login', workerLoginRules, RuleVerifier, workerlogin)

// For getting worker data || login required
router.get('/userDetail', jwtAuthenticator, roleVerifier(roles.WORKER), workerDetail)

// For updating worker data || login required
router.put('/', jwtAuthenticator, roleVerifier(roles.WORKER), udpateWorkerDetail)

// For deleting worker || login required
router.delete('/', jwtAuthenticator, roleVerifier(roles.WORKER), deleteWorker)

module.exports = router;