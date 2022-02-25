
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'sysdba',
  host: '192.168.43.111',
  database: 'films',
  password: 'root',
  port: 5432,
});

  const getFilms = (request, response) => {
    pool.query('SELECT * FROM films_completed ORDER BY id ASC', (error, results) => {
        if (error) {
          console.log(error)
        }
        response.status(200).json(results.rows)
        // console.log(results)
      })
  }
  const getFilmById = (request, response) => {
    const id = request.params.id;
    pool.query('SELECT * FROM films_completed WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    } )
  }
  const createFilm = (request, response) => {
    const { title } = request.body
    pool.query('INSERT INTO films_completed (title) VALUES ($1)', [title], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Film added`)
    })
  }
  const deleteFilm = (request, response) => {
      const id = request.params.id
      pool.query('DELETE FROM films_completed WHERE id = $1', [id], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Film deleted with ID: ${id}`)
      })
  }
  const updateFilm = (request, response) => {
    const id = request.params.id
    const { title } = request.body
    pool.query(
      'UPDATE films_completed SET title = $1 WHERE id = $2',
      [title, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Film modified with ID: ${id}`)
      }
    )
  }

  module.exports = {
    getFilms,
    getFilmById,
    createFilm,
    deleteFilm,
    updateFilm
  }