const PubSub = require('../helpers/pub_sub.js');
const EntryView = require('./entry_view.js');
const ChartView = require('./chart_view.js')
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
    new ChartView(allData)

  })

};

ListView.prototype.populate = function (allData) {
  this.element.innerHTML = ''
  allData.forEach( (data) => {
    const tile = new EntryView(this.element)
    tile.render(data)
  })
};

ListView.prototype.makeChart = function () {
  //take allData from bind events and render chart in chartViews
};



module.exports = ListView;
