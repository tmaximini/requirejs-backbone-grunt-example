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
