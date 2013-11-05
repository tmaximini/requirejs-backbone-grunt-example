/**
 * View to display a single thing.
 */
define(function (require) {
	'use strict';

	var Backbone = require('Backbone');
	var Handlebars = require("Handlebars");

	return View.extend({

		template: JST.ThingView,

		events: {
			"click": "thingClick"
		},

		render: function () {
			this.$el.html(this.template({
				model: this.model.toJSON()
			}));
		},

		thingClick: function () {
			console.log('You clicked a thing');
		}

	});
});
