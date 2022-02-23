const express = require('express');
const config = require('config');
const Film = require('./models/Film')
// const routes = require('./routes/routes');
// const cors = require('cors');

const app = express()


const PORT = config.get('port') || 5000


// Корс обоссаный
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
  });
// Хрень чтобы распарсить в жсон
app.use(express.json())

// Получить список фильмов
app.get('/', (req, res) => {
    Film.getFilms()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  })
  
  app.post('/films', (req, res) => {
    Film.createFilm(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  })
  
  app.delete('/films/:id', (req, res) => {
    Film.deleteFilm(req.params.id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  })



app.listen(PORT, () => console.log(`server has been started on ${PORT}`))