const PubSub = require('../helpers/pub_sub.js');
const EntryView = require('./entry_view.js');
const Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);


const ListView = function (element) {
  this.element = element
}

ListView.prototype.bindEvents = function () {
  PubSub.subscribe("Model:all-data", (event) => {
    const allData = event.detail
    console.log(allData)
    this.populate(allData)
  })
};

ListView.prototype.populate = function (allData) {
  this.element.innerHTML = ''
  allData.forEach( (data, index) => {
    const tile = new EntryView(this.element)
    tile.render(data, index)
  })
};

module.exports = ListView;
