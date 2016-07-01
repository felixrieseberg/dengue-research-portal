import Ember from 'ember';
import ChartistChart from './chartist-chart';
import toLetters from 'dengue/utils/to-letters';

export default ChartistChart.extend({
  classNames: ['ms-font-s-plus', 'd-chart'],

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
    ['screen and (min-width: 641px)', {
      seriesBarDistance: 20,
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
  ],

  updateHover() {
    Ember.run.later(() => {
      let seriesDomNodes = [];

      this.get('data.series').forEach((series, i) => {
        const letter = toLetters(i);
        const domNode = Ember.$(`.ct-series-${letter.toLowerCase()}`);

        if (domNode) {
          seriesDomNodes.push(domNode);
        }
      });

      Ember.$('.ct-bar').click((e) => {
        const $item = Ember.$(e.currentTarget);
        const index = $item.index();
      });

      Ember.$('.ct-bar').hover(
        function mouseIn() {
          const $item = Ember.$(this);
          const index = $item.index();

          seriesDomNodes.forEach(series => {
            const children = series.children();
            Ember.$(children[index]).addClass('day-hover');
          });
        },
        function mouseOut() {
          const $item = Ember.$(this);
          const index = $item.index();

          seriesDomNodes.forEach(series => {
            const children = series.children();
            Ember.$(children[index]).removeClass('day-hover');
          });
        }
      )
    });
  },

  didRender() {
    this._super();
    this.updateHover();
  }
});

