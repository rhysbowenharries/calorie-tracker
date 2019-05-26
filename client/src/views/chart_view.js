

const ChartView = function (data) {

  this.data = data
  console.log("here",this.data);


  Highcharts.chart('chart-container', {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Calorie intake breakdown hardcoded'
    },

    series: [{
      name: 'Calories',
      colorByPoint: true,
      data: [{
        name: 'Cheese',
        y: 113.12,
      }, {
        name: 'ham',
        y: 186.26
      }, {
        name: 'all bran',
        y: 80
      }, {
        name: 'Pasta',
        y: 195.92
      }, {
        name: 'lentils',
        y: 229.68
      }, {
        name: 'Granola bar',
        y: 117.04

      }]
    }]

  });
}


module.exports = ChartView;
