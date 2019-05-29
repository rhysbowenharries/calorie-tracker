const PubSub = require('../helpers/pub_sub.js');
const EntryView = require('./entry_view.js');
const ChartIntakeView = require('./charts/chart_intake_view.js')
const ChartAllowanceView = require('./charts/chart_allowance_view.js')
const Highcharts = require('highcharts');
const math = require('mathjs')
require('highcharts/modules/exporting')(Highcharts);


const ListView = function (element) {
  this.element = element;
  this.calorieAllowance = 0;
}

ListView.prototype.bindEvents = function () {
  let goal = 0
  PubSub.subscribe('GoalModel:goal', (event)=> {
    goal = event.detail[0].goal
  })
  PubSub.subscribe("FoodModel:all-data", (event) => {
    const allData = event.detail
    this.callFunctions(allData, goal)
  })
  PubSub.subscribe('DateRange:daily-data', (event) => {
    const allData = event.detail.food
    const goal = event.detail.goal
    this.callFunctions(allData, goal);
  })
  PubSub.subscribe('DateRange:weekly-data', (event) => {
    const allData = event.detail.food
    const goal = event.detail.goal
    this.callFunctions(allData, goal)
  })
  PubSub.subscribe('DateRange:monthly-data', (event) => {
    const allData = event.detail.food
    const goal = event.detail.goal
    this.callFunctions(allData, goal);
  })
};

ListView.prototype.populate = function (allData) {
  this.element.innerHTML = ''

  allData.forEach( (data, index) => {
    const tile = new EntryView(this.element)
    tile.render(data, index)
  })
  this.makeIntakeChart(allData)

};

ListView.prototype.makeIntakeChart = function (allData) {
  const chartData = []
  allData.forEach( (data) => {
    chartData.push({name: data.foodName, y:parseInt(data.calories)})
  })
  new ChartIntakeView(chartData)
};

ListView.prototype.makeAllowanceChart = function (allData, goal) {
  const allowanceData = []
  let calorieCount = 0
  allData.forEach( (data) => {
    calorieCount += parseInt(data.calories);
  })
  console.log(goal);  
  
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
};

ListView.prototype.callFunctions = function(allData, goal){
  this.populate(allData)
  this.makeAllowanceChart(allData, goal)
  this.makeIntakeChart(allData)
}

module.exports = ListView;
