import {pool} from '../_db.js';

export async function get(req, res, next) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
  const { id } = req.params;
  console.log(req.params);
  let appeal;
  try { 
    let result = await pool.execute(`SELECT ?`, [id]);
    appeal = result[0][0];
  } catch(err) {
    console.log(err.message);
  }
  
	if (appeal && appeal.id) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify(appeal));
	} else {
    //console.log(album);
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});
   
		res.end(JSON.stringify({
      message: `Not found`,
      error: 404
		}));
	} 
}