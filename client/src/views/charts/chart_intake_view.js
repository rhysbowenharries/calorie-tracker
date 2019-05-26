

const ChartIntakeView = function (data) {

  this.data = data
  console.log("here",this.data);


  Highcharts.chart('intake-chart-container', {
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


module.exports = ChartIntakeView;
