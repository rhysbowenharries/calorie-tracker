const PubSub = require('../helpers/pub_sub.js')

const FormView = function (element) {
  this.element = element
}


FormView.prototype.bindEvents = function () {
    this.element.addEventListener('submit', (event) => {
      event.preventDefault()
      const newData = event.target
      const newFoodObject = this.getData(newData)
      PubSub.publish('FormView:new-food-object', newFoodObject)
      event.target.reset()
    })
};

FormView.prototype.getData = function (newData) {
  console.log('FormView', newData);
  
  const foodEntry = {
    query: newData.foodName.value,
    calories: newData.calories.value,
    date: newData.date.value
  }

    return foodEntry
};


module.exports = FormView;
