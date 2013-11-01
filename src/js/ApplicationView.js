/**
 * The main application view.
 */
define(function (require) {
	'use strict';

	var Backbone = require("Backbone");
	var Handlebars = require("Handlebars");

	return Backbone.View.extend({

		id: "container",

		template: JST.ApplicationView, // handlebars templates are placed inside 'templates' folder


		// define events
		events: {
			"click #myOtherDiv": "handleClick",
		},

		initialize: function () {
			// do any extra initialisation here
			return this;
		},


		render: function () {
			console.log('rendering application view');
			this.$el.html(this.template());
			return this;
		},

		handleClick: function () {
			console.log("clicked");
		}

	});
});
