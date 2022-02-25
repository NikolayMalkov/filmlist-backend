const express = require('express');
const config = require('config');
const Film = require('./models/Film')
// const routes = require('./routes/routes');
// const cors = require('cors');

const app = express()

const PORT = config.get('port') || 5000

// Корс обоссаный
// рот пер
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
  });
// Хрень чтобы распарсить в жсон
app.use(express.json())

// обработчики
  app.get('/films', Film.getFilms)
  app.get('/films/:id', Film.getFilmById)
  app.post('/films', Film.createFilm)
  app.delete('/films/:id', Film.deleteFilm)
  app.put('/films/:id', Film.updateFilm)

app.listen(PORT, () => console.log(`server has been started on ${PORT}`))