var express = require('express');
var path = require('path');
var app  = express();
var counter = 0;

/* serves main page */
app.get("/", function(req, res) {
    res.sendFile(path.normalize(__dirname + '/../client/index.html'))
});

app.get('/resources/data/Messages.json',function(req,res){
    ++counter;
    console.log('Sending message... ' + counter);
    res.json({ messages: [{ key: 'counter', description: counter}]});
});

/* serves all the static files */
app.get(/^(.+)$/, function(req, res){
    console.log('static file request : ' + req.params);
    res.sendFile(path.normalize(__dirname + '/../client/' + req.params[0]));
});

app.listen(3000);
