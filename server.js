const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
//session and MongoStore are here to help us have users that stay logged in by leaving a cookie that matches the session stored in our database
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
//flash handles the messages that pop up for validation 'ex: password must be 8 characters long'
const flash = require('express-flash')
//morgan is a logger and helps us log all of the stuff that is happening
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const todoRoutes = require('./routes/todos')

//tells express to use environment variables
require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev')) //setting up morgan to run and log everything

// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
  
app.use('/', mainRoutes)
app.use('/todos', todoRoutes)
 
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    