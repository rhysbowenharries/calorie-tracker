const PubSub = require('../helpers/pub_sub.js')
const UpdateFormView = require('./update_form_view.js');

const EntryView = function (element) {
  this.element = element
}

EntryView.prototype.render = function (data, index) {

  const tile = document.createElement('tr')
  tile.id = index

  this.createOurElement(data.foodName, `nameElement${index}`, tile)
  this.createOurElement(data.calories, `caloriesElement${index}`, tile)
  this.createOurElement(data.date, `dateElement${index}`, tile)

  const buttonD = document.createElement('td');
  buttonD.id = `delete${index}`
  const deleteButton = document.createElement('button')
  deleteButton.value = data._id
  deleteButton.id = index;
  this.makeDeleteButton(deleteButton)
  buttonD.appendChild(deleteButton);
  tile.appendChild(buttonD)
  deleteButton.addEventListener('click', (event) => {
    PubSub.publish('EntryView:delete', event)
  })

  const buttonU = document.createElement('td');
  buttonU.id = `update${index}`
  const updateButton = document.createElement('button')
  updateButton.value = data._id
  updateButton.id = index;
  updateButton.textContent = 'Update'
  updateButton.classList.add('update')
  buttonU.appendChild(updateButton);
  tile.appendChild(buttonU)
  updateButton.addEventListener('click', (event) => {
    const updateForm = new UpdateFormView(this.element, tile);
    updateForm.renderUpdateForm(data, event.target.id);
  })
  console.log(this.element)
  this.element.appendChild(tile)
}

EntryView.prototype.makeDeleteButton = function (deleteButton) {
  deleteButton.textContent = 'Delete'
  deleteButton.classList.add('delete')
  // deleteButton.style.display = "inline";
}

// EntryView.prototype.createLabel = function(name, tile){
//   const label = document.createElement('label');
//   label.textContent = name;
//   tile.appendChild(label);
// }

EntryView.prototype.createOurElement = function(input, classList, tile){
  const name = document.createElement('td')
  name.textContent = input
  name.classList.add(classList);
  // name.style.display = "inline"
  tile.appendChild(name)
}

module.exports = EntryView;
