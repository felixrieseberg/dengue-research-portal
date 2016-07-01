import Ember from 'ember';
import moment from 'moment';
import {generateFakeLabels, generateFakeData} from '../utils/fake-data';

export default Ember.Component.extend({
  dataCache: [],

  init () {
    this._super(...arguments);
    this.set('fakeData', this.generateRandomData());
    this.setDataForDate(moment());
  },

  dateObserver: Ember.observer('selectedDate', function () {
    const date = this.get('selectedDate');
    this.setDataForDate(moment(date));
  }),

  setDataForDate(date) {
    const week = date.week();
    const cache = this.get('dataCache');

    if (cache[week]) {
      this.set('data', cache[week]);
    }
  },

  generateRandomData() {
    const cache = this.get('dataCache');
    const randomData = [];

    for (var i = 0; i < moment().weeksInYear(); i++) {
      const randomWeek = {
        labels: generateFakeLabels(),
        series: generateFakeData()
      };

      randomData[i] = randomWeek
    }

    cache.replace(0, cache.length, randomData);
  },

  actions: {
    changeData(date) {
      console.log(date);
    }
  }
});
