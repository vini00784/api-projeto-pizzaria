const jwt = require('jsonwebtoken')
const { MESSAGE_SUCCESS } = require('../module/config.js')

const createJwt = async (user) => {
    const token = jwt.sign({
        id: user.id,
        login: user.email,
    }, process.env.SECRET, {
        expiresIn: '7d'
    })

    return { status: 200, response: { message: MESSAGE_SUCCESS.JWT_CREATED, token } };
}

const validateJwt = async (token) => {
    let jwtStatus
    jwt.verify(token, process.env.SECRET, async (error, decode) => {
        if(error) {
            jwtStatus = false
        } else {
            jwtStatus = true
        }
    })
    return jwtStatus
}

module.exports = {
    createJwt,
    validateJwt
}