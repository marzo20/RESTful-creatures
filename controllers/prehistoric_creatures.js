const express = require('express')
const router = express.Router()
const fs =require('fs')

// INDEX ROUTE
router.get('/', (req, res)=>{
    let prehistoric = fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricData = JSON.parse(prehistoric)

    let typeFilter = req.query.typeFilter
    if(typeFilter) {
        prehistoricData = prehistoricData.filter((prehistoric)=>{
            return prehistoric.type.toLowerCase()===typeFilter.toLowerCase()
        })
    
    }
    
    res.render('prehistoric_creatures/index.ejs', {myPrehistoric: prehistoricData})
})
//  NEW ROUTE
router.get('/new', (req, res) => {
    res.render('prehistoric_creatures/new.ejs')
})

// SHOW ROUTE
router.get('/:id', (req, res) => {
    let prehistoric = fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricData = JSON.parse(prehistoric)
    let prehistoricIndex = req.params.id
    res.render('prehistoric_creatures/shows.ejs', {prehistoric: prehistoricData[prehistoricIndex]})
})
// post new route
router.post('/', (req, res) => {
    let prehistoric = fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricData = JSON.parse(prehistoric)
    // add the new type to the array
    prehistoricData.push(req.body)
    // save
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(prehistoricData))
    
    // redirect toe the index route
    res.redirect('/prehistoric_creatures')
})  

module.exports = router