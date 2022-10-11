const bcrypt = require('bcryptjs')

const hash = password => {
    return bcrypt.hashSync(password, 10)
}

const compare = (pass, hashPass) => {
    return bcrypt.compareSync(password, hashPass)
}

module.exports = {
    hash,
    compare
}