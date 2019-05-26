

const ChartView = function (data) {

  this.data = data
  console.log("here",this.data);


  Highcharts.chart('chart-container', {
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


module.exports = ChartView;
