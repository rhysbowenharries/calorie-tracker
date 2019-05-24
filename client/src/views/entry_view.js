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

  


  this.element.appendChild(tile)


}



module.exports = EntryView;
