/*jshint node: true*/
'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var fs = require('fs');
var jsonParser = bodyParser.json();

app.post('/:file', jsonParser, function(req, res) {
    //var data = JSON.stringify(req.body);
    var filename = ('./JSONdata/' + req.params.file + '.JSON');
    var s = fs.createWriteStream(filename);
    s.write(JSON.stringify(req.body));
    console.log('%j saved to %s', req.body, filename);
    s.end();
    res.end();
});

app.get('/:file', function(req, res) {
    var file = ('./JSONdata/' + req.params.file + '.JSON');
    var stream = fs.createReadStream(file);
    stream.on('error', function(err) {
	console.log('API GET error: %s doesnt exist', file);
        res.send(err);
	//res.end();
    });

    stream.on('readable', function() {
    	res.writeHead(200, {'Content-Type': 'application/json'});
	console.log('GET request for %s', file);
        stream.pipe(res);
    });
});

app.listen(port, function() {
    console.log('server running at ' + port);
});
