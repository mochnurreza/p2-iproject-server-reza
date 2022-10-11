const User = require('../../models/user')
const {compare} = require('../../helpers/bcrypt')
const {token} = require('../../helpers/jwt')

module.exports = {
    actionSignin: async (req, res) => {
        try {
          const { username, password } = req.body;
          const user = await Users.findOne({ username: username });
          if (!user) {
            throw{message: 'invalid username'}
          }
          const isPasswordMatch = compare(password, user.password);
          if (!isPasswordMatch) {
           throw{message: 'invalid password'}
          }

          let token = {
            username: user.username
          }

          let access_token = token(token)
          res.status(200).json({
            username: user.username
          })
        }catch (error) {
            res.status(400).json(error)
        }
    },

    actionRegister: async(req, res) => {
        try {
            const {username, password} = req.body
            const newUser = await User.create({
                username,
                password
            })
            res.status(201).json({id: newUser.id, username:newUser.username})
        } catch (error) {
            res.status(400).json(error)
        }
    }
}