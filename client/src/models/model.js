const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');
const keys = require('../helpers/keys.js');

const Model = function(url) {
  this.url = url;
  this.request = new RequestHelper(this.url);
};

Model.prototype.bindEvents = function () {
  PubSub.subscribe('FormView:new-food-object', (event) => {
    const date = event.detail.date
    const newObject = {"query": event.detail.query}
    console.log(newObject)
    const nutritionAPI = new RequestHelper('https://trackapi.nutritionix.com/v2/natural/nutrients')
    nutritionAPI.post(newObject, {
      'Content-Type': 'application/json',
      'x-app-id': keys['x-app-id'],
      'x-app-key': keys['x-app-key'],
      'x-remote-user-id': 0
    })
    .then( (allData) => {
      const extractedDataObject = this.extractData(allData, date)
      this.request.post(extractedDataObject, {
        'Content-Type': 'application/json'
      })
        .then((allNewData) => {
          PubSub.publish('Model:all-data', allNewData)
        })

    })
  })
  PubSub.subscribe('EntryView:delete', (event) => {
    const deleteItem = event.detail.target.value
    this.request.delete(deleteItem)
      .then((allNewData) => {
        PubSub.publish('Model:all-data', allNewData)
    })
  })
  PubSub.subscribe('EntryView:update', (event)=> {
    const updateItem = event.detail
    console.log('update from model', updateItem);
    
    const newObject = this.extractNewData(updateItem)
    this.request.put(updateItem._id, newObject)
      .then( (allData) => {
        PubSub.publish('Model:all-data', allData)
        })
  })
};

  Model.prototype.getData = function () {
  this.request.get()
    .then( (allData) => {
    PubSub.publish('Model:all-data', allData)
    })
  };




Model.prototype.extractData = function(allData, date){
  const dataArray = allData.foods.map((food) => {
    const newObject = {
      foodName: food.food_name,
      calories: food.nf_calories,
      date: date
    }
    return newObject;
  })
  return dataArray;
}

Model.prototype.extractNewData = function(detail){
    const newObject = {
      foodName: detail.foodName,
      calories: detail.calories, 
      date: detail.date
    }
    return newObject;
}

module.exports = Model
