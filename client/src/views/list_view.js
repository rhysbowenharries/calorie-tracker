const PubSub = require('../helpers/pub_sub.js');

const ListView = function (element) {
  this.element = element
}

ListView.prototype.bindEvents = function () {
  PubSub.subscribe("Model:all-data", (event) => {
    const allData = event.detail
    console.log(allData);
  })
};







module.exports = ListView;
