//import {pool, query} from '../_db.js';
//import meta from '../meta.js';
//import test from '../init.js';

function getObjFromPath(path) {
  let obj=meta;
  for(let key of path.split('.')) {
  
    if(obj[key]) obj = obj[key];
    //console.log(obj);
  }
  return obj;
} 
function makeFields(spr) {
  let fields ='';
  let tables = '';
  for (let i = 0; i < spr.fields.length; i++) {
    if (spr.fields[i].type.obj) {
      let table = getObjFromPath(spr.fields[i].type.obj).table;
      tables +=`, "${table}"`;
      fields += `, "${table}"."name" AS "${spr.fields[i].name}"`; 
    } else {
      fields += `, "${spr.table}"."${spr.fields[i].name}"`; 
    }
  } 
  return {fields, tables};
}
let sql =(() => {
  let spr = meta.spr.partners;
  let ret = {};
  let fields ='';
  let tables = '';
  if (true) {
   // ({fields, tables} = makeFields(spr));
  } 


  let hierarhy = '';
  let order = '';
  if (spr.hierarhy) {
    hierarhy += `"${spr.table}"."folder", path, COALESCE(array_length(path, 1), 0) AS deep`
    order += 'deep';
  }})()