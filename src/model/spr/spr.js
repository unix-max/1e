import {pool} from '../_db.js';

export class Spr {
  constructor(vid) {
    this.elms = [];
    
  }
  getElms() {
    try { 
      let {rows} = await pool.query('SELECT $1', [id]);
      appeal = rows;
      console.log(appeal);
    } catch(err) {
      console.log(err.message);
    }
  }
  re
}
export async function get(req, res, next) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
  const { id } = req.params;
  console.log(req.params);
  let appeal;
  try { 
    let {rows} = await pool.query('SELECT $1', [id]);
    appeal = rows;
    console.log(appeal);
  } catch(err) {
    console.log(err.message);
  }
  
	if (appeal ) {
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