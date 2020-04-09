const { Pool} = require('pg')
const pool = new Pool({
  user: '1e',
  host: 'localhost',
  database: '1e',
  password: '123',
  port: 5432,
})

let query = async function(sql, param=[]) {
  let rows;
  console.log(sql);
  try { 
    
    ({rows} = await pool.query(sql, param));
    //console.log(rows);
  } catch(err) {
    console.log(err.message);
  }
  return rows;
}
export {pool, query };