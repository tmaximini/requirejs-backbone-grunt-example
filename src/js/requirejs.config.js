/**
 * In this file we basically tell require.js about which libraries we want to use, how they are called and where they are.
 * As we install these libraries through bower package manager, and we told bower to install packages to "lib" in .bowerrc,
 * we set the paths for each library to the correct file here.
 * Shim helps us to define dependencies between libraries and to configure our exports.
 */

require.config({

  deps: ["RootView"],
  paths: {
    Backbone: "../../lib/backbone/backbone",
    Handlebars: "../../lib/handlebars/handlebars",
    HandlebarsCore: "../../lib/handlebars/handlebars.runtime",
    HandlebarsTemplates: "templates",
    jQuery: "../../lib/jquery/jquery",
    Lodash: "../../lib/lodash/dist/lodash",
    text: "../../lib/requirejs-text/text"
  },
  map: {
    "*": {
      "underscore": "Lodash",
      "backbone": "Backbone"
    }
  },
  shim: {
    Lodash: {
      exports: "_"
    },
    jQuery: {
      exports: "$"
    },
    Backbone: {
      deps: ["Lodash", "jQuery"],
      exports: "Backbone"
    },
    HandlebarsCore: {
      exports: "Handlebars"
    },
    HandlebarsTemplates: {
      deps: ["HandlebarsCore"],
      exports: "Handlebars"
    },
    Handlebars: {
      deps: ["HandlebarsCore", "HandlebarsTemplates"],
      exports: "Handlebars"
    }
  }
});
