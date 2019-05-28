const PubSub = require('../helpers/pub_sub.js')
const ChartIntakeView = require('./charts/chart_intake_view.js')
const ChartAllowanceView = require('./charts/chart_intake_view.js')
const EntryView = require('./entry_view.js')
const Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);


const DateRangeView = function (element, data) {
  this.element = element
  this.data = data
  this.calorieAllowance = 0;

}

DateRangeView.prototype.bindEvents =  function() {
  PubSub.subscribe("FoodModel:all-data", (event) => {
    this.data = event.detail
  })
  PubSub.subscribe('GoalModel:goal', (event)=> {
    this.calorieAllowance = event.detail[0].goal
  })
}

DateRangeView.prototype.dailyRender = function () {
  let today = new Date().toISOString().substr(0, 10);
  console.log(today);

  const todayFood = []
  this.data.forEach( (data) => {
    if (data.date === today) {
      todayFood.push(data)
    }
  })
  this.populate(todayFood)
  this.makeIntakeChart(todayFood)
  // this.makeAllowanceChart(todayFood)
  
  
  // console.log('new array',newArray)
};

DateRangeView.prototype.populate = function (foodInDateRange) {
  this.element.innerHTML = ''
  foodInDateRange.forEach( (data, index) => {
    const tile = new EntryView(this.element)
    tile.render(data, index)
  })
};

DateRangeView.prototype.makeIntakeChart = function (allData) {
  //take allData from bind events and render chart in ChartIntakeViews
  const chartData = []
  allData.forEach( (data) => {
     chartData.push({name: data.foodName, y:parseInt(data.calories)})


  })
  new ChartIntakeView(chartData)
};

DateRangeView.prototype.makeAllowanceChart = function (allData) {
  const allowanceData = []
  let calorieCount = 0
  allData.forEach( (data) => {
    calorieCount += data.calories;
  })
  allowanceData.push({name:"Calories left", y:this.calorieAllowance - calorieCount});
  allowanceData.push({name:"Calories consumed", y:calorieCount})
  new ChartAllowanceView(allowanceData);

};

module.exports = DateRangeView;
