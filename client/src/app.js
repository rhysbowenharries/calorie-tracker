const Model = require('./models/model.js');
const ListView = require('./views/list_view.js');


document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector('div#food-data')
  const listView = new ListView(list)
  listView.bindEvents()


  const url = 'http://localhost:3000/api/foodTracker'


  const model = new Model(url);
  model.bindEvents();
  model.getData();
})
