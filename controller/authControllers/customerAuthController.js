const Customer = require("../../models/Customer")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtkey } = require("../../config");

// Customer signup controller
const customerSignUp = async (req, res) => {
    try {
        const { email, phone, password } = req.body

        // check for duplicate email
        let customer = await Customer.findOne({ email })
        if (customer) return res.status(401).json({ errors: [{ msg: "email already registered" }] });

        // check for duplicate phone
        customer = await Customer.findOne({ phone })
        if (customer) return res.status(401).json({ errors: [{ msg: "phone already exists" }] });

        // password encryption
        let salt = bcrypt.genSaltSync(10);
        const securedPassword = bcrypt.hashSync(password, salt);

        req.body.password = securedPassword
        req.body.createdOn = Date.now()
        req.body.updatedOn = Date.now()

        // jwt token
        const jwtToken = jwt.sign({ email, phone, password }, jwtkey)

        Customer.create(req.body)
            .then(customer => res.status(201).send({ jwtToken }))
            .catch(err => res.status(400).send(err))

    } catch (error) {
        res.status(500).send(error)
    }
}

// Customer login controller
const customerlogin = async (req, res) => {
    try {

        const { email, password } = req.body

        // Check for email 
        let customer = await Customer.findOne({ email })
        if (!customer) return res.status(404).send({ errors: [{ msg: "email does not exists" }] })

        // Check for password
        const result = bcrypt.compareSync(password, customer.password)
        if (!result) return res.status(404).send({ errors: [{ msg: "incorrect password" }] })

        // Sending jwt token
        const jwtToken = jwt.sign({ id: customer._id, email, password }, jwtkey)
        res.send({ jwtToken })

    } catch (error) {
        res.status(500).send(error)
    }
}

// To get details of customer
const customerDetail = async (req, res) => {
    try {
        // Sending customer data without password
        const customer = await Customer.findById(req.body.id).select("-password")
        if (!customer) return res.status(404).send({ errors: [{ msg: "Customer does not exists" }] })

        return res.send(customer)

    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = { customerSignUp, customerlogin, customerDetail };
