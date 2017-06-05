const express = require('express');
const request = require('request');
const http = require('http');
const path = require('path');
const pug = require('pug');
const app = express();
const bodyParser = require('body-parser');

app.locals.basedir = path.join(__dirname, 'public');
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', function(req, res){
  res.render('index');
});

app.post('/result', function(req, res) {
    var movie = req.body.movie;
    request(`https://netflixroulette.net/api/api.php?title=${movie}`, function (error, response, body) {
    body = JSON.parse(body);

    if (response.statusCode == 200) {
      res.render('result', {message: body.summary, title: body.show_title, error: error, status: response.statusCode, release: body.release_year, image: body.poster});
    }
    res.render('error', {error: error, status: response.statusCode});
  });
});

app.listen(3333);