/*jshint node: true*/
'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var fs = require('fs');
var jsonParser = bodyParser.json();


app.post('/:file', jsonParser, function (req, res) {
    //var data = JSON.stringify(req.body);
    var filename = ('./JSONdata/' + req.params.file + '.json');
    var s = fs.createWriteStream(filename);
    s.write(JSON.stringify(req.body));
    console.log(req.body);
    s.end();
    res.end();
    //console.log('piped ' + data + ' to ' + filename);
});

app.get('/:file', function (req, res) {
    res.writeHead(200, {"Content-Type": "application/json"});
    var file = ('./JSONdata/' + req.params.file + '.json');
    var stream = fs.createReadStream(file);
    stream.on('error', function(err){
        //res.writeHead(200, {"Content-Type": "utf8"});
        res.send(err);
    });
    stream.on('readable', function(){
        stream.pipe(res);
    });
});

app.listen(port, function () {
    console.log('server running at ' + port);
});