/**
 * View that displays a list of things.
 */
define(function (require) {
	'use strict';

	var _ = require("Lodash");
	var Backbone = require("Backbone");
	var Handlebars = require("Handlebars");
	var Thing = require("./Thing");
	var ThingCollection = require("./ThingCollection");


	return Backbone.View.extend({

		el: $("#content"),

		template: JST.ThingCollectionView,

		initialize: function () {
			this.thingCollection = new ThingCollection();
		},

		render: function () {
			this.$el.html(this.template());
			this.addAll();
		},

		addAll: function () {
			var self = this;
			this.thingCollection.forEach(function (thing) {
				var thingView = new ThingView({ model: thing });
				self.$('#things').append(thingView.render().el);
			});
		}

	});

});