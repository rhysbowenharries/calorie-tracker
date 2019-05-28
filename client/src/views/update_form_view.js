const PubSub = require('../helpers/pub_sub.js');

const UpdateFormView = function (element, tile) {
    this.element = element;
    this.tile = tile;
}

UpdateFormView.prototype.renderUpdateForm = function (data) {
    const objectId = data;

    this.replaceElement(`.nameElement${this.tile.id}`, data.foodName, "foodName", "text")
    this.replaceElement(`.caloriesElement${this.tile.id}`, data.calories, "calories", "number")
    this.replaceElement(`.dateElement${this.tile.id}`, data.date, "date", "date")

    const submitButton = document.createElement('input')
    submitButton.type = "submit"
    this.tile.appendChild(submitButton);

    this.tile.addEventListener('submit', (event) => {
        event.preventDefault()
        const enteredData = this.getData(event.target, objectId)
        PubSub.publish('EntryView:update', enteredData)
    })
}

UpdateFormView.prototype.getData = function (event, objectId) {
    const foodEntry = {
        _id: objectId._id,
        foodName: event.foodName.value,
        calories: event.calories.value,
        date: event.date.value
    }
      return foodEntry
  };

  UpdateFormView.prototype.replaceElement = function(element, value, id, type){
    const oldName = document.querySelector(element)
    const nameInput = document.createElement('input')
    nameInput.type = type;
    nameInput.id = id;
    nameInput.value = value;
    oldName.replaceWith(nameInput);
  }

module.exports = UpdateFormView;
