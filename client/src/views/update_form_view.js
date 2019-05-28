const PubSub = require('../helpers/pub_sub.js');

const UpdateFormView = function (element, tile) {
    this.element = element;
    this.tile = tile;
}

UpdateFormView.prototype.renderUpdateForm = function (data, updateButtonId) {
    const objectId = data;

    const replacementTD = document.querySelector(`.nameElement${updateButtonId}`)
    
    const newTD = document.createElement('td');
    newTD.classList.add('updateForm');

    const form = document.createElement('form');
    
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'nameInput'
    nameInput.name = "foodName"
    nameInput.value = data.foodName;
    const caloriesInput = document.createElement('input');
    caloriesInput.type = 'float';
    caloriesInput.id = 'caloriesInput'
    caloriesInput.name = "calories"
    caloriesInput.value = data.calories;
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.id = 'dateInput'
    dateInput.name = "date";
    dateInput.value = data.date;


    form.appendChild(nameInput);
    form.appendChild(caloriesInput);
    form.appendChild(dateInput);
    

    const submitButton = document.createElement('input')
    submitButton.type = "submit"
    form.appendChild(submitButton);

    newTD.appendChild(form)

    replacementTD.replaceWith(newTD)

    const emptyCell1 = document.createElement('td')
    const emptyCell2 = document.createElement('td')
    const emptyCell3 = document.createElement('td')
    const emptyCell4 = document.createElement('td')
    const removeCalories = document.querySelector(`td.caloriesElement${updateButtonId}`)
    removeCalories.replaceWith(emptyCell1)
    const removeDate = document.querySelector(`td.dateElement${updateButtonId}`)
    removeDate.replaceWith(emptyCell2);
    const removeDelete = document.querySelector(`td#delete${updateButtonId}`)
    removeDelete.replaceWith(emptyCell3);
    const removeUpdate = document.querySelector(`td#update${updateButtonId}`)
    removeUpdate.replaceWith(emptyCell4);

    this.tile.addEventListener('submit', (event) => {
        event.preventDefault()
        const enteredData = this.getData(event.target, objectId)
        PubSub.publish('EntryView:update', enteredData)
    })
}

UpdateFormView.prototype.getData = function (event, objectId) {
    console.log(event);
    
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
