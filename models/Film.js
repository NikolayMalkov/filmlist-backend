
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'sysdba',
  host: '192.168.0.111',
  database: 'films',
  password: 'root',
  port: 5432,
});

const getFilms = (request, response) => {
    pool.query('SELECT * FROM films_completed', (error, results) => {
        if (error) {
          console.log(error)
        }
        response.status(200).json(results.rows)
        // console.log(results)
      })
  }
  const createFilm = (body) => {
    return new Promise(function(resolve, reject) {
      const { title } = body
      pool.query('INSERT INTO films_completed (title) VALUES ($1) RETURNING *', [title], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`A new film has been added: ${results.rows[0]}`)
      })
    })
  }
  const deleteFilm = () => {
    return new Promise(function(resolve, reject) {
      const id = parseInt(request.params.id)
      pool.query('DELETE FROM films_completed WHERE id = $1', [id], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`Film deleted with ID: ${id}`)
      })
    })
  }
  
  module.exports = {
    getFilms,
    createFilm,
    deleteFilm,
  }