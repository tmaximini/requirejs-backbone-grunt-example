# Require.js Backbone Grunt Example

This is a boilerplate example how to set up a basic Backbone application.
I think require.js helps a lot to write structured code, so here is my setup.
I like to use "simplified CommonJS wrapping" from require.js sugar syntax (http://requirejs.org/docs/whyamd.html#sugar)
This allows us to require files like this
```javascript
var MyFile = require('/path/to/my/file');
`



### Requirements

you should have `node.js` and `npm` installed. you will also need `ruby` and `compass` installed to compile the sass (`gem install compass`).
when you have these make sure you have grunt installed globally (`npm install -g grunt-cli`).


### Usage

##### 1. Setup

To run the app, clone the repo and then run

`npm install` followed by `bower install`
(if you don't have bower installed, do a `npm install bower -g` to install bower globally)

##### 2. Development

run `grunt dev` in the root folder which starts a local development server on port 8000.
it watches the folder for file changes and automatically re-compiles your SASS and Handlebars templates
the development version will use the `debug.html` version in the root folder, and include all your .js files seperately,
so you can easily trace any errors during development.

##### 3. Deployment / Production

run `grunt dist` to create a production ready, requirejs optimized version of your application.
the application will be created inside a `target` folder, and will have a minified `styles.css` and `app.js` file.
all your required files will be traced, concatenated and uglified through require.js optimizer.


##### 4. Profit !!!





