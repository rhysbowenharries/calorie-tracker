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
  PubSub.subscribe('GoalModel:goal', (event)=> {
    this.calorieAllowance = event.detail[0].goal
  })
  PubSub.subscribe("FoodModel:all-data", (event) => {
    const allData = event.detail
    this.populate(allData)
    this.makeIntakeChart(allData)
    // this.makeAllowanceChart(allData)
  })
};

ListView.prototype.populate = function (allData) {
  this.element.innerHTML = ''
  const tableHead = document.createElement('thead');
  this.element.appendChild(tableHead);
  const nameHeader = document.createElement('th');
  nameHeader.textContent = 'Name';
  tableHead.appendChild(nameHeader);
  const caloriesHeader = document.createElement('th');
  caloriesHeader.textContent = 'Calories';
  tableHead.appendChild(caloriesHeader);
  const dateHeader = document.createElement('th');
  dateHeader.textContent = 'Date';
  tableHead.appendChild(dateHeader);
  const deleteHeader = document.createElement('th');
  deleteHeader.textContent = '';
  tableHead.appendChild(deleteHeader);
  const updateHeader = document.createElement('th');
  updateHeader.textContent = '';
  tableHead.appendChild(updateHeader);
  allData.forEach( (data, index) => {
    const tile = new EntryView(this.element)
    tile.render(data, index)
  })
  this.makeIntakeChart(allData)

};

ListView.prototype.makeIntakeChart = function (allData) {
  //take allData from bind events and render chart in ChartIntakeViews
  const chartData = []
  allData.forEach( (data) => {
    chartData.push({name: data.foodName, y:parseInt(data.calories)})


  })
  new ChartIntakeView(chartData)
};

ListView.prototype.makeAllowanceChart = function (allData) {
  const allowanceData = []
  let calorieCount = 0
  allData.forEach( (data) => {
    calorieCount += parseInt(data.calories);
  })

  let caloriesLeft = (this.calorieAllowance - calorieCount);
  Math.round(caloriesLeft);
  console.log(caloriesLeft);
  if(caloriesLeft < 0){
    console.log("You fat bastard!");
    caloriesLeft = Math.round(caloriesLeft *= -1);
    allowanceData.push({name:"Calories left", y:this.calorieAllowance - calorieCount});
    allowanceData.push({name:`You have overeaten by ${caloriesLeft} calories`, y:calorieCount})
    new ChartAllowanceView(allowanceData);

  } else {
    allowanceData.push({name:"Calories left", y:this.calorieAllowance - calorieCount});
    allowanceData.push({name:"Calories consumed", y:calorieCount})
    new ChartAllowanceView(allowanceData);
  }
};

module.exports = ListView;
