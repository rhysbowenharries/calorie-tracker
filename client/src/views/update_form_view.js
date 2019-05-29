const PubSub = require('../helpers/pub_sub.js');

const UpdateFormView = function (element, tile) {
    this.element = element;
    this.tile = tile;
}

UpdateFormView.prototype.renderUpdateForm = function (data) {
    const objectId = data;
    console.log(this.tile.id)

    this.replaceElement(`.nameElement${this.tile.id}`, data.foodName, 'foodName', "text", "disabled")
    this.replaceElement(`.caloriesElement${this.tile.id}`, data.calories, "calories", "float", "enable")
    this.replaceElement(`.dateElement${this.tile.id}`, data.date, "date", "date", "enable")

    const updateButton = document.createElement('button');
    updateButton.textContent = "Submit";
    updateButton.classList.add('updateButton');
    const oldDelete = document.querySelector(`.Delete${this.tile.id}`);
    oldDelete.replaceWith(updateButton)

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

UpdateFormView.prototype.replaceElement = function(element, value, id, type, disabled){
    const oldName = document.querySelector(element)
    const nameInput = document.createElement('input')
    nameInput.type = type;
    nameInput.id = id;
    nameInput.value = value;
    nameInput.classList.add(id);
    if (disabled === "disabled"){
        nameInput.setAttribute(disabled, "true")
    }
    oldName.replaceWith(nameInput);
}


module.exports = UpdateFormView;
