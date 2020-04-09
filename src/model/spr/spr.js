import {query} from '../_db.js';
//import meta from '../meta.js';
//import test from '../init.js';

let sql =(() => {
  let ret={};
  ret.getFolders = `SELECT
  "partners"."id", "partners"."folder", path, 
  COALESCE(array_length(path, 1), 0) AS deep, 
  "partners"."name" AS "name"
  FROM "partners"  WHERE "partners"."folder" = true
  ORDER BY deep, name;`
  ret.getElms = `SELECT
  "partners"."id", "partners"."folder", path, cardinality(path)+1 AS deep,
  "partners"."name" AS "name" ,"partners"."docName" ,"partners"."phone" ,"partners"."inn" 
  ,"partners"."kpp" ,"partners"."ogrn" ,"partners"."email" ,"partners"."www" ,"partners"."address"
  ,"partners"."urAddress"   ,"partners"."status" ,"partners"."added",
  ARRAY[to_char("pStaff"."id",'999'), "pStaff"."name", 'dsdsd'] AS "mainContact",
  ("pAccounts"."id", "pAccounts"."name", 10) AS "mainAccount"
  FROM "partners"
  LEFT JOIN "pStaff" ON "partners"."mainContact" = "pStaff"."id"
  LEFT JOIN "pAccounts" ON "partners"."mainContact" = "pAccounts"."id"
  
  ORDER BY deep, folder, name;`
  ret.getElm = `SELECT
  "partners"."id", "partners"."folder", path, cardinality(path)+1 AS deep,
  "partners"."name" AS "name" ,"partners"."docName" ,"partners"."phone" ,"partners"."inn" 
  ,"partners"."kpp" ,"partners"."ogrn" ,"partners"."email" ,"partners"."www" ,"partners"."address"
  ,"partners"."urAddress"   ,"partners"."status" ,"partners"."added",
  ARRAY[to_char("pStaff"."id",'999'), "pStaff"."name", 'dsdsd'] AS "mainContact",
  ("pAccounts"."id", "pAccounts"."name", 10) AS "mainAccount"
  FROM "partners"
  LEFT JOIN "pStaff" ON "partners"."mainContact" = "pStaff"."id"
  LEFT JOIN "pAccounts" ON "partners"."mainContact" = "pAccounts"."id"
  WHERE "partners"."id" = $1
  ORDER BY deep, folder, name;`;
  ret.getFolder = `SELECT
  "partners"."id", "partners"."folder", path, cardinality(path)+1 AS deep,
  "partners"."name" AS "name" ,"partners"."docName" ,"partners"."phone" ,"partners"."inn" 
  ,"partners"."kpp" ,"partners"."ogrn" ,"partners"."email" ,"partners"."www" ,"partners"."address"
  ,"partners"."urAddress"   ,"partners"."status" ,"partners"."added",
  ("pStaff"."id", "pStaff"."name") AS "mainContact",
  ("pAccounts"."id", "pAccounts"."name") AS "mainAccount"
  FROM "partners"
  LEFT JOIN "pStaff" ON "partners"."mainContact" = "pStaff"."id"
  LEFT JOIN "pAccounts" ON "partners"."mainContact" = "pAccounts"."id"
  
  WHERE path[array_upper(path, 1)] = $1
  ORDER BY deep, name;`;
  return ret;
})();
export class Spr {
  
  constructor(vid) {
    //console.log(sql);

  }
  async getFolders() {
    //console.log(sql.getFolders)
      let rows = await query(sql.getFolders);
    return rows;
  }
  async getElms() {
    let rows = await query(sql.getElms);
    return rows;
  }
  async getElm(id) {
    let rows = await query(sql.getElm, [id]);
    return rows;
  }
  async getFolder(id) {
    //console.log(sql.getFolders)
      let rows = await query(sql.getFolder, [id]);
    return rows;
  }
}