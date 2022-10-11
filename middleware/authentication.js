const {verify} = require('../helpers/jwt')
const {User} = require('../models/user')

const autthentication = async (req, res, next) => {
    try {
        const {access_token} = req.headers
        if(!access_token){
            throw{message: 'invalid token'}
        }
        let payload = verify(access_token)
        let user = await User.findOne(payload._id)
        if(!user){
            throw{message: 'invalid token'}
        }
        req.user = {
            id: user._id
        }
        next()
    } catch (error) {
        next(error)
    }
}