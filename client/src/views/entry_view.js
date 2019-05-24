const PubSub = require('../helpers/pub_sub.js')


const EntryView = function (element) {
  this.element = element
}

EntryView.prototype.render = function (data) {
  const tile = document.createElement('div')
  tile.classList.add('tile')

  const name = document.createElement('h3')
  name.textContent = `Name: ${data.name}`
  tile.appendChild(name)

  const calories = document.createElement('h3')
  calories.textContent = `Calories: ${data.calories}`
  tile.appendChild(calories)

  const date = document.createElement('h3')
  date.textContent = `Date: ${data.date}`
  tile.appendChild(date)

  const deleteButton = document.createElement('button')
  deleteButton.value = data._id
  this.makeDeleteButton(deleteButton)
  tile.appendChild(deleteButton)
  deleteButton.addEventListener('click', (event) => {
    PubSub.publish('EntryView:delete', event)
  })




  this.element.appendChild(tile)


}

EntryView.prototype.makeDeleteButton = function (deleteButton) {
  deleteButton.textContent = 'Delete'
  deleteButton.classList.add('delete')
}


module.exports = EntryView;
