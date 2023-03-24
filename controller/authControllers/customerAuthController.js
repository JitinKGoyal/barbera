const Customer = require("../../models/Customer")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtkey } = require("../../config");
const { getAuthToken } = require("../../utils/getAuthToken");
const { roles } = require("../../constants/constants");

// Customer signup controller
const customerSignUp = async (req, res) => {
    try {
        const { name, email, phone, password, gender, preferedPaymentMethod, status } = req.body

        // check for duplicate email
        let customer = await Customer.findOne({ email })
        if (customer) return res.status(401).json({ errors: [{ msg: "email already registered" }] });

        // check for duplicate phone
        customer = await Customer.findOne({ phone })
        if (customer) return res.status(401).json({ errors: [{ msg: "phone already exists" }] });

        // password encryption
        let salt = bcrypt.genSaltSync(10);
        const securedPassword = bcrypt.hashSync(password, salt);

        // again creting object for no entry of extra data
        Customer.create({
            name,
            email,
            phone,
            password: securedPassword,
            gender,
            preferedPaymentMethod,
            status,
            role: roles.CUSTOMER,
            createdOn: Date.now(),
            updatedOn: Date.now()
        })
            .then(customer => res.status(201).send(getAuthToken(customer._id, customer.role)))
            .catch(err => res.status(400).send(err))

    } catch (error) {
        console.log(error)
        res.status(500).send({ error })
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
        res.send(getAuthToken(customer._id, customer.role))

    } catch (error) {
        console.log(error)
        res.status(500).send({ error })
    }
}

// To get details of customer
const customerDetail = async (req, res) => {
    try {
        // Sending customer data without password
        const customer = await Customer.findById(req.user.id).select("-password")
        if (!customer) return res.status(404).send({ errors: [{ msg: "Customer does not exists" }] })

        return res.send(customer)

    } catch (error) {
        console.log(error)
        res.status(500).send({ error })
    }
}

// To update a customer
const udpateCustomerDetail = async (req, res) => {
    try {
        const { name, email, phone, password, gender, preferedPaymentMethod, status } = req.body

        // Checking customer existence
        let customer = await Customer.findById(req.user.id)
        if (!customer) return res.status(404).send({ errors: [{ msg: "Customer does not exists" }] })

        // password encryption
        let securedPassword = ""
        if (password) {
            let salt = bcrypt.genSaltSync(10);
            securedPassword = bcrypt.hashSync(password, salt);
        }

        const updateCustomer = {
            name,
            email,
            phone,
            password: password ? securedPassword : customer.password,
            gender,
            preferedPaymentMethod,
            status,
            updatedOn: Date.now()
        }

        // Updating customer in database
        customer = await Customer.findByIdAndUpdate(req.user.id, { $set: updateCustomer }, { new: true });

        // Sending jwt token
        res.send(getAuthToken(customer._id, customer.role))

    } catch (error) {
        console.log(error)
        res.status(500).send({ error })
    }
}

// To delete a customer
const deleteCustomer = async (req, res) => {
    try {
        // Checking customer existance
        let customer = await Customer.findById(req.user.id)
        if (!customer) return res.status(404).send({ errors: [{ msg: "Customer does not exists" }] })

        const result = await Customer.findByIdAndDelete(customer._id)

        if (result._id) {
            res.send(true)
        } else {
            res.send(false)
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({ error })
    }
}

module.exports = { customerSignUp, customerlogin, customerDetail, udpateCustomerDetail, deleteCustomer };
