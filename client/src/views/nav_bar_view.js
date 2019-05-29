const PubSub = require('../helpers/pub_sub.js');
const DateRangeModel = require('../models/date_range_model.js')
const ListView = require('./list_view.js')


const NavBarView = function (element) {
  this.element = element
  this.data =[]
}

NavBarView.prototype.bindEvents = function () {
  PubSub.subscribe('FoodModel:all-data', (event) => {
    this.data = event.detail
    })

  const daily = document.querySelector('a#daily')
  daily.addEventListener('click', (event) => {
    const container = this.grabDisplayElement()
    const dateRangeModel = new DateRangeModel(this.data)
    dateRangeModel.dailyRender()
    })

  const weekly = document.querySelector('a#weekly')
  weekly.addEventListener('click', (event) => {
    const container = this.grabDisplayElement()
    const dateRangeModel = new DateRangeModel(this.data)
    dateRangeModel.weeklyRender()
    })

  const all = document.querySelector('a#all')
  all.addEventListener('click', (event) => {
    const container = this.grabDisplayElement()
    const listView = new ListView(container)
    listView.populate(this.data)
    })

  const monthly = document.querySelector('#monthly')
  monthly.addEventListener('change', (event) => {
    const container = this.grabDisplayElement()
    const dateRangeModel = new DateRangeModel(this.data)
    dateRangeModel.monthlyRender(event.target.value)
    })

};

NavBarView.prototype.grabDisplayElement = function () {
  const container = document.querySelector('#food-data')
  return container
}

module.exports = NavBarView;
