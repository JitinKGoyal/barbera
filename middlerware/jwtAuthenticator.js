const jwt = require('jsonwebtoken')
const { jwtkey } = require("../config");

const jwtAuthenticator = (req, res, next) => {

    const token = req.header("authToken")
    if (!token) return res.status(402).send({ errors: [{ msg: "Please, send an authentication token" }] });

    jwt.verify(token, jwtkey, function (err, decoded) {
        if (err) return res.status(402).send({ errors: [{ msg: "Invalid token" }] })
        req.body.id = decoded.id
        next()
    });
}

module.exports = { jwtAuthenticator }