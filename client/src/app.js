const Model = require('./models/model.js');
const ListView = require('./views/list_view.js');
const FormView = require('./views/form_view.js');
const UpdateFormView = require('./views/update_form_view.js');

document.addEventListener("DOMContentLoaded", () => {
  let today = new Date().toISOString().substr(0, 10);
  document.querySelector("#date").value = today;

  const list = document.querySelector('div#food-data')
  const listView = new ListView(list)
  listView.bindEvents()

  const form = document.querySelector('form.input-form')
  const formView = new FormView(form)
  formView.bindEvents()

  const url = 'http://localhost:3000/api/foodTracker'
  const model = new Model(url);
  model.bindEvents();
  model.getData();
})
