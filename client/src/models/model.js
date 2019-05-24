const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Model = function(url) {
  this.url = url;
  this.request = new RequestHelper(this.url);
};

Model.prototype.bindEvents = function () {

};

Model.prototype.getData = function () {
  this.request.get(url)
    .then( (allData) => {
      PubSub.publish('Model:all-data', allData)
    })
};

module.exports = Model
