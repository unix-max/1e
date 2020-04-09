export default {
  spr: {
    partners: {
      name: "Контрагенты",
      table: "partners",
      hierarhy: true,
      view: ["name"],
      fields: [
        {name:"docName", type: "varchar(250)"},
        {name: "phone", type: "varchar(12)"},
        {name: "inn", type: "varchar(12)"},
        {name: "kpp", type: "varchar(9)"},
        {name: "ogrn", type: "varchar(15)"},
        {name: "email", type: "varchar(70)"},
        {name: "www", type: "varchar(100)"},
        {name: "address", type: "varchar(200)"},
        {name: "urAddress", type: "varchar(200)"},
        {name: "mainContact", type: {obj: "spr.pStaff"}},
        {name: "mainAccount", type: {obj: "spr.pAccounts"}},
        {name: "status", type: "integer"},
        {name: "added", type: "TIMESTAMP WITH TIME ZONE"}
      ],
      own: ['spr.pStaff', 'pCall', 'pAccounts']
    },
    pStaff:{
      name: "Персонал",
      table: "pStaff",
      hierarhy: false,
      owner: "partners",
      view: ["name"],
      fields: [
        {name: "nic", type: "varchar(100) NOT NULL"},
        {name: "firstName", type: "varchar(100) NOT NULL"},
        {name: "lastName", type: "varchar(100) NOT NULL"},
        {name: "middleName", type: "varchar(100) NOT NULL"},
        {name: "post", type: "integer NOT NULL"},
        {name: "spec", type: "varchar(30)"},
        {name: "mainPhone", type: "integer"},
        {name: "added", type: "TIMESTAMP WITH TIME ZONE"}
      ],
      own: []
    },
    pAccounts:{
      name: "СчетаКлиентов",
      table: "pAccounts",
      hierarhy: false,
      owner: "partners",
      view: ["name"],
      fields: [
        {name: "name", type: "varchar(50)"},
        {name: "number", type: "varchar(20)"},
        {name: "bank", type: "integer NOT NULL"},
        {name: "added", type: "TIMESTAMP WITH TIME ZONE"}
      ],
      own: []
    }
  }
}