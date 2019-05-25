const PubSub = require('../helpers/pub_sub.js');
const FormView = require('./form_view.js');


const UpdateFormView = function (tile) {
    this.tile = tile;
    
}

UpdateFormView.prototype.renderUpdateForm = function (event) {
    const form = document.createElement('form');
    form.setAttribute('method', "post");
    form.setAttribute('action', "submit");

    console.log('update', event.target.value);
    const objectId = event.target.value;

    const oldName = document.querySelector('h3')

    
    const nameInput = document.createElement('input')
    nameInput.type = "text";
    nameInput.id = "foodName"
    oldName.replaceWith(nameInput);

    

    const caloriesLabel = document.createElement('label')
    caloriesLabel.textContent = "Calories: "
    const caloriesInput = document.createElement('input')
    caloriesInput.type = "number";
    caloriesInput.id = "calories"
    form.appendChild(caloriesLabel);
    form.appendChild(caloriesInput);

    const dateLabel = document.createElement('label')
    dateLabel.textContent = "Date: "
    const dateInput = document.createElement('input')
    dateInput.type = "date";
    dateInput.id = "date"
    form.appendChild(dateLabel);
    form.appendChild(dateInput);

    const submitButton = document.createElement('input')
    submitButton.type = "submit"
    form.appendChild(submitButton);

    this.tile.appendChild(form);

    this.tile.addEventListener('submit', (event) => {
        event.preventDefault()
        const newData = event
        console.log(event);
        
        const enteredData = this.getData(newData, objectId)
        PubSub.publish('EntryView:update', enteredData)
        event.target.reset()
      })
}

UpdateFormView.prototype.getData = function (newData, objectId) {
    const foodEntry = {
        _id: objectId,
        foodName: newData.foodName,
        calories: newData.calories,
        date: newData.date
    }
        console.log(foodEntry);
        
      return foodEntry
  };


module.exports = UpdateFormView;