const PubSub = require('../helpers/pub_sub.js')
const ChartIntakeView = require('../views/charts/chart_intake_view.js')
const ChartAllowanceView = require('../views/charts/chart_intake_view.js')
const EntryView = require('../views/entry_view.js')
const math = require('mathjs')
const Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);


const DateRangeModel = function (data) {
  this.data = data
}

DateRangeModel.prototype.bindEvents =  function() {

  PubSub.subscribe("FoodModel:all-data", (event) => {
    this.data = event.detail
    console.log("foodModelData",this.data);
  })
}

DateRangeModel.prototype.dailyRender = function (goal) {
  const today = new Date().toISOString().substr(0, 10);
  const todayFood = []
  this.data.forEach( (data) => {
    if (data.date === today) {
      todayFood.push(data)
    }
  })
  const todayObject = {goal: goal, food: todayFood}
  PubSub.publish('DateRange:daily-data', todayObject)
};

DateRangeModel.prototype.weeklyRender = function (goal) {

  const last7Days = this.last7Days()
  const weeklyFood = []
  const weeklyGoal = goal * 7;
  last7Days.forEach( (day) => {
    this.data.forEach( (food) => {
      if (food.date === day) {
        weeklyFood.push(food)
      }
    })
  })
  const weeklyObject = {goal: weeklyGoal, food: weeklyFood}
  PubSub.publish('DateRange:weekly-data', weeklyObject);
}

DateRangeModel.prototype.monthlyRender = function (month, goal) {
  monthlyFood = []
  const monthlyGoal = goal * 30 
  this.data.forEach( (data) => {
    const monthOfFood = new Date(data.date)
    const monthIndex = monthOfFood.getMonth();
    if (monthIndex == month) {
      monthlyFood.push(data)
    }
  })
  const monthlyObject = {goal: monthlyGoal, food: monthlyFood}
  PubSub.publish('DateRange:monthly-data', monthlyObject)
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

DateRangeModel.prototype.makeAllowanceChart = function (allData, goal) {
  const allowanceData = []
  let calorieCount = 0
  allData.forEach( (data) => {
    calorieCount += parseInt(data.calories);
  })
  
  let caloriesLeft = (goal - calorieCount);
  Math.round(caloriesLeft);
  console.log(caloriesLeft);
  if(caloriesLeft < 0){
    console.log("You fat bastard!");
    caloriesLeft = Math.round(caloriesLeft *= -1);
    allowanceData.push({name:"Calories left", y:goal - calorieCount});
    allowanceData.push({name:`You have overeaten by ${caloriesLeft} calories`, y:calorieCount})
    new ChartAllowanceView(allowanceData);

  } else {
    allowanceData.push({name:"Calories left", y:goal - calorieCount});
    allowanceData.push({name:"Calories consumed", y:calorieCount})
    new ChartAllowanceView(allowanceData);
  }
}

module.exports = DateRangeModel;
