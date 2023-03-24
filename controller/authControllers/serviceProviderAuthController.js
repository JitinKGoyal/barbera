const ServiceProvider = require("../../models/ServiceProvider")
const bcrypt = require('bcrypt');
const { getAuthToken } = require("../../utils/getAuthToken");
const { roles } = require("../../constants/constants");

// Service provider signup controller
const serviceProviderSignUp = async (req, res) => {
    try {
        const { companyName, email, phone, password, address } = req.body

        // check for duplicate email
        let serviceProvider = await ServiceProvider.findOne({ email })
        if (serviceProvider) return res.status(401).json({ errors: [{ msg: "email already registered" }] });

        // check for duplicate phone
        serviceProvider = await ServiceProvider.findOne({ phone })
        if (serviceProvider) return res.status(401).json({ errors: [{ msg: "phone already exists" }] });

        // password encryption
        let salt = bcrypt.genSaltSync(10);
        const securedPassword = bcrypt.hashSync(password, salt);

        // again creting object for no entry of extra data
        ServiceProvider.create({
            companyName,
            email,
            phone,
            password: securedPassword,
            address,
            role: roles.SERVICEPROVIDER,
            createdOn: Date.now(),
            updatedOn: Date.now()
        })
            .then(serviceProvider => res.status(201).send(getAuthToken(serviceProvider._id, serviceProvider.role)))
            .catch(err => res.status(400).send(err))

    } catch (error) {
        console.log(error)
        res.status(500).send({ error })
    }
}

// Service provider login controller
const serviceProviderlogin = async (req, res) => {
    try {

        const { email, password } = req.body

        // Check for email 
        let serviceProvider = await ServiceProvider.findOne({ email })
        if (!serviceProvider) return res.status(404).send({ errors: [{ msg: "email does not exists" }] })

        // Check for password
        const result = bcrypt.compareSync(password, serviceProvider.password)
        if (!result) return res.status(404).send({ errors: [{ msg: "incorrect password" }] })

        // Sending jwt token
        res.send(getAuthToken(serviceProvider._id, serviceProvider.role))

    } catch (error) {
        console.log(error)
        res.status(500).send({ error })
    }
}

// To get details of serviceProvider
const serviceProviderDetail = async (req, res) => {
    try {
        // Sending serviceProvider data without password
        const serviceProvider = await ServiceProvider.findById(req.user.id).select("-password")
        if (!serviceProvider) return res.status(404).send({ errors: [{ msg: "Service provider does not exists" }] })

        return res.send(serviceProvider)

    } catch (error) {
        console.log(error)
        res.status(500).send({ error })
    }
}

// To update a serviceProvider
const udpateServiceProviderDetail = async (req, res) => {
    try {
        const { companyName, email, phone, password, address } = req.body

        // Checking serviceProvider existence
        let serviceProvider = await ServiceProvider.findById(req.user.id)
        if (!serviceProvider) return res.status(404).send({ errors: [{ msg: "Service provider does not exists" }] })

        // password encryption
        let securedPassword = ""
        if (password) {
            let salt = bcrypt.genSaltSync(10);
            securedPassword = bcrypt.hashSync(password, salt);
        }

        const updateServiceProvider = {
            companyName,
            email,
            phone,
            password: password ? securedPassword : serviceProvider.password,
            address,
            role: roles.SERVICEPROVIDER,
            updatedOn: Date.now()
        }

        // Updating serviceProvider in database
        serviceProvider = await ServiceProvider.findByIdAndUpdate(req.user.id, { $set: updateServiceProvider }, { new: true });

        // Sending jwt token
        res.send(getAuthToken(serviceProvider._id, serviceProvider.role))

    } catch (error) {
        console.log(error)
        res.status(500).send({ error })
    }
}

// To delete a serviceProvider
const deleteServiceProvider = async (req, res) => {
    try {
        // Checking serviceProvider existance
        let serviceProvider = await ServiceProvider.findById(req.user.id)
        if (!serviceProvider) return res.status(404).send({ errors: [{ msg: "Service provider does not exists" }] })

        const result = await ServiceProvider.findByIdAndDelete(serviceProvider._id)

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

module.exports = { serviceProviderSignUp, serviceProviderlogin, serviceProviderDetail, udpateServiceProviderDetail, deleteServiceProvider };
