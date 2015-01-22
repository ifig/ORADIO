var express = require('express');
var mysql = require( "mysql" );

//Pour les routes
var app = express();


//page de base
app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Petit exemple tout pourri');
});

var queryString = null;

app.get('/:name', function(req, res) {

    connection= mysql.createConnection({
      host     : 'V-ORADIO-BDD',
      user     : 'apiradioselect',
      password : 'apiradioselect',
      database : 'apiradio'
    });
    //connection.connect();

    res.setHeader('Content-Type', 'text/plain'); 
    
    queryString = 'SELECT * FROM radios WHERE name=' + "'" + req.params.name + "'";
    
    console.log(queryString);

    connection.query(queryString, function select(error, results, fields) {
        if (error) {
          console.log(error);
          //connection.end();
          return;
        }
        if ( results.length > 0 )  { 
            res.json(results);
            //res.send(results);
            console.log(res);
        } else {
          console.log("Pas de données");
          res.send("Pas de données correspondant à " + req.params.name);
        }
        //connection.end();
        queryString = "";
      }
    );
});


/**
 * Represents a book.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
function Book(title, author) {
}

app.listen(8000);