var http     = require("http");
var allocine = require('allocine-api');
var search   = require('./Utils/search.js');

var server = http.createServer(function(request, response) {

  function parseResult(elements)
  {
    console.log('parseResult');
    var parsed;

    console.log(data);
    var x = data(elements ,"page");
    // return jsonObject({Films : data->films, Actors : data->castingShorts});
  }

  function insertData(db,data)
  {
    // db.Insert(result);
  }


  function processFilmData(film)
  {
    var result;
    allocine.api('search', {q: film, filter: 'movie'}, function(error, results) {
      if(error) { console.log('Error : '+ error); return; }
      
      result = results.feed;
    });

    var parsed;
    setTimeout(test, 1000);
    function test() {
      parsed = parseResult(result);
      insertData('db1',result)
      insertData('db2', parsed);
    }
    return parsed;

  }

  processFilmData('star wars');

});

server.listen(8080);
console.log("Server is listening");