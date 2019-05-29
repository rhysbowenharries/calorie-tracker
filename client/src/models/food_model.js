const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');
const keys = require('../helpers/keys.js');

const FoodModel = function(url) {
  this.url = url;
  this.request = new RequestHelper(this.url);
};

FoodModel.prototype.bindEvents = function () {
  PubSub.subscribe('FormView:new-food-object', (event) => {
    const date = event.detail.date
    const newObject = {"query": `${event.detail.quantity} ${event.detail.query}`}
    const nutritionAPI = new RequestHelper('https://trackapi.nutritionix.com/v2/natural/nutrients')
    nutritionAPI.post(newObject, {
      'Content-Type': 'application/json',
      'x-app-id': keys['x-app-id'],
      'x-app-key': keys['x-app-key'],
      'x-remote-user-id': 0
    })
    .then( (allData) => {
      console.log(allData);
      const extractedDataObject = this.extractData(allData, date)
      this.request.post(extractedDataObject, {
        'Content-Type': 'application/json'
      })
        .then((allNewData) => {
          PubSub.publish('FoodModel:all-data', allNewData)
        })

    })
  })
  PubSub.subscribe('EntryView:delete', (event) => {
    const deleteItem = event.detail.target.value
    this.request.delete(deleteItem)
      .then((allNewData) => {
        PubSub.publish('FoodModel:all-data', allNewData)
    })
  })
  PubSub.subscribe('UpdateView:update', (event)=> {
    const updateItem = event.detail
    const newObject = this.extractUpdatedData(updateItem)
    this.request.put(updateItem._id, newObject)
      .then( (allData) => {
        PubSub.publish('FoodModel:all-data', allData)
        })
  })
};

FoodModel.prototype.getData = function () {
this.request.get()
  .then( (allData) => {
  PubSub.publish('FoodModel:all-data', allData)
  })
};

FoodModel.prototype.extractData = function(allData, date){
  const dataArray = allData.foods.map((food) => {
    const newObject = {
      foodName: food.food_name,
      calories: food.nf_calories,
      date: date,
      photo: food.photo.thumb
    }
    return newObject;
  })
  return dataArray;
}

FoodModel.prototype.extractUpdatedData = function(detail){
    const newObject = {
      foodName: detail.foodName,
      calories: detail.calories, 
      date: detail.date
    }
    return newObject;
}

module.exports = FoodModel
