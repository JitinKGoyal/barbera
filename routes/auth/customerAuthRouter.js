const express = require('express');
const { roles } = require('../../constants/constants');
const router = express.Router();
const { customerSignUp, customerlogin, customerDetail, udpateCustomerDetail, deleteCustomer } = require('../../controller/authControllers/customerAuthController');
const { jwtAuthenticator } = require('../../middlerware/jwtAuthenticator');
const { customerSignUpRules, customerLoginRules, RuleVerifier } = require('../../middlerware/reqDataVerifier');
const { roleVerifier } = require('../../middlerware/roleVerifier');

// For Sign Up
router.post('/signup', customerSignUpRules, RuleVerifier, customerSignUp);

// For login
router.post('/login', customerLoginRules, RuleVerifier, customerlogin)

// For getting customer data || login required
router.get('/userDetail', jwtAuthenticator, roleVerifier(roles.CUSTOMER), customerDetail)

// For updating customer data || login required
router.put('/', customerSignUpRules, RuleVerifier, jwtAuthenticator, roleVerifier(roles.CUSTOMER), udpateCustomerDetail)

// For deleting customer || login required
router.delete('/', jwtAuthenticator, roleVerifier(roleVerifier.CUSTOMER), deleteCustomer)

module.exports = router;