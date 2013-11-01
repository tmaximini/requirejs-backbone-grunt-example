/**
 * Root View - This is the very first View that gets instatiated in our App. It all starts here...
 */
define(function (require) {
	'use strict';


	var Backbone = require('Backbone');

	// require all needed files here
	var ApplicationView = require("./ApplicationView");

	var RootView = Backbone.View.extend({

		el: $("body"),

		initialize: function () {
			console.log('hello from RootView - we <3 require.js');
			this.applicationView = new ApplicationView();
			this.render();
		},

		render: function () {
			this.$el.html(this.applicationView.el);
			this.applicationView.render();
		}

	});

	return new RootView();
});
