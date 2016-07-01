export function generateFakeLabels(week) {
  const fakeLabels = [];
  const weekDate = moment().weekYear(week);

  for (let i = 0; i < 7; i++) {
    fakeLabels.push(moment().day(i).format('M/D'));
  }

  return fakeLabels;
}

export function generateFakeData() {
  const fakeSeries = [];

  for (let i = 0; i < 3; i++) {
    const fakeSeriesBar = [];
    for (let ii = 0; ii < 7; ii++) {
      fakeSeriesBar.push(Math.floor(Math.random() * (20)) + 20);
    }
    fakeSeries.push(fakeSeriesBar);
  }

  return fakeSeries;
}