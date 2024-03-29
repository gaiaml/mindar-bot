var info_console   = "[MOVIE] ";
var Allocine       = require('allocine-api');
var Parser         = require('../Utils/parsing.js');
var Search         = require('../Utils/search.js');
var mongoose       = require ("mongoose");
var DBOperations   = require('../Database/dboperations.js');
var MovieModel     = require('../Database/Schemas/movieSchema.js');

var collection = "Movies";
var movie = function() {

    this.store = function (name) {
      Search.searchData('movie', name).then(res => {

        var allMovies = res.movie;
        var movieCodes = new Array();

        for (var i = 0; i < res.movie.length; i++) {
            movieCodes.push(res.movie[i].code);
        }
        movieCodes = Parser.uniqueArray(movieCodes);
        var counter = 0;
        for (var i = 0; i < movieCodes.length; i++) {
          Search.getMovie(movieCodes[i], "person").then(res => {
            var data = JSON.stringify(res);
            data = data.replace(/"\$":/g, '"type":');
            DBOperations.insertMovie(collection, JSON.parse(data));
          }).catch(function(e) {
            
          });
        }
        //getAllMoviesFromCodes(movieCodes);
      }).catch(function(e) {
        console.error(info_console +  'Promise error ' + e);
      });

    }

    var getAllMoviesFromCodes = function(movieCodes){
      var MovieModel = new Array();
      var counter = 0;
      var promiseArray = new Array();
      for (var i = 0; i < movieCodes.length; i++) {
        promiseArray.push(Search.getMovie(movieCodes[i], "person"));
      }
      Promise.all(promiseArray).then(movie => {
        var data = JSON.stringify(movie);
        data = data.replace(/"\$":/g, '"type":');
        DBOperations.insert(collection, JSON.parse(data));
      });
    }

	return this;
}

module.exports = new movie();
