const PubSub = require('../helpers/pub_sub.js')
const UpdateFormView = require('./update_form_view.js');

const EntryView = function (element) {
  this.element = element
}

EntryView.prototype.render = function (data, index) {

  const tile = document.createElement('tr')
  tile.id = index
  // const tableRow = document.createElement('tr');
  // tile.appendChild(tableRow);

  // this.createLabel('Name: ', tile);
  this.createOurElement(data.foodName, `nameElement${index}`, tile)

  // this.createLabel('Calories: ', tile);
  this.createOurElement(data.calories, `caloriesElement${index}`, tile)

  // this.createLabel('Date: ', tile)
  this.createOurElement(data.date, `dateElement${index}`, tile)

  const buttonD = document.createElement('td');
  const deleteButton = document.createElement('button')
  deleteButton.value = data._id
  this.makeDeleteButton(deleteButton)
  buttonD.appendChild(deleteButton);
  tile.appendChild(buttonD)
  deleteButton.addEventListener('click', (event) => {
    PubSub.publish('EntryView:delete', event)
  })

  const buttonU = document.createElement('td');
  const updateButton = document.createElement('button')
  updateButton.value = data._id
  updateButton.textContent = 'Update'
  updateButton.classList.add('update')
  // updateButton.style.display = "inline";
  buttonU.appendChild(updateButton);
  tile.appendChild(buttonU)
  updateButton.addEventListener('click', (event) => {
    event.preventDefault();
    const updateForm = new UpdateFormView(this.element, tile);
    updateForm.renderUpdateForm(data);
  })
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
