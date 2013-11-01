/**
* Collection of Things.
*/

define(function(require) {
  'use strict';

  var Backbone = require('Backbone');
  var Thing = require('./Thing');

  return Backbone.Collection.extend({

    model: Thing,
    url: 'things',

    initialize: function () {
      this.fetch( { reset: true }); // fetch collection on init and fire 'reset' event when done
    }

  });

});
