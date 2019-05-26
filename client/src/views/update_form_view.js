const PubSub = require('../helpers/pub_sub.js');
const FormView = require('./form_view.js');


const UpdateFormView = function (element, tile) {
    this.element = element;
    this.tile = tile;
}

UpdateFormView.prototype.renderUpdateForm = function (data) {

    console.log('update', data);
    const objectId = data;

    const oldName = document.querySelector(`.nameElement${this.tile.id}`)
    const nameInput = document.createElement('input')
    nameInput.type = "text";
    nameInput.id = "foodName"
    nameInput.value = data.foodName;
    oldName.replaceWith(nameInput);

    

    const oldCalories = document.querySelector(`.caloriesElement${this.tile.id}`)
    const caloriesInput = document.createElement('input')
    caloriesInput.type = "float";
    caloriesInput.id = "calories"
    caloriesInput.value = data.calories;
    oldCalories.replaceWith(caloriesInput)
   

    const oldDate = document.querySelector(`.dateElement${this.tile.id}`)
    const dateInput = document.createElement('input')
    dateInput.type = "date";
    dateInput.id = "date"
    dateInput.value = data.date;
    oldDate.replaceWith(dateInput)
    

    const submitButton = document.createElement('input')
    submitButton.type = "submit"
    this.tile.appendChild(submitButton);

    this.tile.addEventListener('submit', (event) => {
        event.preventDefault()
        console.log('event', event.target.foodName)
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


module.exports = UpdateFormView;