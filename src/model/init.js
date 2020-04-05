let mass= [
  `CREATE TABLE IF NOT EXISTS meta (
    id integer PRIMARY KEY,
    objName  varchar(40) NOT NULL,
    tableName varchar(40) NOT NULL
    );`,
  `CREATE TABLE IF NOT EXISTS partners (
    id integer PRIMARY KEY,
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
  `CREATE TABLE IF NOT EXISTS cities (
    id integer PRIMARY KEY,
    name varchar(100)
  );`,
  `CREATE TABLE IF NOT EXISTS "pStaff" (
    id integer PRIMARY KEY,
    "partnerId" integer REFERENCES partners ON UPDATE CASCADE ON DELETE CASCADE, 
    nic  varchar(100) NOT NULL,
    "firstName"  varchar(100) NOT NULL,
    "lastName"  varchar(100) NOT NULL,
    "middleName"  varchar(100) NOT NULL,
    post integer NOT NULL,
    spec varchar(30),
    "mainPhone" integer,
    added TIMESTAMP WITH TIME ZONE
  );`,
  `CREATE TYPE "staffPropType" AS ENUM ('phone', 'addr', 'email');`,
  `CREATE TYPE "staffPropClass" AS ENUM ('mobile', 'home', 'work');`,
  `CREATE TABLE IF NOT EXISTS "pStaffProps" (
    id integer PRIMARY KEY,
    "pStaffId" integer REFERENCES "pStaff" ON UPDATE CASCADE ON DELETE CASCADE, 
    type "staffPropType",
    class "staffPropClass",
    note varchar(100)
  );`,
  `CREATE TABLE IF NOT EXISTS "pStaffNotes" (
    id integer PRIMARY KEY,
    "pStaffId" integer REFERENCES "pStaff" ON UPDATE CASCADE ON DELETE CASCADE, 
    note varchar(2048),
    added TIMESTAMP WITH TIME ZONE
  );`,
  `CREATE TYPE "callType" AS ENUM ('in', 'out');`,
  `CREATE TABLE IF NOT EXISTS "pCall" (
    id integer PRIMARY KEY,
    "partnerId" integer REFERENCES partners ON UPDATE CASCADE ON DELETE CASCADE, 
    staff integer NOT NULL,
    phone varchar(15),
    type "callType",
    zap varchar(100),
    note varchar(512),
    added TIMESTAMP WITH TIME ZONE
  );`,
  `CREATE TABLE IF NOT EXISTS cities (
    id integer PRIMARY KEY,
    name varchar(100)
  );`,
  `CREATE TABLE IF NOT EXISTS banks (
    id integer PRIMARY KEY,
    name varchar(150),
    "cAccount" varchar(20),
    bik varchar(9),
    city integer NOT NULL
  );`,
  `CREATE TABLE IF NOT EXISTS "pAccounts" (
    id integer PRIMARY KEY,
    "partnerId" integer REFERENCES partners ON UPDATE CASCADE ON DELETE CASCADE, 
    name varchar(50),
    number varchar(20),
    bank integer NOT NULL,
    added TIMESTAMP WITH TIME ZONE
  );`,
  `CREATE TABLE IF NOT EXISTS "pStatus" (
    id integer PRIMARY KEY,
    name varchar(50),
    number integer
  );`
]
import {pool} from './_db.js';

try { 
  let {rows} = await pool.query(mass[0]);
  appeal = rows;
  console.log(appeal);
} catch(err) {
  console.log(err.message);
}