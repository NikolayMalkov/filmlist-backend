
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'sysdba',
  host: 'postgresdb',
  database: 'films',
  password: 'root',
  port: 5432,
});

const getFilms = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM films', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }
  const createFilm = (body) => {
    return new Promise(function(resolve, reject) {
      const { title } = body
      pool.query('INSERT INTO films (title) VALUES ($1) RETURNING *', [title], (error, results) => {
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
      pool.query('DELETE FROM films WHERE id = $1', [id], (error, results) => {
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