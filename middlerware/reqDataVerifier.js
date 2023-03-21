const { body, validationResult } = require("express-validator")

// customer
const customerSignUpRules = [
    body('name', "Name must be minimum of 2 chars").isLength({ min: 2 }),
    body('phone', "Phone is required with 10 digits").isNumeric().isLength({ min: 10, max: 10 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', "enter password min 5 chars").isLength({ min: 5 }),
    body('gender', "Send gender").isLength({ min: 1 })
]

const customerLoginRules = [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password in mandatory").isLength({ min: 1 })
]

// Customer signup rules verifier
const RuleVerifier = (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    next();
}

module.exports = {
    customerSignUpRules,
    customerLoginRules,
    RuleVerifier
}