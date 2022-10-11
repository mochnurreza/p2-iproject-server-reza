const User = require('../../models/user')
const {compare} = require('../../helpers/bcrypt')
const {createToken} = require('../../helpers/jwt')

module.exports = {
    actionSignin: async (req, res) => {
        try {
          const { email, password } = req.body;
          const user = await User.findOne({ email: email });
          if (!user) {
            throw{message: 'invalid email'}
          }
          const isPasswordMatch = compare(password, user.password);
          console.log(password, user.password)
          if (!isPasswordMatch) {
           throw{message: 'invalid password'}
          }

          let token = {
            email: user.email
          }

          let access_token = createToken(token)
          res.status(200).json({
            email: user.email
          })
        }catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    },

    actionRegister: async(req, res) => {
        try {
            const {username, email, password} = req.body
            const newUser = await User.create({
                username,
                email,
                password
            })
            res.status(201).json({id: newUser.id, username:newUser.username})
        } catch (error) {
            res.status(400).json(error)
        }
    }
}