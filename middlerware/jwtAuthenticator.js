const jwt = require('jsonwebtoken')
const { jwtkey } = require("../config");

const jwtAuthenticator = (req, res, next) => {
    try {

        const token = req.header("authToken")
        if (!token) return res.status(402).send({ errors: [{ msg: "Please, send an authentication token" }] });

        jwt.verify(token, jwtkey, function (err, decoded) {
            if (err) return res.status(402).send({ errors: [{ msg: "Invalid token" }] })

            req.user = decoded
            next()
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({ error })
    }
}

module.exports = { jwtAuthenticator }