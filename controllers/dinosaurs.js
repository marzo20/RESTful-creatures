
const express = require('express')
const router = express.Router()
const fs =require('fs')

// INDEX ROUTE
router. get('/', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    let nameFilter = req.query.nameFilter
    if(nameFilter) {
        dinoData = dinoData.filter((dino)=>{
            return dino.name.toLowerCase()===nameFilter.toLowerCase()
        })
    
    }
    res.render('dinosaurs/index.ejs',{myDinos: dinoData})
})
// NEW DINO FROM ROUTE
router.get('/new', (req, res) => {
    res.render('dinosaurs/new.ejs')
})

// SHOW ROUTE (a specific dinosaur)
router.get('/:id', (req, res) => {
    // get the array of dinos from the json
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // identify the index of the dino in question
    let dinoIndex = req.params.id
    console.log(`the dino you are searching for is ${dinoIndex}`)
    // isolate the dino in question
    console.log(dinoData[dinoIndex])
    res.render('dinosaurs/shows.ejs', {myDino: dinoData[dinoIndex]})
})

// POST A NEW DINO ROUTE
router.post('/', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // add the new dino to the array
    dinoData.push(req.body)
    console.log(req.body)
    // save the dinosaurs to the json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    // redirect to the index route
    res.redirect('/dinosaurs')
    
    
})

// GET /dinosaursedit/:id -- a view of a form to edit a specific dino @ :id
router.get('/edit/:id', (req, res) => {
    // get the dino data and render the edit form
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)

    // render edit form
    res.render('dinosaurs/edit.ejs', {
        dinoId: req.params.id,
        dino: dinoData[req.params.id]
    })
})
// put /dinosaurs/:id -- update a dino@ :id in the database
router.put('/:id', (req, res) => {
    // we will get the dino data from the dino json
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData =JSON.parse(dinosaurs)
    console.log(req.params.id, req.body)
    // update the dino based on the req.params.id and the req.body
    // req.params =which dino
    // req.body = dino data to updated
    dinoData[req.params.id].name = req.body.name
    dinoData[req.params.id].type = req.body.type

    // write the json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    // redirect to some place that has interesting data for interesting data
    res.redirect('/dinosaurs')
    // res.redirect(`/dinosaurs/${req.params.id}`)
    // res.send(`update a dino @ ${req.params.id}`)
})
// DELETE /dinosaurs/:id -- DESTROY a dino @ :id
router.delete('/:id', (req, res) => {
    // get the dinos from the dino json
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)

    // splice dino out of the array (index from the req.params)
    // Array.splice(starting index to remove, howmany elements to remove)
    dinoData.splice(req.params.id, 1)

    // save the dino json
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    // redirect to see all dinos
    res.redirect('/dinosaurs')
    // res.send (`DESTROY a poor dino @ ${req.params.id}`)
})

module.exports = router