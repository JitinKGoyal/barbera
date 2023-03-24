const roleVerifier = (...allowedRoles) => {
    return (req, res, next) => {
        try {

            console.log(allowedRoles)
            if (!allowedRoles.includes(req.user.role)) {
                return res.status(422).json({ errors: { msg: "unauthorised request" } })
            }
            next()

        } catch (error) {
            console.log(error)
            res.status(500).send({ error })
        }
    }
}

module.exports = { roleVerifier }