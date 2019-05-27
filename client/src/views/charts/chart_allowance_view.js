const ChartAllowanceView = function (data) {

  this.data = data
  console.log('graph',this.data);
  

  Highcharts.chart('allowance-chart-container', {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Calorie intake breakdown'
    },
    series: [{
      name: 'Calories',
      colorByPoint: true,
      data: this.data
    }]
  });
}

module.exports = ChartAllowanceView;
