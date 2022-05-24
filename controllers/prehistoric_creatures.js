const express = require('express')
const req = require('express/lib/request')
const { append } = require('express/lib/response')
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

// Get /prehisoric_creatures/:id -- a view of a fomr to edit a specific creature @ :id
router.get('/edit/:id', (req, res) => {
    let prehistoric = fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricData = JSON.parse(prehistoric)
    res.render('prehistoric_creatures/edit.ejs',{
        prehistoricId: req.params.id,
        creature: prehistoricData[req.params.id]
    })
    
})
// put /preshitoric_creatures/:id -- update a creatures @ :id in the database
router.put('/:id', (req, res) => {
    let prehistoric = fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricData = JSON.parse(prehistoric)
    prehistoricData[req.params.id].type = req.body.type
    prehistoricData[req.params.id].img_url = req.body.img_url
    console.log(req.params.id, req.body)

    // wrtie the json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(prehistoricData))
    // res.redirect
    res.redirect('/prehistoric_creatures')
})
// DELETE /prehistoric/:id -- DESTROY a creature
router.delete('/:id', (req, res) =>{
    let prehistoric = fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricData = JSON.parse(prehistoric)

    // splice creature out of the array
    prehistoricData.splice(req.params.id, 1)
    // save the json
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(prehistoricData))

    // redirect to page
    res.redirect('/prehistoric_creatures')
})
module.exports = router