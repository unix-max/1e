const { Pool} = require('pg')
const pool = new Pool({
  user: '1e',
  host: 'localhost',
  database: '1e',
  password: '123',
  port: 5432,
})

export {pool};