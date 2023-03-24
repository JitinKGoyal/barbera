const express = require('express');
const { roles } = require('../../constants/constants');
const router = express.Router();
const { serviceProviderSignUp, serviceProviderlogin, udpateServiceProviderDetail, deleteServiceProvider, serviceProviderDetail } = require('../../controller/authControllers/serviceProviderAuthController');
const { jwtAuthenticator } = require('../../middlerware/jwtAuthenticator');
const { RuleVerifier, serviceProviderSignUpRules, serviceProviderLoginRules } = require('../../middlerware/reqDataVerifier');
const { roleVerifier } = require('../../middlerware/roleVerifier');

// For Sign Up
router.post('/signup', serviceProviderSignUpRules, RuleVerifier, serviceProviderSignUp);

// For login
router.post('/login', serviceProviderLoginRules, RuleVerifier, serviceProviderlogin)

// For getting serviceProvider data || login required
router.get('/userDetail', jwtAuthenticator, roleVerifier(roles.SERVICEPROVIDER), serviceProviderDetail)

// For updating serviceProvider data || login required
router.put('/', jwtAuthenticator, roleVerifier(roles.SERVICEPROVIDER), udpateServiceProviderDetail)

// For deleting serviceProvider || login required
router.delete('/', jwtAuthenticator, roleVerifier(roleVerifier.SERVICEPROVIDER), deleteServiceProvider)

module.exports = router;