const PubSub = require('../helpers/pub_sub.js')
const UpdateFormView = require('./update_form_view.js');


const EntryView = function (element) {
  this.element = element
}

EntryView.prototype.render = function (data) {
  const tile = document.createElement('div')
  tile.classList.add('tile')

  const nameLabel = document.createElement('label');
  nameLabel.textContent = 'Name: ';
  const name = document.createElement('h3')
  name.textContent = data.foodName
  name.classList.add('nameElement');
  tile.appendChild(nameLabel);
  tile.appendChild(name)



  const claoriesLabel = document.createElement('label');
  claoriesLabel.textContent = 'Calories: ';
  const calories = document.createElement('h3')
  calories.textContent = data.calories
  calories.classList.add('caloriesElement')
  tile.appendChild(claoriesLabel)
  tile.appendChild(calories)


  const dateLabel = document.createElement('label');
  dateLabel.textContent = 'Date: ';
  const date = document.createElement('h3')
  date.textContent = data.date
  date.classList.add('dateElement');
  tile.appendChild(dateLabel)
  tile.appendChild(date)

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
    const updateForm = new UpdateFormView(tile);
    updateForm.renderUpdateForm(event);
    PubSub.publish('EntryView:update', event)
  })




  this.element.appendChild(tile)


}

EntryView.prototype.makeDeleteButton = function (deleteButton) {
  deleteButton.textContent = 'Delete'
  deleteButton.classList.add('delete')
}


module.exports = EntryView;
