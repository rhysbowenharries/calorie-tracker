const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');
const keys = require('../helpers/keys.js');

const Model = function(url) {
  this.url = url;
  this.request = new RequestHelper(this.url);
};

Model.prototype.bindEvents = function () {
  PubSub.subscribe('FormView:new-food-object', (event) => {
    const newObject = event.detail
    const nutritionAPI = new RequestHelper('https://trackapi.nutritionix.com/v2/natural/nutrients')
    .post(newObject, {
      'Content-Type': 'application/json',
      'x-app-id': keys['x-app-id'],
      'x-app-key': keys['x-app-key'], 
      'x-remote-user-id': 0
    })
    .then( (allData) => {    
      const extractedData = this.extractData(allData)
      PubSub.publish('Model:all-data', extractedData)
    })
  })
};

Model.prototype.getData = function () {
  this.request.get()
    .then( (allData) => {
      PubSub.publish('Model:all-data', allData)
    })
};

Model.prototype.extractData = function(allData){
  const calories = allData.foods[0].nf_calories
  console.log(calories);
  
}

module.exports = Model
