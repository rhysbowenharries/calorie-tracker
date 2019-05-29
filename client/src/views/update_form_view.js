const PubSub = require('../helpers/pub_sub.js');

const UpdateFormView = function (element, tile) {
    this.element = element;
    this.tile = tile;
}

UpdateFormView.prototype.renderUpdateForm = function (data) {
    const objectId = data;
    console.log(this.tile.id)

    this.replaceElement(`.nameElement${this.tile.id}`, data.foodName, 'foodName', "text")
    this.replaceElement(`.caloriesElement${this.tile.id}`, data.calories, "calories", "float")
    this.replaceElement(`.dateElement${this.tile.id}`, data.date, "date", "date")
    this.replaceElement(`.Delete${this.tile.id}`, "Submit", data._id, "submit")

    const removeButton = document.querySelector(`.Update${this.tile.id}`);
    removeButton.parentNode.removeChild(removeButton);

    this.tile.addEventListener('submit', (event) => {
        event.preventDefault()
        const enteredData = this.getData(event.target, objectId)
        PubSub.publish('UpdateView:update', enteredData)
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
    nameInput.classList.add(id);
    oldName.replaceWith(nameInput);
}


module.exports = UpdateFormView;
