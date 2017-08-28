const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mustache = require('mustache-express');
const request = require('request');
const user_profiles = require('./profile_data.js')
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const mongoURL = 'mongodb://localhost:27017/newdb';

app.engine('mustache', mustache());
app.use('/robots', express.static('robots'));
app.use(express.static(path.join(__dirname, 'public')));
//app.set('public', './public');
app.set('views', './views');
app.set('view engine', 'mustache');

//output = Mustache.render( template, data );

app.use('/:dynamic', function (req, res) {
  MongoClient.connect(mongoURL, function (err, db) {
    const robots = db.collection('robots');
    robots.find({'id': 5}).toArray(function(err, docs) {
      console.log(docs);
      res.render('user', {robots: docs})
    })
  })
})

app.use('/', function (req, res) {
  MongoClient.connect(mongoURL, function (err, db) {
    const robots = db.collection('robots');
    robots.find({}).toArray(function (err, docs) {
      res.render("index", {robots: docs})
    })
  })
})

// app.get('/', function(req, res){
//   //  res.render('index', user_profiles)
//  }
//   );

// app.get('/:dynamic', function(req, res){
//   res.render('user', user_profiles.users[req.params.dynamic-1])
//
// });



app.listen(3000, function(){
  console.log("the app is running on port 3000!");
});
