import Ember from 'ember';
import ChartistChart from './chartist-chart';

export default ChartistChart.extend({
  classNames: ['ms-font-s-plus', 'd-chart'],

  data: {
    labels: ['4/10', '4/11', '4/12', '4/13', '4/14', '4/15', '4/16', '4/17'],
    series: [
      [5, 9, 7, 8, 5, 3, 5, 4],
      [2, 9, 3, 2, 5, 4, 5, 6]
    ]
  },

  type: 'bar',
  ratio: 'ct-octave',

  options: {
    showArea: true,
    showLine: false,
    showPoint: true,
    fullWidth: true,
    chartPadding: {
      top: 0,
      right: 10,
      bottom: 0,
      left: -30
    },
    axisX: {
      showGrid: true,
      position: 'center'
    },
    axisY: {
      showLabel: false
    }
  },

  responsiveOptions: [
    ['screen and (min-width: 641px) and (max-width: 1024px)', {
      seriesBarDistance: 10,
      axisX: {
        labelInterpolationFnc: function (value) {
          return value;
        }
      }
    }],
    ['screen and (max-width: 640px)', {
      seriesBarDistance: 5,
      axisX: {
        labelInterpolationFnc: function (value) {
          return value[0];
        }
      }
    }]
  ]
});

