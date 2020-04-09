import {pool} from './_db.js';
let init= [
  `CREATE TABLE IF NOT EXISTS meta (
    id serial PRIMARY KEY,
    objName  varchar(40) NOT NULL,
    tableName varchar(40) NOT NULL
    );`,
  `CREATE TABLE IF NOT EXISTS partners (
    id serial PRIMARY KEY,
    folder boolean DEFAULT FALSE,
    path integer[] NOT NULL,
    name  varchar(100) NOT NULL,
    "docName" varchar(250),
    phone varchar(12),
    inn varchar(12),
    kpp varchar(9),
    ogrn varchar(15),
    email varchar(70),
    www varchar(100),
    address varchar(200),
    "urAddress" varchar(200),
    "mainContact" integer,
    "mainAccount" integer,
    status integer,
    added TIMESTAMP WITH TIME ZONE
  );`,
  `CREATE INDEX "partnersPath" ON partners (path);`,
  `CREATE INDEX "partnersLevel" ON partners (array_length(path, 1));`,

  `CREATE TABLE IF NOT EXISTS "pStaff" (
    id serial PRIMARY KEY,
    owner integer REFERENCES partners ON UPDATE CASCADE ON DELETE CASCADE, 
    name  varchar(100),
    "firstName"  varchar(100),
    "lastName"  varchar(100),
    "middleName"  varchar(100),
    post integer NOT NULL,
    spec varchar(30),
    "mainPhone" integer,
    added TIMESTAMP WITH TIME ZONE
  );`,
  `CREATE TYPE "staffPropType" AS ENUM ('phone', 'addr', 'email');`,
  `CREATE TYPE "staffPropClass" AS ENUM ('mobile', 'home', 'work');`,
  `CREATE TABLE IF NOT EXISTS "pStaffProps" (
    id serial PRIMARY KEY,
    owner integer REFERENCES "pStaff" ON UPDATE CASCADE ON DELETE CASCADE, 
    type "staffPropType",
    class "staffPropClass",
    note varchar(100)
  );`,
  `CREATE TABLE IF NOT EXISTS "pStaffNotes" (
    id serial PRIMARY KEY,
    owner integer REFERENCES "pStaff" ON UPDATE CASCADE ON DELETE CASCADE, 
    note varchar(2048),
    added TIMESTAMP WITH TIME ZONE
  );`,
  `CREATE TYPE "callType" AS ENUM ('in', 'out');`,
  `CREATE TABLE IF NOT EXISTS "pCall" (
    id serial PRIMARY KEY,
    owner integer REFERENCES partners ON UPDATE CASCADE ON DELETE CASCADE, 
    staff integer NOT NULL,
    phone varchar(15),
    type "callType",
    zap varchar(100),
    note varchar(512),
    added TIMESTAMP WITH TIME ZONE
  );`,
  `CREATE TABLE IF NOT EXISTS cities (
    id serial PRIMARY KEY,
    name varchar(100)
  );`,
  `CREATE TABLE IF NOT EXISTS banks (
    id serial PRIMARY KEY,
    name varchar(150),
    "cAccount" varchar(20),
    bik varchar(9),
    city integer NOT NULL
  );`,
  `CREATE TABLE IF NOT EXISTS "pAccounts" (
    id serial PRIMARY KEY,
    owner integer REFERENCES partners ON UPDATE CASCADE ON DELETE CASCADE, 
    name varchar(50),
    number varchar(20),
    bank integer NOT NULL,
    added TIMESTAMP WITH TIME ZONE
  );`,
  `CREATE TABLE IF NOT EXISTS "pStatus" (
    id serial PRIMARY KEY,
    name varchar(50),
    number integer
  );`
];

async function* generateSequence(arr) {
  for (let i = 0; i < arr.length; i++) {
    let resp = await pool.query(arr[i]);
    yield resp;
  }
}
(async () => {
  
  try {
    let generator = generateSequence(init);
    for await (let resp of generator) {
      console.log(resp);
    }
  } catch(err) {
    console.log(err.message);
  }
})();
export default {};