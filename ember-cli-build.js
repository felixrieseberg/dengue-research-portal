/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    fingerprint: {
      exclude: [
        'images/layers-2x.png',
        'images/layers.png',
        'images/marker-icon-2x.png',
        'images/marker-icon.png',
        'images/marker-shadow.png'
      ]
    }
  });

  app.import('bower_components/office-ui-fabric/dist/js/jquery.fabric.min.js');
  app.import('bower_components/office-ui-fabric/dist/css/fabric.min.css');
  app.import('bower_components/office-ui-fabric/dist/css/fabric.components.min.css');
  app.import('bower_components/dom-to-image/dist/dom-to-image.min.js');
  app.import('bower_components/file-saver/FileSaver.min.js');
  app.import('vendor/leaflet.heat.js');

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
