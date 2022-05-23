// import express and express-jes-layouts
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')
const methodOverride = require('method-override')
// creating and instance of an express ap
const app = express()

// Middleware
// tell express that I'm using ejs as the view engin

app.set('view engine', 'ejs')
// tell my app that I'm using ejs layouts
app.use(ejsLayouts)
// body parser middleware
app.use(express.urlencoded({extended: false}))
// allow non GET/POST methods from an HTML 5 form
app.use(methodOverride('_method'))

// controllers
app.use('/dinosaurs', require('./controllers/dinosaurs'))
app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures'))

// HOME route
app.get('/', (req, res) => {
    res.render('home.ejs')
})



// 
app.listen(8000, () => {
    console.log('its my port 8000')
})