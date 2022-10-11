const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

const token = payload => {
    return jwt.sign(payload, secret)
}

const verify = token => {
    return jwt.verify(token, secret)
}

module.exports = {
    token, 
    verify
}