const PubSub = require('../helpers/pub_sub.js')
const ChartIntakeView = require('../views/charts/chart_intake_view.js')
const ChartAllowanceView = require('../views/charts/chart_intake_view.js')
const EntryView = require('../views/entry_view.js')
const Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);


const DateRangeModel = function (data) {
  this.data = data
  this.calorieAllowance = 0;
}




DateRangeModel.prototype.bindEvents =  function() {
  PubSub.subscribe("FoodModel:all-data", (event) => {
    this.data = event.detail
  })
  PubSub.subscribe('GoalModel:goal', (event)=> {
    this.calorieAllowance = event.detail[0].goal
    this.makeAllowanceChart(todayFood)

  })
}




DateRangeModel.prototype.dailyRender = function () {
  const today = new Date().toISOString().substr(0, 10);
  const todayFood = []
  this.data.forEach( (data) => {
    if (data.date === today) {
      todayFood.push(data)
    }
  })
  console.log('DAILY',todayFood)
  this.populate(todayFood)
  this.makeIntakeChart(todayFood)
};




DateRangeModel.prototype.weeklyRender = function () {

  const last7Days = this.last7Days()
  const weeklyFood = []

  last7Days.forEach( (day) => {
    this.data.forEach( (food) => {
      if (food.date === day) {
        weeklyFood.push(food)
      }
    })
  })
  this.populate(weeklyFood)
  console.log('WEEKLY',weeklyFood);
  this.makeIntakeChart(weeklyFood)
}




DateRangeModel.prototype.monthlyRender = function (month) {
  monthlyFood = []
  this.data.forEach( (data) => {
    const monthOfFood = new Date(data.date)
    const monthIndex = monthOfFood.getMonth();
    if (monthIndex == month) {
      monthlyFood.push(data)
    }
  })
  this.populate(monthlyFood)
  this.makeIntakeChart(monthlyFood)
}



DateRangeModel.prototype.populate = function (foodInDateRange) {
  const container = document.querySelector('#food-data')
  container.innerHTML = ''
  foodInDateRange.forEach( (data, index) => {
    const tile = new EntryView(container)
    tile.render(data, index)
  })
};




DateRangeModel.prototype.formatDate = function (date) {

  var dd = date.getDate();
  var mm = date.getMonth()+1;
  var yyyy = date.getFullYear();
  if (dd<10) {dd='0' + dd}
  if (mm<10) {mm='0' + mm}
  date = yyyy+'-'+mm+'-'+ dd;
  return date
}



DateRangeModel.prototype.last7Days = function () {
  const result = [];
  for (let i=0; i<7; i++) {
    let date = new Date();
    date.setDate(date.getDate() - i);
    result.push( this.formatDate(date) )
  }
  return(result);
}





DateRangeModel.prototype.makeIntakeChart = function (allData) {
  const chartData = []
  allData.forEach( (data) => {
    chartData.push({name: data.foodName, y:parseInt(data.calories)})
  })
  new ChartIntakeView(chartData)
};



DateRangeModel.prototype.makeAllowanceChart = function (allData) {
  const allowanceData = []
  let calorieCount = 0
  allData.forEach( (data) => {
    calorieCount += data.calories;
  })
  allowanceData.push({name:"Calories left", y:this.calorieAllowance - calorieCount});
  allowanceData.push({name:"Calories consumed", y:calorieCount})
  new ChartAllowanceView(allowanceData);
  console.log(allowanceData);
};

module.exports = DateRangeModel;
