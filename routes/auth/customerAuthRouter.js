const express = require('express');
const router = express.Router();
const { customerSignUp, customerlogin, customerDetail } = require('../../controller/authControllers/customerAuthController');
const { jwtAuthenticator } = require('../../middlerware/jwtAuthenticator');
const { customerSignUpRules, customerLoginRules, RuleVerifier } = require('../../middlerware/reqDataVerifier');


// For Sign Up
router.post('/signup', customerSignUpRules, RuleVerifier, customerSignUp);

// For login
router.post('/login', customerLoginRules, RuleVerifier, customerlogin)

// For getting customer data || login required
router.get('/userDetail', jwtAuthenticator, customerDetail)

module.exports = router;