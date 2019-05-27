const PubSub = require('../helpers/pub_sub.js');
const DateRangeView = require('./date_range_view.js')


const NavBarView = function (element) {
  this.element = element
  this.allData = []
}

NavBarView.prototype.bindEvents = function () {
  PubSub.subscribe("FoodModel:all-data", (event) => {
    this.allData = event.detail
    new DateRangeView(this.allData)
  })



  const daily = document.querySelector('a#daily')
  daily.addEventListener('click', (event) => {
    PubSub.publish("NavBarView:DailyButtonClick",  )
  })
};

module.exports = NavBarView;
