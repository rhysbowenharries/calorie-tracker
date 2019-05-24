const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Model = function(url) {
  this.url = url;
  this.request = new RequestHelper(this.url);
};

Model.prototype.bindEvents = function () {
  PubSub.subscribe('FormView:new-food-object', (event) => {
    const newObject = event.detail
    this.request.post(newObject)
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

  Model.prototype.delete = function (itemToDelete) {
    const id = itemToDelete._id
    this.request
      .delete(id)
      .then( (allData) => {
        PubSub.publish('Model:all-data', allData)
      })
  };



module.exports = Model
