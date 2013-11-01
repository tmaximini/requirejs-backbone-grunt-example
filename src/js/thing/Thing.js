/**
 * A model of anything.
 *
 */
define(function (require) {
	'use strict';

	var Backbone = require("Backbone");

	return Backbone.Model.extend({

		defaults: {
			key: null,
			label: "---",
			rating: 0.0
		}

	});
});
