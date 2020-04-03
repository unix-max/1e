class Spr {
  constructor() {

  }
  async getData() {
    let response = await fetch(url);

    if (response.ok) { 
      let json = await response.json();
    } else {
      alert("Ошибка HTTP: " + response.status);
    }
  }
}