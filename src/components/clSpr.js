class SprElm {
  constructor(obj) {
    //console.log(obj);
    for (let key in obj) {
      this[key] = obj[key];
    }
    if (obj.folder == true) this.in = [];
  }
}
export default class Spr {
  constructor() {
    this.levelList = {};
    this.folders = [];
  }
  async getData(url) {
    let response = await fetch(url);
    if (response.ok) { 
      let json = await response.json();
      return json
    } else {
      alert("Ошибка HTTP: " + response.status);
    }
  }
  async getFolders() {
    //let data = await this.getData('http://localhost:3000/api/spr/partners.json?id=all');
    let data = await this.getData('http://localhost:3000/api/spr/all.json');
    
    let list = {};
    for (let dataElm of data) {
      let elm = new SprElm(dataElm);
      list[elm.id] = elm;
      if (elm.deep >1) {
        let parrent = elm.path.slice(-1)[0]; 
        list[parrent].in.push(elm);
      } else {
        this.folders.push(elm);
      }
    }
    //console.log(this.folders);

  }
}