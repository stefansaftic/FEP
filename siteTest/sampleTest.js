/*
var async = require('async');
var $ = require('jquerygo');

// Add some default configs.
$.config.site = 'http://www.google.rs';
$.config.addJQuery = true;

// Using the async.series with jQuery.go.
async.series([
  $.go('visit', '/'),
  $('body').text(function(text) {
      console.log(text);
      done();
    })
], function() {
  console.log('You are logged in!');
  $.close();
});
*/
var $ = require('jquerygo');
$.config.site = 'https://tutsplus.com/';
$.config.addJQuery = true;
// Visit the user path and log in.
$.visit('/', function() {
  $.capture(__dirname + '/screenshot.png');
  // Get the title.
  $('h1').text(function(text) {
    console.log(text);
    $.close();
  });
});