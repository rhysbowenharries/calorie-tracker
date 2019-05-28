const PubSub = require('../helpers/pub_sub.js');
const DateRangeView = require('./date_range_view.js')
const ListView = require('./list_view.js')


const NavBarView = function (element) {
  this.element = element
  this.data =[]
}

NavBarView.prototype.bindEvents = function () {
  PubSub.subscribe('FoodModel:all-data', (event) => {
    this.data = event.detail
    console.log('all-data',this.data)
  })

  const daily = document.querySelector('a#daily')
  daily.addEventListener('click', (event) => {
    const container = document.querySelector('#food-data')
    const dateRangeView = new DateRangeView(container , this.data)
    dateRangeView.dailyRender()
  })

  const weekly = document.querySelector('a#weekly')
  weekly.addEventListener('click', (event) => {
    const container = document.querySelector('#food-data')
    const dateRangeView = new DateRangeView(container , this.data)
    dateRangeView.weeklyRender()
  })

  const all = document.querySelector('a#all')
  all.addEventListener('click', (event) => {
    const container = document.querySelector('#food-data')
    const listView = new ListView(container)
    listView.populate(this.data)
  })


};

module.exports = NavBarView;
