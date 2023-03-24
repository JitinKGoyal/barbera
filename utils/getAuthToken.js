const { jwtkey } = require("../config")
const jwt = require('jsonwebtoken');

const getAuthToken = (id, role) => {

    console.log(id, role)
    if (id && role) {
        return { authToken: jwt.sign({ id, role }, jwtkey) }
    } else {
        console.error("id and role is mendetory for creating authToken")
        throw Error("id and role is mendetory for creating authToken")
    }
}

module.exports = { getAuthToken }