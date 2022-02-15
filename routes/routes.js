const express = require('express')
const router = express.Router();
const Film = require('../models/Film')


// Post films
router.post('/films', function(req, res) {
    const {title} = req.body
    const film = new Film({title})
    film.save()
    res.status(201).json({message: 'film add success'})
})

// Обновление записи
router.put(`/films/:id`, function(req, res) {
    const {title} = req.body
    const id = req.params.id
    Film.findByIdAndUpdate(id, {$set: { title: title }}, { new: true }, function(err, update){
        res.status(200).json({message: 'update OK'})
    })
})

// get first page
router.get('/', function(req, res) {
    res.send('start page');
})

//get all films
router.get('/films', function(req, res) {
    Film.find((err, item) => {
        if (err) {
            res.send({message: 'error'})
        }
        else {
            res.send(item)
        }
    })
});
//gte one film by id
router.get(`/films/:id`, function(req, res) {
    const id = req.params.id
    Film.findById(id, function(err, item) {
        res.send(item)
    })
})
router.delete(`/films/:id`, function(req, res){
    const id = req.params.id
    Film.findByIdAndDelete(id, function(err, item){
        return res.status(200).json({message: 'deleted'})
    })
})

module.exports = router;