const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Model = function(url) {
  this.url = url;
  this.request = new RequestHelper(this.url);
};

module.exports = Model
