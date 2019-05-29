const PubSub = require('../helpers/pub_sub.js')
const UpdateFormView = require('./update_form_view.js');

const EntryView = function (element) {
  this.element = element
}

EntryView.prototype.render = function (data, index) {

  const tile = document.createElement('form')
  tile.classList.add('update-form')
  tile.id = index

  this.createLabel('Name: ', tile);
  this.createOurElement(data.foodName, `nameElement${index}`, tile)
  this.createLabel('Calories: ', tile);
  this.createOurElement(data.calories, `caloriesElement${index}`, tile)
  this.createLabel('Date: ', tile);
  this.createOurElement(data.date, `dateElement${index}`, tile)


  const deleteButton = this.makeButton(data, index, "Delete", tile)
  deleteButton.addEventListener('click', (event) => {
    PubSub.publish('EntryView:delete', event)
  })

  const updateButton = this.makeButton(data, index, "Update", tile)
  updateButton.addEventListener('click', (event) => {
    event.preventDefault();
    const updateForm = new UpdateFormView(this.element, tile);
    updateForm.renderUpdateForm(data);
  })
  this.element.appendChild(tile)
}

EntryView.prototype.createLabel = function(name, tile){
  const label = document.createElement('label');
  label.textContent = name;
  tile.appendChild(label);
}

EntryView.prototype.createOurElement = function(input, classList, tile){
  const name = document.createElement('h5')
  name.textContent = input
  name.classList.add(classList);
  tile.appendChild(name)
}

EntryView.prototype.makeButton = function(data, index, content, tile){
  const deleteButton = document.createElement('button')
  deleteButton.value = data._id
  deleteButton.textContent = content
  deleteButton.classList.add(`${content}${index}`)
  tile.appendChild(deleteButton)
  return deleteButton;
}

module.exports = EntryView;
