const Model = require('./models/model.js');
const ListView = require('./views/list_view.js');


document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector('div#food-data')
  const listView = ListView()
  listView.bindEvents()  





  const model = new Model();
  model.bindEvents();
  model.getData();
})
