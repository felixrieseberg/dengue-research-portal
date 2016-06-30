import Ember from 'ember';
import fetch from 'fetch';

import tileCalculator from '../utils/tile';

export default Ember.Component.extend({
  currentMap: null,
  heatLayer: null,
  tilesProcessed: [],
  lat: -3.757717,
  lng: 120.953979,
  maxBounds: [
    [7.088628, 107.204590],
    [-9.981023, 127.419434]
  ],
  zoom: 8,
  minZoom: 7,
  currentCenter: null,
  isInteractive: false,

  ensureHeatLayer() {
    if (!this.get('heatLayer') && this.get('currentMap')) {
      const options = {
        radius: 50,
        maxZoom: 15
      };
      this.set('heatLayer', window.L.heatLayer([], options).addTo(this.get('currentMap')));
    }
  },

  removeHeatLayer() {
    const layer = this.get('heatLayer');
    const map = this.get('currentMap');

    if (layer && map) {
      map.removeLayer(layer);
      this.set('heatLayer', null);
    }
  },

  addTileToHeatLayer(tileName, tileData) {
    if (!tileName || !tileData) {
      return;
    }

    const tilesProcessed = this.get('tilesProcessed');
    const layer = this.get('heatLayer');
    const tileInfo = tileCalculator.tileFromTileId(tileName);
    const lat = tileInfo.centerLatitude;
    const lng = tileInfo.centerLongitude;

    // Don't do this twice
    if (tilesProcessed.includes(tileName)) {
      return;
    }
    tilesProcessed.pushObject(tileName);

    for (let i = 0; i < tileData.value * 10; i++) {
      // Randomize, so it doesn't look
      // horrible during demo
      const randomizer1 = Math.random() * (1.15 - 0.85) + 0.85;
      const randomizer2 = Math.random() * (1.02 - 0.98) + 0.98;
      const latLon = [lat * randomizer1, lng * randomizer2];
      layer.addLatLng(latLon);
    }
  },

  updateHeatMap() {
    const bounds = this.get('currentMap').getBounds();
    const n = bounds._northEast.lat;
    const w = bounds._southWest.lng;
    const s = bounds._southWest.lat;
    const e = bounds._northEast.lng;
    const urlBase = 'http://dengue-tile-server.azurewebsites.net/tiles?';
    const url = `${urlBase}north=${n}&west=${w}&south=${s}&east=${e}&zoom=8`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const keys = Object.keys(data);
        keys.forEach(key => this.addTileToHeatLayer(key, data[key].climate));
      });
  },

  actions: {
    handleMove(e) {
      if (this.get('isInteractive') && this.get('draw')) {
        const layer = this.get('heatLayer');
        layer.addLatLng(e.latlng);
      }
    },

    handleMoveEnd(e) {
      if (e && e.target) {
        this.ensureHeatLayer();
        Ember.run.debounce(this, this.updateHeatMap, 500);
      }

      if (this.get('isInteractive')) {
        this.set('draw', true);
      }
    },

    handleMoveStart(e) {
      this.set('currentMap', e.target);

      if (this.get('interactive')) {
        this.set('draw', false);
      }
    },

    handleZoom() {
      // Optional: This can be enabled to handle
      // different heat maps for different zoom levels
      // this.removeHeatLayer();
    },

    toggleInteractive() {
      this.toggleProperty('isInteractive');
    },

    toggleHeatMap() {
      this.toggleProperty('isHeatmap');

      if (this.get('isHeatmap')) {
        this.get('currentMap').addLayer(this.get('heatLayer'));
      } else {
        this.get('currentMap').removeLayer(this.get('heatLayer'));
      }
    },

    saveToImage() {
      const map = Ember.$('.d-map')[0];

      domtoimage.toBlob(map)
        .then(blob => {
            window.saveAs(blob, 'map.png');
        })
        .catch(err => console.error(err));
    }
  }
});
