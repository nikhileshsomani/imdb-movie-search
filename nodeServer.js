var express = require('express');
var request = require("request");
var app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
})

app.get('/:name', function(req, res) {
    var name = req.params.name;
    var id;
    request("http://www.imdb.com/xml/find?json=1&nr=1&nm=on&q=" + name, function(error, response, body) {
        if (!error) {
            var data = JSON.parse(body);
            if (data['name_popular']) {
                console.log(data['name_popular'][0]['id']);
                id = data['name_popular'][0]['id'];
                res.json(id);
            } else {
                res.send("No such actor/actress found.")
            }
        } else {
            console.log(error);
        }
    });
    var id1 = {
        'data': id
    }
});

app.get('/name/:nameID', function(req, res) {
    var nameID = req.params.nameID;
    request("http://www.imdb.com/filmosearch/_ajax?explore=title_type&role=" + nameID + "&ref_=filmo_ref_typ&sort=user_rating,desc&mode=detail&page=1&title_type=movie", function(error, response, body) {
        if (!error) {
            res.send(body);
        } else {
            console.log(error);
        }
    });
})

app.get('/review/:movieID', function(req, res) {
    var movieID = req.params.movieID;
    request("http://www.imdb.com/title/" + movieID + "/reviews?ref_=tt_urv", function(error, response, body) {
        if (!error) {
            res.send(body);
        } else {
            console.log(error);
        }
    });
})


var server = app.listen(3002, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('IMDB-search app listening at http://%s:%s', host, port);
});
