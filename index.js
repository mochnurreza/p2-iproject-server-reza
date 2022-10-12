if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express')
const port = 3000
const mongoose = require('mongoose')
const config = require('./config')
const cors = require('cors')
const router = require('./routes/admin_routes/admin_router')
const app = express()


// const options ={
    //     useFindAndModify: false,
    //     useNewUrlParser: true
    // }
    mongoose.connect(config.mongoURI)
    .then(() => {
        console.log("mongoDB connect!!")
        app.use(cors())
        app.use(express.json())
        app.use(express.urlencoded({extended: true}))
        app.use('/admin', router)

        app.listen(port, () => {
            console.log(`app listening on port ${port}`)
        })
}).catch(err => {
    throw{message: 'cannot connect with mongoDB'}
})

