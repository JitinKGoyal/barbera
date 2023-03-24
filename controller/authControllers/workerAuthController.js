const Worker = require("../../models/Worker")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtkey } = require("../../config");
const { getAuthToken } = require("../../utils/getAuthToken");
const { roles } = require("../../constants/constants");
const ServiceProvider = require("../../models/ServiceProvider");

// Worker signup controller
const workerSignUp = async (req, res) => {
    try {
        const { name, email, phone, password, gender, serviceProviderId, status } = req.body

        // check for duplicate email
        let worker = await Worker.findOne({ email })
        if (worker) return res.status(401).json({ errors: [{ msg: "email already registered" }] });

        // check for duplicate phone
        worker = await Worker.findOne({ phone })
        if (worker) return res.status(401).json({ errors: [{ msg: "phone already exists" }] });

        let serviceProvider = await ServiceProvider.findById(serviceProviderId)
        if (!serviceProvider) return res.status(401).json({ errors: [{ msg: "Service provider does not exist" }] });

        console.log(serviceProvider)

        // password encryption
        let salt = bcrypt.genSaltSync(10);
        const securedPassword = bcrypt.hashSync(password, salt);

        // again creting object for no entry of extra data
        Worker.create({
            name,
            email,
            phone,
            password: securedPassword,
            gender,
            status,
            serviceProvider: serviceProviderId,
            role: roles.WORKER,
            createdOn: Date.now(),
            updatedOn: Date.now()
        })
            .then(worker => res.status(201).send(getAuthToken(worker._id, worker.role)))
            .catch(err => res.status(400).send(err))

    } catch (error) {
        console.log(error)
        res.status(500).send({ error })
    }
}

// Worker login controller
const workerlogin = async (req, res) => {
    try {

        const { email, password } = req.body

        // Check for email 
        let worker = await Worker.findOne({ email })
        if (!worker) return res.status(404).send({ errors: [{ msg: "email does not exists" }] })

        // Check for password
        const result = bcrypt.compareSync(password, worker.password)
        if (!result) return res.status(404).send({ errors: [{ msg: "incorrect password" }] })

        // Sending jwt token
        res.send(getAuthToken(worker._id, worker.role))

    } catch (error) {
        console.log(error)
        res.status(500).send({ error })
    }
}

// To get details of worker
const workerDetail = async (req, res) => {
    try {
        // Sending worker data without password
        const worker = await Worker.findById(req.user.id).select("-password")
        if (!worker) return res.status(404).send({ errors: [{ msg: "Worker does not exists" }] })

        return res.send(worker)

    } catch (error) {
        console.log(error)
        res.status(500).send({ error })
    }
}

// To update a worker
const udpateWorkerDetail = async (req, res) => {
    try {
        const { name, email, phone, password, gender, serviceProviderId, status } = req.body

        // Checking worker existence
        let worker = await Worker.findById(req.user.id)
        if (!worker) return res.status(404).send({ errors: [{ msg: "Worker does not exists" }] })

        if (serviceProviderId) {
            let serviceProvider = await ServiceProvider.findById(serviceProviderId)
            if (!serviceProvider) return res.status(401).json({ errors: [{ msg: "Service provider does not exist" }] });
        }

        // password encryption
        let securedPassword = ""
        if (password) {
            let salt = bcrypt.genSaltSync(10);
            securedPassword = bcrypt.hashSync(password, salt);
        }

        const updateWorker = {
            name,
            email,
            phone,
            password: password ? securedPassword : worker.password,
            serviceProvider: serviceProviderId,
            gender,
            status,
            updatedOn: Date.now()
        }

        // Updating worker in database
        worker = await Worker.findByIdAndUpdate(req.user.id, { $set: updateWorker }, { new: true });

        // Sending jwt token
        res.send(getAuthToken(worker._id, worker.role))

    } catch (error) {
        console.log(error)
        res.status(500).send({ error })
    }
}

// To delete a worker
const deleteWorker = async (req, res) => {
    try {
        // Checking worker existance
        let worker = await Worker.findById(req.user.id)
        if (!worker) return res.status(404).send({ errors: [{ msg: "Worker does not exists" }] })

        const result = await Worker.findByIdAndDelete(worker._id)

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

module.exports = { workerSignUp, workerlogin, workerDetail, udpateWorkerDetail, deleteWorker };
