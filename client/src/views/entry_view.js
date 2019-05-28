const PubSub = require('../helpers/pub_sub.js')
const UpdateFormView = require('./update_form_view.js');

const EntryView = function (element) {
  this.element = element
}

EntryView.prototype.render = function (data, index) {
  const tile = document.createElement('form')
  tile.id = index

  this.createLabel('Name: ', tile);
  this.createOurElement(data.foodName, `nameElement${index}`, tile)

  this.createLabel('Calories: ', tile);
  this.createOurElement(data.calories, `caloriesElement${index}`, tile)

  this.createLabel('Date: ', tile)
  this.createOurElement(data.date, `dateElement${index}`, tile)

  const deleteButton = document.createElement('button')
  deleteButton.value = data._id
  this.makeDeleteButton(deleteButton)
  tile.appendChild(deleteButton)
  deleteButton.addEventListener('click', (event) => {
    PubSub.publish('EntryView:delete', event)
  })

  const updateButton = document.createElement('button')
  updateButton.value = data._id
  updateButton.textContent = 'Update'
  updateButton.classList.add('update')
  tile.appendChild(updateButton)
  updateButton.addEventListener('click', (event) => {
    event.preventDefault();
    const updateForm = new UpdateFormView(this.element, tile);
    updateForm.renderUpdateForm(data);
  })
  console.log(this.element)
  this.element.appendChild(tile)
}

EntryView.prototype.makeDeleteButton = function (deleteButton) {
  deleteButton.textContent = 'Delete'
  deleteButton.classList.add('delete')
}

EntryView.prototype.createLabel = function(name, tile){
  const label = document.createElement('label');
  label.textContent = name;
  tile.appendChild(label);
}

EntryView.prototype.createOurElement = function(input, classList, tile){
  const name = document.createElement('h3')
  name.textContent = input
  name.classList.add(classList);
  name.style.display = "inline"
  tile.appendChild(name)
}

module.exports = EntryView;
