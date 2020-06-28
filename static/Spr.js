class SprElm {
  construktor() {

  }
}
export default class Spr {
 
  constructor() {
    
  }
  async getData(url) {
    let response = await fetch(url);
    if (response.ok) { 
      json = await response.json();
      return json;
    } else {
      alert("Ошибка HTTP: " + response.status);
    }
  }
  async GetFull() {
    let data = await this.getData('http://pg.loc:3000/api/spr/partners.json?id=all');
    console.log(data);
  }
}