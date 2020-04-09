//import {pool} from '../../../../model/_db.js'
import {Spr} from '../../../model/spr/spr.js'

export async function get(req, res, next) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
  const {vid} = req.params;
  const {id, folder} =req.query;
  console.log(req.query);
  let spr = new Spr(vid);
  let rows;
  if (id=='all') {
    rows = await spr.getElms();
  } else if (id=='folders') {
    rows = await spr.getFolders();
  } else if(parseInt(id)) {
    rows = await spr.getElm(id);
  } else if(parseInt(folder)) {
    rows = await spr.getFolder(folder);
  }
  //console.log(rows);
	if (rows ) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});
		res.end(JSON.stringify(rows));
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