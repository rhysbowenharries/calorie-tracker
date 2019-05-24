const Model = require('./models/model.js');

document.addEventListener("DOMContentLoaded", () => {
  const model = new Model();
  model.bindEvents();
  model.getData();
})
