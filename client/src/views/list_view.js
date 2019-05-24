const PubSub = require('../helpers/pub_sub.js');
const EntryView = require('./entry_view.js')

const ListView = function (element) {
  this.element = element
}

ListView.prototype.bindEvents = function () {
  PubSub.subscribe("Model:all-data", (event) => {
    const allData = event.detail
    this.populate(allData)
  })
};

ListView.prototype.populate = function (allData) {
  allData.forEach( (data) => {

    const tile = new EntryView(this.element)
    tile.render(data)
  })
};





module.exports = ListView;
